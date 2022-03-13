import * as React from 'react'
import Typography from '@mui/material/Typography'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'

function handleClick(event) {
  event.preventDefault()
  console.log(event.target.href)
  console.info('You clicked a breadcrumb.')
  window.open(event.target.href, '_self')
}

export default function BasicBreadcrumbs() {
  console.log('current window location : ', window.location.href)

  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Link underline="hover" color="inherit" href="/search">
          Search
        </Link>
        <Link underline="hover" color="inherit" href="/bookmark">
          Bookmarks
        </Link>
      </Breadcrumbs>
    </div>
  )
}
