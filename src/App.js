import './css/App.css'
import SearchLayout from './components/SearchLayout'
import OverallLayout from './components/OverallLayout'
import { TestingSplice } from './components/TestingSplice'
import { deepOrange, deepPurple, grey } from '@mui/material/colors'
import { Box } from '@mui/material'
import { UserContextProvider } from './data/UserContext'
import HeroPage from './components/HeroPage'
import {
  BrowserRouter,
  Route,
  Routes,
  Switch,
  IndexRoute,
  Link,
} from 'react-router-dom'

function App() {
  return (
    // // <UserContextProvider>
    //   {/* <HeroPage /> */}
    //   {/* </UserContextProvider> */}
    <OverallLayout />
  )
}

export default App
