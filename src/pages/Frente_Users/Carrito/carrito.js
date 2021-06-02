import { Box, Card,  Grid, Typography, Button, TextField, Accordion, AccordionSummary, AccordionDetails, IconButton, Chip,  RadioGroup, FormControlLabel, Radio, FormControl } from '@material-ui/core'
import React, {  useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { formatoMexico }from '../../../config/reuserFunction';
import PropTypes from 'prop-types';
import clienteAxios from '../../../config/axios';


import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import NumberFormat from 'react-number-format';
import DeleteIcon from '@material-ui/icons/Delete';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MessageSnackbar from '../../../components/Snackbar/snackbar';

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
    const [update, setUpdate] = useState(false);
    const [ total, setTotal] = useState(0);

    const [sucursalElegida, setSucursalElegida] = useState([]);
    const [ datosSucursal, setDatosSucursal ] = useState([]);
    const [ pedidos, setPedidos] = useState(carrito)
    const [ envio, setEnvio] = useState('sucursal');

    const [ snackbar, setSnackbar ] = useState({
		open: false,
		mensaje: '',
		status: ''
	});

    const classes = useStyles();

    function borrarCarrito() {
        localStorage.removeItem("carritoUsuario");
        setOpen(false);
        setTimeout(() => { 
        localStorage.removeItem('usuario');
        }, 2500)
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


    //FUNCION O CONSTANTE QUE RENDERIZA EL TOTAL DE CADA PRODUCTO DENTRO DEL PEDIDO
    const render_tipos = pedidos?.map((pedido) => (
        pedido.cantidad +`  `+ pedido.nombre +
            pedido.clases?.map((tipos) => (
                tipos.types.length === 0 ? `` : ( ` ( `+
                    tipos.nombre + tipos.types?.map((tipo) =>  (
                        ` `+ tipo.name + (tipo.price === "0" ? "" : (` --> $`+ tipo.price))
                    ))+ ` )`
                )
            )) 
        +` = $` + ((totalClases(pedido) * pedido.cantidad) + (pedido.precio*pedido.cantidad)) + (pedido.notas.notas ?  ` (`+ pedido.notas.notas +`)` : "")+ `%0A`
        ))
    

    //FUNCION PARA PODER SACAR EL TOTAL DE LOS PEDIDOS EN CASO DE TENER UN ENVIO EXTRA
    const sucursal_elegida = () => {
        if (empresa.sucursalesActive) {
            empresa.sucursales?.forEach(res => {
                if (res._id === sucursalElegida) {
                    return setDatosSucursal(res);
                }
            });
        }
    }
    
    //PARFA PODER SACAR LOS COSTOS DE LOS ENVIOS
    const costos_envios = () => {
        if (empresa.sucursalesActive) {
            return parseInt(datosSucursal.costoEnvio);
        }else{
            return parseInt(empresa.priceEnvio);
        }
    }
    
    const mensaje = (`¡Hola! me comunico desde *COMODY* y me gustaria realizar el siguiente pedido:%0A%0A${pedidos === null ? null : (render_tipos)}  ${envio === 'domicilio' ? `%0ACosto de envio: $`+ costos_envios() +`` : '' } %0ATotal de mi pedido:  $${formatoMexico(envio === "domicilio" ? (total + costos_envios()) : total)}%0A 
        ${envio === 'domicilio' ? (`%0AA mi domicilio `+(!usuario ? "" : (usuario.domicilio))+` , Col. `+(!usuario ? "" : (usuario.colonia))+`.%0A `) : `%0A Recogeré mi pedido en sucursal. %0A` }
        %0AA nombre de ${!usuario ? "" : usuario.nombre}, mi telefono ${!usuario ? "" : usuario.telefono}.%0A %0AGracias`);


    useEffect(() => {
        sucursal_elegida();
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
                        subTotalClases += (clases.totalClasificacion * res.cantidad)
                        totalClasificacion = subTotalClases ;
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
        if (empresa.sucursalesActive) {
            return ['Tu Orden', 'Datos Cliente', 'Sucursal'];
        }else{
            return ['Tu Orden', 'Datos Cliente'];
        }
    }

    const handleChangeSucursal = (event) => {
        setSucursalElegida(event.target.value);
       
    };

    const pedido = {
        "nombreCliente": usuario ? usuario.nombre : "",
        "tipoEnvio" : envio === "domicilio" ?  "Envio a Domicilio" : "Recogera en Sucursal",
        "calleNumero": usuario ? usuario.domicilio : "",
        "colonia": usuario ? usuario.colonia : "",
        "telefono": usuario ?  usuario.telefono : "",
        "estadoPedido": "Realizado",
        "sucursal": empresa.sucursalesActive ? datosSucursal.nombreSucursal : "",
        "pedido": carrito ? carrito : "",
        "totalPedido": envio === "domicilio" ? (total + costos_envios()) : total
    }

    const crearPedido = async () => {
        await clienteAxios
		.post(`/pedido/newPedido/${empresa._id}`, pedido)
        .then((res) => {
            setSnackbar({
                open: true,
                mensaje: "Pedido realizado con Exito",
                status: 'success'
            });
        }).catch((err) => {
            setSnackbar({
                open: true,
                mensaje: "Algo salio mal, intentalo de Nuevo",
                status: 'success'
            });
        });
    };


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
                                            ${(totalClases(producto) * producto.cantidad) + (producto.precio * producto.cantidad)}
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
                    <Grid item lg={12}>
                        <Box p={1} display="flex" justifyContent="center">
                            <Typography component={'span'} variant="h5" style={{ fontWeight: 600}}>
                                TOTAL: $
                                {formatoMexico(envio === "domicilio" ? (total + parseInt(empresa.priceEnvio)) : total)}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            );
          case 1:
            return (
                <Grid>
                    <Box display="flex" justifyContent="center" >
                        <Card>
                            <Grid item lg={12}>
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
                                    {/* <form noValidate autoComplete="off"> */}
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
                                            {!empresa.sucursalesActive ? (
                                                <Box textAlign="center" mt={1}>
                                                    <Typography component={'span'} variant="body1">Costo de Envio: ${formatoMexico(empresa.priceEnvio)}</Typography>
                                                </Box>
                                            ): null}
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
                                    {/* </form> */}
                                </Box>
                            </Grid>
                                {!empresa.sucursalesActive ? (
                                    <>
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
                                                            onClick={() => {
                                                                crearPedido()
                                                                borrarCarrito()
                                                            }}
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
                                                            onClick={() => {
                                                                crearPedido()
                                                                borrarCarrito()
                                                            }}
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
                                    </>
                                ) : null}
                        </Card>
                    </Box>
                </Grid>
            );
            case 2:
              return (
                <>
                <Box p={2}>
                    <FormControl component="fieldset">
                        <Box textAlign="center" p={2}>
                            <Typography variant="h6"> A que sucursal desea realizar su pedido:</Typography>
                        </Box>

                        <Box p={1} display="flex" justifyContent="center" textAlign="center">
                            <RadioGroup aria-label="gender" name="gender1" value={sucursalElegida} onChange={handleChangeSucursal}>
                                {
                                    empresa.sucursales?.map((sucursal, index) => (
                                        <> 
                                            <FormControlLabel key={index} value={sucursal._id} control={<Radio />} label={sucursal.nombreSucursal} />
                                        </>
                                    ))
                                }
                            </RadioGroup>
                        </Box>
                    </FormControl>
                </Box>
                {
                    envio === "domicilio" ? (
                        <Box textAlign="center" p={1}>
                            <Typography component={'span'} variant="body1">Costo de Envio: ${formatoMexico(costos_envios())}</Typography>
                        </Box>
                    ) : null
                }
                <Box textAlign="center">
                    {   envio === "sucursal"  ?  sucursalElegida.length === 0 || !carrito || !usuario || !usuario.nombre || !usuario.telefono ? (
                            <Button
                                disabled={true}
                                variant="contained" 
                                color="primary"
                                className={classes.buton}
                            >
                                Realizar Pedido
                            </Button>
                        ) : (
                            <a style={{textDecoration: "none" }} target="_blank" href={`https://api.whatsapp.com/send?phone=52${datosSucursal.telefonoSucursal}&text=${mensaje}`}>
                                <Button
                                    className={classes.buton}
                                    variant="contained" 
                                    color="primary"
                                    onClick={() => {
                                        crearPedido()
                                        borrarCarrito()
                                    }}
                                >
                                    Realizar Pedido
                                </Button>
                            </a>
                        ) :   sucursalElegida.length === 0||  !carrito || !usuario || !usuario.nombre || !usuario.telefono || !usuario.domicilio || !usuario.colonia  ? (
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
                            <a style={{textDecoration: "none" }} target="_blank" href={`https://api.whatsapp.com/send?phone=52${datosSucursal.telefonoSucursal}&text=${mensaje}`}>
                                <Button
                                    className={classes.buton}
                                    variant="contained" 
                                    color="primary"
                                    size="large"
                                    onClick={() => {
                                        crearPedido()
                                        borrarCarrito()
                                    }}
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
                </>
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
            <MessageSnackbar
				open={snackbar.open}
				mensaje={snackbar.mensaje}
				status={snackbar.status}
				setSnackbar={setSnackbar}
			/>
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
                            <Box p={1}>
                                <Button
                                    variant="contained" 
                                    color="secondary"
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    className={classes.backButton}
                                >
                                    Atras
                                </Button>
                            </Box>
                            {activeStep === steps.length -1 ? (
                                <Box p={1}>
                                    <Button
                                        className={classes.backButton}
                                        variant="contained" 
                                        color="primary"
                                        onClick={() => setOpen(false)}
                                    >
                                        Salir
                                    </Button>
                                </Box>
                            ) : (
                                <Box p={1}>
                                    <Button variant="contained" color="primary" onClick={handleNext}>
                                        Siguiente
                                    </Button>
                                </Box>
                               
                            )}
                    </Box>
                </div>
                )}
            </div>
        </>
    )
}
