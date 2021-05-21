import React, { useEffect, useState } from 'react'
import Eliminar from './services/eliminarClase'
import EliminarSubTypes from './services/eliminarSubTypes'
import Editar_clase from './services/editar_clase';
import Editar_Subtypes from './services/editar_SubTypes'

import clienteAxios from '../../../config/axios'
import MessageSnackbar from '../../../components/Snackbar/snackbar';
import Spin from '../../../components/Spin/spin';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Dialog, DialogActions, DialogContent,  Grid,  ListItemText, makeStyles, TextField, Typography } from '@material-ui/core';

import { SketchPicker } from 'react-color';

import AddIcon from '@material-ui/icons/Add';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';


NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

//Funcion para tener siempre numeros
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
        thousandSeparator
        isNumericString
        prefix="$"
        />
    );
}
const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 200,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    column: {
        flexBasis: '90%',
    },
}));

export default function Clasificaciones() {
    const company = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    const classes = useStyles();
    const [ clasificacion, setClasificacion ] = useState([]);
    const [ types, setTypes ] = useState([]);
    const [ subTypes, setSubTypes ] = useState([])

    const [ active, setActive ] = useState(false);
    const [ upload, setUpload ] = useState(false);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [openC, setOpenC] = useState(false);

    const [background, setBackground] = useState('')

    const [ snackbar, setSnackbar ] = useState({
		open: false,
		mensaje: '',
		status: ''
	});

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleColorClose = () => {
        setOpenC(false);
    };

    const obtenerCampos = (e) => {
        setClasificacion({
			...clasificacion,
			[e.target.name]: e.target.value
		});
    };

    const handleChangeColor = (color) => {
        setBackground(color.hex);
    };


    const consultaTypes = async () => {
        // setLoading(true);
        await clienteAxios
        .get(`/classification/${company._id}`, {
            headers: {
                Authorization: `bearer ${token}`
            }
        }).then((res) => {
            setLoading(false);
            setTypes(res.data);
            setUpload(true);
        })
        .catch((err) => {
            setUpload(true);
            setLoading(false);
            setSnackbar({
                open: true,
                mensaje: "Ocurrio un problema en el servidor", 
                status: 'error'
            });
        });
    }

    const guardarClasificacion = async () => {
        setLoading(true)
        await clienteAxios
			.post(`/classification/${company._id}`,{
                "type": clasificacion.clasificacion
            }, {
                headers: {
                    Authorization: `bearer ${token}`
                }
            }).then((res) => {
                setLoading(false);
                setUpload(!upload);
                setClasificacion(null);
                setSnackbar({
					open: true,
					mensaje: res.data.message,
					status: 'success'
				});
			})
			.catch((err) => {
                setUpload(!upload);
                setSnackbar({
					open: true,
					mensaje: "Problemas al agregar clasificacion",
					status: 'error'
				});
			});
    }

    const guardarSubTypes = async (idSubType) => {
        setLoading(true)
        await clienteAxios
			.post(`/classification/action/${idSubType._id}/subClassification/`,{
                "name": clasificacion.name,
                "price": clasificacion.precio ? clasificacion.precio : 0
            }, {
                headers: {
                    Authorization: `bearer ${token}`
                }
            }).then((res) => {
                setClasificacion(null);
                setLoading(false);
                setUpload(!upload);
                setSnackbar({
					open: true,
					mensaje: res.data.message,
					status: 'success'
				});
			})
			.catch((err) => {
                setUpload(!upload);
                setSnackbar({
					open: true,
					mensaje: "Problemas al agregar clasificacion",
					status: 'error'
				});
			});
    }

    useEffect(() => {
        consultaTypes()
    }, [upload])

    const render = types?.map((type, index) => {
        return(
            <Accordion key={index}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    className="summary-acordion"
                >
                    <Box
                        width="100%"
					display="flex"
					onClick={(event) => event.stopPropagation()}
					onFocus={(event) => event.stopPropagation()}
                    >
                        <Box className={classes.column}>
                            <Typography variant="h6">{type.type}</Typography>
                        </Box>
                        <Box >
                            <Eliminar clase={type._id} upload={upload} setUpload={setUpload} />
                        </Box>
                        <Box >
                            <Editar_clase clase={type} upload={upload} setUpload={setUpload} />
                        </Box>
                    </Box>
                </AccordionSummary>
                <AccordionDetails>
                    <Button
                        onClick={() => {
                            handleClickOpen()
                            setSubTypes(type)
                        }}
                        variant="outlined"
                        color="primary"
                        startIcon={<AddIcon color="primary" />}
                    >
                        Agregar
                    </Button>
                </AccordionDetails>
                <AccordionDetails>
                    <Grid item lg={4} xs={12} >
                        <Box textAlign="center">
                            <Typography variant="h6">
                                Concepto
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item lg={3} xs={12}>
                        <Box textAlign="center" display="flex" alignItems="center" justifyContent="center" justifyItems="center">
                            <Box>
                                <Typography variant="h6">
                                    Precio
                                </Typography>
                            </Box>
                            <Box>
                                <AttachMoneyIcon/>
                            </Box>
                        </Box>
                    </Grid>
                </AccordionDetails>
                    {
                        type.types?.map((subType, index) => {
                            return(
                                <AccordionDetails key={index}>
                                    <Grid item lg={4} xs={12}>
                                        <Box textAlign="center">
                                            <ListItemText primary={subType.name} />
                                        </Box>
                                    </Grid>
                                    <Grid container item lg={3} justify="center" xs={12}>
                                        {
                                            subType.price === "0" ? (
                                                null
                                            ) : (
                                                <Box textAlign="center">
                                                    <Typography>
                                                        ${subType.price}
                                                    </Typography>
                                                </Box>
                                            )
                                        }
                                    </Grid>
                                    <Grid item lg={5} xs={12}>
                                        <Box display="flex" flexDirection="row-reverse"> 
                                            <Box display="flex" justifyItems="center" justifyContent="flex-end">
                                                <EliminarSubTypes upload={upload} setUpload={setUpload} clase={type._id} subType={subType._id} />
                                            </Box>
                                            <Box display="flex" justifyItems="center" justifyContent="flex-end">
                                                <Editar_Subtypes upload={upload} setUpload={setUpload} clase={type._id} subType={subType} />
                                            </Box>
                                        </Box>
                                        
                                    </Grid>
                                </AccordionDetails>
                            )
                        })
                    }

            </Accordion>
        )
    })

    return (
        <>
            <MessageSnackbar
				open={snackbar.open}
				mensaje={snackbar.mensaje}
				status={snackbar.status}
				setSnackbar={setSnackbar}
			/>
            <Spin loading={loading} />

            <Grid container>
                <Grid item lg={12} xs={12}>
                    <Box textAlign="center">
                        <Typography variant="h4">
                            Clasificaciones de Productos
                        </Typography>    
                    </Box>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item lg={7} xs={12}>
                    <Box p={2} textAlign="center">
                        <Box p={1}>
                            <Typography variant="h6">
                                Escribe y agrega las clasificacion que prefieras
                            </Typography>
                        </Box>
                        <Box>
                            <TextField
                                id="clasificacion"
                                name="clasificacion"
                                label="Clasificacion"
                                placeholder="Clasificacion"
                                multiline
                                variant="outlined"
                                onChange={obtenerCampos}
                            />
                        </Box>
                    </Box>
                </Grid>
                <Grid item lg={4} xs={12}>
                    <Box p={2} mt={2} textAlign="center">
                        <Button
                            variant="outlined"
                            size="large"
                            color="primary"
                            startIcon={<AddIcon color="primary" />}
                            onClick={() => guardarClasificacion()}
                        >
                            Agregar
                        </Button>
                    </Box>
                </Grid>
            </Grid>
            
            <Grid container justify="center">
                <Grid item lg={9}>
                    {render}
                </Grid>
            </Grid>

        {/* //DIALOGOS PARA PODER DAR LAS CARACTERISTICAS */}
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <Box p={2} textAlign="center">
                    <Typography variant="h6">
                        Agrega un nuevo valor
                    </Typography>
                </Box>
                <DialogContent>
                    <Grid>
                        <Box p={2}>
                            <TextField
                                label="Nombre"
                                color="primary"
                                variant="outlined"
                                name='name'
                                onChange={obtenerCampos}
                            />
                        </Box>
                        <Box p={2}>
                            <TextField
                                id="price"
                                name="precio"
                                label="Precio"
                                placeholder="Precio"
                                variant="outlined"
                                InputProps={{
                                    inputComponent: NumberFormatCustom,
                                }}
                                onChange={obtenerCampos}
                            />
                        </Box>
                        {/* PARA LOS COLORES COSA QUE SE DESACTIVO POR MUCHOS DETALLES EN LOS COLORES */}
                        {/* <Box textAlign="center">
                            <Box display="flex" textAlign="center" alignItems="center" justifyContent="center">
                                <Typography>
                                    Color
                                </Typography>
                                <Switch
                                    checked={checked}
                                    onChange={handleSwitch}
                                    color="primary"
                                    name="checkedB"
                                />
                            </Box>
                            {
                                checked === true ? (
                                    <div>
                                        <Button
                                            variant="outlined"
                                            onClick={handleColor}
                                        >
                                            Color
                                        </Button>
                                    </div>
                                ): (
                                    null
                                )
                            }
                        </Box> */}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        handleClose()
                        guardarSubTypes(subTypes)
                    }} color="primary">
                        Agregar
                    </Button>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>

        {/* DIALOGO PARA EL COLOR */}
            <Dialog
                open={openC}
                onClose={handleColorClose}
            >
                <SketchPicker
                    color={ background }
                    onChangeComplete={handleChangeColor}
                />
            </Dialog>
        </>
    )
}
