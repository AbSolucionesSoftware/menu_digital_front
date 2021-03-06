import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 600,
    },
    rootTitulo:{
      width: 350
    },
    paper: {
      maxWidth: 600,
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    
    content: {
      flex: '1 0 auto',
    },
    cover: {
      width: 220,
      height: 220
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    large: {
      width: theme.spacing(11),
      height: theme.spacing(11),
    },
    largeCar: {
      width: theme.spacing(6),
      height: theme.spacing(6),
    },
    paddin:{
      padding: 0
    }

    //-------RESPONSIVOS-------
    ,titulo:{
      width: "auto",
    }

  }));

export default useStyles;
