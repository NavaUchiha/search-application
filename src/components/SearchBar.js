import Typography from '@mui/material/Typography'
import React from 'react'

import {
  Container,
  Paper,
  Box,
  FormGroup,
  FormControlLabel,
  Switch,
  Fab,
  ButtonGroup,
  Button,
  IconButton,
  Popover,
  ToggleButtonGroup,
  ToggleButton,
  AppBar,
} from '@mui/material'
import { green, teal, lightGreen } from '@mui/material/colors'
import '../css/SearchBar.css'

import InputBar from './InputBar'
import { useState } from 'react'
import ViewListIcon from '@mui/icons-material/ViewListOutlined'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import FormatListBulletedSharpIcon from '@mui/icons-material/FormatListBulletedSharp'
import ViewModuleIcon from '@mui/icons-material/ViewModuleOutlined'
import GridViewIcon from '@mui/icons-material/GridView'
import GridViewSharpIcon from '@mui/icons-material/GridViewSharp'
const SearchBar = function ({
  callBackForOrientation,
  callBackForDocumentsFetch,
  callBackForDocumentsFetchWithSynonyms,
}) {
  const [toggleValue, setToggleValue] = useState('list')
  const toggleDisplayHandler = (event, value) => {
    console.log(value)
    if (value) {
      setToggleValue(value)
      callBackForOrientation(value)
    }
  }
  const callBackAdvancedSearch = function (inputSearch) {
    callBackForDocumentsFetch(inputSearch)
  }

  const callBackAdvancedSearchWithSynonym = function (inputSearch) {
    callBackForDocumentsFetchWithSynonyms(inputSearch)
  }
  return (
    <Box sx={{ mx: 'auto', width: '60%', backgroundColor: 'white' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Container
          sx={{
            alignSelf: 'center',
            padding: 5,

            minHeight: 150,

            boxShadow: 23,
          }}
        >
          <InputBar
            callBackAdvancedSearch={callBackAdvancedSearch}
            callBackAdvancedSearchWithSynonym={
              callBackAdvancedSearchWithSynonym
            }
          />
        </Container>
      </Box>
    </Box>
  )
}

export default SearchBar
