import { ThemeProvider, createMuiTheme, responsiveFontSizes } from '@material-ui/core';
import { blue, grey } from '@material-ui/core/colors';
import CssBaseline from '@material-ui/core/CssBaseline';
import React, { FC } from 'react';

type Props = {
  primaryColor?: string;
};

export const Theme: FC<Props> = ({ children, primaryColor }) => {
  const muiTheme = responsiveFontSizes(
    createMuiTheme({
      breakpoints: {
        values: {
          xs: 0,
          sm: 600,
          md: 1280,
          lg: 1920,
          xl: 2560
        }
      },
      palette: {
        primary: {
          main: primaryColor || blue[900]
        },
        secondary: {
          main: grey[300]
        },
        background: {
          default: grey[300],
          paper: grey[200]
        },
        text: {
          secondary: 'rgba(0, 0, 0, 0.6)'
        },
        type: 'light'
      },
      props: {
        MuiTypography: {
          variantMapping: {
            h3: 'h1',
            h4: 'h2',
            h5: 'h3',
            h6: 'h4'
          }
        }
      }
    })
  );

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
