import { createTheme } from '@mui/material/styles'

export const appTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0b0f1a',
      paper: '#111827',
    },
    primary: {
      main: '#6366f1',
      light: '#8b5cf6',
      dark: '#4338ca',
    },
    text: {
      primary: '#ffffff',
      secondary: '#9ca3af',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          border: '1px solid #1f2937',
          boxShadow: 'none',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          border: '1px solid #1f2937',
        },
      },
    },
  },
})
