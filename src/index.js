import { createMuiTheme } from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';
import { ThemeProvider } from '@material-ui/styles';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { MenuGeneralProvider } from './context/menuContext';


const theme = createMuiTheme({
  typography: {
    h6:{ //testo
      fontSize: 18
    },
    h5:{ //subtitulos
      fontSize: 20
    },
    h4:{ // titulos
      fontSize: 24,
      
    },
    h3:{ //nombre empresa
      fontSize: 28,
      fontWeight: 600
    },
    h2:{
      fontSize: 15,
    },
    body1:{
      fontSize: 16
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
    <MenuGeneralProvider>
      <App />
		</MenuGeneralProvider>
  </ThemeProvider>,
  document.getElementById('root')
);
