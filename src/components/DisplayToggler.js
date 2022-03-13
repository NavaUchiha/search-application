import Typography from '@mui/material/Typography'
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
} from '@mui/material'
import { green, teal, lightGreen } from '@mui/material/colors'

import InputBar from './InputBar'
import { useState } from 'react'
import ViewListIcon from '@mui/icons-material/ViewListOutlined'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import FormatListBulletedSharpIcon from '@mui/icons-material/FormatListBulletedSharp'
import ViewModuleIcon from '@mui/icons-material/ViewModuleOutlined'
import GridViewIcon from '@mui/icons-material/GridView'
import GridViewSharpIcon from '@mui/icons-material/GridViewSharp'

export default function DisplayToggler({ callBackForOrientation }) {
  const [toggleValue, setToggleValue] = useState('list')
  const toggleDisplayHandler = (event, value) => {
    console.log(value)
    if (value) {
      setToggleValue(value)
      callBackForOrientation(value)
    }
  }
  return (
    <Container sx={{ flex: 1 }}>
      <ToggleButtonGroup
        exclusive={true}
        onChange={toggleDisplayHandler}
        value={toggleValue}
      >
        {toggleValue === 'list' ? (
          <ToggleButton value="list">
            <FormatListBulletedSharpIcon
              color="primary"
              sx={{ fontSize: 25 }}
            />
          </ToggleButton>
        ) : (
          <ToggleButton value="list">
            <FormatListBulletedIcon sx={{ fontSize: 25 }} />
          </ToggleButton>
        )}

        {toggleValue === 'module' ? (
          <ToggleButton value="module">
            <GridViewSharpIcon color="primary" sx={{ fontSize: 25 }} />
          </ToggleButton>
        ) : (
          <ToggleButton value="module">
            <GridViewIcon sx={{ fontSize: 25 }} />
          </ToggleButton>
        )}
      </ToggleButtonGroup>
    </Container>
  )
}
