import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 560,
    },
    rootTitulo:{
      width: 250,
    },
    paper: {
      maxWidth: 580,
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
      width: theme.spacing(8),
      height: theme.spacing(8),
    },
    paddin:{
      padding: 0
    }
  }));

export default useStyles;
