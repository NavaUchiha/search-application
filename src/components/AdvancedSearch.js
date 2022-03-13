import {
  Divider,
  ListItemButton,
  Collapse,
  Checkbox,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Switch,
} from '@mui/material'
import { green, teal, lightGreen } from '@mui/material/colors'
import AssignmentTurnedInSharpIcon from '@mui/icons-material/AssignmentTurnedInSharp'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import AddSharpIcon from '@mui/icons-material/AddSharp'
import AutoStoriesSharpIcon from '@mui/icons-material/AutoStoriesSharp'
// import {
//   ,
//   ,
//   ,
//   ,
//   ,
// } from "@mui/icons-material";

import advancedFilterGlobalObject from './../data/AdvancedFilterGlobalObject'
import React, { useRef, useEffect } from 'react'

export default function AdvancedSearch({ callBackAdvancedSearch }) {
  const [generalSynonym, setGeneralSynonym] = React.useState(false)
  const [fuzziness, setFuzziness] = React.useState(false)
  const [discourseCheckBox, setDiscourseCheckBox] = React.useState(false)
  const [titleCheckBox, setTitleCheckBox] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const advanceSearchDataRef = useRef(null)

  useEffect(() => {
    advanceSearchDataRef.current = {
      isGeneralSynonymsAllowed: generalSynonym,
      isFuzzinessAllowed: fuzziness,
      isDiscourseChecked: discourseCheckBox,
      isTitleChecked: titleCheckBox,
    }
    advancedFilterGlobalObject['filter'] = advanceSearchDataRef.current
    console.log(advanceSearchDataRef.current)
    return () => {}
  }, [generalSynonym, fuzziness, discourseCheckBox, titleCheckBox])

  const generalSynonymChangeHandler = (event) => {
    console.log('inside genSynonym ' + event.target.checked)
    setGeneralSynonym(event.target.checked)
  }

  const fuzzinessChangeHandler = (event) => {
    console.log('inside specificSynonym ' + event.target.checked)
    setFuzziness(event.target.checked)
  }

  const onHandleClick = (event) => {
    setOpen(!open)
  }

  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'commons.white',
        boxShadow: 10,
      }}
      subheader={<ListSubheader>Advanced Settings</ListSubheader>}
      subheaderTypographyProps={{
        color: 'common.black',
      }}
    >
      <ListItem>
        <ListItemIcon>
          {generalSynonym ? (
            <AutoStoriesSharpIcon sx={{ color: teal[500] }} />
          ) : (
            <AutoStoriesSharpIcon />
          )}
        </ListItemIcon>
        <ListItemText
          primary="General Synonyms"
          primaryTypographyProps={{
            color: 'common.black',
          }}
        />
        <Switch
          edge="end"
          onChange={generalSynonymChangeHandler}
          checked={generalSynonym}
        />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          {fuzziness ? (
            <AssignmentTurnedInSharpIcon sx={{ color: teal[500] }} />
          ) : (
            <AssignmentTurnedInSharpIcon />
          )}
        </ListItemIcon>
        <ListItemText
          id="switch-list-label-bluetooth"
          primary="Fuzziness"
          primaryTypographyProps={{
            color: 'common.black',
          }}
        />
        <Switch
          edge="end"
          onChange={fuzzinessChangeHandler}
          checked={fuzziness}
        />
      </ListItem>

      {/* <Divider variant="middle" component="li" />

      <ListItemButton onClick={onHandleClick}>
        <ListItemIcon>
          <AddSharpIcon variant="outlined" />
        </ListItemIcon>
        <ListItemText primary="Specific Fields" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto">
        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <Checkbox
                edge="start"
                onChange={() => setDiscourseCheckBox(!discourseCheckBox)}
                checked={discourseCheckBox}
                tabIndex={-1}
              />
            </ListItemIcon>
            <ListItemText primary="Discourse" />
          </ListItemButton>
        </ListItem>
      </Collapse> */}
    </List>
  )
}
