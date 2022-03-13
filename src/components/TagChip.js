import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import { removeDiscourseFromTag } from '../service/ServiceWrapper'
import { useUserContext, useUserUpdateContext } from '../data/UserContext'
const Constants = require('../data/Constants')

export default function TagChip(props) {
  console.log('tagsContainingDiscourseId : ', props)
  const { tagsContainingDiscourseId, discourseId } = props
  console.log('tagsContainingDiscourseId : ', tagsContainingDiscourseId)
  const userObject = useUserContext()
  const updateUserObject = useUserUpdateContext()
  const removeTagHandler = (tagName) => {
    removeDiscourseFromTag(userObject.userId, tagName, discourseId).then(
      (response) => {
        if (response.response === Constants.SUCCESS) {
          updateUserObject(response.result)
        }
      },
    )
  }

  return (
    <Stack direction="row" spacing={1}>
      {tagsContainingDiscourseId.map((tag) => (
        <React.Fragment>
          <Chip
            avatar={<Avatar>{tag.toUpperCase().charAt(0)}</Avatar>}
            label={tag}
            color="primary"
            variant="outlined"
            onDelete={() => removeTagHandler(tag)}
          />
        </React.Fragment>
      ))}
    </Stack>
  )
}
