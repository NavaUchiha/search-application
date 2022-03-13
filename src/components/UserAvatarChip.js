import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import {
  getUserNameFromLocalStorage,
  removeUserObjectFromLocalStorage,
} from '../service/LocalStorage'
import { green, teal, lightGreen } from '@mui/material/colors'
import { Menu, MenuItem, ListItemIcon } from '@mui/material'
import Logout from '@mui/icons-material/Logout'
import { useUserContext, useUserUpdateContext } from '../data/UserContext'

export default function UserAvatarChip() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const userObject = useUserContext()
  const updateUserObject = useUserUpdateContext()
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleLogout = () => {
    console.log('logout')
    removeUserObjectFromLocalStorage()
    updateUserObject(undefined)
    window.open('/', '_self')
  }
  console.log('userObject.userName.charAt(0) ', userObject.userName.charAt(0))
  return (
    <React.Fragment>
      <Chip
        sx={{
          fontSize: 20,
          '& .MuiChip-label': {
            borderRadius: '1px',
            color: '#00796b',
          },
          '& .MuiAvatar-root': {
            color: '#004d40',
            bgcolor: '#4db6ac',
          },
        }}
        variant="outlined"
        avatar={
          <Avatar sx={{ fontSize: 15 }}>
            {userObject.userName.toUpperCase().charAt(0)}
          </Avatar>
        }
        label={
          userObject.userName.toUpperCase().charAt(0) +
          userObject.userName.substring(1)
        }
        onClick={handleClick}
      ></Chip>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem> */}
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" color="primary" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      {/* <Avatar sx={{ fontSize: 15 }}>C</Avatar> */}
    </React.Fragment>
  )
}
