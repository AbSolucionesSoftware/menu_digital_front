import { Box, Container, Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import imagen from '../img/404 Error with a cute animal-bro.png';

const useStyles = makeStyles((theme) => ({
	imagen: {
		maxHeight: '100%',
		maxWidth: '100%'
	}
}));

export default function Error404() {

    const classes = useStyles();

    return (
        <Container maxWidth="md">
            <Box height="80vh" mt={5}>
                <Box display="flex" justifyContent="center">
                    <Box height="70vh">
                        <img alt="error 404" src={imagen} className={classes.imagen} />
                    </Box>
                </Box>
                <Typography variant="h4" align="center">Lo sentimos, esta pagina no existe</Typography>
            </Box>
        </Container>
    )
}
