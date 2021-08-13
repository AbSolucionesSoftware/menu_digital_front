import { Box, Button, Drawer, Grid, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import Banner from './BannerAdmin';
import RegistroBanner from './services/registroBanner';

export default function PublicidadAdminBanner() {

	const [ open, setOpen ] = useState(false);

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
                            Publicidad
                        </Typography>
                        <Box mt={3}>
                            <Typography variant="h6">
                                Apartado publicitario para la zona de frente
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
