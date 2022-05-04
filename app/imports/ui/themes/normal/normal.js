import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
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
      main: '#011CAA',
      light: '#ECEEF8',
      dark: '#212F74',
    },
    secondary: {
      main: '#EFAC61',
      light: '#FFDBA5',
    },
    tertiary: {
      main: '#fff',
    },
    text: {
      primary: '#040D3E',
    },
    background: {
      default: '#F9F9FD',
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

export default lightTheme;
