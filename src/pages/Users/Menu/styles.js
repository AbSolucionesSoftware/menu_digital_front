import { fade, makeStyles } from '@material-ui/core/styles';
import { deepOrange } from '@material-ui/core/colors';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 460,
    },
    rootTitulo: {
      maxWidth: 250,
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    cover: {
      width: 190,
      height: 195
    },
    controls: {
      display: 'flex',
      // paddingLeft: theme.spacing(1),
      // paddingBottom: theme.spacing(1),
    },
    playIcon: {
      height: 38,
      width: 38,
    },
    large: {
      width: theme.spacing(13),
      height: theme.spacing(13),
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    titulo:{
      width: 260
    },

    //COSAS DEL BUSCADOR

    grow: {
      flexGrow: 1
    },
    
    search: {
      borderWidth: 2,
      borderStyle: "solid",
      borderColor: "#bb2225",
      position: 'relative',
      display: 'flex',
      borderRadius: 5,
      // borderColor: "#bb2225",
      // backgroundColor: "#bb2225",
      // '&:hover': {
      //   backgroundColor: fade(theme.palette.common.white, 0.25)
      // },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(5, 5),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    inputSearch:{
      borderRadius: theme.palette.primary,
      width: '100%',

    }
    
  }));

export default useStyles;
