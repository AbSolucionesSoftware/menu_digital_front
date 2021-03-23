import { createMuiTheme } from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';
import { ThemeProvider } from '@material-ui/styles';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const theme = createMuiTheme({
  typography: {
    h6:{ //testo
      fontSize: 20
    },
    h5:{ //subtitulos
      fontSize: 18
    },
    h4:{ // titulos
      fontSize: 22
    },
    fontFamily: "Helvetica",
  }, 
  palette:{
    primary: {
      main: "#bb2225"
    },
    secondary: {
      main: "#160404"
    }
  }
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);
