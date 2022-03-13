import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import dateFormat, { masks } from 'dateformat'
import { green, teal, lightGreen } from '@mui/material/colors'
import { styled } from '@mui/material/styles'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import AddIcon from '@mui/icons-material/Add'
import {
  CardHeader,
  IconButton,
  Typography,
  Button,
  Link,
  Snackbar,
  Alert,
  Dialog,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Collapse,
} from '@mui/material'
import * as React from 'react'
import TextField from '@mui/material/TextField'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined'
import {
  bookmarkDiscourse,
  getUserObject,
  unMarkDiscourse,
} from '../service/ServiceWrapper'
import { useState } from 'react'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import { useUserContext, useUserUpdateContext } from '../data/UserContext'
import {
  removeDiscourseFromTag,
  addDiscourseToTag,
} from './../service/ServiceWrapper'
import TagChip from './TagChip'
const {
  addDiscourseToLocalStorageDiscourseArray,
  getUserIdFromLocalStorage,
} = require('../service/LocalStorage')
const Constants = require('../data/Constants')
const { listOfTagsContainingDiscourse } = require('../service/Utils')

const { populateDiscourseObj } = require('../service/Utils')
const BookmarkCard = function ({ discourse, flag }) {
  const userObject = useUserContext()
  const updateUserObject = useUserUpdateContext()
  const [openBookmarkSnackbarState, setOpenBookmarkSnackbarState] = useState(
    false,
  )
  const [
    openUnBookmarkSnackbarState,
    setOpenUnBookmarkSnackbarState,
  ] = useState(false)

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
  console.log(
    'listOfTagsContainingDiscourse(discourse.discourse_id) : ',
    listOfTagsContainingDiscourse(discourse.discourse_id),
  )
  const [open, setOpen] = React.useState(false)
  const [tagName, setTagName] = React.useState('')
  const [tagArray, setTagArray] = useState(userObject.tagArray)
  const [
    tagsContainingDiscourseId,
    setTagArrayContainingDiscourseId,
  ] = useState(listOfTagsContainingDiscourse(discourse.discourse_id))

  console.log('tagsContainingDiscourseId : ', tagsContainingDiscourseId)
  const selectOnChangeHandler = (event) => {
    console.log('tag selected : ', event.target.value)
    setTagName(event.target.value)
  }
  const [expanded, setExpanded] = React.useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClick = () => {
    setOpenBookmarkSnackbarState(true)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenBookmarkSnackbarState(false)
    setOpenUnBookmarkSnackbarState(false)
    setOpen(false)
  }

  let discourseFormattedDate = dateFormat(discourse.recorddate, 'fullDate')

  const addTagHandler = () => {
    addDiscourseToTag(userObject.userId, tagName, discourse.discourse_id).then(
      (response) => {
        if (response.response === Constants.SUCCESS) {
          updateUserObject(response.result)
          handleClose()
        }
      },
    )
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

  React.useEffect(() => {
    setTagArray(userObject.tagArray)
    try {
      setTagArrayContainingDiscourseId(
        listOfTagsContainingDiscourse(discourse.discourse_id),
      )
    } catch (e) {
      console.log(e)
    }
  }, [userObject.tagArray])
  return (
    <Card elevation={6}>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add tag</DialogTitle>
        <DialogContent>
          <DialogContentText>Please select a tag</DialogContentText>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Tags</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={tagName}
              label="Tags"
              onChange={selectOnChangeHandler}
            >
              {tagArray.map((tag) => (
                <MenuItem value={tag}>{tag}</MenuItem>
              ))}
              {/* <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem> */}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={addTagHandler}>Add</Button>
        </DialogActions>
      </Dialog>
      <CardHeader
        action={
          <IconButton>
            <AddIcon
              //  onClick={unMarkDeleteClickDiscourseHandler}
              onClick={handleClickOpen}
              // sx={{ color: teal[500] }}
              color="primary"
            />
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

      <CardContent>
        <Typography
          variant="body1"
          gutterBottom
          dangerouslySetInnerHTML={{
            __html: removeHtmlTags(discourse.summary),
          }}
        ></Typography>
      </CardContent>

      <CardActions>
        {/* <TagChip
          discourseId={discourse.discourse_id}
          tagsContainingDiscourseId={tagsContainingDiscourseId}
        /> */}
        <Link href="#" onClick={populateDiscourseHTMLPage}>
          Read More
        </Link>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <TagChip
            discourseId={discourse.discourse_id}
            tagsContainingDiscourseId={tagsContainingDiscourseId}
          />
        </CardContent>
      </Collapse>
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
export default BookmarkCard
