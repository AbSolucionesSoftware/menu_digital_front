import { Box, Card, CardContent, Grid, Typography, Button, TextField } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { formatoMexico }from '../../../config/reuserFunction';
import { ImageContext } from '../../../context/curso_context';

const useStyles = makeStyles((theme) => ({
    buton:{
        width: "50%"
    }
}))

export default function Carrito(props) {
    const {setOpen, empresa} = props;
    const carrito = JSON.parse(localStorage.getItem('carritoUsuario'));

    const [ cliente, setCliente] = useState([]);
	const [ validate, setValidate ] = useState(false);
    const [total, setTotal] = useState(0);
    const [pedidos, setPedidos] = useState(carrito)
    
    const classes = useStyles();

    function borrarCarrito() {
        localStorage.removeItem("carritoUsuario");
        setOpen(false);
    }


    const mensaje = 
    `¡Hola!, me comunico desde *COMODY* y me gustaria realizar el siguiente pedido:%0A%0A 
    ${pedidos === null ? null : 
        pedidos.map((pedido) => (
        pedido.cantidad +` *  `+ pedido.nombre +`  ($${pedido.precio}) = $`+ (pedido.precio*pedido.cantidad) +` (`+pedido.notas.notas +`) %0A`
    ))} %0A Con un total de: $ ${total}%0A %0A A mi domicilio *${cliente.domicilio}*, *${cliente.colonia} en ${cliente.ciudad}*.%0A %0A A nombre de *${cliente.nombre}*, mi telefono *${cliente.telefono}*.%0A %0AGracias`;

    useEffect(
        
		() => {
			var subtotal = 0;
			var total = 0;
            
            if(pedidos === null){
                
            }else{
                pedidos.forEach((res) => {
                    subtotal += res.precio * res.cantidad;
                    total = subtotal;
                    setTotal(total);
                })
            }
		},
		[ pedidos ]
	);

    return (
        <div>
                <Grid lg={12}>
                    <Box p={3} textAlign="center">
                        <Typography variant="h4">
                            Tu pedido
                        </Typography>
                    </Box>
                </Grid>
                <Box display="flex" justifyContent="center" >
                    <Card>
                        <Grid lg={12}>
                            <Box>
                                <form noValidate autoComplete="off">
                                    <Box mt={2} textAlign="center">
                                        <Typography variant="h5">
                                            Tus datos personales:
                                        </Typography>
                                    </Box>
                                    <Box display="flex" justifyContent="center" flexWrap="wrap">
                                        <Box p={2}>
                                            <TextField
                                                error={!cliente.nombre && validate}
                                                helperText={!cliente.nombre && validate  ? 'Esta campo es requerido' : null}
                                                // className={classes.text}
                                                id="nombre"
                                                label="Nombre"
                                                placeholder="Nombre"
                                                multiline
                                                variant="outlined"
                                                onChange={(e) =>
                                                    setCliente({ ...cliente, nombre: e.target.value }, setValidate(true))
                                                }
                                            />
                                        </Box>
                                        <Box p={2}>
                                            <TextField
                                                error={!cliente.telefono && validate}
                                                helperText={!cliente.telefono && validate  ? 'Esta campo es requerido' : null}
                                                id="telefono"
                                                label="Telefono"
                                                placeholder="Telefono"
                                                multiline
                                                variant="outlined"
                                                onChange={(e) =>
                                                    setCliente({ ...cliente, telefono: e.target.value }, setValidate(true)) 
                                                }
                                            />
                                        </Box>
                                    </Box>
                                    <Box textAlign="center">
                                        <Typography variant="h5">
                                            Datos domiciliarios:
                                        </Typography>
                                    </Box>
                                    <Box display="flex" justifyContent="center" flexWrap="wrap">
                                        <Box p={2}>
                                            <TextField
                                                error={!cliente.domicilio && validate}
                                                helperText={!cliente.domicilio && validate  ? 'Esta campo es requerido' : null}
                                                id="domicilio"
                                                label="Calle y Numero"
                                                placeholder="Calle y Numero"
                                                multiline
                                                variant="outlined"
                                                onChange={(e) =>
                                                    setCliente({ ...cliente, domicilio: e.target.value }, setValidate(true))
                                                }
                                            />
                                        </Box>
                                        <Box p={2}>
                                            <TextField
                                                error={!cliente.colonia && validate}
                                                helperText={!cliente.colonia && validate  ? 'Esta campo es requerido' : null}
                                                id="colonia"
                                                label="Colonia"
                                                placeholder="Colonia"
                                                multiline
                                                variant="outlined"
                                                onChange={(e) =>
                                                    setCliente({ ...cliente,  colonia: e.target.value }, setValidate(true))
                                                }
                                            />
                                        </Box>
                                        <Box p={2}>
                                            <TextField
                                                error={!cliente.ciudad && validate}
                                                helperText={!cliente.ciudad && validate  ? 'Esta campo es requerido' : null}
                                                id="ciudad"
                                                label="Ciudad"
                                                placeholder="Ciudad"
                                                multiline
                                                variant="outlined"
                                                onChange={(e) =>
                                                    setCliente({ ...cliente, ciudad: e.target.value }, setValidate(true))
                                                }
                                            />
                                        </Box>
                                    </Box>
                                </form>
                            </Box>
                        </Grid>
                        <Grid>
                        <Box textAlign="center">
                            <Typography variant="h5">
                                Tu orden:
                            </Typography>
                        </Box>
                        </Grid>
                       
                        <Grid lg={12}>
                            <Box p={2} display="flex" justifyContent="center">
                                <Grid lg={5}>
                                    <Box  p={1}>
                                        <Typography variant="h6">
                                        Platillo
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid lg={2}>
                                    <Box  p={1}>
                                        <Typography variant="h6">
                                            Cantidad
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid lg={2}>
                                    <Box  p={1}>
                                        <Typography variant="h6">
                                            Precio
                                        </Typography>
                                    </Box>
                                </Grid>
                                
                                <Grid lg={3}>
                                    <Box  p={1}>
                                        <Typography variant="h6">
                                            Total
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Box>
                            { pedidos === null ? (
                                <Box></Box>
                            ) : (
                                pedidos.map((pedido) => (
                                    <Box p={2} display="flex" justifyContent="center">
                                        <Grid lg={5}>
                                            <Box  p={1}>
                                                <Typography variant="body1">
                                                    {pedido.nombre}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                        <Grid lg={2}>
                                            <Box  p={1}>
                                                <Typography variant="body1">
                                                    {pedido.cantidad}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                        <Grid lg={2}>
                                            <Box  p={1}>
                                                <Typography variant="body1">
                                                    ${formatoMexico(pedido.precio)}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                        
                                        <Grid lg={3}>
                                            <Box  p={1}>
                                                <Typography variant="body1">
                                                    ${pedido.precio * pedido.cantidad}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    </Box>
                                ))
                            )
                            }
                        <Grid lg={10}>
                            <Box p={2} display="flex" justifyContent="flex-end">
                                <Typography variant="h5">
                                TOTAL:  ${formatoMexico(total)}
                                </Typography>
                            </Box>
                        </Grid>
                        </Grid>

                        <Box p={1} textAlign="center">
                            { pedidos === null || validate === false? (
                                <Button 
                                variant="contained" 
                                color="primary"
                                size="large"
                                className={classes.buton}
                                >
                                    Realizar Pedido
                                </Button>
                            ) : cliente.nombre && cliente.telefono && cliente.ciudad && cliente.colonia && cliente.domicilio ? (
                                <a target="_blank" href={`https://api.whatsapp.com/send?phone=
                                    ${52 + empresa.phone}
                                    &text=
                                    ${mensaje}`} 
                                >
                                   
                                    <Button
                                        className={classes.buton}
                                        variant="contained" 
                                        color="primary"
                                        size="large"
                                    >
                                        Realizar Pedido
                                    </Button>
                                </a>
                             ): (
                                 null
                             )
                            }
                        </Box>
                        <Box p={1} textAlign="center">
                            <Button
                                className={classes.buton}
                                variant="contained" 
                                color="secondary"
                                size="large"
                                onClick={() => borrarCarrito()}
                            >
                               Borrar mi carrito
                            </Button>
                        </Box>
                    </Card>
                </Box>
        </div>
    )
}
