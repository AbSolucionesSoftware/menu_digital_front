import {
	Grid,
	Typography,
	Box,
	Button,
	TextField,
	makeStyles,
	FormControl,
	InputLabel,
	Select
} from '@material-ui/core';
import React, { useCallback, useContext, useEffect, useState } from 'react';
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
	onChange: PropTypes.func.isRequired
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
						value: values.value
					}
				});
			}}
			thousandSeparator
			isNumericString
			prefix="$"
		/>
	);
}

const useStyles = makeStyles((theme) => ({
	text: {
		width: '100%'
	},
	select: {
		width: '100%',
		margin: '8px 0'
	},
	imagen: {
		maxHeight: '100%',
		maxWidth: '100%'
	},
	dropZone: {
		width: 300,
		height: 300,
		display: 'flex',
		justifyContent: 'center',
		alignContent: 'center',
		border: 'dashed 2px',
		borderColor: '#aaaaaa'
	},
	root: {
		minWidth: '50vw',
		display: 'flex'
	}
}));

export default function RegistroPlatillo(props) {
	const { producto, update, setUpdate, setProducto } = props;
	const [ validate, setValidate ] = useState(false);
	const token = localStorage.getItem('token');
	const company = JSON.parse(localStorage.getItem('user'));
	String.prototype.capitalize = function() {
		return this.charAt(0).toUpperCase() + this.slice(1);
	};
	const classes = useStyles();

	const [ preview, setPreview ] = useState('');
	const [ loading, setLoading ] = useState(false);
	const [ control, setControl ] = useState(false);

	const [ categories, setCategories ] = useState([ { categorie: '', subCategoria: [ { subcategoria: '' } ] } ]);
	const [ datos, setDatos ] = useState([]);
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

	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

	const messages = (status, message) => {
		setUpdate(!update);
		/* handleDrawerClose(); */
		setLoading(false);
		setSnackbar({
			open: true,
			mensaje: message,
			status: status
		});
	};

	const agregarPlatilloBD = async () => {
		if (!platillos.category || !platillos.subCategory || !platillos.name || !platillos.price) {
			setValidate(true);
			return;
		}
		setLoading(true);
		if (control === true) {
			const formData = new FormData();
			formData.append('category', platillos.category);
			formData.append('subCategory', platillos.subCategory);
			formData.append('name', platillos.name);
			formData.append('price', platillos.price);
			formData.append('description', platillos.description);
			formData.append('imagen', datos.imagen);

			await clienteAxios
				.post(`/product/${company._id}`, formData, {
					headers: {
						'Content-Type': 'multipart/form-data',
						Authorization: `bearer ${token}`
					}
				})
				.then((res) => {
					messages('success', 'Producto guardado');
                    setProducto(res.data.producto);
				})
				.catch((err) => {
					messages('error', 'Ocurrio un problema con el servidor');
				});
		} else {
			setLoading(true);
			const formData = new FormData();
			formData.append('category', platillos.category);
			formData.append('subCategory', platillos.subCategory);
			formData.append('name', platillos.name);
			formData.append('price', platillos.price);
			formData.append('description', platillos.description);

			if (datos.imagen) {
				formData.append('imagen', datos.imagen);
			}

			await clienteAxios
				.put(`/product/edit/${platillos._id}`, formData, {
					headers: {
						'Content-Type': 'multipart/form-data',
						Authorization: `bearer ${token}`
					}
				})
				.then((res) => {
					messages('success', 'Cambios realizados');
				})
				.catch((err) => {
					messages('error', 'Ocurrio un problema con el servidor');
				});
		}
	};

	const obtenerCategoriasBD = async () => {
		await clienteAxios
			.get(`/categories/${company._id}`)
			.then((res) => {
				setCategories(res.data);
			})
			.catch((err) => {});
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

	useEffect(() => {
		obtenerCategoriasBD();

		if (producto !== undefined) {
			setControl(false);
			setPreview(producto.imagenProductUrl);
			setPlatillos(producto);
		} else {
			setControl(true);
		}
	}, [ producto ]);

	// useEffect(() => {
	// 	if (producto) {
	// 		setPreview(producto.imagenProductUrl);
	// 	}
	// }, []);

	return (
		<div className={classes.root}>
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
						<Typography variant="h4">Registro de Platillo</Typography>
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
											helperText={
												!platillos.category && validate ? 'Esta campo es requerido' : null
											}
											id="categoria"
											name="category"
											value={platillos.category ? platillos.category : ''}
											onChange={onSelect}
											renderValue={(value) => value}
										>
											{categories.length !== 0 ? (
												categories.map((item, index) => (
													<option key={index} value={item.category}>
														{item.category}
													</option>
												))
											) : null}
										</Select>
									</FormControl>

									<FormControl className={classes.text}>
										<InputLabel htmlFor="age-native-simple">Sub-Categoria</InputLabel>
										<Select
											error={!platillos.subCategory && validate}
											helperText={
												!platillos.subCategory && validate ? 'Esta campo es requerido' : null
											}
											id="subcategoria"
											name="subCategory"
											value={platillos.subCategory ? platillos.subCategory : ''}
											onChange={obtenerCampos}
											renderValue={(value) => value}
										>
											{categories.length !== 0 ? (
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
											) : null}
										</Select>
									</FormControl>
								</Box>
								<Box>
									{/* {platillos} */}
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
											inputComponent: NumberFormatCustom
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
													<img
														alt="imagen del banner"
														src={preview}
														className={classes.imagen}
													/>
												</Box>
											) : isDragActive ? (
												<Typography>Suelta tu imagen aquí...</Typography>
											) : (
												<Typography>
													Arrastra y suelta tu imagen aquí, o selecciona una imagen haciendo
													click aquí
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
							onClick={() => {
								agregarPlatilloBD();
							}}
						>
							{control === true ? 'Registrar' : 'Actualizar'}
						</Button>
					</Box>
				</Grid>
			</Grid>
		</div>
	);
}
