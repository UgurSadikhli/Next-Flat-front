import React, { useState,useEffect } from 'react';
import { Avatar, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import { useTranslation } from "react-i18next";

const AvatarInput = ({ setProfileImage }) => {
  const [avatar, setAvatar] = useState(null); 
  const [openDialog, setOpenDialog] = useState(false); 
  const [imagePreview, setImagePreview] = useState(null); 
  const lang = localStorage.getItem("language");
  const { t, i18n } = useTranslation();

  const handleClickOpen = () => {
    setOpenDialog(true);
  };
  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [i18n, lang]);

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const maxFileSize = 5 * 1024 * 1024; // Allow files up to 5MB
      if (file.size > maxFileSize) {
        alert("File is too large! Please select a file smaller than 5MB.");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          const MAX_WIDTH = 450; 
          const MAX_HEIGHT = 450; 
          
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height = Math.round(height * MAX_WIDTH / width);
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width = Math.round(width * MAX_HEIGHT / height);
              height = MAX_HEIGHT;
            }
          }
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.5); 

          setImagePreview(dataUrl); 
          setProfileImage(dataUrl); 
        };

        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <Avatar
        alt=""
        src={imagePreview || '/default-avatar.png'} 
        sx={{ width: 100, height: 100, cursor: 'pointer' }}
        onClick={handleClickOpen}
      />
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>{t("Select an Avatar")}</DialogTitle>
        <DialogContent>
          <input
            accept="image/*"
            type="file"
            onChange={handleImageChange}
            style={{ display: 'none' }}
            id="avatar-upload"
          />
          <label htmlFor="avatar-upload">
            <Button variant="contained" component="span" sx={{ backgroundColor: 'goldenrod', '&:hover': { backgroundColor: 'goldenrod' } }} fullWidth>
              {t("Choose Image")}
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
          <Button onClick={handleClose} sx={{ color: 'goldenrod', '&:hover': { backgroundColor: 'white' } }}>{t("Close")}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AvatarInput;
