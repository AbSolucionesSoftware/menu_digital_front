import { Grid, Typography, Box, Button, TextField, makeStyles, FormControl, InputLabel, Select, MenuItem, InputAdornment, FormControlLabel, Switch, Accordion, AccordionSummary, AccordionDetails, Chip, Checkbox } from '@material-ui/core'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { ImageContext } from '../../../../context/curso_context';
import clienteAxios from '../../../../config/axios';
import Spin from '../../../../components/Spin/spin';
import { useDropzone } from 'react-dropzone';
import MessageSnackbar from '../../../../components/Snackbar/snackbar';
import Alert from '@material-ui/lab/Alert';

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
    text:{
        width: "100%"
    },
    select: {
		width: '100%',
		margin: '8px 0'
	},
    imagen:{
        maxHeight: '100%',
		maxWidth: '100%'
    },
    dropZone: {
        width: 300,
        height: 300,
        display:"flex",
        justifyContent: "center",
        alignContent: "center",
        border: 'dashed 2px',
        borderColor: '#aaaaaa'
    }
}));

const FormStyles = makeStyles((theme) => ({
	input: {
		'& .MuiTextField-root': {
			margin: theme.spacing(1),
			width: '50%',
			[theme.breakpoints.down('xs')]: {
				width: '100%'
			}
		}
	},
	formControl: {
		margin: theme.spacing(1),
		width: '100%',
		[theme.breakpoints.down('xs')]: {
			width: '100%'
		}
	}
}));

export default function RegistroProducto(props) {
    const {productos, editarProducto, upload, setUpload, handleDrawerClose} = props;
	const [ validate, setValidate ] = useState(false);
	const token = localStorage.getItem('token');
    const company = JSON.parse(localStorage.getItem('user'));
    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    };
	const classes = useStyles();

    const { update, setUpdate} = useContext(ImageContext);
    const [ preview, setPreview ] = useState('');
	const [ loading, setLoading ] = useState(false);
    const [ control, setControl ] = useState(false);
    const [ types, setTypes ] = useState([]);
    
    const [ categories, setCategories ] = useState([ { categorie: '', subCategoria: [ { subcategoria: '' } ] } ]);
    const [ datos, setDatos] = useState([]);
    const [ platillos, setPlatillos ] = useState([]);

    const [ snackbar, setSnackbar ] = useState({
		open: false,
		mensaje: '',
		status: ''
	});

    const onSelect = (e) => {
        if (e.target.name === 'category') {
			setPlatillos({
				...platillos,
				category: e.target.value
			});
			return;
		}
	};

    const onDrop = useCallback(
		(files) => {
            setPreview(URL.createObjectURL(files[0]));
            setDatos({
                ...datos,
                imagen: files[0]
            });
		},
		[ datos, setDatos, setPreview ]
	);

    useEffect(() => {
        if (editarProducto) {
            setPreview(editarProducto.imagenProductUrl);
            setOpenExtra(editarProducto.extrasActive ? true : false)
        }
        
    }, [])

	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });


    const [ openExtra, setOpenExtra] = useState(false);

    const handleSwitch = (e) => {
        setOpenExtra(e.target.checked);
    }

    const agregarPlatilloBD = async () => {
        if (!platillos.category  || !platillos.subCategory || !platillos.name || !platillos.price ) {
			setValidate(true);
			return;
		}

        if (control === true) {
            setLoading(true);
            const formData = new FormData();
            formData.append("category", platillos.category);
            formData.append("subCategory", platillos.subCategory);
            formData.append("name", platillos.name);
            formData.append("price", platillos.price);
            formData.append("description", platillos.description);
            formData.append("imagen", datos.imagen);

            formData.append("extrasActive", openExtra);
            formData.append("extras", platillos.extras);
            formData.append("precioExtra", platillos.precioExtra);

            await clienteAxios
                .post(`/product/${company._id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `bearer ${token}`
                    }
                })
                .then((res) => {
                    // setUpload(!upload);
                    handleDrawerClose()
                    setLoading(false);
                    setSnackbar({
                        open: true,
                        mensaje: "Producto registrado exitosamente!.",
                        status: 'success'
                    });
                })
                .catch((err) => {
                    // setUpload(!upload);
                    handleDrawerClose()
                    setLoading(false);
                    setSnackbar({
                        open: true,
                        mensaje: "Ocurrio un problema con el servidor",
                        status: 'err'
                    });
                });
        }else{
            setLoading(true);
            const formData = new FormData();
            formData.append("category", platillos.category);
            formData.append("subCategory", platillos.subCategory);
            formData.append("name", platillos.name);
            formData.append("price", platillos.price);
            formData.append("description", platillos.description);
            
            formData.append("extrasActive", openExtra);
            formData.append("extras", platillos.extras);
            formData.append("precioExtra", platillos.precioExtra);
            
            if (datos.imagen) {
                formData.append("imagen", datos.imagen);
            }
            await clienteAxios
            .put(`/product/edit/${platillos._id}`,formData,  {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `bearer ${token}`
                }
            })
            .then((res) => {
                setUpload(!upload);
                handleDrawerClose();
                setLoading(false);
                setSnackbar({
                    open: true,
                    mensaje: "Producto editado!.",
                    status: 'success'
                });
            })
            .catch((err) => {
                setUpload(!upload);
                setLoading(false);
                setSnackbar({
                    open: true,
                    mensaje: "Ocurrio un problema con el servidor",
                    status: 'err'
                });
            });
        }

	}
  
    const consultarCatesNuevas = async () => {
		await clienteAxios
			.get(`/categories/${company._id}`)
			.then((res) => {
				setCategories(res.data);
			})
			.catch((err) => {
			})
	}

    const consultaTypes = async () => {
        await clienteAxios
        .get(`/classification/${company._id}`, {
            headers: {
                Authorization: `bearer ${token}`
            }
        }).then((res) => {
            setTypes(res.data);
            console.log(res.data);
        })
        .catch((err) => {
            setSnackbar({
                open: true,
                mensaje: "Ocurrio un problema en el servidor", 
                status: 'error'
            });
        });
    }

    useEffect(() => {
        consultaTypes();
        consultarCatesNuevas();

        if (editarProducto !== undefined) {
            setControl(false);
            setPlatillos(editarProducto);
        }else{
            setControl(true);
        }
    }, []);

    const [ extras, setExtras] = useState([]);

    const obtenerCampos = (e) => {
        if (e.target.name === 'category') {
			setPlatillos({
				...platillos,
				subCategory: ''
			});
			return;
		}
		setPlatillos({
			...platillos,
			[e.target.name]: e.target.value
		});
        setExtras(platillos.extras ? platillos.extras.split(",") : [])
	};

    

    
    return (
        <div>
            <MessageSnackbar
				open={snackbar.open}
				mensaje={snackbar.mensaje}
				status={snackbar.status}
				setSnackbar={setSnackbar}
			/>
            <Spin loading={loading} />
            <Grid container> 
                <Grid lg={12}>
                    <Box textAlign="center" p={1} mt={2}>
                        <Typography variant="h4">
                            Registro de Platillo
                        </Typography>
                    </Box>
                </Grid>
                <Grid container>
                    <Grid lg={12}>
                        <Box textAlign="center" display="flex" justifyContent="center">
                            <form noValidate autoComplete="off">
                                <Box p={2}>
                                    <FormControl className={classes.text}>
                                        <InputLabel htmlFor="age-native-simple">Categoria</InputLabel>
                                        <Select
                                            error={!platillos.category && validate}
                                            helperText={!platillos.category && validate ? 'Esta campo es requerido' : null}
                                            id="categoria"
									        name="category"
                                            value={platillos.category ? platillos.category : ""}
                                            onChange={onSelect}
                                            renderValue={(value) => value}
                                        >
                                            
                                            {
                                                categories.length !== 0 ? (
                                                    categories.map((item, index) => (
                                                        <option key={index} value={item.category}>
                                                            {item.category}
                                                        </option>
                                                    ))
                                                ) : (
                                                    null
                                                )
                                            }
                                        </Select>
                                    </FormControl>

                                    <FormControl className={classes.text}>
                                        <InputLabel htmlFor="age-native-simple">Sub-Categoria</InputLabel>
                                        <Select
                                            error={!platillos.subCategory && validate}
                                            helperText={!platillos.subCategory && validate ? 'Esta campo es requerido' : null}
                                            id="subcategoria"
									        name="subCategory"
                                            value={platillos.subCategory ? platillos.subCategory : ''}
										    onChange={obtenerCampos}
                                            renderValue={(value) => value}
                                        >
                                            {
                                                categories.length !== 0  ? (
                                                    categories.map((categorias) => {
                                                    if (platillos.category === categorias.category) {
                                                        return categorias.subCategories?.map((subCategorias) => {
                                                            return (
                                                                <option
                                                                    key={subCategorias._id}
                                                                    value={subCategorias.subCategory}
                                                                >
                                                                    {subCategorias.subCategory}
                                                                </option>
                                                            );
                                                        });
                                                    }
                                                        return null;
                                                    })
                                                ) : (
                                                    null
                                                )
                                            }
                                        </Select>
                                    </FormControl>
                                </Box>
                                <Box p={2}>
                                    <TextField
                                        error={!platillos.name && validate}
                                        helperText={!platillos.name && validate ? 'Esta campo es requerido' : null}
                                        className={classes.text}
                                        id="name"
                                        name="name"
                                        label="Platillo"
                                        placeholder="Platillo"
                                        value={platillos.name ? platillos.name : ''}
                                        multiline
                                        variant="outlined"
                                        onChange={obtenerCampos}
                                    />
                                </Box>
                                <Box p={2}>
                                    <TextField
                                        className={classes.text}
                                        id="description"
                                        name="description"
                                        label="Descripcion"
                                        placeholder="Descripcion"
                                        value={platillos.description ? platillos.description : ''}
                                        multiline
                                        variant="outlined"
                                        onChange={obtenerCampos}
                                    />
                                </Box>
                                <Box p={2}>
                                    <TextField
                                        error={!platillos.price && validate}
                                        helperText={!platillos.price && validate ? 'Esta campo es requerido' : null}
                                        className={classes.text}
                                        id="price"
                                        name="price"
                                        label="Precio"
                                        placeholder="Precio"
                                        value={platillos.price ? platillos.price : ''}
                                        variant="outlined"
                                        InputProps={{
                                            inputComponent: NumberFormatCustom,
                                        }}
                                        onChange={obtenerCampos}
                                    />
                                </Box>
                                {/* AGREGAR EXTRAS */}
                                <Grid>
                                    
                                    {
                                        types.map((type) => {
                                            return(
                                                <>
                                                    <Box display="flex" justifyContent="center" alignItems="center" textAlign="center">
                                                        <Switch
                                                            checked={openExtra}
                                                            onChange={handleSwitch}
                                                            color="primary"
                                                            name="checkedB"
                                                        />
                                                        {/* <Checkbox checked={openExtra} onChange={handleSwitch} name="checkedA" /> */}
                                                        <Typography variant="h5">
                                                            Extras
                                                        </Typography>
                                                    </Box>
                                                </>
                                            )
                                        })
                                        // openExtra === true ? (
                                        //     <>
                                        //         <Grid>
                                        //             <Box>
                                        //                 <Typography variant="h6">
                                        //                     Agrega los extras que pueda tener tu producto
                                        //                 </Typography>
                                        //             </Box>
                                        //             <Grid>
                                        //                 <Box p={2}>
                                        //                     <TextField
                                        //                         className={classes.text}
                                        //                         id="precioExtra"
                                        //                         name="precioExtra"
                                        //                         label="Precio de Extras"
                                        //                         placeholder="Precio de Extras"
                                        //                         multiline
                                        //                         variant="outlined"
                                        //                         InputProps={{
                                        //                             inputComponent: NumberFormatCustom,
                                        //                         }}
                                        //                         value={platillos.precioExtra ? platillos.precioExtra : ''}
                                        //                         onChange={obtenerCampos}
                                        //                     >
                                        //                     </TextField>
                                        //                 </Box>
                                        //                 <Box mt={2}>
                                        //                     <Typography variant="h6">
                                        //                         Agrega tus extras separados por comas.
                                        //                     </Typography>
                                        //                 </Box>
                                        //                 <Box p={1}>
                                        //                     <TextField
                                        //                         className={classes.text}
                                        //                         id="extras"
                                        //                         name="extras"
                                        //                         label="Nuevos Extras"
                                        //                         placeholder="cebolla, pepino, carne, arrache"
                                        //                         multiline
                                        //                         variant="outlined"
                                        //                         value={platillos.extras ? platillos.extras : ''}
                                        //                         onChange={obtenerCampos }
                                        //                     >
                                        //                     </TextField>
                                        //                 </Box>
                                        //                 <Box display="flex" justifyContent="center" textAlign="center" p={1}>
                                        //                     {
                                        //                         extras.map((extra, index) => {
                                        //                             return(
                                        //                                 <Box p={1}>
                                        //                                     <Chip
                                        //                                         color="primary" 
                                        //                                         key={index} 
                                        //                                         // onDelete={() => borrarExtra(index)} 
                                        //                                         label={extra} 
                                        //                                         // onClick={() => agregarExtras(extra)} 
                                        //                                     />
                                        //                                 </Box>
                                        //                             )
                                        //                         })
                                        //                     }
                                        //                 </Box>
                                        //             </Grid>
                                        //         </Grid>
                                        //     </>
                                        // ) : (
                                        //     <>
                                        //     </>
                                        // )
                                    }
                                </Grid>
                                {/* TERMINAR DE AGREGAR EXTRAS */}
                                <Grid item lg={12}>
                                    <Box textAlign="center" display="flex" justifyContent="center" mt={3}>
                                        <Alert severity="info">
                                            Tamaño recomendado para su imagen: Alto: 600px, Ancho: 600px
                                        </Alert>
                                    </Box>
                                </Grid>
                                <Grid container justify="center" item lg={12}>
                                    <Box p={2}>
                                        <Box
                                            p={2}
                                            mt={3}
                                            className={classes.dropZone}
                                            {...getRootProps()}
                                            height={200}
                                            display="flex"
                                            justifyContent="center"
                                            alignItems="center"
                                            textAlign="center"
                                        
                                        >
                                            <input {...getInputProps()} />
                                            {datos.imagen || preview ? (
                                                <Box display="flex" alignItems="center" justifyContent="center">
                                                    <img alt="imagen del banner" src={preview} className={classes.imagen} />
                                                </Box>
                                            ) : isDragActive ? (
                                                <Typography>Suelta tu imagen aquí...</Typography>
                                            ) : (
                                                <Typography>
                                                    Arrastra y suelta tu imagen aquí, o selecciona una imagen haciendo click aquí
                                                </Typography>
                                            )}
                                        </Box>
                                    </Box>
                                </Grid>
                            </form>
                        </Box>
                    </Grid>
                </Grid>
                <Grid lg={12} xs={12}>
                    <Box display="flex" justifyContent="center">
                        <Button
                            variant="contained" 
                            color="primary"
                            size="large"
                            onClick={ ()=> {
                                agregarPlatilloBD()
                            }}
                        >
                            {control === true
                            ? "Registrar"
                            : "Actualizar"}
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </div>
    )
}

function Clasificaciones() {

    return(
        <>
            
        </>
    )
}
