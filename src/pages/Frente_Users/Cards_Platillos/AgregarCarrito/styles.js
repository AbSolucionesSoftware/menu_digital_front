import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    large: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    },
    agregar:{
        minWidth: 300
    },
    column: {
        flexBasis: '100%',
    },
    cover:{
        borderRadius: 7,
        width: 235,
        height: 235
    }
}));

export default useStyles;


