import React from 'react'

import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Stack,
  Paper,
  Container,
  ToggleButton,
  Popover,
  Box,
  Snackbar,
  Alert,
} from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
import SearchIcon from '@mui/icons-material/Search'
import TuneTwoTone from '@mui/icons-material/TuneTwoTone'
import { useState, Fragment, useRef, For } from 'react'
import AdvancedSearch from './AdvancedSearch'
import AdvancedSearchFilter from './AdvancedSearchFilter'
import advancedFilterGlobalObject from '../data/AdvancedFilterGlobalObject'
import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined'
const Constants = require('./../data/Constants')

const InputBar = function ({
  callBackAdvancedSearch,
  callBackAdvancedSearchWithSynonym,
}) {
  const [inputSearch, setInputSearch] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const [alertObject, setAlertObject] = useState({})
  const onInputChange = (event) => {
    setInputSearch(event.target.value)
  }
  const snackbarHandleClose = (event, reason) => {
    console.log(reason)
    if (reason === 'clickaway') {
      return
    }
    setShowAlert(false)
  }
  const searchButtonRef = useRef(null)

  const inputSubmitHandler = (event) => {
    event.preventDefault()
    if (!inputSearch) {
      console.log('pass input')
      return
    }
    callBackAdvancedSearch(inputSearch)
  }

  const synonymHandler = (event) => {
    event.preventDefault()
    setAlertObject({})
    setShowAlert(false)
    console.log('handling with syn')
    if (!inputSearch) {
      console.log('pass input')
      const alertObj = {}
      alertObj[Constants.MESSAGE] = Constants.INVALID_SEARCH_INPUT
      alertObj[Constants.SEVERITY] = Constants.WARNING
      console.log('alertObj from search layout : ', alertObj)
      setAlertObject(alertObj)
      setShowAlert(true)
      return
    }
    callBackAdvancedSearchWithSynonym(inputSearch)
  }

  return (
    <React.Fragment>
      <Snackbar
        open={showAlert}
        autoHideDuration={2000}
        onClose={snackbarHandleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={snackbarHandleClose}
          severity={alertObject.severity}
          sx={{ width: '100%' }}
        >
          {alertObject.message}
        </Alert>
      </Snackbar>
      <Stack
        direction="row"
        alignItems="stretch"
        justifyContent="center"
        spacing={1}
      >
        <AdvancedSearchFilter />
        <Box
          component="form"
          sx={{ display: 'flex', flexGrow: 1 }}
          onSubmit={synonymHandler}
        >
          <TextField
            sx={{ flex: 1 }}
            endAdornment={
              <Fragment>
                <InputAdornment position="end">
                  <IconButton edge="end">
                    <ClearIcon color="info" sx={{ fontSize: 30 }}></ClearIcon>
                  </IconButton>
                </InputAdornment>
              </Fragment>
            }
            label="Search"
            placeholder="Enter Keywords.."
            onChange={onInputChange}
            value={inputSearch}
          />
          <Button
            ref={searchButtonRef}
            sx={{ m: 'auto' }}
            type="submit"
            variant="text"
            name="advanced"
          >
            <SearchIcon fontSize="large" />
          </Button>

          {/* <Button sx={{ m: "auto" }} type="submit" onClick={synonymHandler}>
          <LocalFireDepartmentOutlinedIcon fontSize="large" />
        </Button> */}
        </Box>
      </Stack>
    </React.Fragment>
  )
}

export default InputBar

function isSearchInputValid(input) {
  /* 
    Usernames can only have: 
    - Lowercase Letters (a-z) 
    - Numbers (0-9)
    - Dots (.)
    - Underscores (_)
  */
  const res = /^[a-zA-Z0-9_\.]+$/.exec(input)
  const valid = !!res
  return valid
}
