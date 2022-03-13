import React from 'react'

import Chip from '@mui/material/Chip'
import { Container } from '@mui/material'
import Masonry from '@mui/lab/Masonry'

const TagSelectionArea = () => {
  const tags = ['Pravutti', 'Nivrutti', 'Universe', 'Intelligent', 'Q&A']

  return (
    <React.Fragment>
      <Container sx={{ mlr: 1 }}>
        <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 3 }} spacing={3}>
          {tags.map((tag) => (
            <Chip label={tag} onClick={() => console.log('clicked')} />
          ))}
        </Masonry>
      </Container>
    </React.Fragment>
  )
}

export default TagSelectionArea
