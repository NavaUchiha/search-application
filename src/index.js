import React from 'react'
import ReactDOM from 'react-dom'
import './css/index.css'
import App from './App'
import HeroPage from './components/HeroPage'
import { createTheme, ThemeProvider, styled } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import BookmarkPage from './components/BookmarkPage'
import Theme from './components/Theme'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { UserContextProvider } from './data/UserContext'

ReactDOM.render(
  <React.Fragment>
    <ThemeProvider theme={Theme}></ThemeProvider>
    <CssBaseline />
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HeroPage />}></Route>
          <Route path="/bookmark" element={<BookmarkPage />}></Route>
          <Route path="/search" element={<App />}></Route>
          <Route
            exact
            path="/terminos"
            render={() => {
              window.location.href = 'terminos.html'
            }}
          />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
    <ThemeProvider />
  </React.Fragment>,

  document.getElementById('root'),
)
