const { Snackbar, Alert } = require('@mui/material')
const { useState } = require('react')

const HandleAlerts = (props) => {
  console.log(props)
  const { alertObject, flag } = props
  console.log('flag received : ', flag)
  const [open, setOpen] = useState(flag)
  console.log('initial state is : ', open)
  //setOpen(flag)

  const handleClose = (event, reason) => {
    console.log(reason)
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }
  return (
    <Snackbar
      open={flag}
      autoHideDuration={2000}
      onClose={handleClose}
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
  )
}

export default HandleAlerts
