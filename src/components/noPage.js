import { Box, Container, Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import imagen from '../img/No data.png';

const useStyles = makeStyles((theme) => ({
	imagen: {
		maxHeight: '100%',
		maxWidth: '100%'
	}
}));

export default function No_Page() {
    const classes = useStyles();
    return (
        <Container maxWidth="md">
            <Box height="80vh" mt={5}>
                <Box display="flex" justifyContent="center">
                    <Box height="70vh">
                        <img alt="error 404" src={imagen} className={classes.imagen} />
                    </Box>
                </Box>
                <Typography variant="h4" align="center">Lo sentimos, esta pagina no esta disponible</Typography>
            </Box>
        </Container>
    )
}