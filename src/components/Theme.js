import { createTheme, ThemeProvider, styled } from '@mui/material/styles'

// A custom theme for this app
const Theme = createTheme({
  typography: {
    fontFamily: 'monaco', // specifying a new font
  },
})

export default Theme
