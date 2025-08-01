import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#05478a', // Deep Blue
    },
    secondary: {
      main: '#048cfc', // Accent Blue
    },
    background: {
      default: '#f4f6f8', // Use a light neutral for the main background
      paper: '#ffffff',   // Keep card/paper backgrounds white for now
    },
    text: {
      primary: '#333333',   // Carbon (Black)
      secondary: '#657e98', // Slate Grey
    },
    custom: {
        softBlue: '#5694de',
        slateGrey: '#657e98',
        lightSilver: '#b4bdc6',
    }
  },
});

export default theme;

