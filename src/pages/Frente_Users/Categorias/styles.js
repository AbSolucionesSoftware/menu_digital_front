import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            width: "100%",
            height: 55
        },
        large: {
            width: theme.spacing(5),
            height: theme.spacing(5),
        },
        paper: {
            padding: theme.spacing(1),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
        subCate:{
            height: 35,
            width: 250
        }
    }
));

export default useStyles;