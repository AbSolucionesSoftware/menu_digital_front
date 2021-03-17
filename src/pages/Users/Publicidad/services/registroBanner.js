import { Box, Button, Grid, Typography } from '@material-ui/core'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import useStyles from '../styles';
import { ImageContext } from '../../../../context/curso_context';

import clienteAxios from '../../../../config/axios';
import Spin from '../../../../components/Spin/spin';
import { useDropzone } from 'react-dropzone';
import { Alert } from '@material-ui/lab';
import MessageSnackbar from '../../../../components/Snackbar/snackbar';


export default function RegistroBanner( props ) {
	const {editarBanner, handleDrawerClose} = props;

	const token = localStorage.getItem('token');
    const company = JSON.parse(localStorage.getItem('user'))
	const [ preview, setPreview ] = useState('');
	const [ datos, setDatos] = useState([]);
	const {  update, setUpdate} = useContext(ImageContext);
	const [ control, setControl ] = useState(false);
	const [ loading, setLoading ] = useState(false);

	const classes = useStyles();

	useEffect(() => {
		if (editarBanner) {
			setControl(true);
			setPreview(editarBanner.imagenBannerUrl);
			setDatos({
				...datos,
				imagen: editarBanner.imagenBannerUrl
			});
		}else{
			setControl(false);
		}
	}, [])

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

    const subirImagen = async () => {
		
		if (control === false) {
			
			if (!datos.imagen || !preview) {
				return;
			} else if (preview && preview.includes('https')) {
				return;
			}

			const formData = new FormData();
			formData.append("company", company._id); 
			formData.append("imagen", datos.imagen);

			setLoading(true);
			await clienteAxios
				.post(`/banner/`, formData, {
					headers: {
						'Content-Type': 'multipart/form-data',
						Authorization: `bearer ${token}`
					}
				})
				.then((res) => {
					handleDrawerClose(false);
					setLoading(false);
					setSnackbar({
						open: true,
						mensaje: 'Banner registrado exitosamente!',
						status: 'success'
					});
					setUpdate(!update);
				})
				.catch((err) => {
					handleDrawerClose(false)
					console.log(err);
					setLoading(false);
					setSnackbar({
						open: true,
						mensaje: 'Al parecer no se a podido conectar al servidor.',
						status: 'error'
					});
					setUpdate(!update);
				});
		}else{

			if (!datos.imagen || !preview) {
				return;
			} else if (preview && preview.includes('https')) {
				return;
			}

			const formData = new FormData();
			formData.append("imagen", datos.imagen);

			setLoading(true);
			await clienteAxios
				.put(`/banner/${editarBanner._id}`, formData, {
					headers: {
						'Content-Type': 'multipart/form-data',
						Authorization: `bearer ${token}`
					}
				})
				.then((res) => {
					setLoading(false);
					setSnackbar({
						open: true,
						mensaje: 'Banner editado exitosamente!',
						status: 'success'
					});
					setUpdate(!update);
					handleDrawerClose(true);
				})
				.catch((err) => {
					setLoading(false);
					console.log(err);
					setSnackbar({
						open: true,
						mensaje: 'Al parecer no se a podido conectar al servidor.',
						status: 'error'
					});
					setUpdate(!update);
					handleDrawerClose(true);

				});
		}
		
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
                <Grid item lg={12}>
                    <Box textAlign="center"  mt={10}>
                        <Typography variant="h4">
                            Registro de Imagen
                        </Typography>
                    </Box>
                </Grid>

                <Grid item lg={12}>
                    <Box textAlign="center" display="flex" justifyContent="center" mt={3}>
                        <Alert severity="info">
                            Tamaño recomendado para su imagen: Alto: 500px, Ancho: 1920px
                        </Alert>
                    </Box>
                </Grid>

                <Grid item lg={12} p={3}>
                    <Box
						p={3}
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
                </Grid>

                <Grid item lg={12}>
                    <Box textAlign="center" mt={4}>
                        <Button
                            variant="contained" 
                            color="primary"
                            size="large"
                            onClick={() => subirImagen()}
                        >
							{control === false ? "Registrar" : "Actualizar"}
                        </Button>
                    </Box>
                </Grid>
        </div>
    )
}
