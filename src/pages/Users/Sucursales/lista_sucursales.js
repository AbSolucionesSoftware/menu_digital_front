import { Box, Button, Card, CardActions, CardContent, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import Modal_nueva_sucursal from './modal_nueva_sucursal';
import Eliminar from './eliminar';

const useStyles = makeStyles({
    root: {
      minWidth: 350,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

export default function Lista_sucursales({sucursal, setUpdate, update}) {

    const classes = useStyles();

    return (
        <div>
            <Box p={2}>
                <Card className={classes.root}>
                    <CardContent>
                        <Box textAlign="center">
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Nombre: {sucursal.nombreSucursal}
                            </Typography>
                            <Box p={1}>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    Costo de Envio ${sucursal.costoEnvio}
                                </Typography>
                            </Box>
                            <Typography variant="h5" component="h2">
                                Tel: {sucursal.telefonoSucursal}
                            </Typography>
                        </Box>
                        <Box p={1} textAlign="center" > 
                            <Typography className={classes.pos} color="textSecondary">
                                Domicilio
                            </Typography>
                        </Box>
                        <Box>
                            <Typography className={classes.pos} color="textSecondary">
                                Calle {sucursal.calleNumeroSucursal} Col. {sucursal.coloniaSucursal}, CP {sucursal.cpSucursal}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography className={classes.pos} color="textSecondary">
                               {sucursal.ciudadSucursal}, {sucursal.cpSucursal}
                            </Typography>
                        </Box>
                    </CardContent>
                    <CardActions>
                        
                        <Eliminar update={update} setUpdate={setUpdate} idSucursal={sucursal._id}/>
                        
                        <Modal_nueva_sucursal update={update} setUpdate={setUpdate} tipo="Editar" editarSucursal={sucursal} />

                    </CardActions>
                </Card>
            </Box>
        </div>
    )
}
