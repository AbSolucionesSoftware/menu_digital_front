import { Box, Button, Card, CardActions, CardContent, Chip, Dialog, Grid, makeStyles, Typography } from '@material-ui/core'
import React, { useState } from 'react'

import Detalle_Pedido from './detalle_pedido';
import Estado_Pedido from './estado_pedido'; 
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { formatoMexico } from '../../../config/reuserFunction';

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
      fontSize: 16,
    },
  });


export default function List_Pedidos({pedido, loading, setLoading, update, setUpdate }) {
    const classes = useStyles();

    const [openDetalles, setOpenDetalles] = useState(false);
    const [openEstado, setOpenEstado] = useState(false);

    const handleDetalles = () =>{
        setOpenDetalles(!openDetalles)
    }

    const handleEstado = () => {
        setOpenEstado(!openEstado)
    }

    return(
        <div key={pedido._id}>
            <TableRow>
                <TableCell align="right"> {pedido.nombreCliente} </TableCell>
                <TableCell align="right"> {pedido.telefono} </TableCell>
                <TableCell align="right"> 
                    <Chip style={pedido.tipoEnvio === "Recogera en Sucursal" ? {background:  "#48F273"} : {background: "yellow"}} label={pedido.tipoEnvio}  /> 
                </TableCell>
                <TableCell align="right">
                {
                    pedido.tipoEnvio === "Envio a Domicilio" ? (
                        <>
                            Calle {pedido.calleNumero} Col. {pedido.colonia}
                        </>
                    ) : null
                }    
                </TableCell>
                <TableCell align="right"> {pedido.estadoPedido} </TableCell>
                <TableCell align="right">  
                    <Button
                        variant="contained" 
                        color="secondary"
                        onClick={() => {
                            handleDetalles()
                            // setEditarProducto(producto)
                        }}
                    >
                        Ver Detalles
                    </Button>
                </TableCell>
            </TableRow>
            {/* <Box p={2}>
                <Card className={classes.root}>
                    <CardContent>
                        <Box textAlign="center" p={1}>
                            <Typography>
                                ID: {pedido._id}
                            </Typography>
                        </Box>
                        <Box textAlign="left">
                            <Box p={1}>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    Cliente: 
                                </Typography>
                            </Box>
                            <Box ml={1}>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    Tel: {pedido.telefono}
                                </Typography>
                            </Box>
                            <Box p={1}>
                                <Typography component={'span'} className={classes.title} color="textSecondary" gutterBottom>
                                    Tipo de Envio: <Chip style={pedido.tipoEnvio === "Recogera en Sucursal" ? {background:  "#48F273"} : {background: "yellow"}} label={pedido.tipoEnvio}  />
                                </Typography>
                            </Box>
                            <Box p={1}>
                                <Typography component={'span'} className={classes.title} color="textSecondary" gutterBottom>
                                    Estatus Pedido: 
                                    <Chip label={pedido.estadoPedido} />
                                </Typography>
                            </Box>
                            <Box ml={1}>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    Total: ${formatoMexico(pedido.totalPedido)}
                                </Typography>
                            </Box>
                        </Box>
                        {
                            pedido.tipoEnvio === "Envio a Domicilio" ? (
                                <>
                                    <Box p={1} textAlign="center" > 
                                        <Typography className={classes.pos} color="textSecondary">
                                            Domicilio
                                        </Typography>
                                    </Box>
                                    <Box textAlign="left">
                                        <Typography color="textSecondary">
                                            Calle {pedido.calleNumero} Col. {pedido.colonia}
                                        </Typography>
                                    </Box>
                                </>
                            ) : null
                        }
                        
                    </CardContent>
                    <CardActions>
                        <Box>
                            <Button
                                variant="contained" 
                                color="primary"
                                onClick={() => {
                                    handleEstado()
                                    // setEditarProducto(producto)
                                }}
                            >
                                Cambiar Estado
                            </Button>
                        </Box>
                        <Box>
                            <Button
                                variant="contained" 
                                color="secondary"
                                onClick={() => {
                                    handleDetalles()
                                    // setEditarProducto(producto)
                                }}
                            >
                            Detalle Pedido
                            </Button>
                        </Box>
                    </CardActions>
                </Card>
            </Box> */}

            <Dialog  onClose={handleDetalles} open={openDetalles}>
                <Detalle_Pedido 
                    openEstado={openEstado} 
                    setOpenEstado={setOpenEstado} 
                    pedido={pedido} 
                />
            </Dialog>
            {/* <Dialog  onClose={handleEstado} open={openEstado}>
                <Estado_Pedido
                    openEstado={openEstado} 
                    setOpenEstado={setOpenEstado} 
                    pedido={pedido} 
                    loading={loading} 
                    setLoading={setLoading}
                    update={update} 
                    setUpdate={setUpdate}
                />
            </Dialog> */}
        </div>
    )
}
