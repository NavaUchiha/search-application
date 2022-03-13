import Masonry from '@mui/lab/Masonry'
import React from 'react'
import BookmarkCard from './BookmarkCard.js'

const { Container, Typography, Grid, Paper, Stack } = require('@mui/material')
const { default: DiscourseCard } = require('./DiscourseCard.js')

const DiscourseAsTiles = function ({ discourseArray, flag }) {
  return (
    <Container sx={{ mlr: 1 }}>
      <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 3 }} spacing={3}>
        {discourseArray.map((discourse) => (
          <DiscourseCard
            key={discourse.uuid}
            flag={flag}
            discourse={discourse}
          />
        ))}
      </Masonry>
    </Container>
  )
}

const DiscourseAsList = function ({ discourseArray }) {
  return (
    <React.Fragment>
      <Stack spacing={6} sx={{ mx: 30 }}>
        {discourseArray.map((discourse) => (
          <DiscourseCard key={discourse.uuid} discourse={discourse} />
        ))}
      </Stack>
    </React.Fragment>
  )
}

const BookmarkTiles = function ({ discourseArray }) {
  return (
    <React.Fragment>
      <Container sx={{ mlr: 1 }}>
        <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 3 }} spacing={3}>
          {discourseArray.map((discourse) => (
            <BookmarkCard key={discourse.uuid} discourse={discourse} />
          ))}
        </Masonry>
      </Container>
    </React.Fragment>
  )
}

export { DiscourseAsList, DiscourseAsTiles, BookmarkTiles }
