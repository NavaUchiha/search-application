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
} from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
import SearchIcon from '@mui/icons-material/Search'
import TuneTwoTone from '@mui/icons-material/TuneTwoTone'
import React, { useState, Fragment } from 'react'
import AdvancedSearch from './AdvancedSearch'

function AdvancedSearchFilter({ callBackAdvancedSearch }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const [selected, setSelected] = useState(false)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setSelected(false)
    setAnchorEl(null)
  }

  const populateAdvancedSearchBar = function (event, value) {
    setSelected(!value)
    setAnchorEl(event.currentTarget)
  }
  return (
    <React.Fragment>
      <ToggleButton
        variant="text"
        sx={{ border: 0 }}
        value="check"
        selected={selected}
        onChange={(e) => populateAdvancedSearchBar(e, selected)}
      >
        <TuneTwoTone color="primary" fontSize="large" />
      </ToggleButton>
      <Popover
        id="123"
        open={selected}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transition="true"
        keepMounted={true}
        direction="rtl"
      >
        <AdvancedSearch callBackAdvancedSearch={callBackAdvancedSearch} />
      </Popover>
    </React.Fragment>
  )
}

export default AdvancedSearchFilter
