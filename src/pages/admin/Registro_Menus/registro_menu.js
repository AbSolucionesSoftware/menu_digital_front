import { Box, Button, Grid, makeStyles, TextField, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import Spin from '../../../components/Spin/spin'

import clienteAxios from '../../../config/axios'
import jwt_decode from 'jwt-decode'

import imagen from  '../../../img/Registro.png'
import { DataUsageOutlined, DragIndicatorSharp } from '@material-ui/icons'

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

export default function Registro_Menu(props) {

    // const token = localStorage.getItem('token')
    // var decoded = Jwt(token) 
	
	// function Jwt(token) {
	// 	try {
	// 		return jwt_decode(token);
	// 	} catch (e) {
	// 		return null;
	// 	}
	// }

    // if(token === '' || token === null){
    //     props.history.push('/entrar')
    // }else if(decoded['rol'] !== true){
    //     props.history.push('/')
    // }

	const classes = useStyles();
    const [ registro, setRegistro] = useState([]); 
    const [ loading, setLoading ] = useState(false);

    const array = {
        "nameCompany": registro.nombreCompania,
        "nameUser": registro.nameUser,
        "owner": registro.propietario,
        "phone": registro.telefono,
        "password": registro.password,
        "repeatPassword": registro.repeatPassword
    }

    const envianDatos = async () => {
        // setLoading(true);
        await clienteAxios
          .post('/company', array
        //   {
        //     headers: {
        //       "Content-Type": "multipart/form-data",
        //       Authorization: `bearer ${""}`,
        //     },
        //   }
          ).then((res) => {
            setLoading(false);
            console.log(res);
            console.log(array);
          }
          ).catch((err) => {
            if (err) {
                console.log(array);
                console.log(err);
                console.log("No se guuardo nada");
            } else {
                console.log("regsistro exitoso");
            }
          });
    }

    return (
        <div>
            {/* <Spin size="large" spinning={loading}> */}
            <Grid container>
                <Grid lg={12}>
                    <Box textAlign="center" mt={6} pr={10} pl={10}>
                        <Typography variant="h4">
                            Registro de Compañias
                        </Typography>
                    </Box>
                    <Grid container>
                        <Grid lg={6}>`
                        <Box className={classes.containerImagen}> 
                            <img src={imagen} alt="Imagen de registro" className={classes.image}/>
                        </Box>
                        </Grid>
                        <Grid lg={6}>
                            <Box mt={5} textAlign="center">
                                <form className={classes.root} noValidate autoComplete="off">
                                    <Box p={2}>
                                        <TextField
                                            className={classes.text}
                                            id="nombreCompania"
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
