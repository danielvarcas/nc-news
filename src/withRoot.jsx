import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0079d3',
    },
    secondary: {
      main: '#ff4500',
    },
  },
  typography: {
    useNextVariants: true,
  },
});

function withRoot(Component) {
  function WithRoot(props) {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...props} />
      </MuiThemeProvider>
    );
  }
  return WithRoot;
}

export default withRoot;
