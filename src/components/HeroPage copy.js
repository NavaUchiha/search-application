import React, { useState, useEffect } from 'react'
import { useSpring, animated } from 'react-spring'
import { green, teal, lightGreen } from '@mui/material/colors'
import Image from '../data/Dattatreya.JPG'
import SignInSide from './SignInSide'
import LoginDialog from './LoginDialog'
import DoubleArrowRoundedIcon from '@mui/icons-material/DoubleArrowRounded'
import { useUserContext, useUserUpdateContext } from '../data/UserContext'
import HandleAlerts from './HandleAlerts'
import { useNavigate } from 'react-router'
const {
  addDiscourseToLocalStorageDiscourseArray,
  getUserNameFromLocalStorage,
} = require('../service/LocalStorage')
const {
  Paper,
  Box,
  Container,
  Stack,
  Typography,
  IconButton,
  Tooltip,
  styled,
  tooltipClasses,
  Fade,
} = require('@mui/material')
const Constants = require('./../data/Constants')
const styles = {
  width: '30%',
  backgroundImage: `url(${Image})`,
  //backgroundImage: `url(https://source.unsplash.com/random)`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  height: '100vh',
}

const HeroPage = () => {
  const [loginState, setLoginState] = useState(false)

  const props = useSpring({
    delay: 300,
    to: { opacity: 1 },
    from: { opacity: 0 },
  })

  let navigate = useNavigate()
  const userObject = useUserContext()

  console.log('userName : ', userObject.userName)
  console.log(
    'is userName undefined: ',
    getUserNameFromLocalStorage() !== undefined,
  )

  // useEffect(() => {
  //   getUserNameFromLocalStorage() !== undefined
  //     ? setLoginState(true)
  //     : setLoginState(false)
  //   return () => {}
  // }, [userObject])

  return (
    <React.Fragment>
      <Stack direction="row">
        <Container sx={styles}></Container>
        <Stack width="50%" sx={{ mx: 'auto' }} justifyItems="space-center">
          <Stack sx={{ my: '12rem' }} spacing={4}>
            <Typography variant="h1" align="center" sx={{ color: green[700] }}>
              Universal Spirituality
            </Typography>
            <Typography variant="h6" color="text">
              His Holiness <strong>Shri Datta Swami</strong> is a world-renowned
              Master of spiritual knowledge. Shri Swami is believed to be a
              complete incarnation of God Datta by His close devotees. By
              correlating scriptures of major religions and through logical
              analysis, <strong>Shri Swami explains </strong>—{' '}
              <i>
                <em>
                  “Every religion says that their God created this entire world.
                  Since there is only one world, there should be one God, who
                  must be impartial to all the children in the universe. The
                  same single Unimaginable God revealed Himself in different
                  human forms, in different places across the world and at
                  different times to preach the same spiritual knowledge in
                  different languages and cultures.…”{' '}
                </em>
              </i>
            </Typography>
          </Stack>

          <Box alignSelf="center">
            {userObject.userName === undefined ? (
              <LoginForm />
            ) : (
              <React.Fragment>
                <HandleAlerts
                  alertObject={{
                    message: Constants.LOGGED_IN + ' ' + userObject.userName,
                  }}
                />
                <IconButton
                  onClick={() => {
                    navigate('/search')
                  }}
                >
                  <DoubleArrowRoundedIcon
                    sx={{
                      fontSize: 70,
                      color: green[700],
                      transform: 'rotate(90deg)',
                      '&:hover': {
                        color: green[900],
                      },
                    }}
                  />
                </IconButton>
              </React.Fragment>
            )}
          </Box>
        </Stack>
      </Stack>
    </React.Fragment>
  )
}

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 300,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))

const LoginForm = () => {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <HtmlTooltip
        title={
          <React.Fragment>
            <Typography color="inherit">Wondering why login ?</Typography>
            Isn't it awesome to save articles ? <br />
            And it works without password <br />
            Isn't it Interesting ? Click login icon to find out...
          </React.Fragment>
        }
      >
        <Typography sx={{ mb: 1 }} color="primary" variant="h5">
          Login
        </Typography>
      </HtmlTooltip>

      <Box>
        <LoginDialog />
      </Box>
    </Stack>
  )
}
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Fade timeout={3000} ref={ref} {...props} />
})
export default HeroPage
