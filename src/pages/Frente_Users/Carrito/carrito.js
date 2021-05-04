import { Box, Card,  Grid, Typography, Button, TextField, Accordion, AccordionSummary, AccordionDetails, IconButton, Chip } from '@material-ui/core'
import React, {  useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { formatoMexico }from '../../../config/reuserFunction';
import PropTypes from 'prop-types';

import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import NumberFormat from 'react-number-format';
import DeleteIcon from '@material-ui/icons/Delete';
import FastfoodIcon from '@material-ui/icons/Fastfood';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { sub } from 'date-fns';
import clienteAxios from '../../../config/axios';

const useStyles = makeStyles((theme) => ({
    buton:{
        width: "50%"
    },
    table: {
        minWidth: "auto",
    },
    column: {
        flexBasis: '70%',
    },
    column2: {
        flexBasis: '15%',
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
        }, 3500)
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
        if (e.target.name === "domicilio" || e.target.name === "colonia") {
            setCliente({
                ...cliente,
                [e.target.name]: e.target.value.replace('#', 'No. ')
            });
        }else{
            setCliente({
                ...cliente,
                [e.target.name]: e.target.value
            });
        }
        
		
        localStorage.setItem('usuario', JSON.stringify({...usuario, [e.target.name]: e.target.value.replace('#', 'No. ')}))
	};

    const [totales, setTotales] = useState(0)
    
    const totalClases = (pedido) => {
        var subTotal = 0;
        var total = 0;
        pedido.clases?.map(tipo => {
            if (tipo.statusAmount === false) {
                tipo.types?.forEach(res => {
                    subTotal += parseInt(res.price);
                    total = subTotal;
                });
            }
        });
        return total;
    }

    const mensaje = (`¡Hola! me comunico desde *COMODY* y me gustaria realizar el siguiente pedido:%0A%0A${pedidos === null ? null : pedidos.map((pedido) => (pedido.cantidad +`  `+ pedido.nombre + (pedido.clases?.map((tipos) => (`%0A ( *`+ tipos.nombre + `* ` + (tipos.types?.map((tipo) => (` `+ tipo.name + (tipo.price === "0" ? "" : (` --> $`+ tipo.price)) ))) +`)` ))) +` = $` + (totalClases(pedido) + pedido.precio*pedido.cantidad) + (pedido.notas.notas ?  ` (`+ pedido.notas.notas +`)` : "")+ `%0A`))}  ${envio === 'domicilio' ? `%0ACosto de envio: $`+empresa.priceEnvio+`` : '' } %0ATotal de mi pedido:  $${formatoMexico(envio === "domicilio" ? (total + parseInt(empresa.priceEnvio)) : total)}%0A 
        ${envio === 'domicilio' ? (`%0AA mi domicilio `+(!usuario ? "" : (usuario.domicilio))+` , Col. `+(!usuario ? "" : (usuario.colonia))+`.%0A `) : `%0A Recogeré mi pedido en sucursal. %0A` }
        %0AA nombre de ${!usuario ? "" : usuario.nombre}, mi telefono ${!usuario ? "" : usuario.telefono}.%0A %0AGracias`);


    useEffect(() => {
			var subtotal = 0;
			var total = 0;

            var subTotalClases = 0;
            var totalClasificacion = 0;

            if(pedidos === null){
                return null
            }else{
                pedidos.forEach((res) => {
                    subtotal += res.precio * res.cantidad;
                    total = subtotal;
                    res.clases.forEach(clases => {
                        subTotalClases += clases.totalClasificacion
                        totalClasificacion = subTotalClases;
                    });
                })
                setTotal(total+totalClasificacion);
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
                <Grid>
                        {   pedidos === null ? (
                            <Box></Box>
                        ) : (
                            pedidos.map((producto, index) => {
                                return(
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

                                                ${totalClases(producto)+(producto.precio * producto.cantidad)}
                                            </Box>
                                            <Box  display="flex" alignItems="center" className={classes.column2} >
                                                <IconButton
                                                    size="small"
                                                    onClick={
                                                        () => borrarProducto(index)
                                                    } 
                                                    className={classes.margin}
                                                >
                                                    <DeleteIcon/>
                                                </IconButton>
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
                                )
                            })
                        )
                        }
                    <Grid lg={12}>
                        <Box p={1} display="flex" justifyContent="center">
                            <Typography component={'span'} variant="h5" style={{ fontWeight: 600}}>
                                TOTAL: $
                                {formatoMexico(envio === "domicilio" ? (total + parseInt(empresa.priceEnvio)) : total)}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
                // <>
                //     <Grid lg={12}>
                //         <Box my={2} p={2} display="flex" justifyContent="center" alignItems="center">
                //             <TableContainer component={Paper}>
                //                 <Table className={classes.table} aria-label="simple table">
                //                     <TableRow>
                //                         <TableCell align="center" style={{ fontWeight: 600}} >Cantidad</TableCell>
                //                         <TableCell align="center" style={{ fontWeight: 600}} >Platillo</TableCell>
                //                         <TableCell align="center" style={{ fontWeight: 600}} >Precio</TableCell>
                //                         <TableCell align="center" style={{ fontWeight: 600}} >Extras</TableCell>
                //                         <TableCell align="center" style={{ fontWeight: 600}} >Total</TableCell>
                //                         <TableCell align="center" style={{ fontWeight: 600}} ></TableCell>
                //                     </TableRow>
                //                     <TableBody>
                //                         {   pedidos === null ? (
                //                                 <Box></Box>
                //                             ) : (
                //                                 pedidos.map((pedido, index) => (
                //                                     <TableRow key={pedido.name}>
                //                                         <TableCell align="center">{pedido.cantidad}</TableCell>
                //                                         <TableCell align="center">{pedido.nombre}</TableCell>
                //                                         <TableCell align="center">${formatoMexico(pedido.precio)}</TableCell>
                //                                         {
                //                                             pedido.ingredienteExtra ? (
                //                                                 pedido.ingredienteExtra.length === 0 ?  <TableCell align="center"/> : <TableCell align="center">${formatoMexico(pedido.totalExtra)}</TableCell>
                //                                             ) : (
                //                                                 <TableCell align="center"/>
                //                                             )
                //                                         }
                //                                         <TableCell align="center">${formatoMexico(pedido.totalExtra ? (pedido.precio * pedido.cantidad + pedido.totalExtra) : (pedido.precio * pedido.cantidad))}</TableCell>
                //                                         <TableCell align="center">
                //                                             <IconButton 
                //                                                 onClick={
                //                                                     () => borrarProducto(index)
                //                                                 } 
                //                                                 className={classes.margin}
                //                                             >
                //                                                 <DeleteIcon fontSize="small" />
                //                                             </IconButton>
                //                                         </TableCell>
                //                                     </TableRow>
                //                                 ))
                //                             )
                //                         }
                //                     </TableBody>
                //                 </Table>
                //             </TableContainer>
                //         </Box>
                //         <Grid lg={12}>
                //             <Box p={1} display="flex" justifyContent="center">
                //                 <Typography variant="h5" style={{ fontWeight: 600}}>
                //                     TOTAL: $
                //                     {formatoMexico(envio === "domicilio" ? (total + parseInt(empresa.priceEnvio)) : total)}
                //                 </Typography>
                //             </Box>
                //         </Grid>
                //     </Grid>
                // </>
            );
          case 1:
            return (
                <Grid>
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
                                        <Typography component={'span'}>Recoger en Sucursal</Typography>
                                    </ToggleButton>

                                    <ToggleButton value="domicilio">
                                        <DirectionsBikeIcon  color="primary"/>
                                        <Typography component={'span'}>Servicio a Domicilio</Typography>
                                    </ToggleButton>
                                </ToggleButtonGroup>
                                </Box>
                                <Box>
                                    <form noValidate autoComplete="off">
                                        <Box mt={2} textAlign="center">
                                            <Typography component={'span'} variant="h5">
                                                Tus Datos
                                            </Typography>
                                        </Box>
                                        <Box display="flex" justifyContent="center" flexWrap="wrap">
                                            <Box p={2}>
                                                <TextField
                                                    defaultValue={usuario ? usuario.nombre : ''}
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
                                                    defaultValue={usuario ? usuario.telefono : ''}
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
                                                <Typography component={'span'} variant="h5">
                                                    Dirección
                                                </Typography>
                                            </Box>
                                            <Box textAlign="center" mt={1}>
                                                <Typography component={'span'} variant="body1">Costo de Envio: ${formatoMexico(empresa.priceEnvio)}</Typography>
                                            </Box>
                                            <Box display="flex" justifyContent="center" flexWrap="wrap">
                                                <Box p={2}>
                                                    <TextField
                                                        defaultValue={usuario ? usuario.domicilio : ''}
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
                                                        value={!usuario ? "" : usuario.colonia}
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
                                            <a style={{textDecoration: "none" }} target="_blank" href={`https://api.whatsapp.com/send?phone=52${empresa.phone}&text=${mensaje}`}>
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
                                            <a style={{textDecoration: "none" }} target="_blank" href={`https://api.whatsapp.com/send?phone=52${empresa.phone}&text=${mensaje}`}>
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
                </Grid>
            )
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
                        <Typography component={'span'} variant="h5">
                            {label}
                        </Typography>
                    </StepLabel>
                </Step>
                ))}
            </Stepper>
            <div>
                {activeStep === steps.length ? (
                <div>
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
