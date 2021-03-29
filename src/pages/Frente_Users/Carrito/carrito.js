import { Box, Card,  Grid, Typography, Button, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, IconButton } from '@material-ui/core'
import React, {  useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { formatoMexico }from '../../../config/reuserFunction';
import PropTypes from 'prop-types';

import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import NumberFormat from 'react-number-format';
import DeleteIcon from '@material-ui/icons/Delete';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';

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
    const [ upload, setUpload ] = useState(false);
    const [ total, setTotal] = useState(0);
    const [ pedidos, setPedidos] = useState(carrito)
    const [ envio, setEnvio] = useState('sucursal');

    const classes = useStyles();

    const datos = {
        "nombre": "", 
        "telefono": "",
        "domicilio": "",
        "colonia": ""
    }
    function borrarCarrito() {
        localStorage.removeItem("carritoUsuario");
        setOpen(false);
        setTimeout(() => { 
        localStorage.removeItem('usuario');
        }, 3000)
    }

    function borrarProducto(key) {
        setUpload(!upload);
        carrito.forEach(function(elemento, indice, array) {
            if(key === indice){
                carrito.splice(key, 1);
                localStorage.setItem('carritoUsuario', JSON.stringify(carrito));
                setPedidos(carrito);
                setUpload(!upload);
            }
        })
    };

    const usuario = JSON.parse(localStorage.getItem('usuario'));

    const obtenerCampos = (e) => {
        setValidate(true);
		setCliente({
			...cliente,
			[e.target.name]: e.target.value
		});
        localStorage.setItem('usuario', JSON.stringify({...usuario, [e.target.name]: e.target.value}))
	};

    const mensaje =
        `¡Hola! me comunico desde *COMODY* y me gustaria realizar el siguiente pedido:%0A%0A ${pedidos === null ? null : pedidos.map((pedido) => (pedido.cantidad +`  `+ pedido.nombre +` = $`+ (pedido.precio*pedido.cantidad) + (pedido.notas.notas ?  `(`+ pedido.notas.notas +`)` : "")+ `%0A`
        ))} ${envio === "domicilio" ? `%0ACosto de envio: $${empresa.priceEnvio}` : "" } %0A Total de mi pedido:  $${formatoMexico(envio === "domicilio" ? (total + parseInt(empresa.priceEnvio)) : total)}%0A 
        ${envio === "domicilio" ? `%0AA mi domicilio ${!usuario ? "" : usuario.domicilio}, Col. ${!usuario ? "" : usuario.colonia}.%0A` : `%0A Recogeré mi pedido en sucursal. %0A` }
        %0A A nombre de ${!usuario ? "" : usuario.nombre}, mi telefono ${!usuario ? "" : usuario.telefono}.%0A %0AGracias`;

    useEffect(() => {
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
		},[pedidos, carrito, total]
	);

    const handleAlignment = (event, envio) => {
        setEnvio(envio);
    };

    function getSteps() {
        return ['Tu Orden', 'Datos Cliente'];
    }
      
    function getStepContent(step) {
        switch (step) {
          case 0:
            return (
                <>
                    <Grid lg={12}>
                        <Box my={2} p={2} display="flex" justifyContent="center" alignItems="center">
                            <TableContainer component={Paper}>
                                <Table className={classes.table} aria-label="simple table">
                                    <TableRow>
                                        <TableCell align="center" style={{ fontWeight: 600}} >Cantidad</TableCell>
                                        <TableCell align="center" style={{ fontWeight: 600}} >Platillo</TableCell>
                                        <TableCell align="center" style={{ fontWeight: 600}} >Precio</TableCell>
                                        <TableCell align="center" style={{ fontWeight: 600}} >Total</TableCell>
                                        <TableCell align="center" style={{ fontWeight: 600}} ></TableCell>
                                    </TableRow>
                                    <TableBody>
                                        {   pedidos === null ? (
                                                <Box></Box>
                                            ) : (
                                                pedidos.map((pedido, index) => (
                                                    <TableRow key={pedido.name}>
                                                        <TableCell align="center">{pedido.cantidad}</TableCell>
                                                        <TableCell align="center">{pedido.nombre}</TableCell>
                                                        <TableCell align="center">${formatoMexico(pedido.precio)}</TableCell>
                                                        <TableCell align="center">${formatoMexico(pedido.precio * pedido.cantidad)}</TableCell>
                                                        <TableCell align="center">
                                                            <IconButton 
                                                                onClick={
                                                                    () => borrarProducto(index)
                                                                } 
                                                                className={classes.margin}
                                                            >
                                                                <DeleteIcon fontSize="small" />
                                                            </IconButton>
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            )
                                        }
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
                </>
            );
          case 1:
            return (
                <>
                <Box display="flex" justifyContent="center" >
                    <Card>
                        <Grid lg={12}>
                            <Box textAlign="center">
                            <ToggleButtonGroup
                                 value={envio}
                                 exclusive
                                 onChange={handleAlignment}
                                 aria-label="text alignment"
                            >
                                <ToggleButton value="sucursal"  >
                                    <FastfoodIcon color="primary"/>
                                    <Typography >Recoger en Sucursal</Typography>
                                </ToggleButton>

                                <ToggleButton value="domicilio">
                                    <DirectionsBikeIcon  color="primary"/>
                                    <Typography>Servicio a Domicilio</Typography>
                                </ToggleButton>
                            </ToggleButtonGroup>
                            {/* <FormControl component="fieldset">
                                <Typography variant="h6">Elige tu tipo de envio:</Typography>
                                <RadioGroup aria-label="tipoEnvio" name="tipoEnvio" value={envio} onChange={handleChange}>
                                    <FormControlLabel value="sucursal" control={<Radio />} label="Recoger en Sucursal" />
                                    <FormControlLabel value="domicilio" control={<Radio />} label="Envio a Domicilio" />
                                </RadioGroup>
                            </FormControl> */}
                            </Box>
                            <Box>
                                <form noValidate autoComplete="off">
                                    <Box mt={2} textAlign="center">
                                        <Typography variant="h5">
                                            Tus Datos
                                        </Typography>
                                    </Box>
                                    <Box display="flex" justifyContent="center" flexWrap="wrap">
                                        <Box p={2}>
                                            <TextField
                                                // error={!usuario.nombre && validate}
                                                defaultValue={usuario ? usuario.nombre : ''}
                                                // helperText={!usuario.nombre && validate ? 'Esta campo es requerido' : null}
                                                id="nombre"
                                                name="nombre"
                                                label="Nombre"
                                                placeholder="Nombre"
                                                multiline
                                                variant="outlined"
                                                onChange={obtenerCampos}
                                            />
                                        </Box>
                                        <Box p={2}>
                                            <TextField
                                                // error={!cliente.telefono && validate}
                                                defaultValue={usuario ? usuario.telefono : ''}
                                                // helperText={!cliente.telefono && validate  ? 'Esta campo es requerido' : null}
                                                id="telefono"
                                                label="Telefono"
                                                name="telefono"
                                                placeholder="Telefono"
                                                multiline
                                                InputProps={{
                                                    inputComponent: NumberFormatCustom,
                                                }}
                                                variant="outlined"
                                                onChange={obtenerCampos}
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
                                                    // error={!cliente.domicilio && validateDom}
                                                    defaultValue={usuario ? usuario.domicilio : ''}
                                                    // helperText={!cliente.domicilio && validateDom  ? 'Esta campo es requerido' : null}
                                                    id="domicilio"
                                                    label="Calle y Numero"
                                                    placeholder="Calle y Numero"
                                                    name="domicilio"
                                                    multiline
                                                    variant="outlined"
                                                    onChange={obtenerCampos}
                                                />
                                            </Box>
                                            <Box p={2}>
                                                <TextField
                                                    // error={!cliente.colonia && validateDom}
                                                    value={!usuario ? "" : usuario.colonia}
                                                    // helperText={!cliente.colonia && validateDom  ? 'Esta campo es requerido' : null}
                                                    id="colonia"
                                                    label="Colonia"
                                                    name="colonia"
                                                    placeholder="Colonia"
                                                    multiline
                                                    variant="outlined"
                                                    onChange={obtenerCampos}
                                                />
                                            </Box>
                                        </Box>
                                    </>
                                    ) : ( null )}
                                </form>
                            </Box>
                        </Grid>

                            <Box textAlign="center">
                                {   envio === "sucursal"  ? !carrito || !usuario || !usuario.nombre || !usuario.telefono ? (
                                        <Button
                                            disabled={true}
                                            variant="contained" 
                                            color="primary"
                                            className={classes.buton}
                                        >
                                            Realizar Pedido
                                        </Button>
                                    ) : (
                                        <a target="_blank" href={`https://api.whatsapp.com/send?phone=52${empresa.phone}&text=${mensaje}`}>
                                            <Button
                                                className={classes.buton}
                                                variant="contained" 
                                                color="primary"
                                                onClick={() => borrarCarrito()}
                                            >
                                                Realizar Pedido
                                            </Button>
                                        </a>
                                    ) :   !carrito || !usuario || !usuario.nombre || !usuario.telefono || !usuario.domicilio || !usuario.colonia ? (
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
                                        <a target="_blank" href={`https://api.whatsapp.com/send?phone=52${empresa.phone}&text=${mensaje}`}>
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
                       
                    </Card>
                </Box>
                </>
            );
          default:
            return '';
        }
    }

    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();
  
    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    const handleReset = () => {
      setActiveStep(0);
    };

    return (
        <>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                <Step key={label}>
                    <StepLabel>
                        <Typography variant="h5">
                            {label}
                        </Typography>
                    </StepLabel>
                </Step>
                ))}
            </Stepper>
            <div>
                {activeStep === steps.length ? (
                <div>
                    {/* <Typography className={classes.instructions}>All steps completed</Typography> */}
                    <Button onClick={handleReset}>Volver</Button>
                </div>
                ) : (
                <div>
                    <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                    <Box display="flex" justifyContent="center">
                            <Button
                                variant="contained" 
                                color="secondary"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                className={classes.backButton}
                            >
                                Atras
                            </Button>
                            {activeStep === steps.length -1 ? (
                                <Box textAlign="center">
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
                            ) : (
                                <Button variant="contained" color="primary" onClick={handleNext}>
                                    Siguiente
                                </Button>
                            )}
                    </Box>
                </div>
                )}
            </div>
        </>
    )
}
