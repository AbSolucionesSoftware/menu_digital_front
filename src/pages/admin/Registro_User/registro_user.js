import { Box, Button, Grid, Hidden, makeStyles, TextField, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import Spin from '../../../components/Spin/spin'

import clienteAxios from '../../../config/axios'
import MessageSnackbar from '../../../components/Snackbar/snackbar';
import jwt_decode from 'jwt-decode'

import imagen from  '../../../img/Registro.png'
import { DataUsageOutlined, DragIndicatorSharp } from '@material-ui/icons'
import { withRouter } from 'react-router';

const useStyles = makeStyles((theme) => ({
    text:{
        width: "100%"
    },
    image:{
        maxWidth: "100%",
        maxHeight: "100%"
    },
    containerImagen:{
        display:"flex",
        justifyContent: "center",
        alignContent: "center",
        width: 500,
        height: 500
    }
}))

function Registro_User(props) {
    const token = localStorage.getItem('token')

	const classes = useStyles();
    const [ registro, setRegistro] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ validate, setValidate ] = useState(false);
    const [ snackbar, setSnackbar ] = useState({
		open: false,
		mensaje: '',
		status: ''
	});

    const array = {
        "nameCompany": registro.nombreCompania,
        "nameUser": registro.nameUser,
        "slug": registro.slug,
        "owner": registro.propietario,
        "phone": registro.telefono,
        "password": registro.password,
        "repeatPassword": registro.repeatPassword
    }

    

    const envianDatos = async () => {
        if (!registro.nombreCompania || !registro.propietarioS 
            || !registro.telefono || !registro.slug || !registro.nameUser 
            || !registro.password || !registro.repeatPassword ) {
			setValidate(true);
			return;
		}
        setLoading(true);
        await clienteAxios
          .post('/company', array,
          {
            headers: {
              Authorization: `bearer ${token}`,
            },
          }
          ).then((res) => {
            setLoading(false);
            props.history.push(`/admin`)
            setRegistro([])
            setSnackbar({
                open: true,
                mensaje: "Usuario registrado exitosamente!.",
                status: 'success'
            });
          }
          ).catch((err) => {
            if (err.response) {
                setLoading(false);
					setSnackbar({
						open: true,
						mensaje: err.response.data.message,
						status: 'error'
					});
				}  else {
                    setLoading(false);
                    setSnackbar({
						open: true,
						mensaje: 'Al parecer no se a podido conectar al servidor.',
						status: 'error'
					});
                }
          });
    }
    console.log(registro);

    return (
        <div>
            <Spin loading={loading} />
            <MessageSnackbar
				open={snackbar.open}
				mensaje={snackbar.mensaje}
				status={snackbar.status}
				setSnackbar={setSnackbar}
			/>
            <Grid container>
                <Grid lg={12}>
                    <Box textAlign="center" mt={6} pr={10} pl={10}>
                        <Typography variant="h4">
                            Registro de Compañias
                        </Typography>
                    </Box>
                    <Grid container>
                        <Hidden smDown>
                            <Grid lg={6}>
                                <Box className={classes.containerImagen}> 
                                    <img src={imagen} alt="Imagen de registro" className={classes.image}/>
                                </Box>
                            </Grid>
                        </Hidden>
                        <Grid lg={6}>
                            <Box mt={5} textAlign="center">
                                <form className={classes.root} noValidate autoComplete="off">
                                    <Box p={2}>
                                        <TextField
                                            error={!registro.nombreCompania && validate}
                                            helperText={!registro.nombreCompania && validate ? 'Esta campo es requerido' : null}
								            value={registro.nombreCompania ? registro.nombreCompania : ''}
                                            className={classes.text}
                                            id="nombreCompania"
                                            name="nombreCompania"
                                            label="Nombre de Compania"
                                            placeholder="Nombre de Compania"
                                            multiline
                                            variant="outlined"
                                            onChange={(e) =>
                                                setRegistro({ ...registro, nombreCompania: e.target.value })
                                            }
                                        />
                                    </Box>
                                    <Box p={2}>
                                        <TextField
                                            error={!registro.propietario && validate}
                                            helperText={!registro.propietario && validate ? 'Esta campo es requerido' : null}
								            value={registro.propietario ? registro.propietario : ''}
                                            className={classes.text}
                                            id="propietario"
                                            label="Propietario"
                                            placeholder="Propietario"
                                            multiline
                                            variant="outlined"
                                            onChange={(e) =>
                                                setRegistro({ ...registro, propietario: e.target.value })
                                            }
                                        />
                                    </Box>
                                    <Box p={2}>
                                        <TextField
                                            error={!registro.telefono && validate}
                                            helperText={!registro.telefono && validate ? 'Esta campo es requerido' : null}
								            value={registro.telefono ? registro.telefono : ''}
                                            className={classes.text}
                                            id="telefono"
                                            label="Telefono"
                                            placeholder="Telefono"
                                            multiline
                                            variant="outlined"
                                            onChange={(e) =>
                                                setRegistro({ ...registro, telefono: e.target.value })
                                            }
                                        />
                                    </Box>
                                    <Box p={2}>
                                        <TextField
                                            error={!registro.slug && validate}
                                            helperText={!registro.slug && validate ? 'Esta campo es requerido' : null}
								            value={registro.slug ? registro.slug : ''}
                                            className={classes.text}
                                            id="slug"
                                            label="Identificador"
                                            placeholder="Identificador"
                                            multiline
                                            variant="outlined"
                                            onChange={(e) =>
                                                setRegistro({ ...registro, slug: e.target.value.replace(' ', '-').toLowerCase() })
                                            }
                                        />
                                    </Box>
                                    <Box p={2}>
                                        <TextField
                                            error={!registro.nameUser && validate}
                                            helperText={!registro.nameUser && validate ? 'Esta campo es requerido' : null}
								            value={registro.nameUser ? registro.nameUser : ''}
                                            className={classes.text}
                                            id="nameUser"
                                            label="Nombre de Usuario"
                                            placeholder="Nombre de Usuario"
                                            multiline
                                            variant="outlined"
                                            onChange={(e) =>
                                                setRegistro({ ...registro, nameUser: e.target.value })
                                            }
                                        />
                                    </Box>
                                    <Box p={2}>
                                        <TextField
                                            error={!registro.password && validate}
                                            helperText={!registro.password && validate ? 'Esta campo es requerido' : null}
								            value={registro.password ? registro.password : ''}
                                            className={classes.text}
                                            id="password"
                                            label="Contrasena"
                                            placeholder="Contrasena"
                                            multiline
                                            variant="outlined"
                                            onChange={(e) =>
                                                setRegistro({ ...registro, password: e.target.value })
                                            }
                                        />
                                    </Box>
                                    <Box p={2}>
                                        <TextField
                                            error={!registro.repeatPassword && validate}
                                            helperText={!registro.repeatPassword && validate ? 'Esta campo es requerido' : null}
								            value={registro.repeatPassword ? registro.repeatPassword : ''}
                                            className={classes.text}
                                            id="repeatPassword"
                                            label="Repetir Contrasena"
                                            placeholder="Repetir Contrasena"
                                            multiline
                                            variant="outlined"
                                            onChange={(e) =>
                                                setRegistro({ ...registro, repeatPassword: e.target.value })
                                            }
                                        />
                                    </Box>
                                </form>
                            </Box>
                        </Grid>
                    </Grid>
                    <Box mt={5} textAlign="center">
                        <Button
                            variant="contained" 
                            color="primary"
                            size="large"
                            onClick={() => envianDatos()}
                            
                        >
                            Registrar
                        </Button>
                    </Box>
                </Grid>
            </Grid>
            {/* </Spin> */}
        </div>
    )
}


export default withRouter(Registro_User);