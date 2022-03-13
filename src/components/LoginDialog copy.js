import { registerUserIdService, getLoginId } from './../service/ServiceWrapper'
import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import HandleAlerts from './HandleAlerts'
import {
  Slide,
  Fade,
  IconButton,
  Typography,
  Snackbar,
  Alert,
} from '@mui/material'
import LoginIcon from '@mui/icons-material/Login'
import { green, teal, lightGreen } from '@mui/material/colors'
import { useUserContext, useUserUpdateContext } from '../data/UserContext'

const Constants = require('./../data/Constants')

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Fade timeout={3000} ref={ref} {...props} />
})

export default function LoginDialog() {
  const [open, setOpen] = React.useState(false)
  const [createUserFlag, setCreateUserFlag] = React.useState(false)
  const [userName, setUserName] = React.useState('')
  const [loginId, setLoginId] = React.useState('')
  const [showAlert, setShowAlert] = React.useState(false)
  const [alertObject, setAlertObject] = React.useState({})

  const updateUserObject = useUserUpdateContext()

  const loginHandler = async (event) => {
    setShowAlert(false)
    event.preventDefault()
    console.log(loginId)
    if (loginId == null || loginId == '') {
      const alertObj = {}
      alertObj[Constants.MESSAGE] = `Enter valid name`
      alertObj[Constants.SEVERITY] = Constants.INFO
      setAlertObject(alertObj)
      setShowAlert(true)
    } else {
      try {
        const responseReturned = await getLoginId(loginId)

        if (responseReturned.response === Constants.SUCCESS) {
          const alertObj = {}
          alertObj[Constants.MESSAGE] = `Successfully logged in`
          alertObj[Constants.SEVERITY] = Constants.SUCCESS
          setAlertObject(alertObj)
          loginHandleClose()
          updateUserObject(responseReturned.result)
        } else if (
          responseReturned.response === Constants.ERROR &&
          responseReturned.message === Constants.ERROR_USER_DOES_NOT_EXISTS
        ) {
          const alertObj = {}
          alertObj[
            Constants.MESSAGE
          ] = `Login id : "${loginId}" doesn't exist. Please check again`
          alertObj[Constants.SEVERITY] = Constants.ERROR
          setAlertObject(alertObj)
          setShowAlert(true)
        } else {
          console.log(responseReturned)
          const alertObj = {}
          alertObj[Constants.MESSAGE] = Constants.SOMETHING_WENT_WRONG
          alertObj[Constants.SEVERITY] = Constants.ERROR
          setAlertObject(alertObj)
          setShowAlert(true)
          console.log('Something went wrong')
        }
      } catch (error) {
        const alertObj = {}
        alertObj[Constants.MESSAGE] =
          Constants.SOMETHING_WENT_WRONG + ' ' + error.message
        alertObj[Constants.SEVERITY] = Constants.ERROR
        setAlertObject(alertObj)
        setShowAlert(true)
        console.log('Something went wrong')
      }
    }
  }
  const createUserIdHandler = async (event) => {
    // to do validation
    setShowAlert(false)
    setAlertObject({})
    event.preventDefault()
    console.log(userName)
    console.log('isUserNameValid ', isUserNameValid(userName.trim()))

    if (
      userName == null ||
      userName == '' ||
      !isUserNameValid(userName.trim())
    ) {
      console.log('invalid name sending alert')
      const alertObj = {}
      alertObj[Constants.MESSAGE] = `Enter valid name`
      alertObj[Constants.SEVERITY] = Constants.INFO
      setAlertObject(alertObj)
      setShowAlert(true)
    } else {
      const response = await registerUserIdService(userName)
      console.log(response)
      if (response === Constants.SUCCESS) {
        const alertObj = {}
        alertObj[
          Constants.MESSAGE
        ] = `User Name : ${userName} is created. Kindly use this id to login`
        alertObj[Constants.SEVERITY] = Constants.SUCCESS
        setAlertObject(alertObj)
        setShowAlert(true)
      } else if (response === Constants.ERROR_OCCUPIED) {
        const alertObj = {}
        alertObj[
          Constants.MESSAGE
        ] = `User Name : ${userName} is Occupied. Try different Id`
        alertObj[Constants.SEVERITY] = Constants.ERROR
        setAlertObject(alertObj)
        setShowAlert(true)
      } else {
        const alertObj = {}
        alertObj[Constants.MESSAGE] = Constants.SOMETHING_WENT_WRONG
        alertObj[Constants.SEVERITY] = Constants.ERROR
        setAlertObject(alertObj)
        setShowAlert(true)
        console.log('Something went wrong')
      }
    }
  }
  const handleClickOpen = () => {
    setOpen(true)
  }

  const snackbarHandleClose = (event, reason) => {
    console.log(reason)
    if (reason === 'clickaway') {
      return
    }
    setShowAlert(false)
  }
  const handleClose = () => {
    setCreateUserFlag(false)
    setOpen(false)
    setLoginId('')
    setUserName('')
    setAlertObject({})
    setShowAlert(false)
  }

  const loginHandleClose = () => {
    setCreateUserFlag(false)
    setOpen(false)
    setLoginId('')
    setUserName('')
    setAlertObject({})
    setShowAlert(false)
  }

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <LoginIcon
          sx={{
            fontSize: 60,
            color: green[700],
            '&:hover': {
              color: green[900],
            },
          }}
        />
      </IconButton>

      {/* {showAlert ? (
        <React.Fragment>
          <HandleAlerts alertObject={alertObject} flag={true} />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <HandleAlerts alertObject={alertObject} flag={false} />
        </React.Fragment>
      )} */}

      <Snackbar
        open={showAlert}
        autoHideDuration={2000}
        onClose={snackbarHandleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleClose}
          severity={alertObject.severity}
          sx={{ width: '100%' }}
        >
          {alertObject.message}
        </Alert>
      </Snackbar>
      <Dialog
        open={open}
        onClose={loginHandleClose}
        TransitionComponent={Transition}
      >
        <DialogTitle sx={{ alignContent: 'center' }}>Login</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To login to this website, please enter your name or phone number
            here.
          </DialogContentText>

          {createUserFlag ? (
            <TextField
              margin="normal"
              id="userName"
              label="User name"
              fullWidth
              variant="standard"
              value={userName}
              onChange={(event) => {
                console.log(event.target.value)
                setUserName(event.target.value)
              }}
            />
          ) : (
            <TextField
              margin="normal"
              id="loginId"
              label="Login id"
              fullWidth
              variant="standard"
              value={loginId}
              onChange={(event) => {
                console.log(event.target.value)
                setLoginId(event.target.value)
              }}
            />
          )}
        </DialogContent>
        <DialogActions>
          {createUserFlag ? (
            <React.Fragment>
              <Button
                onClick={() => {
                  setCreateUserFlag(false)
                }}
              >
                back
              </Button>
              <Button variant="contained" onClick={createUserIdHandler}>
                create id
              </Button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Button onClick={() => setCreateUserFlag(true)}>
                Create user ?
              </Button>
              <Button variant="contained" onClick={loginHandler}>
                Login
              </Button>
            </React.Fragment>
          )}
        </DialogActions>
      </Dialog>
    </div>
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
