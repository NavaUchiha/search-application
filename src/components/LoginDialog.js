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
import { styled } from '@mui/material/styles'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  Slide,
  Fade,
  IconButton,
  Typography,
  Snackbar,
  Alert,
  FormControl,
  Collapse,
  Stack,
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
  const [userId, setUserId] = React.useState('')
  const [loginId, setLoginId] = React.useState('')
  const [showAlert, setShowAlert] = React.useState(false)
  const [userNameErrorState, setUserNameErrorState] = React.useState(false)
  const [userIdErrorState, setUserIdErrorState] = React.useState(false)
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
      console.log('loginId.toLocaleLowerCase() : ', loginId.toLocaleLowerCase())

      try {
        const responseReturned = await getLoginId(loginId.toLocaleLowerCase())

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
    setUserIdErrorState(false)
    setUserNameErrorState(false)
    setAlertObject({})
    event.preventDefault()
    console.log(
      'isUserNameValid(userName.trim()) : ',
      isUserNameValid(userName.trim()),
    )

    if (userId == null || userId == '' || !isUserIdValid(userId.trim())) {
      console.log('invalid name sending alert')
      const alertObj = {}
      alertObj[Constants.MESSAGE] = `Enter valid userId`
      alertObj[Constants.SEVERITY] = Constants.INFO
      setAlertObject(alertObj)
      setShowAlert(true)
      setUserIdErrorState(true)
    } else if (
      userName == null ||
      userName == '' ||
      !isUserNameValid(userName.trim())
    ) {
      console.log('invalid name sending alert')
      const alertObj = {}
      alertObj[Constants.MESSAGE] = `Enter valid username`
      alertObj[Constants.SEVERITY] = Constants.INFO
      setAlertObject(alertObj)
      setShowAlert(true)
      setUserNameErrorState(true)
    } else {
      console.log('userId.toLocaleLowerCase() ', userId.toLocaleLowerCase())
      const response = await registerUserIdService(userId.toLocaleLowerCase())
      console.log(response)
      if (response === Constants.SUCCESS) {
        const alertObj = {}
        alertObj[
          Constants.MESSAGE
        ] = `User Id : ${userId} is created. Kindly use this id to login`
        alertObj[Constants.SEVERITY] = Constants.SUCCESS
        setAlertObject(alertObj)
        setShowAlert(true)
      } else if (response === Constants.ERROR_OCCUPIED) {
        const alertObj = {}
        alertObj[
          Constants.MESSAGE
        ] = `User Name : ${userId} is Occupied. Try different Id`
        alertObj[Constants.SEVERITY] = Constants.ERROR
        setAlertObject(alertObj)
        setShowAlert(true)
        setUserIdErrorState(true)
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

  const [expanded, setExpanded] = React.useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
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
            <React.Fragment>
              <Typography variant="body" color="text">
                Expand to know valid username and userId
              </Typography>
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Stack direction="row" justifyContent="space-evenly">
                  <Typography variant="body" color="text">
                    UserId can only have: <br />- Letters (a-Z) <br />- Numbers
                    (0-9) <br />- Dots (.)
                    <br />- Underscores (_)
                  </Typography>
                  <Typography variant="body" color="text">
                    Username can only have: <br />- Letters (a-Z)
                  </Typography>
                </Stack>
              </Collapse>
              <FormControl fullWidth>
                <TextField
                  margin="normal"
                  id="userId"
                  label="User Id"
                  variant="outlined"
                  required
                  error={userIdErrorState}
                  value={userId}
                  onChange={(event) => {
                    setUserId(event.target.value)
                  }}
                />
                <TextField
                  margin="normal"
                  id="userName"
                  label="Username"
                  variant="outlined"
                  value={userName}
                  error={userNameErrorState}
                  required
                  onChange={(event) => {
                    setUserName(event.target.value)
                  }}
                />
              </FormControl>
            </React.Fragment>
          ) : (
            <TextField
              margin="normal"
              id="loginId"
              label="Login id"
              fullWidth
              variant="outlined"
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

function isUserIdValid(userId) {
  /* 
    Usernames can only have: 
    - Lowercase Letters (a-z) 
    - Numbers (0-9)
    - Dots (.)
    - Underscores (_)
  */
  if (userId.length > 3 && userId.length < 11) {
    const res = /^[a-zA-Z0-9_\.]+$/.exec(userId)
    const valid = !!res
    return valid
  }
  return false
}

function isUserNameValid(userName) {
  /* 
    Usernames can only have: 
    - Letters (a-Z) 
  */
  if (userName.length > 2) {
    const res = /^[a-zA-Z ]+$/.exec(userName)
    const valid = !!res
    return valid
  }
  return false
}

const ExpandMore = styled((props) => {
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}))
