import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0052cc', // Vibrant Blue
      contrastText: '#fff',
    },
    secondary: {
      main: '#00c6ae', // Teal Accent
      contrastText: '#fff',
    },
    background: {
      default: '#f5f8fa', // Soft light
      paper: '#ffffff',
    },
    error: {
      main: '#ff4d4f',
    },
    warning: {
      main: '#ffb300',
    },
    info: {
      main: '#3f51b5',
    },
    success: {
      main: '#00c853',
    },
    custom: {
      softBlue: '#e3f0ff',
      slateGrey: '#657e98',
      lightSilver: '#e0e6ed',
      gold: '#ffd700',
      coral: '#ff6f61',
    },
    text: {
      primary: '#1a2233',
      secondary: '#657e98',
      disabled: '#b4bdc6',
    },
  },
  typography: {
    fontFamily: 'Poppins, Roboto, Arial, sans-serif',
    h1: { fontWeight: 700, letterSpacing: '-1px' },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 500 },
    h6: { fontWeight: 500 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: {
    borderRadius: 18,
  },
  shadows: [
    'none',
    '0px 2px 8px 0px rgba(0,82,204,0.08)',
    '0px 4px 16px 0px rgba(0,198,174,0.10)',
    ...Array(23).fill('0px 2px 8px 0px rgba(26,34,51,0.06)')
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          fontWeight: 600,
          boxShadow: '0px 2px 8px 0px rgba(0,82,204,0.08)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 18,
          boxShadow: '0px 4px 24px 0px rgba(0,82,204,0.10)',
        },
      },
    },
  },
});

export default theme;

