import { Box, Button, Drawer, Grid, makeStyles, SwipeableDrawer, Typography } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import clienteAxios from '../../config/axios';


// import Registro_Menu from './Registro_Menus/registro_menu'
import Cards_Restaurate from './Card_Restaurante/card_restaurante'

export default function Panel_Admin(props) {
	const token = localStorage.getItem('token');
    const [ open, setOpen] = useState(false);
	const [empresas, setEmpresas] = useState([]);
	const [loading, setLoading] = useState(false);


    const consultarDatos = async () => {
		setLoading(true);
		await clienteAxios
			.get('/company/',{
				headers: {
					Authorization: `bearer ${token}`
				}
			})
			.then((res) => {
				setEmpresas(res.data);
			})
			.catch((err) => {

			})
	}


    useEffect(() => {
		consultarDatos();
	}, [])


    return (
        <div>
            <Grid lg={12}>
                <Box textAlign="center" mt={3}>
                    <Typography variant="h4">
                        Panel de Administrador
                    </Typography>
                </Box>
            </Grid>
            <Grid lg={12}>
                <Box mt={5} display="flex" justifyContent="center">
                    <Cards_Restaurate empresas={empresas} />
                </Box>
            </Grid>
        </div>
    )
}
