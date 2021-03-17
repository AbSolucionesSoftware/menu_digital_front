import { createMuiTheme } from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';
import { ThemeProvider } from '@material-ui/styles';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const theme = createMuiTheme({
  typography: {
    fontFamily: "Helvetica"
  }, 
  palette:{
    primary: {
      main: "#bb2225"
    },
    secondary: {
      main: "#160404"
    },
    publicado: {
      main: "#4caf50"
    },
    publicar: {
      main: "#ff1744"
    }
  }
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);
