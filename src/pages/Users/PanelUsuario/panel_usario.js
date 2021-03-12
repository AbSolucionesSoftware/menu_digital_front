import { Box, Button, Drawer, Grid, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Editar_User from './editar_user'
import clienteAxios from '../../../config/axios';
import Spin from '../../../components/Spin/spin';

export default function PanelUser() {
    const [ datosEmpresa, setDatosEmpresa] = useState([]);
	const [ loading, setLoading ] = useState(false);

	const token = localStorage.getItem('token');
    const company = JSON.parse(localStorage.getItem('user'))

    const traerDatos = async () => {
        setLoading(true);
        await clienteAxios
			.get(`/company/${company._id}`, {
				headers: {
					Authorization: `bearer ${token}`
				}
			})
			.then((res) => {
                setLoading(false);
                setDatosEmpresa(res.data)
			})
			.catch((err) => {
                setLoading(false);
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
			<Spin loading={loading} />

            <Grid>
                <Grid lg={12}>
                    <Box textAlign="center" display="flex" justifyContent="center" flexWrap="wrap">
                        <Box p={2}>
                            <Typography variant="h4">
                                Tu Empresa
                            </Typography>
                        </Box>
                        
                    </Box>
                </Grid>
                <Grid lg={12}>
                    <Box display="flex" justifyContent="center" flexWrap="wrap" p={2}>
                        <Typography variant="h4">
                            {datosEmpresa.nameCompany}
                        </Typography>
                    </Box>
                    <Box display="flex" justifyContent="center" flexWrap="wrap" p={2}>
                        <Typography variant="h6">
                            Usuario:  {datosEmpresa.nameUser}
                        </Typography>
                    </Box>
                </Grid>
                <Grid lg={12}>
                    <Box display="flex" justifyContent="center" flexWrap="wrap">
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
                        
                    </Box>
                </Grid>
                <Grid lg={12} >
                    <Box display="flex" justifyContent="center" >
                        <Button
                            variant="contained" 
                            color="primary"
                            onClick={handleDrawerOpen}
                        >
                            Editar Datos
                        </Button>
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
                <Box display="flex" justifyContent="center" mt={4}>
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
