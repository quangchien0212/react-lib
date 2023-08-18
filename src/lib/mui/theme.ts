import { ThemeOptions } from '@mui/material'
import type {} from '@mui/material/themeCssVarsAugmentation'

export const blue = {
  50: '#F0F7FF',
  100: '#C2E0FF',
  200: '#99CCF3',
  300: '#66B2FF',
  400: '#3399FF',
  main: '#006AFF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
  800: '#004C99',
  900: '#003A75'
}

const systemFont = [
  '-apple-system',
  'BlinkMacSystemFont',
  '"Segoe UI"',
  'Roboto',
  '"Helvetica Neue"',
  'Arial',
  'sans-serif',
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"'
]

const theme: ThemeOptions = {
  palette: {
    primary: {
      ...blue
    }
  },
  typography: {
    fontFamily: ['"Inter"', ...systemFont].join(','),
    button: {
      textTransform: 'initial',
      fontWeight: 400,
    }
  }
}

export default theme
