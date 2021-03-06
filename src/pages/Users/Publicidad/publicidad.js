import { Box, Button, Drawer, Grid, Modal, ModalManager, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Banner from './banner';
import RegistroBanner from './services/registroBanner';
import clienteAxios from '../../../config/axios';

import useStyles from './styles'

export default function Publicidad() {

	const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'))

	const [ open, setOpen ] = useState(false);
    const classes = useStyles();

    const handleDrawerOpen = (value) => {
		setOpen(value);
	};

	const handleDrawerClose = (value) => {
		setOpen(value);
	};
    
    return (
        <div>
                <Grid item lg={12}>
                    <Box textAlign="center">
                        <Typography variant="h4">
                            Publcidad
                        </Typography>
                        <Box mt={3}>
                            <Typography variant="h6">
                                En este apartado agrega publicidad a tu carrusel de Imagenes de Frente
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid item lg={12}>
                    <Box display="flex" justifyContent="center" mt={3}>
                        <Button
                            onClick={() => handleDrawerOpen(true)}
                            variant="contained" 
                            color="primary"
                        >
                            Agregar Nuevo
                        </Button>
                    </Box>
                </Grid>
                <Grid item lg={12}>
                    <Banner />
                </Grid>

            <Drawer
                anchor="right"
                open={open}
                onClose={() => handleDrawerClose(false)}
            >
                <RegistroBanner handleDrawerClose={handleDrawerClose}/>
                <Box textAlign="center" mt={4}>
                    <Button
                        variant="contained" 
                        color="secondary"
                        size="large"
                        onClick={() => handleDrawerClose(false)}
                    >
                        Salir
                    </Button>
                </Box>
            </Drawer>


        </div>
    )

    
}
