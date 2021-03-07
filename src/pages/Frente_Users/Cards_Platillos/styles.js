import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    paper: {
      maxWidth: 500,
      margin: `${theme.spacing(1)}px auto`,
      padding: theme.spacing(2),
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
    },
    cover: {
      width: 210,
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
      width: theme.spacing(4),
      height: theme.spacing(4),
    }
  }));

export default useStyles;
