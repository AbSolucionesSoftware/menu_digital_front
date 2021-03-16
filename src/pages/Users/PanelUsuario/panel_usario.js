import React, { useEffect, useState } from 'react'
import Editar_User from './editar_user'

import TextField from '@material-ui/core/TextField';
import { Box, Button, Drawer, Grid, Typography } from '@material-ui/core/'
import clienteAxios from '../../../config/axios';
import Spin from '../../../components/Spin/spin';

export default function PanelUser() {
    const [ datosEmpresa, setDatosEmpresa] = useState([]);
	const [ loading, setLoading ] = useState(false);
    const [ upload, setUpload ] = useState(false);

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
                setUpload(true);
                setLoading(false);
                setDatosEmpresa(res.data)
			})
			.catch((err) => {
                setUpload(true);
                setLoading(false);
			});
    }

    useEffect(() => {
        traerDatos();
    }, [upload])

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
                                Tu empresa en Comody
                            </Typography>
                        </Box>
                        
                    </Box>
                </Grid>
                <Grid lg={12}>
                    <Box display="flex" justifyContent="center" flexWrap="wrap" p={2}>
                        <Typography variant="h5">
                            {datosEmpresa.nameCompany}
                        </Typography>
                    </Box>
                    <Box display="flex" justifyContent="center" flexWrap="wrap" p={2}>
                        <Typography variant="h5">
                           Tu usuario: {datosEmpresa.nameUser}
                        </Typography>
                    </Box>
                </Grid>
                <Grid lg={12}>
                    <Box display="flex" justifyContent="center" flexWrap="wrap">
                        <Box p={3}>
                            <TextField variant="outlined" label="Usuario" value={`${datosEmpresa.nameCompany}`}/>
                        </Box>
                        <Box p={3}>
                            <TextField variant="outlined" label="Propietario" value={`${datosEmpresa.owner}`}/>
                        </Box>
                        <Box p={3}>
                            <TextField variant="outlined" label="Identificador" value={`${datosEmpresa.slug}`}/>
                        </Box>
                        <Box p={3}>
                            <TextField variant="outlined" label="Telefono" value={`${datosEmpresa.phone}`}/>
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
                <Editar_User 
                    handleDrawerClose={handleDrawerClose} 
                    setUpload={setUpload} 
                    datosEmpresa={datosEmpresa} 
                    setDatosEmpresa={setDatosEmpresa} 
                />
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
