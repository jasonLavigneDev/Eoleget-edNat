import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
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
  palette: {
    type: 'dark',
    primary: {
      main: '#011CAA',
      light: '#ECEEF8',
      dark: '#212F74',
    },
    secondary: {
      main: '#EFAC61',
      light: '#FFDBA5',
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

export default darkTheme;
