import { fade, makeStyles } from '@material-ui/core/styles';
import { deepOrange } from '@material-ui/core/colors';


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
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
    large: {
      width: theme.spacing(13),
      height: theme.spacing(13),
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

export default useStyles;
