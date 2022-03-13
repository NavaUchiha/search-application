import React, { useRef, useState, useEffect } from 'react'
import {
  registerUserIdService,
  getBookmarkDiscourses,
} from '../service/ServiceWrapper'
import CreateUser from './CreateUser'
import Snackbar from '@mui/material/Snackbar'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { deepOrange, deepPurple, grey } from '@mui/material/colors'
import PersonIcon from '@mui/icons-material/Person'
import { DiscourseAsTiles } from './DiscourseList'
import { useUserContext, useUserUpdateContext } from '../data/UserContext'
import SignInSide from './SignInSide'
import LoginDialog from './LoginDialog'
const {
  addDiscourseToLocalStorageDiscourseArray,
  getUserIdFromLocalStorage,
  default: getBookmarkArrayFromLocalStorage,
  getUserNameFromLocalStorage,
} = require('../service/LocalStorage')
const Constants = require('../data/Constants')
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
  Typography,
} = require('@mui/material')
const { userObjectGlobal } = require('../data/AdvancedFilterGlobalObject')
const BookmarkPage = function () {
  //fetchBookmarksForUserId();

  const userObject = useUserContext()
  const [discourseArray, setDiscourseArray] = useState([])

  useEffect(() => {
    populateBookmarkDiscourses(setDiscourseArray)
    return () => {
      console.log('clean Up')
    }
  }, [])

  // 343741 F5F7FA
  return (
    <React.Fragment>
      <Stack>
        <Box
          sx={{
            display: 'flex',
            padding: 5,
            mx: 'auto',
            maxWidth: '30%',
            my: 20,
            boxShadow: 23,
            p: 5,
            justifyContent: 'center',
            alignItems: 'center',
            bgcolor: '#F5F7FA',
          }}
        >
          <Avatar
            sx={{ mx: 5, width: 56, height: 56, bgcolor: deepOrange[500] }}
          >
            <PersonIcon />
          </Avatar>
          <Stack sx={{}} spacing={1}>
            <Typography variant="h5">
              Hello {getUserNameFromLocalStorage()}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              You have saved {userObject[Constants.BOOKMARK_ARRAY].length}{' '}
              articles
            </Typography>
          </Stack>
        </Box>
      </Stack>

      <DiscourseAsTiles discourseArray={discourseArray} flag={true} />
    </React.Fragment>
  )
}

export default BookmarkPage

function populateBookmarkDiscourses(setDiscourseArray) {
  const bookmarkArrayFromLocalStorage = getBookmarkArrayFromLocalStorage()
  if (bookmarkArrayFromLocalStorage !== undefined) {
    getBookmarkDiscourses(bookmarkArrayFromLocalStorage)
      .then((bookmarkedDiscourses) => {
        console.log(bookmarkedDiscourses)
        setDiscourseArray(bookmarkedDiscourses)
      })
      .catch((error) => {
        console.log('Error from BookmarkPage : ', error)
      })
  }
}
