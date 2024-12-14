import React, { useEffect,useState } from "react";
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import envelopeIco from "../../icons/envelope.png";
import styles from "../userSetting/userSetting.module.css"
import Badge from '@mui/material/Badge';
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
    const lang = localStorage.getItem("language");
    const { t, i18n } = useTranslation();
  const open = Boolean(anchorEl);
    const navigate = useNavigate();

    useEffect(() => {
      i18n.changeLanguage(lang);
    }, [i18n, lang]);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
});
  const logout =()=>{
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');

  }

  const addAccaunt =()=>{
    navigate("/register");

  }

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
           
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar src={user?.avatar} sx={{ width: 30, height: 30 }} alt={user?.name}/>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar /> {t("Profile")}
        </MenuItem>

        <Divider />
        <MenuItem className={styles.MessageBox} onClick={handleClose}>
        <Badge badgeContent={2} color="primary"   sx={{
    '& .MuiBadge-badge': {
      fontSize: '0.7rem',
      height: '14px', 
      minWidth: '14px', 
      padding: '0',
    },
  }}>
                    <img src={envelopeIco} className={styles.envelopeIco} alt="Nottiifications" /> 
              </Badge>
       {t("Nottifications")}
        </MenuItem>
        <Divider />
        <MenuItem onClick={()=>{handleClose();addAccaunt()}}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          {t("Add another account")}
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          {t("Settings")}
        </MenuItem>
        <MenuItem onClick={() =>{handleClose(); logout()}}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          {t("Logout")}
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}