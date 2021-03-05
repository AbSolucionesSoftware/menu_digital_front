import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
        root: {
        display: 'flex',
        },
        large: {
            width: theme.spacing(6),
            height: theme.spacing(6),
        },
        paper: {
            padding: theme.spacing(1),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
    }
));

export default useStyles;