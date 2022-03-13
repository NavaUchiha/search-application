import SearchLayout from './SearchLayout'
import { deepOrange, deepPurple, grey } from '@mui/material/colors'
import { Box } from '@mui/material'
import { UserContextProvider } from '../data/UserContext'
import BookmarkPage from './BookmarkPage'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
  IndexRoute,
  Link,
} from 'react-router-dom'
import { bookmarkDiscourse, getUserObject } from './../service/ServiceWrapper'
import { useEffect } from 'react'
import HeroPage from './HeroPage'
const {
  getBookmarkArrayFromLocalStorage,
  getUserIdFromLocalStorage,
} = require('../service/LocalStorage')

const OverallLayout = (params) => {
  useEffect(() => {
    //populateBookmarkArray();
    return () => {
      console.log('clean Up')
    }
  }, [])

  return <SearchLayout />
}

// function populateBookmarkArray() {
//   const userId = getUserIdFromLocalStorage()
//   getUserObject(userId)
//     .then((response) => {
//       localStorage.setItem(
//         "bookmarkArray",
//         JSON.stringify(response.bookmarkArray)
//       );
//     })
//     .catch((error) => {
//       console.log("something went wrong...");
//     });
//}
export default OverallLayout
