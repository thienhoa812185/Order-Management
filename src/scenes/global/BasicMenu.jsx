import React from 'react'
import { Link } from "react-router-dom";
import Menu from '@mui/material/Menu';
const BasicMenu = ({ open, anchorEl, handleClose}) => {
  return (
    <div>
        <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <Link onClick={handleClose}>Profile</Link>
        <Link onClick={handleClose}>My account</Link>
        <Link onClick={handleClose}>Logout</Link>
      </Menu>
    </div>
  )
}

export default BasicMenu