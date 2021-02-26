import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, TextField, Button, Typography, Grid, Hidden, Divider } from '@material-ui/core';
import './login.scss';
import Imagen from '../img/restaurante.jpg'

import clienteAxios from '../../../config/axios';
import MessageSnackbar from '../../../components/Snackbar/snackbar';
import Spin from '../../../components/Spin/spin';
// import Firebase from '../../../components/Firebase/firebase';
import jwt_decode from 'jwt-decode';

const useStyles = makeStyles((theme) => ({
	root: {
		// height: ,
		display: 'flex',
        alignContent: "center",
        justifyContent: "center" 
	},
	color: {
		backgroundColor: theme.palette.background.paper,
    },
    imagen:{
        height: 700
    },
    contaCampos:{
        width: "100%"
    }
}));


export default function LoginAdmin(props) {
	const token = localStorage.getItem('token')

	const classes = useStyles();
	const [ datos, setDatos ] = useState([]);
	const [ validate, setValidate ] = useState(false);
	const [ loading, setLoading ] = useState(false);
	const [ snackbar, setSnackbar ] = useState({
		open: false,
		mensaje: '',
		status: ''
	});

	const datosU  = {
		"nameUser": datos.userName,
		"password": datos.password
	}

	const enviarDatosBD = async () => {
		if (!datos.userName || !datos.password) {
			setValidate(true);
			return;
		}
		setLoading(true);
		await clienteAxios
			.post('/company/logIn/', datosU)
			.then((res) => {
				const decoded = jwt_decode(res.data.token);
				setLoading(false);
				const token = res.data.token;
				localStorage.setItem('token', token);
				localStorage.setItem('user', JSON.stringify(decoded));
				const user = JSON.parse(localStorage.getItem('user'))

				if (user.type === true) {
					window.location.href = '/admin';
				}else{
					window.location.href = '/user';
				}
			})
			.catch((err) => {
				console.log(datos);
				setLoading(false);
				if (err.response){
					console.log(err);
					setSnackbar({
						open: true,
						mensaje: err.response.data.message,
						status: 'error'
					});
				} else {
					console.log(err);
					setSnackbar({
						open: true,
						mensaje: 'Al parecer no se a podido conectar al servidor.',
						status: 'error'
					});
				}
			});
	};

	return (
        <Grid container className={classes.color}>
			<Spin loading={loading} />
			<MessageSnackbar
				open={snackbar.open}
				mensaje={snackbar.mensaje}
				status={snackbar.status}
				setSnackbar={setSnackbar}
			/>
			<Hidden xsDown>
				<Grid item sm={6} md={6} lg={8}>
					<img alt="registrate" src={Imagen} className={classes.imagen} />
				</Grid>
			</Hidden>
			<Grid xs={12} sm={6} md={6} lg={4} className={classes.color}>
				<Box p={5} mt={15}>
					<Typography align="center" variant="h4">Inicia sesión Admin</Typography>

					<Box my={2} className={classes.contaCampos}>
						<TextField
							error={!datos.userName && validate}
							helperText={!datos.userName && validate ? 'Esta campo es requerido' : null}
							fullWidth
							required
							id="userName"
							name="Usuario"
							label="Usuario"
							onChange={(e) =>
								setDatos({ ...datos, userName: e.target.value })
							}
						/>
					</Box>
					<Box my={2}>
						<TextField
							error={!datos.password && validate}
							helperText={!datos.password && validate ? 'Esta campo es requerido' : null}
							fullWidth
							required
							id="password"
							name="password"
							label="Contraseña"
							type="password"
							onChange={(e) =>
								setDatos({ ...datos, password: e.target.value })
							}
						/>
					</Box>
					<Box display="flex" justifyContent="center" mt={5}>
						<Button variant="contained" color="primary" onClick={() => enviarDatosBD()}>
							Iniciar sesión
						</Button>
					</Box>
				</Box>
			</Grid>
		</Grid>
	);
}
