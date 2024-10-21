import { ThemeOptions } from '@mui/material/styles';
import NextLink from 'next/link';
import { forwardRef } from 'react';

const LinkBehaviour = forwardRef(function LinkBehaviour(props: any, ref: any) {
  return <NextLink ref={ref} {...props} />;
});

const lightBlue = '#219EBC';


export const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#023047',
      light: '#219EBC',
      dark: '#023047',
    },
    secondary: {
      main: '#69BDA4',
    },
    error: {
      main: '#B00020',
    },
    info: {
      main: '#219EBC',
    },
  },
  typography: {
    fontFamily: [
      'Montserrat',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h1: {
      fontSize: 64,
      fontWeight: 900,
    },
    h2: {
      fontWeight: 700,
      fontSize: 56,
    },
    h3: {
      fontWeight: 500,
      fontSize: 48,
    },
    h4: {
      fontSize: 36,
      fontWeight: 500,
    },
    h5: {
      fontSize: 24,
      fontWeight: 500,
    },
    h6: {
      fontSize: 20,
      fontWeight: 500,
    },
    subtitle1: {
      fontWeight: 400,
      fontSize: 18,
    },
    subtitle2: {
      fontSize: 16,
      fontWeight: 400,
    },
    body1: {
      fontSize: 16,
      fontWeight: 400,
    },
    body2: {
      fontSize: 14,
      fontWeight: 400,
    },
    caption: {
      fontSize: 10,
    },
    overline: {
      fontSize: 14,
      fontWeight: 600,
    },
    button: {
      fontWeight: 600,
      fontSize: 18,
    },
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehaviour
      }
    },
    MuiStepIcon: {
      styleOverrides: {
        root: {
          "&.Mui-completed": {
            "color": lightBlue
          },
          "&.Mui-active": {
            "color": lightBlue
          }
        }
      }
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          '&.Mui-checked': {
            color: lightBlue,
          },
        }
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 100,
          paddingTop: 10,
          paddingLeft: 24,
          paddingBottom: 10,
          paddingRight: 24,
          textTransform: 'none',
          fontSize: '14px',
          '&.MuiButton-containedPrimary': {
            background: lightBlue,
          },
          '&.MuiButton-containedPrimary:hover': {
            opacity: 0.85,
          }
        },
        
      }
    },
  }
};


export default lightThemeOptions;
