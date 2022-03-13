import React, { useRef, useState, useEffect } from 'react'
import {
  registerUserIdService,
  getBookmarkDiscourses,
  addTag,
  removeTag,
} from './../service/ServiceWrapper'
import CreateUser from './CreateUser'
import Snackbar from '@mui/material/Snackbar'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { deepOrange, deepPurple, grey } from '@mui/material/colors'
import PersonIcon from '@mui/icons-material/Person'
import { DiscourseAsTiles, BookmarkTiles } from './DiscourseList'
import { useUserContext, useUserUpdateContext } from '../data/UserContext'
import SignInSide from './SignInSide'
import LoginDialog from './LoginDialog'
import Image from '../data/Dattatreya.JPG'
import LordVishnuWithoutBackground from '../data/LordVishnuWithoutBackground.png'
import UserAvatarChip from './UserAvatarChip'
import { green, teal, lightGreen } from '@mui/material/colors'
import NavBarWithUserInfo from './NavBarWithUserInfo'
import BookmarkCard from './BookmarkCard'
import TagSelectionArea from './Tags/TagSelectionArea'
const { listOfTagsContainingDiscourse } = require('../service/Utils')

const {
  addDiscourseToLocalStorageDiscourseArray,
  getUserIdFromLocalStorage,
  default: getBookmarkArrayFromLocalStorage,
  getUserNameFromLocalStorage,
} = require('../service/LocalStorage')
const Constants = require('./../data/Constants')
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
  Select,
  MenuItem,
  InputLabel,
} = require('@mui/material')
const styles = {
  width: '40%',
  backgroundImage: `url(${Image})`,
  //backgroundImage: `url(https://source.unsplash.com/random)`,
  backgroundSize: 'cover',
  backgroundOrigin: 'content-box',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  boxSizing: 'border-box',
}
const lordVishnuStyles = {
  width: '30%',
  height: '90%',
  backgroundImage: `url(${LordVishnuWithoutBackground})`,
  //backgroundImage: `url(https://source.unsplash.com/random)`,
  backgroundSize: 'cover',
  backgroundOrigin: 'content-box',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  boxSizing: 'border-box',
}
const BookmarkPage = function () {
  //fetchBookmarksForUserId();

  const userObject = useUserContext()
  const updateUserObject = useUserUpdateContext()
  const [discourseArray, setDiscourseArray] = useState([])
  const [tagArray, setTagArray] = useState(userObject.tagArray)
  const [tagInput, setTagInput] = useState('')

  const createTagHandler = () => {
    console.log('button clicked :', tagInput)
    addTag(userObject.userId, tagInput).then((response) => {
      console.log(response)
      updateUserObject(response.result)
    })
  }
  const removeTagHandler = () => {
    console.log('button clicked :', tagInput)
    removeTag(userObject.userId, tagInput).then((response) => {
      console.log(response)
      updateUserObject(response.result)
    })
  }

  const tagInputOnChangeHandler = (event) => {
    event.preventDefault()
    setTagInput(event.target.value)
  }
  const [age, setAge] = React.useState('')

  const selectOnChangeHandler = (event) => {
    setAge(event.target.value)

    try {
      listOfTagsContainingDiscourse()
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    populateBookmarkDiscourses(setDiscourseArray)
    //listOfTagsContainingDiscourse()
    return () => {
      console.log('clean Up')
    }
  }, [])

  useEffect(() => {
    setTagArray(userObject.tagArray)
  }, [userObject.tagArray])

  // 343741 F5F7FA
  return (
    <React.Fragment>
      <Box
        sx={{
          mx: '15%',
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
          justifyContent="center"
          spacing={5}
        >
          <Box sx={styles}></Box>

          <Stack sx={{ mt: 5 }} spacing={10}>
            <Box sx={{ mt: 3 }}>
              <NavBarWithUserInfo />
            </Box>
            <Stack direction="row" sx={{}}>
              <Box sx={{ flexGrow: 1 }}>
                <Stack spacing={1} alignItems="flex-start">
                  <Typography variant="h2" sx={{ ml: 0, color: green[700] }}>
                    Universal Spirituality
                  </Typography>
                  <Typography sx={{ pl: 0.5, color: teal[500] }} variant="h4">
                    Bookmark Page
                  </Typography>
                </Stack>
              </Box>
            </Stack>
            <Stack
              sx={{ pl: 1 }}
              alignSelf="flex-start"
              alignItems="center"
              spacing={1}
            >
              <Stack
                sx={{}}
                alignSelf="flex-start"
                justifyContent="flex-start"
                direction="row"
                spacing={1}
              >
                <Typography variant="h6" color="text.secondary">
                  Hello
                </Typography>
                <Typography variant="h6" color="text">
                  {userObject.userName.toUpperCase().charAt(0) +
                    userObject.userName.substring(1)}
                </Typography>
              </Stack>
              <Typography variant="h6" color="text.secondary">
                You have saved {userObject[Constants.BOOKMARK_ARRAY].length}{' '}
                articles
              </Typography>
            </Stack>

            <TagSelectionArea />
            <Stack direction="row">
              <TextField
                onChange={tagInputOnChangeHandler}
                value={tagInput}
                label="Enter Tag..."
                variant="outlined"
              />
              <Button onClick={createTagHandler} variant="text">
                Create Tag
              </Button>
              {/* <Button onClick={removeTagHandler} variant="text">
                Remove Tag
              </Button> */}
              {/* <Button onClick={createTagHandler} variant="text">
                Submit
              </Button> */}
              {/* <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Age</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Tags"
                    onChange={selectOnChangeHandler}
                  >
                    {tagArray.map((tag) => (
                      <MenuItem value={tag}>{tag}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box> */}
            </Stack>
          </Stack>
        </Stack>
      </Box>
      <BookmarkTiles discourseArray={discourseArray} />
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
  } else {
    console.log('no discourses')
  }
}
