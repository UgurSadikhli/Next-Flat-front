import React, { useState } from 'react';
import { Avatar, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import axios from 'axios';

const AvatarInput = ({ setProfileImage }) => {
  const [avatar, setAvatar] = useState(null); // Stores the image file
  const [openDialog, setOpenDialog] = useState(false); // For controlling the dialog visibility
  const [imagePreview, setImagePreview] = useState(null); // For the preview of selected image

  // Handle opening dialog
  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  // Handle closing dialog
  const handleClose = () => {
    setOpenDialog(false);
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file); // Get image preview URL
      setImagePreview(previewUrl); // Set image preview
      setAvatar(file); // Store the file
      setProfileImage(previewUrl); // Update profile image in parent component for instant preview
    }
  };

  // Handle form submission (upload the file to backend)
  const handleSubmit = async () => {
    if (!avatar) return;

    const formData = new FormData();
    formData.append('avatar', avatar); // Add the selected file to FormData

    try {
      const token = localStorage.getItem('token'); // Get the JWT token
      const response = await axios.post('http://api.nextflat.my/upload-avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Specify content type for file uploads
          'Authorization': `Bearer ${token}` // Pass the token for authorization
        },
      });

      const imageUrl = response.data.avatarUrl; // Get the URL from response
      setProfileImage(imageUrl); // Update profile image URL in parent
      handleClose(); // Close dialog after upload
    } catch (error) {
      console.error('Error uploading avatar:', error);
    }
  };

  return (
    <div>
      <Avatar
        alt="User Avatar"
        src={imagePreview || '/default-avatar.png'} // Display preview or fallback default image
        sx={{ width: 100, height: 100, cursor: 'pointer' }}
        onClick={handleClickOpen}
      />
      {/* <IconButton color="primary" onClick={handleClickOpen} sx={{ position: 'absolute', bottom: 0, right: 0 }}>
        <PhotoCamera />
      </IconButton> */}

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
