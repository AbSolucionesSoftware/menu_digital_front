import { Box, Button, Grid, makeStyles, TextField, Typography } from '@material-ui/core'
import React from 'react'
import imagen from  '../../../img/Registro.png'

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

export default function Registro_Menu() {

	const classes = useStyles();

    return (
        <div>
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
                                        />
                                    </Box>
                                    <Box p={2}>
                                        <TextField
                                            className={classes.text}
                                            id="nombreUsuario"
                                            label="Nombre de Usuario"
                                            placeholder="Nombre de Usuario"
                                            multiline
                                            variant="outlined"
                                        />
                                    </Box>
                                    <Box p={2}>
                                        <TextField
                                            className={classes.text}
                                            id="contrasena"
                                            label="Contrasena"
                                            placeholder="Contrasena"
                                            multiline
                                            variant="outlined"
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
                        >
                            Registrar
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </div>
    )
}
