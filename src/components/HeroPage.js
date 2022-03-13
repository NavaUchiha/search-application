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
import BasicBreadcrumbs from './BasicBreadcrumbs'
import UserAvatarChip from './UserAvatarChip'
import NavBarWithUserInfo from './NavBarWithUserInfo'
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

const imageStyles = {
  height: '100%',
  width: '40%',
  backgroundImage: `url(${Image})`,
  backgroundSize: 'cover',
  backgroundOrigin: 'content-box',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  pt: '2%',
}
const HeroPage = () => {
  const [loginState, setLoginState] = useState(false)

  let navigate = useNavigate()
  const userObject = useUserContext()
  console.log('user Object : ', userObject)

  return (
    <React.Fragment>
      <Box
        sx={{
          mx: '10%',
          my: '1%',
          height: '80vh',

          boxShadow: 15,
          boxSizing: 'border-box',
        }}
      >
        <Stack
          direction="row"
          sx={{
            height: '100%',
          }}
        >
          <Box alignSelf="center" sx={imageStyles}></Box>
          <Stack
            width="50%"
            sx={{ mx: 'auto' }}
            justifyItems="space-center"
            spacing={4}
          >
            {userObject.userId !== undefined ? (
              <Box sx={{ mt: 5 }}>
                <NavBarWithUserInfo />
              </Box>
            ) : (
              <p></p>
            )}
            <Stack sx={{}} spacing={4}>
              <Typography
                variant="h2"
                align="center"
                sx={{ color: green[700] }}
              >
                Universal Spirituality
              </Typography>
              <Typography variant="h6" color="text">
                His Holiness <strong>Shri Datta Swami</strong> is a
                world-renowned Master of spiritual knowledge. Shri Swami is
                believed to be a complete incarnation of God Datta by His close
                devotees. By correlating scriptures of major religions and
                through logical analysis, <strong>Shri Swami explains </strong>—{' '}
                <i>
                  <em>
                    “Every religion says that their God created this entire
                    world. Since there is only one world, there should be one
                    God, who must be impartial to all the children in the
                    universe. The same single Unimaginable God revealed Himself
                    in different human forms, in different places across the
                    world and at different times to preach the same spiritual
                    knowledge in different languages and cultures.…”{' '}
                  </em>
                </i>
              </Typography>
            </Stack>

            <Box alignSelf="center">
              {userObject.userId === undefined ? (
                <LoginForm />
              ) : (
                // <React.Fragment>
                //   {/* <HandleAlerts
                //     alertObject={{
                //       message: Constants.LOGGED_IN + ' ' + userObject.userName,
                //     }}
                //     flag={true}
                //   /> */}
                //   <BasicBreadcrumbs />

                //   <IconButton
                //     onClick={() => {
                //       navigate('/search')
                //     }}
                //   >
                //     <DoubleArrowRoundedIcon
                //       sx={{
                //         fontSize: 70,
                //         color: green[700],
                //         transform: 'rotate(90deg)',
                //         '&:hover': {
                //           color: green[900],
                //         },
                //       }}
                //     />
                //   </IconButton>
                // </React.Fragment>
                <p></p>
              )}
            </Box>
          </Stack>
        </Stack>
      </Box>
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

export default HeroPage
