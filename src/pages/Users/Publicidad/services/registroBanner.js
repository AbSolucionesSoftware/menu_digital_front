import { Box, Button, Grid, Typography } from '@material-ui/core'
import React, { useCallback, useContext, useState } from 'react'
import useStyles from '../styles';
import { ImageContext } from '../../../../context/curso_context';
import clienteAxios from '../../../../config/axios';
import Spin from '../../../../components/Spin/spin';
import { useDropzone } from 'react-dropzone';
import { Alert } from '@material-ui/lab';


export default function RegistroBanner( props ) {
	const {handleDrawerClose} = props;
    const classes = useStyles();
	const token = localStorage.getItem('token');
    const company = JSON.parse(localStorage.getItem('user'))
	const { datos, setDatos, update, setUpdate, preview, setPreview } = useContext(ImageContext);
	const [ loading, setLoading ] = useState(false);
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

	console.log(company._id);
	console.log(datos.imagen);

    const subirImagen = async () => {
		
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
				setLoading(false);
				handleDrawerClose();
				setSnackbar({
					open: true,
					mensaje: res.data.message,
					status: 'success'
				});
				setLoading(false);
				setUpdate(!update);
			})
			.catch((err) => {
				setLoading(false);
				if (err.response) {
					setSnackbar({
						open: true,
						mensaje: err.response.data.message,
						status: 'error'
					});
				} else {
					setSnackbar({
						open: true,
						mensaje: 'Al parecer no se a podido conectar al servidor.',
						status: 'error'
					});
				}
			});
	};

    return (
        <div>
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

                <Grid item lg={10}>
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
                </Grid>

                <Grid item lg={12}>
                    <Box textAlign="center" mt={4}>
                        <Button
                            variant="contained" 
                            color="primary"
                            size="large"
                            onClick={() => subirImagen()}
                        >
                            Registrar
                        </Button>
                    </Box>
                </Grid>
        </div>
    )
}
