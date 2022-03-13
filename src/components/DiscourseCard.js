import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import dateFormat, { masks } from 'dateformat'
import { green, teal, lightGreen } from '@mui/material/colors'
import {
  CardHeader,
  IconButton,
  Typography,
  Button,
  Link,
  Snackbar,
  Alert,
} from '@mui/material'
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined'
import {
  bookmarkDiscourse,
  getUserObject,
  unMarkDiscourse,
} from './../service/ServiceWrapper'
import { useState } from 'react'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import { useUserContext, useUserUpdateContext } from '../data/UserContext'
const {
  addDiscourseToLocalStorageDiscourseArray,
  getUserIdFromLocalStorage,
} = require('../service/LocalStorage')
const Constants = require('./../data/Constants')

const { populateDiscourseObj } = require('../service/Utils')
const DiscourseCard = function ({ discourse, flag }) {
  const userObject = useUserContext()
  const updateUserObject = useUserUpdateContext()
  const [openBookmarkSnackbarState, setOpenBookmarkSnackbarState] = useState(
    false,
  )
  const [
    openUnBookmarkSnackbarState,
    setOpenUnBookmarkSnackbarState,
  ] = useState(false)

  const handleClick = () => {
    setOpenBookmarkSnackbarState(true)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenBookmarkSnackbarState(false)
    setOpenUnBookmarkSnackbarState(false)
  }

  let discourseFormattedDate = dateFormat(discourse.recorddate, 'fullDate')

  const bookMarkClickedDiscourseHandler = (event) => {
    setOpenBookmarkSnackbarState(false)
    setOpenUnBookmarkSnackbarState(false)
    event.preventDefault()
    //console.log(`bookmarkArray : `, bookmarkArray);
    const userId = getUserIdFromLocalStorage()
    // console.log(
    //   `logged user : ${userId} and discourseId : ${discourse.discourse_id}`
    // );
    bookmarkDiscourse(userId, discourse.discourse_id).then((response) => {
      if (response.response === Constants.SUCCESS) {
        const userObject = response.result
        updateUserObject(userObject)
        setOpenBookmarkSnackbarState(true)
      }
    })
  }
  const unMarkDeleteClickDiscourseHandler = (event) => {
    console.log('inside unMark')
    setOpenBookmarkSnackbarState(false)
    setOpenUnBookmarkSnackbarState(false)
    event.preventDefault()
    // console.log(`bookmarkArray : `, bookmarkArray);
    const userId = getUserIdFromLocalStorage()
    // console.log(
    //   `unMark logged user : ${userId} and discourseId : ${discourse.discourse_id} `
    // );
    unMarkDiscourse(userId, discourse.discourse_id).then((response) => {
      if (response.response === Constants.SUCCESS) {
        const userObject = response.result
        updateUserObject(userObject)
        setOpenUnBookmarkSnackbarState(true)
      }
    })
  }

  const populateDiscourseHTMLPage = function (event) {
    event.preventDefault()
    console.log('inside populate HTML Page')
    addDiscourseToLocalStorageDiscourseArray(populateDiscourseObj(discourse))
    //  window.open(`SingleDiscourse.html#${discourse.discourse_id}`, "_blank");
    // window.open(
    //   `UniversalDiscourseTemplate.html#${discourse.discourse_id}`,
    //   '_blank',
    // )
    //window.location.href = `UniversalDiscourseTemplate.html#${discourse.discourse_id}`

    window.open(
      `UniversalDiscourseTemplate.html#${discourse.discourse_id}`,
      '_blank',
    )
  }

  return (
    <Card elevation={6}>
      <CardHeader
        action={
          <IconButton>
            {userObject.bookmarkArray.includes(discourse.discourse_id) ? (
              <BookmarkIcon
                onClick={unMarkDeleteClickDiscourseHandler}
                // sx={{ color: teal[500] }}
                color="primary"
              />
            ) : (
              <BookmarkBorderOutlinedIcon
                onClick={bookMarkClickedDiscourseHandler}
                // sx={{ color: teal[700] }}
                color="primary"
              />
            )}
          </IconButton>
        }
        titleTypographyProps={{
          align: 'center',
          // color: 'primary',
          color: '#00796b',
          fontStyle: 'oblique',
        }}
        subheaderTypographyProps={{
          align: 'center',
          color: 'text.secondary',
        }}
        title={discourse.title}
        subheader={discourseFormattedDate}
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[200]
              : theme.palette.grey[700],
        }}
      />
      {discourse.highlights ? (
        <CardContent>
          <Typography
            variant="body1"
            gutterBottom
            dangerouslySetInnerHTML={{
              __html: removeHtmlTags(discourse.highlights.join()),
            }}
          ></Typography>
        </CardContent>
      ) : (
        <p></p>
      )}

      {flag != undefined && flag ? (
        <CardContent>
          <Typography
            variant="body1"
            gutterBottom
            dangerouslySetInnerHTML={{
              __html: removeHtmlTags(discourse.summary),
            }}
          ></Typography>
        </CardContent>
      ) : (
        <p></p>
      )}

      <CardActions>
        <Link href="#" onClick={populateDiscourseHTMLPage}>
          Read More
        </Link>
      </CardActions>
      <Snackbar
        open={openBookmarkSnackbarState}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Added to Saved Discourses
        </Alert>
      </Snackbar>

      <Snackbar
        open={openUnBookmarkSnackbarState}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
          Removed from Saved Discourses
        </Alert>
      </Snackbar>
    </Card>
  )
}

const removeHtmlTags = function (data) {
  const start = 'Java_Python_NodeJs_Start'
  const end = 'Java_Python_NodeJs_end'
  data.replace(/<strong><em><u>/g, start)
  data.replace(/<\/u><\/strong><\/em>/g, end)
  data.replace(/(<([^>]+)>)/gi, '')
  data.replace(start, '<strong><em><u>')
  data.replace(end, '</u></strong></em>')
  return data
}
export default DiscourseCard
