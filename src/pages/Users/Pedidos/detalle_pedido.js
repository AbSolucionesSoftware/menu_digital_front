import React from 'react'
import { formatoMexico } from '../../../config/reuserFunction';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Grid, Box, Typography, FormControl, InputLabel, Chip, makeStyles, AccordionSummary, Accordion, AccordionDetails } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
      minWidth: 400,
    },
    column: {
        flexBasis: '70%',
    },
    column2: {
        flexBasis: '15%',
    },
});

export default function Detalle_Pedido({pedido}) {

    const classes = useStyles();

    const totalClases = (pedido) => {
        var subTotal = 0;
        var total = 0;
        pedido.pedido?.map((pedido) => (
            pedido.clases.map(tipo => {
                if (tipo.statusAmount === false) {
                    tipo.types?.forEach(res => {
                        subTotal += parseInt(res.price);
                        total = subTotal;
                    });
                }
            })
        ))
        return total;
    }

    return (
        <div>
            <Grid className={classes.root}>
                <Grid item lg={12}>
                    <Box p={3} textAlign="center">
                        <Typography variant="h5">
                            Detalles de Pedido
                        </Typography>
                    </Box>
                </Grid>

                <Grid item lg={12}>
                    <Box textAlign="center" p={1}>
                        <Typography>
                            ID: {pedido._id}
                        </Typography>
                    </Box>
                    <Box textAlign="left" p={2}>
                        <Box>
                            <Typography color="textSecondary" gutterBottom>
                                <spam style={{fontWeight: 600}}>Cliente:</spam> {pedido.nombreCliente}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography  color="textSecondary" gutterBottom>
                                Tel: {pedido.telefono}
                            </Typography>
                        </Box>
                        <Box mt={2}>
                            <Typography component={'span'}  color="textSecondary" gutterBottom>
                                Tipo de Envio: <Chip style={pedido.tipoEnvio === "Recogera en Sucursal" ? {background:  "#48F273"} : {background: "yellow"}} label={pedido.tipoEnvio}  />
                            </Typography>
                        </Box>
                        <Box  mt={1}>
                            <Typography component={'span'}  color="textSecondary" gutterBottom>
                                Estatus Pedido: 
                                <Chip label={pedido.estadoPedido} />
                            </Typography>
                        </Box>
                        {pedido.sucursal ? (
                            <Box mt={1}>
                                <Typography component={'span'}  color="textSecondary" gutterBottom>
                                    Sucursal: 
                                    <Chip label={pedido.sucursal} />
                                </Typography>	
                            </Box>
                        ): null
                        }
                    </Box>
                    {
                        pedido.tipoEnvio === "Envio a Domicilio" ? (
                            <Box p={2}>
                                <Box textAlign="center" > 
                                    <Typography color="textSecondary">
                                        Domicilio
                                    </Typography>
                                </Box>
                                <Box textAlign="left">
                                    <Typography color="textSecondary">
                                        Calle {pedido.calleNumero} Col. {pedido.colonia}
                                    </Typography>
                                </Box>
                            </Box>
                        ) : null
                    }
                    <Box p={2}>
                        <Box textAlign="center">
                            <Typography>
                                Detalles de Compra
                            </Typography>
                        </Box>
                        {pedido.pedido?.map((producto, index) => (
                            <Accordion key={index}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Box mr={2} display="flex" alignItems="center" >
                                        <Typography component={'span'} variant="h2">{producto.cantidad}</Typography>
                                    </Box>
                                    <Box display="flex" alignItems="center" className={classes.column}>
                                        <Typography component={'span'} variant="h2" >{producto.nombre}</Typography>
                                    </Box>
                                    <Box display="flex" alignItems="center" className={classes.column2}>
                                        ${(totalClases(producto) * producto.cantidad) + (producto.precio * producto.cantidad)}
                                    </Box>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Box>
                                        <Typography component={'span'} variant="h2">
                                            MXN ${formatoMexico(producto.precio)} c/u
                                        </Typography>
                                    </Box>
                                </AccordionDetails>
                                {producto.clases?.map((tipo) => (
                                    <AccordionDetails>
                                        <Box display="flex" alignItems="center">
                                            {tipo.types.length === 0 ? null : (
                                                <Box>
                                                    <Typography variant="h2">
                                                        {tipo.nombre}
                                                    </Typography>
                                                </Box>
                                            )}
                                            <Box ml={2}>
                                                {tipo.types?.map((type) => (
                                                    <Chip color="primary" label={type.name} />
                                                ) )}
                                            </Box>
                                        </Box>
                                    </AccordionDetails>
                                ))}
                            </Accordion>
                        ))}
                        <Box  mt={1} textAlign="center">
                            <Typography variant="h4">
                                Total: ${formatoMexico(pedido.totalPedido)}
                            </Typography>
                        </Box>
                    </Box>

                </Grid>
            </Grid>
        </div>
    )
}
