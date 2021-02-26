import { fade, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
          margin: theme.spacing(1),
        },
      },
      input: {
        display: 'none',
      },
      imagen: {
        maxHeight:  300,
        maxWidth: 300
      },
      dropZone: {
        border: 'dashed 2px',
        borderColor: '#aaaaaa'
      }
}))

export default useStyles;