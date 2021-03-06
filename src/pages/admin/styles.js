import { fade, makeStyles } from '@material-ui/core/styles';
import { deepOrange } from '@material-ui/core/colors';

// estilo card restaurante

const useStyles = makeStyles((theme) => ({
    root: {
      width: 230,
      height: 315
      // display: 'flex',
    },
    details: {
      display: 'flex',
      // flexDirection: 'column',
    },
    content: {
      // flex: '1 0 auto',
    },

    cover: {
      width: 180,
      height: 180
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    playIcon: {
      height: 38,
      width: 38,
    },
    boton:{
      width: "100%"
    }
  }));

export default useStyles;
