import { Box, Button, Grid, Typography, Drawer } from '@material-ui/core'
import React, { useEffect, useState } from 'react';

import RegistroProducto from './services/registroProducto';
import CardPlato from './cardPlato';
import clienteAxios from '../../../config/axios';

export default function Menu() {

    const user = JSON.parse(localStorage.getItem('user'))

    const [ productos, setProductos ] = useState([]);

    const traerProdutos = async () => {
        await clienteAxios
			.get(`/product/${user._id}`)
			.then((res) => {
                setProductos(res.data);
			})
			.catch((err) => {
                console.log(err);
			});
    };

    useEffect(() => {
        traerProdutos(); 
    }, [])

    const [ open, setOpen ] = useState(false);

    const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

    return (
        <div>
            <Grid>
                <Grid lg={12}>
                    <Box textAlign="center">
                        <Typography variant="h4">
                            Tus Platillos
                        </Typography>
                    </Box>
                </Grid>
                <Grid lg={12}>
                    <Box p={2} display="flex" justifyContent="center">
                        <Button
                            variant="contained" 
                            color="primary"
                            size="large"
                            onClick={handleDrawerOpen}
                        >
                            Agregar Nuevo
                        </Button>
                    </Box>
                </Grid>
                <Grid container>
                    <Grid lg={12}>
                        <CardPlato productos={productos} />
                    </Grid>
                </Grid>
            </Grid>


            <Drawer
                anchor="right"
                open={open}
                onClose={handleDrawerClose}
            >
                <RegistroProducto productos={productos}/>
                <Box textAlign="center" mt={4}>
                    <Button
                        variant="contained" 
                        color="secondary"
                        size="large"
                        onClick={handleDrawerClose}
                    >
                        Salir
                    </Button>
                </Box>
            </Drawer>
        </div>
    )
}
