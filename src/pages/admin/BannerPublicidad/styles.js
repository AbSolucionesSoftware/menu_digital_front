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
    imagen:{
      maxHeight: '100%',
      maxWidth: '100%'
    },
    dropZone: {
        width: 500,
        height: 230,
        display:"flex",
        justifyContent: "center",
        alignContent: "center",
        border: 'dashed 2px',
        borderColor: '#aaaaaa'
    },
    formInputFlex: {
      display: 'flex',
      '& > *': {
        margin: `${theme.spacing(1)}px ${theme.spacing(1)}px`
      },
      '& .obligatorio': {
        color: 'red'
      }
    },
    formInput: {
      margin: `${theme.spacing(1)}px ${theme.spacing(2)}px`
    },
}))

export default useStyles;