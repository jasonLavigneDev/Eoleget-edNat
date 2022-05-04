import { createTheme } from '@mui/material/styles';

const eoleTheme = createTheme({
  /**
   * Syntax to use breakpoints : https://mui.com/customization/breakpoints/#default-breakpoints
   */
  breakpoints: {
    values: {
      xs: 600, // down for mobile version / up for tablets
      sm: 768, // up for landscape tablet/tablet
      md: 1000, // up for small laptops/desktops
      lg: 1200, // up for laptops and desktops
      xl: 1600, // up for extra large desktops
    },
  },
  shape: {
    borderRadius: 8,
  },
  palette: {
    type: 'light',
    primary: {
      main: '#372f84', // main purple
      light: '#ECEEF8', // smoked white
      dark: '#212F74', // dark blue
      lightPurple: '#372F84',
      purple: '#1B1464', // dark purple
      orange: '#F4A711', // orange
    },
    secondary: {
      main: '#F4A711', // main orange
      orangeBis: '#e9a93e', // orange
      light: '#FFDBA5', // light orange
    },
    tertiary: {
      main: '#ECEEF8', // smoked white
    },
    background: {
      default: '#F9F9FD', // white
    },
  },
  typography: {
    fontFamily: 'WorkSansRegular',
    h1: {
      fontFamily: 'WorkSansBold',
    },
    h2: {
      fontFamily: 'WorkSansBold',
    },
    h3: {
      fontFamily: 'WorkSansBold',
    },
    h4: {
      fontFamily: 'WorkSansBold',
    },
    h5: {
      fontFamily: 'WorkSansBold',
    },
    h6: {
      fontFamily: 'WorkSansBold',
    },
  },
  overrides: {
    MuiTooltip: {
      tooltip: {
        fontSize: '1em',
      },
    },
  },
});

export default eoleTheme;
