import React, { useState } from 'react';
import { Avatar, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import axios from 'axios';
const AvatarInput = ({ setProfileImage }) => { // Receive setProfileImage from Register component
  const [avatar, setAvatar] = useState(null); // Stores the image file
  const [openDialog, setOpenDialog] = useState(false); // For controlling the dialog visibility
  const [imagePreview, setImagePreview] = useState(null); // For the preview of selected image

  // Handle opening dialog
  const handleClickOpen = () => {
    setOpenDialog(true);
  };
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file); // Read file as data URL (Base64)
      reader.onload = () => resolve(reader.result); // Resolve the Base64 string
      reader.onerror = (error) => reject(error);
    });
  };

  // Handle closing dialog
  const handleClose = () => {
    setOpenDialog(false);
  };

  // Handle image selection
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const base64 = await fileToBase64(file); // Convert file to Base64
        setImagePreview(base64); // Show image preview
        setAvatar(base64); // Save Base64 string
        setProfileImage(base64); // Pass Base64 to parent component
      } catch (error) {
        console.error("Error converting file to Base64:", error);
      }
    }
  };

  // Handle form submission (send to the backend)
  const handleSubmit = async () => {
    if (!avatar) return;

    const formData = new FormData();
    formData.append('avatar', avatar); // Append the avatar image to FormData

    try {
      // Optionally, upload the image to the server, and store the URL in formData
      const response = await axios.post('/api/upload-avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const imageUrl = response.data.imageUrl; // Assume the server returns the uploaded image URL
      setProfileImage(imageUrl); // Set the profile image URL in parent
      handleClose(); // Close dialog after upload
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div>
      <Avatar
        alt="User Avatar"
        src={imagePreview || '/default-avatar.png'} // Default fallback image
        sx={{ width: 100, height: 100, cursor: 'pointer' }}
        onClick={handleClickOpen}
      />
      <IconButton color="primary" onClick={handleClickOpen} sx={{ position: 'absolute', bottom: 0, right: 0 }}>
        <PhotoCamera />
      </IconButton>

      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>Select an Avatar</DialogTitle>
        <DialogContent>
          <input
            accept="image/*"
            type="file"
            onChange={handleImageChange}
            style={{ display: 'none' }}
            id="avatar-upload"
          />
          <label htmlFor="avatar-upload">
            <Button variant="contained" component="span" fullWidth>
              Choose Image
            </Button>
          </label>

          {imagePreview && (
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <img
                src={imagePreview}
                alt="Preview"
                style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '50%' }}
              />
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Upload</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AvatarInput;
