import { Box, Card, CardContent, Grid, Typography, Button, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { formatoMexico }from '../../../config/reuserFunction';
import { ImageContext } from '../../../context/curso_context';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
import NumberFormat from 'react-number-format';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    buton:{
        width: "50%"
    },
    table: {
        minWidth: "auto",
    },
}))
function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;
  
    return (
      <NumberFormat
        {...other}
        getInputRef={inputRef}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
       
      />
    );
  }
  
  NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };


export default function Carrito(props) {
    const {setOpen, empresa} = props;
    const carrito = JSON.parse(localStorage.getItem('carritoUsuario'));

    const [ cliente, setCliente] = useState([]);
	const [ validate, setValidate ] = useState(false);
    const [ total, setTotal] = useState(0);
    const [ pedidos, setPedidos] = useState(carrito)
    const [ envio, setEnvio] = useState('sucursal');

    const handleChange = (event) => {
        setEnvio(event.target.value);
    };

    

    const classes = useStyles();

    function borrarCarrito() {
        localStorage.removeItem("carritoUsuario");
        setOpen(false);
    }

    const mensaje = 
        `¡Hola! me comunico desde *COMODY* y me gustaria realizar el siguiente pedido:%0A%0A ${pedidos === null ? null : pedidos.map((pedido) => (pedido.cantidad +`  `+ pedido.nombre +` = $`+ (pedido.precio*pedido.cantidad) + (pedido.notas.notas ?  `(`+ pedido.notas.notas +`)` : "")+ `%0A`
        ))} %0A Total de mi pedido:  $${formatoMexico(envio === "domicilio" ? (total + parseInt(empresa.priceEnvio)) : total)}%0A 
        ${envio === "domicilio" ? `%0A A mi domicilio ${cliente.domicilio}, Col. ${cliente.colonia}.%0A` : `%0A Recogeré mi pedido en sucursal. %0A` }
        %0A A nombre de ${cliente.nombre}, mi telefono ${cliente.telefono}.%0A %0AGracias`;

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
                <Box display="flex" justifyContent="center" >
                    <Card>
                        <Grid lg={12}>
                            <Box textAlign="center">
                            <FormControl component="fieldset">
                                <Typography variant="h6">Elige tu tipo de envio:</Typography>
                                <RadioGroup aria-label="tipoEnvio" name="tipoEnvio" value={envio} onChange={handleChange}>
                                    <FormControlLabel value="sucursal" control={<Radio />} label="Recoger en Sucursal" />
                                    <FormControlLabel value="domicilio" control={<Radio />} label="Envio a Domicilio" />
                                </RadioGroup>
                            </FormControl>
                            </Box>
                            <Box>
                                <form noValidate autoComplete="off">
                                    <Box mt={2} textAlign="center">
                                        <Typography variant="h5">
                                            Datos Cliente
                                        </Typography>
                                    </Box>
                                    <Box display="flex" justifyContent="center" flexWrap="wrap">
                                        <Box p={2}>
                                            <TextField
                                                error={!cliente.nombre && validate}
                                                helperText={!cliente.nombre && validate ? 'Esta campo es requerido' : null}
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
                                                InputProps={{
                                                    inputComponent: NumberFormatCustom,
                                                }}
                                                variant="outlined"
                                                onChange={(e) =>
                                                    setCliente({ ...cliente, telefono: e.target.value }, setValidate(true)) 
                                                }
                                            />
                                        </Box>
                                    </Box>
                                    {envio === "domicilio" ? (
                                    <> 
                                        <Box mt={1} textAlign="center">
                                            <Typography variant="h5">
                                                Dirección
                                            </Typography>
                                        </Box>
                                        <Box textAlign="center" mt={1}>
                                            <Typography variant="body1">Costo de Envio: ${formatoMexico(empresa.priceEnvio)}</Typography>
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
                                        </Box>
                                    </>
                                    ) : ( null )}
                                </form>
                            </Box>
                        </Grid>
                        <Grid>
                        {/* <Box textAlign="center">
                            <Typography variant="h5">
                                Tu pedido:
                            </Typography>
                        </Box> */}
                        </Grid>
                       
                        <Grid lg={12}>
                            <Box my={2} p={2} display="flex" justifyContent="center" alignItems="center">
                                <TableContainer component={Paper}>
                                    <Table className={classes.table} aria-label="simple table">
                                        <TableRow>
                                            <TableCell align="center" style={{ fontWeight: 600}} >Cant.</TableCell>
                                            <TableCell align="center" style={{ fontWeight: 600}} >Platillo</TableCell>
                                            <TableCell align="center" style={{ fontWeight: 600}} >Precio</TableCell>
                                            <TableCell align="center" style={{ fontWeight: 600}} >Total</TableCell>
                                        </TableRow>
                                        <TableBody>
                                        { pedidos === null ? (
                                            <Box></Box>
                                        ) : (
                                            pedidos.map((pedido) => (
                                                <TableRow key={pedido.name}>
                                                <TableCell align="center">{pedido.cantidad}</TableCell>
                                                <TableCell align="center">{pedido.nombre}</TableCell>
                                                <TableCell align="center">${formatoMexico(pedido.precio)}</TableCell>
                                                <TableCell align="center">${formatoMexico(pedido.precio * pedido.cantidad)}</TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        <Grid lg={12}>
                            <Box p={1} display="flex" justifyContent="center">
                                <Typography variant="h5" style={{ fontWeight: 600}}>
                                    TOTAL: $
                                    {formatoMexico(envio === "domicilio" ? (total + parseInt(empresa.priceEnvio)) : total)}
                                </Typography>
                            </Box>
                        </Grid>
                        </Grid>

                        <Box p={1} textAlign="center">
                            {envio === "sucursal"  ?  !cliente.nombre || !cliente.telefono ? (
                                <Button
                                disabled={true}
                                variant="contained" 
                                color="primary"
                                size="large"
                                className={classes.buton}
                                >
                                    Realizar Pedido
                                </Button>
                            ) : (
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
                                        onClick={() => borrarCarrito()}
                                    >
                                        Realizar Pedido
                                    </Button>
                                </a>
                             ):  !cliente.nombre || !cliente.telefono || !cliente.domicilio || !cliente.colonia ? (
                                <Button
                                    disabled={true}
                                    variant="contained" 
                                    color="primary"
                                    size="large"
                                    className={classes.buton}
                                    >
                                    Realizar Pedido
                                </Button>
                             ) : (
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
                                        onClick={() => borrarCarrito()}
                                    >
                                        Realizar Pedido
                                    </Button>
                                </a>
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
                               Nueva Orden
                            </Button>
                        </Box>
                        <Box p={1} textAlign="center">
                            <Button
                                className={classes.buton}
                                variant="contained" 
                                color="primary"
                                size="large"
                                onClick={() => setOpen(false)}
                            >
                               Salir
                            </Button>
                        </Box>
                    </Card>
                </Box>
        </div>
    )
}
