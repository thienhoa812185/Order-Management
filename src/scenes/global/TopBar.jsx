import { Box, IconButton, useTheme } from "@mui/material";
import { useContext, useState, useEffect } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import Badge from '@mui/material/Badge';
import BasicMenu from "./BasicMenu";
import manageNotificationsService from "../../service/manageNotificationsService";
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import PopupNotification from "./PopupNotification";
const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const notificationAmount = localStorage.getItem('notificationAmount') ? localStorage.getItem('notificationAmount') : 1
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget); 
    setOpen(true)
  };
  const handleClose = () => {
    setOpen(false)
  };
   

  const [openAlert, setOpenAlert] = useState(false);
  const [notificationData, setNotificationData] = useState(null)
  const handleCloseAlert = () => {
    setOpenAlert(false)
  };

  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/ws'); 
    const stompClient = Stomp.over(socket);
    stompClient.connect({}, (frame) => {
      console.log('Connected: ' + frame);
      stompClient.subscribe('/topic/notify', (response) => {
        const data = JSON.parse(response.body);
        setNotificationData(data)
        setOpenAlert(true)
      });
    });
}, []);


  return (
    
    <Box display="flex" justifyContent="space-between" p={2}>
      <Snackbar  
        open={openAlert} 
        onClose={handleCloseAlert} 
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{ width: '50%' }}>
        <PopupNotification
          notificationData={notificationData}
          onCloseSnackbar={handleCloseAlert}
        />
      </Snackbar>

      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton onClick={handleOpen} anchorEl={anchorEl}>
          <Badge badgeContent={notificationAmount} color="success">
            <NotificationsOutlinedIcon />
          </Badge>
        </IconButton>
        <BasicMenu open={open} anchorEl={anchorEl} handleClose={handleClose}/>

        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;