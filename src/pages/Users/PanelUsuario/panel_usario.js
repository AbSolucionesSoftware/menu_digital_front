import { Box, Button, Drawer, Grid, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Editar_User from './editar_user'
import clienteAxios from '../../../config/axios';

export default function PanelUser() {
    const [ datosEmpresa, setDatosEmpresa] = useState([]);    
	const token = localStorage.getItem('token');
    const company = JSON.parse(localStorage.getItem('user'))

    const traerDatos = async () => {
        await clienteAxios
			.get(`/company/${company._id}`, {
				headers: {
					Authorization: `bearer ${token}`
				}
			})
			.then((res) => {
                setDatosEmpresa(res.data)
			})
			.catch((err) => {
                console.log(err.response);
			});
    }

    useEffect(() => {
        traerDatos();
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
            <Grid container>
                <Grid item lg={10}>
                    <Box textAlign="center">
                        <Typography variant="h4">
                            Tu Empresa
                        </Typography>
                        <Box mt={2}>
                            <Typography variant="h4">
                                {datosEmpresa.nameCompany}
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid item lg={10}>
                    <Box display="flex" justifyContent="flex-end" >
                        <Button
                            variant="contained" 
                            color="primary"
                            onClick={handleDrawerOpen}
                        >
                            Editar Datos
                        </Button>
                    </Box>
                </Grid>
                <Grid item lg={10}>
                    <Box display="flex" justifyContent="center">
                        <Box p={3}>
                            <Typography variant="h6">
                                Empresa: {datosEmpresa.nameCompany}
                            </Typography>
                        </Box>
                        <Box p={3}>
                            <Typography variant="h6">
                                Propietario: {datosEmpresa.owner}
                            </Typography>
                        </Box>
                        <Box p={3}>
                            <Typography variant="h6">
                                Telefono:  {datosEmpresa.phone}
                            </Typography>
                        </Box>
                        <Box p={3}>
                            <Typography variant="h6">
                                Usuario:  {datosEmpresa.nameUser}
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>

            <Drawer
                // className={classes.drawer}
                anchor="right"
                open={open}
                onClose={handleDrawerClose}
            >
                <Editar_User datosEmpresa={datosEmpresa} setDatosEmpresa={setDatosEmpresa} />
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
