import { Grid, Typography, Box, Button, TextField, makeStyles, FormControl, InputLabel, Select } from '@material-ui/core'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { ImageContext } from '../../../../context/curso_context';
import clienteAxios from '../../../../config/axios';
import Spin from '../../../../components/Spin/spin';
import { useDropzone } from 'react-dropzone';

const useStyles = makeStyles((theme) => ({
    text:{
        width: "100%"
    },
    image:{
        maxWidth: "100%",
        maxHeight: "100%"
    },
    containerImagen:{
        display:"flex",
        justifyContent: "center",
        alignContent: "center",
        width: 500,
        height: 500
    },
    imagen: {
        maxHeight: 300,
        maxWidth: 300
    },
    dropZone: {
    border: 'dashed 2px',
    borderColor: '#aaaaaa'
    }
}))

export default function RegistroProducto(props) {
    const {productos} = props;
	const token = localStorage.getItem('token');
    const company = JSON.parse(localStorage.getItem('user'));
    
    String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
    };

	const classes = useStyles();
    const { datos, setDatos, update, setUpdate, preview, setPreview } = useContext(ImageContext);

    const [ platillos, setPlatillos] = useState([]);
	const [ loading, setLoading ] = useState(false);

    const [ categorias, setCategorias] = useState([]);
    const [ categoriasDefault, setCategoriasDefault] = useState([]);
    const [ subCategoria, setSubCategoria ] = useState([]);
    const [ subcategoriasDefault, setSubcategoriasDefault ] = useState([]);

    const [ buttonCat, setButtonCat ] = useState(true);
    const [ item, setItem ] = useState();

    // Valores de Categorias
    const [ valueSelect, setValueSelect ] = useState();
    const [ valueSelectSub, setValueSelectSub ] = useState();
    const [ select, setSelect ] = useState('');
    const [ selectSub, setSelectSub ] = useState('');

    const onSelect = (value) => {
		setSelect(value[1]);
		setValueSelect(value[1]);
		// if (value) {
		// 	setDisabled(false);
		// } else {
		// 	setDisabled(true);
		// }
	};

    const onSelectSub = (value) => {
		setSelectSub(value[1]);
		setValueSelectSub(value[1]);
		// if (value) {
		// 	setDisabled(false);
		// } else {
		// 	setDisabled(true);
		// }
	};

    const [ snackbar, setSnackbar ] = useState({
		open: false,
		mensaje: '',
		status: ''
	});

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
    
	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    // const traerCategorias = async () => {
    //     await clienteAxios
	// 		.get(`/product/categories/${company._id}`)
	// 		.then((res) => {
    //             setCategorias(res.data);
	// 		})
	// 		.catch((err) => {
    //             // setLoading(false);
    //             console.log(err);
    //             console.log("error al traer");
	// 		});
    // }

    const agregarPlatilloBD = async () => {

        if (!datos.imagen || !preview) {
			return;
		} else if (preview && preview.includes('https')) {
			return;
		}

        const formData = new FormData();
        formData.append("category", categorias);
        formData.append("subCategory", subCategoria);
        formData.append("name", platillos.name);
        formData.append("price", platillos.price);
        formData.append("description", platillos.description);
        formData.append("imagen", datos.imagen);
    
        setLoading(true);
        await clienteAxios
			.post(`/product/${company._id}`, formData, {
                headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: `bearer ${token}`
				}
            })
			.then((res) => {
                setLoading(false);
                console.log("si jalo y registro");
				setSnackbar({
					open: true,
					mensaje: res.data.message,
					status: 'success'
				});
			})
			.catch((err) => {
                setLoading(false);
                console.log(err);
                console.log("error al registrar");
			});
	}

    useEffect(() => {
        // traerCategorias();
    }, []);

    const addItemCategoria = () => {
		setCategoriasDefault([ ...categoriasDefault, {category: item } ]);
        setCategorias(item);
		setSelect(item);
		// setDisabled(false);
		// setValueSelect(item);
		// form.resetFields();
	};

    const addItemSubCategoria = () => {
		setSubcategoriasDefault([ ...subcategoriasDefault, {subcategory: item } ]);
		// setSelectSub(item);
        setSubCategoria(item);
		// setDisabled(false);
		// setValueSelect(item);
		// form.resetFields();
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
			setButtonCat(false);
		} else {
			setButtonCat(true);
		}
	};

    return (
        <div>
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
                            <form className={classes.root} noValidate autoComplete="off">
                                <Box p={2}>
                                    <Box p={2}>
                                        <TextField
                                            className={classes.text}
                                            id=""
                                            label="Nueva Categoria"
                                            placeholder="Nueva Categoria"
                                            multiline
                                            variant="outlined"
                                            onChange={onCategoriaChange}
                                        />
                                    </Box>
                                    <Box textAlign="center" p={2}>
                                        <Button
                                            variant="contained" 
                                            color="primary"
                                            size="large"
                                            onClick={addItemCategoria}
                                        >
                                            Anadir
                                        </Button>
                                    </Box>
                                    <FormControl className={classes.text}>
                                        <InputLabel htmlFor="age-native-simple">Categoria</InputLabel>
                                        <Select
                                            native
                                            value={valueSelect}
                                            onChange={(e) => onSelect(e)}
                                        >
                                            <option aria-label="None" value="" />
                                            {categoriasDefault && categoriasDefault.length !== 0 ? (
                                                categoriasDefault.map((item) => (
                                                    <option key={item.category} value={item.category}>
                                                        {item.category}
                                                    </option>
                                                ))
                                            ) : null}
                                            {
                                                productos.map((item) => (
                                                    <option key={item.category} value={item.category}>
                                                        {item.category}
                                                    </option>
                                                ))
                                            }
                                        </Select>
                                    </FormControl>


                                    <Box p={2}>
                                        <TextField
                                            className={classes.text}
                                            id=""
                                            label="Nueva SubCategoria"
                                            placeholder="Nueva SubCategoria"
                                            multiline
                                            variant="outlined"
                                            onChange={onSubCategoriaChange}
                                        />
                                    </Box>
                                    <Box textAlign="center" p={2}>
                                        <Button
                                            variant="contained" 
                                            color="primary"
                                            size="large"
                                            onClick={addItemSubCategoria}
                                        >
                                            Anadir
                                        </Button>
                                    </Box>
                                    <FormControl className={classes.text}>
                                        <InputLabel htmlFor="age-native-simple">Sub-Categoria</InputLabel>
                                        <Select
                                            native
                                            value={valueSelect}
                                            onChange={(e) => onSelectSub(e)}
                                        >
                                            <option aria-label="None" value="" />
                                            {subcategoriasDefault && subcategoriasDefault.length !== 0 ? (
                                                subcategoriasDefault.map((item, index) => (
                                                    <option key={index} value={item.subcategory}>
                                                        {item.subcategory}
                                                    </option>
                                                ))
                                            ) : null}

                                            {
                                                productos.map((item) => (
                                                    <option key={item.subCategory} value={item.subCategory}>
                                                        {item.subCategory}
                                                    </option>
                                                ))
                                            }
                                        </Select>
                                    </FormControl>
                                </Box>
                                <Box p={2}>
                                    <TextField
                                        className={classes.text}
                                        id="name"
                                        label="Platillo"
                                        placeholder="Platillo"
                                        multiline
                                        variant="outlined"
                                        onChange={(e) =>
                                            setPlatillos({ ...platillos, name: e.target.value })
                                        }
                                    />
                                </Box>
                                <Box p={2}>
                                    <TextField
                                        className={classes.text}
                                        id="description"
                                        label="Descripcion"
                                        placeholder="Descripcion"
                                        multiline
                                        variant="outlined"
                                        onChange={(e) =>
                                            setPlatillos({ ...platillos, description: e.target.value })
                                        }
                                    />
                                </Box>
                                <Box p={2}>
                                    <TextField
                                        className={classes.text}
                                        id="price"
                                        label="Precio"
                                        placeholder="Precio"
                                        multiline
                                        variant="outlined"
                                        onChange={(e) =>
                                            setPlatillos({ ...platillos, price: e.target.value })
                                        }
                                    />
                                </Box>
                                <Box p={2}>
                                    <Box
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
                                            <Box height={200} display="flex" justifyContent="center" alignItems="center">
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
                <Grid lg={12}>
                    <Box textAlign="center">
                        <Button
                            variant="contained" 
                            color="primary"
                            size="large"
                            onClick={ ()=> agregarPlatilloBD()}
                        >
                            Registrar
                        </Button>
                    </Box>
                   
                </Grid>
            </Grid>
        </div>
    )
}
