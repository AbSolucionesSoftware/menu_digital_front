import { Grid, Typography, Box, Button, TextField, makeStyles, FormControl, InputLabel, Select, MenuItem, InputAdornment } from '@material-ui/core'
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
    containerImagen:{
        display:"flex",
        justifyContent: "center",
        alignContent: "center",
        width: 500,
        height: 500
    },
    imagen: {
        maxHeight: 290,
        maxWidth: 290,
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
		width: '50%',
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
    const [ buttonCat, setButtonCat ] = useState(true);
    const [ buttonSubCat, setButtonSubCat ] = useState(true);
    const [ control, setControl ] = useState(false);

    const [ datos, setDatos] = useState([]);
    
    const [ categories, setCategories ] = useState([ { categorie: '', subCategoria: [ { subcategoria: '' } ] } ]);

    const [ subCategorias, setSubCategorias ] = useState([]);
    const [ platillos, setPlatillos ] = useState([]);

    const [ categoriasDefault, setCategoriasDefault] = useState([]);
    const [ subcategoriasDefault, setSubcategoriasDefault ] = useState([]);
    const [ item, setItem ] = useState();

    const [ snackbar, setSnackbar ] = useState({
		open: false,
		mensaje: '',
		status: ''
	});

    // Valores de Categorias
    const [ select, setSelect ] = useState();
    const [ selectSub, setSelectSub ] = useState();

    const onSelect = (e) => {
        if (e.target.name === 'category') {
			setPlatillos({
				...platillos,
				category: e.target.value
			});
			return;
		}
	};

    const onSelectSub = (event) => {
        setSelectSub(event.target.value);
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
        }
    }, [])

	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const agregarPlatilloBD = async () => {
        if (!platillos.category || !platillos.subCategory || !platillos.name || !platillos.price ) {
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

    const consultarCates = async () => {
		await clienteAxios
			.get(`/product/categories/${company._id}`)
			.then((res) => {
				setCategories(res.data);
			})
			.catch((err) => {
			})
	}

    useEffect(() => {
        consultarCates();
        if (editarProducto !== undefined) {
            setControl(false);
            setPlatillos(editarProducto);
        }else{
            setControl(true);
        }
    }, []);

    //TOMAR CATEGORIAS E INSERTAR UNA NUEVA

    const addItemCategoria = () => {
		setCategoriasDefault([ ...categoriasDefault, {category: item } ]);
		setSelect(item);
        
	};

    const addItemSubCategoria = () => {
		setSubcategoriasDefault([ ...subcategoriasDefault, {subcategory: item } ]);
		setSelectSub(item);
	};

    const onCategoriaChange = (e) => {
		if (e.target.value.length !== 0) {
			setItem(e.target.value.capitalize());
			setButtonCat(false);
		} else {
			setButtonCat(true);
		}
	};
    
    const onSubCategoriaChange = (e) => {
		if (e.target.value.length !== 0) {
			setItem(e.target.value.capitalize());
			setButtonSubCat(false);
		} else {
			setButtonSubCat(true);
		}
	};

   

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
                    <Box textAlign="center" p={5}>
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
                                    <Box p={2}>
                                        <Grid container >
                                            <Grid lg={9} xs={8}>
                                                <TextField
                                                    className={classes.text}
                                                    id="nuevaCategoria"
                                                    label="Nueva Categoria"
                                                    placeholder="Nueva Categoria"
                                                    multiline
                                                    // value={platillos.category ? '' : platillos.category}
                                                    variant="outlined"
                                                    onChange={onCategoriaChange}
                                                />
                                            </Grid>
                                            <Grid lg={2}  xs={3}>
                                                <Box p={1}>
                                                    <Button
                                                        disabled={buttonCat}
                                                        variant="contained" 
                                                        color="primary"
                                                        size="large"
                                                        onClick={addItemCategoria}
                                                    >
                                                        Anadir
                                                    </Button>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Box>
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
                                            {/* <option aria-label="None" value="" /> */}
                                            {categoriasDefault && categoriasDefault.length !== 0 ? (
                                                categoriasDefault.map((item, index) => (
                                                    <option key={index} value={item.category}>
                                                        {item.category}
                                                    </option>
                                                ))
                                            ) : null}
                                            {
                                                categories.map((item, index) => (
                                                    <option key={index} value={item.categoria}>
                                                        {item.categoria}
                                                    </option>
                                                ))
                                            }
                                        </Select>
                                    </FormControl>


                                    <Box p={2}>
                                        <Grid container >
                                            <Grid lg={9} xs={8}>
                                                <TextField
                                                    className={classes.text}
                                                    id=""
                                                    label="Nueva SubCategoria"
                                                    placeholder="Nueva SubCategoria"
                                                    multiline
                                                    // value={platillos.subCategory ? '' : platillos.subCategory}
                                                    variant="outlined"
                                                    onChange={onSubCategoriaChange}
                                                />
                                            </Grid>
                                            <Grid lg={2} xs={2}>
                                                <Box p={1}>
                                                    <Button
                                                        disabled={buttonSubCat}
                                                        variant="contained" 
                                                        color="primary"
                                                        size="large"
                                                        onClick={addItemSubCategoria}
                                                    >
                                                        Añadir
                                                    </Button>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Box>
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
                                            {/* <option aria-label="None" value="" /> */}
                                            {subcategoriasDefault && subcategoriasDefault.length !== 0 ? (
                                                subcategoriasDefault.map((item, index) => (
                                                    <option key={index} value={item.subcategory}>
                                                        {item.subcategory}
                                                    </option>
                                                ))
                                            ) : null}
                                            {
                                                categories.map((categorias) => {
                                                if (platillos.category === categorias.categoria) {
                                                    return categorias.subCategoria.map((subCategorias) => {
                                                        return (
                                                            <option
                                                                key={subCategorias._id}
                                                                value={subCategorias._id}
                                                            >
                                                                {subCategorias._id}
                                                            </option>
                                                        );
                                                    });
                                                }
                                                return null;
                                                })
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
                                <Grid item lg={12}>
                                    <Box textAlign="center" display="flex" justifyContent="center" mt={3}>
                                        <Alert severity="info">
                                            Tamaño recomendado para su imagen: Alto: 600px, Ancho: 600px
                                        </Alert>
                                    </Box>
                                </Grid>
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
                            </form>
                        </Box>
                    </Grid>
                </Grid>
                <Grid lg={12} xs={12}>
                    <Box p={2} display="flex" justifyContent="center">
                        <Button
                            variant="contained" 
                            color="primary"
                            size="large"
                            onClick={ ()=> agregarPlatilloBD()}
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
