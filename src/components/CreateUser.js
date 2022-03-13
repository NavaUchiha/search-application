import React, { useRef, useState } from 'react'
import { registerUserIdService } from './../service/ServiceWrapper'
import Snackbar from '@mui/material/Snackbar'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { deepOrange, deepPurple } from '@mui/material/colors'
import PersonIcon from '@mui/icons-material/Person'
import { bookmarkDiscourse, getUserObject } from './../service/ServiceWrapper'

const {
  Button,
  Container,
  Popover,
  TextField,
  Stack,
  FormControl,
  Alert,
  AlertTitle,
  Avatar,
  Card,
  Box,
} = require('@mui/material')

const CreateUser = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [alertState, setAlertState] = useState(false)
  const [alertOccupiedState, setAlertOccupiedState] = useState(false)
  const [selected, setSelected] = useState(false)
  const userNameTextFieldRef = useRef()
  const createUserIdHandler = (event) => {
    // to do validation
    event.preventDefault()
    const userName = userNameTextFieldRef.current.value
    console.log(userNameTextFieldRef.current.value)
    console.log('isUserNameValid ', isUserNameValid(userName))
    return
    if (true || userName == null || userName == '') {
      console.log(isUserNameValid(userName))
      setOpen(true)
      setAlertState(false)
    } else {
      registerUserIdService(userName).then((response) => {
        console.log(response)
        if (response === 'created') {
          setOpen(true)
          setAlertOccupiedState(false)
          setAlertState(true)
          const userId = JSON.parse(localStorage.getItem('userId'))
          getUserObject(userId).catch((error) => {
            console.log('something went wrong...')
          })
        } else if (response === 'occupied') {
          setOpen(true)
          setAlertOccupiedState(true)
        } else {
          console.log('Something went wrong')
        }
      })
    }
  }

  const populateUserName = function (event, value) {
    setSelected(!value)
    setAnchorEl(event.currentTarget)
  }
  const [open, setOpen] = React.useState(false)

  const handleClick = () => {
    setOpen(true)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  return (
    <Container sx={{ my: 20 }}>
      <Button variant="outlined" onClick={populateUserName}>
        Create User
      </Button>
      <Popover
        id="123"
        open={selected}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transition="true"
        keepMounted={true}
        direction="rtl"
      >
        <FormControl
          sx={{ flexDirection: 'row', width: '300px' }}
          onSubmit={createUserIdHandler}
        >
          <TextField
            sx={{ flexGrow: 1, width: '70%' }}
            inputRef={userNameTextFieldRef}
            variant="outlined"
            placeholder="Enter name"
          ></TextField>
          <Button type="submit" variant="text" onClick={createUserIdHandler}>
            Submit
          </Button>
        </FormControl>
      </Popover>

      {alertState ? (
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: '100%' }}
          >
            Username : {userNameTextFieldRef.current.value} registered!
          </Alert>
        </Snackbar>
      ) : (
        <Snackbar
          open={open}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity="warning"
            sx={{ width: '100%' }}
          >
            Please provide a valid name
          </Alert>
        </Snackbar>
      )}
      {alertOccupiedState ? (
        <Snackbar
          open={open}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity="warning"
            sx={{ width: '100%' }}
          >
            Username : {userNameTextFieldRef.current.value} is taken. Please try
            different name.
          </Alert>
        </Snackbar>
      ) : (
        <p></p>
      )}
    </Container>
  )
}

function isUserNameValid(username) {
  /* 
    Usernames can only have: 
    - Lowercase Letters (a-z) 
    - Numbers (0-9)
    - Dots (.)
    - Underscores (_)
  */
  const res = /^[a-z0-9_\.]+$/.exec(username)
  const valid = !!res
  return valid
}

export default CreateUser
