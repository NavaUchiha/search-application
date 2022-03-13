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

const NavBarWithUserInfo = (params) => {
  return (
    <Stack alignItems="center" sx={{}} direction="row">
      <Box sx={{ flexGrow: 1 }}>
        <BasicBreadcrumbs />
      </Box>
      <Box sx={{}}>
        <UserAvatarChip />
      </Box>
    </Stack>
  )
}

export default NavBarWithUserInfo
