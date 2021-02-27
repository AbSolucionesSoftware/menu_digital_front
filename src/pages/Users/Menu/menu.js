import { Box, Button, Grid, Typography, Drawer } from '@material-ui/core'
import React, { useState } from 'react';

import RegistroProducto from './registroProducto';
import CardPlato from './cardPlato';

export default function Menu() {

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
                <Grid item lg={12}>
                    <Box textAlign="center">
                        <Typography variant="h4">
                            Tus Platillos
                        </Typography>
                    </Box>
                </Grid>
                <Grid item lg={12}>
                    <Box display="flex" justifyContent="flex-end">
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
                        <CardPlato />
                    </Grid>
                </Grid>
            </Grid>

            <Drawer
                // className={classes.drawer}
                anchor="right"
                open={open}
                onClose={handleDrawerClose}
            >
                <RegistroProducto />
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
