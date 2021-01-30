import CssBaseline from '@material-ui/core/CssBaseline';
import React, { useEffect, useState } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { blue, grey } from '@material-ui/core/colors';
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';

type Theme = 'light' | 'dark';
type ThemeContext = { theme: Theme; toggleTheme: () => void };

export const ThemeContext = React.createContext<ThemeContext>({} as ThemeContext);

type Props = {
  primaryColor?: string;
};

export const Theme: React.FC<Props> = ({ children, primaryColor }) => {
  const defaultPreference = useMediaQuery('(prefers-color-scheme: light)') ? 'light' : 'dark';
  const [theme, setTheme] = useState<Theme>(defaultPreference);
  const prefersDarkMode = theme === 'dark';

  const toggleTheme = () => {
    const oppositeTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(oppositeTheme);
    localStorage.setItem('theme', oppositeTheme);
  };

  useEffect(() => {
    const theme = localStorage.getItem('theme') as Theme | null;
    setTheme(theme || defaultPreference);
  }, [defaultPreference]);

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
          main: prefersDarkMode ? grey[700] : grey[300]
        },
        background: {
          default: prefersDarkMode ? grey['A400'] : grey[300],
          paper: prefersDarkMode ? grey[800] : grey[200]
        },
        text: {
          secondary: prefersDarkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.6)'
        },
        type: prefersDarkMode ? 'dark' : 'light'
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
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
