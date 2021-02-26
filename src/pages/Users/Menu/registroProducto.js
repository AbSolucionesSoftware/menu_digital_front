import { Grid, Typography, Box, Button, TextField, makeStyles } from '@material-ui/core'
import React from 'react'

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

export default function RegistroProducto() {

	const classes = useStyles();

    return (
        <div>
            <Grid container> 
                <Grid lg={12}>
                    <Box textAlign="center" p={5}>
                        <Typography variant="h4">
                            Registro de Platillo
                        </Typography>
                    </Box>
                </Grid>
                <Grid container>
                    <Grid lg={12}>
                        <Box textAlign="center" display="flex" justifyContent="center">
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
                                    id="nombreCompania"
                                    label="Nombre de Compania"
                                    placeholder="Nombre de Compania"
                                    multiline
                                    variant="outlined"
                                />
                            </Box>
                            </form>
                        </Box>
                    </Grid>
                </Grid>
                <Grid lg={12}>
                    <Box textAlign="center">
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
