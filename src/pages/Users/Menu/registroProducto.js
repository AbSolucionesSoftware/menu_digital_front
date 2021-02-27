import { Grid, Typography, Box, Button, TextField, makeStyles, FormControl, InputLabel, Select } from '@material-ui/core'
import React, { useCallback, useContext, useState } from 'react'
import { ImageContext } from '../../../context/curso_context';
import clienteAxios from '../../../config/axios';
import Spin from '../../../components/Spin/spin';
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

export default function RegistroProducto() {

	const classes = useStyles();
    const { datos, setDatos, update, setUpdate, preview, setPreview } = useContext(ImageContext);
	const [ loading, setLoading ] = useState(false);
    const [ snackbar, setSnackbar ] = useState({
		open: false,
		mensaje: '',
		status: ''
	});

    // const handleChange = (event) => {
    //     const name = event.target.name;
    //     setState({
    //     ...state,
    //     [name]: event.target.value,
    //     });
    // };

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

    return (
        <div>
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
                            <FormControl className={classes.text}>
                                <InputLabel htmlFor="age-native-simple">Categoria</InputLabel>
                                <Select
                                    
                                    native
                                    // onChange={handleChange}
                                    inputProps={{
                                        name: 'age',
                                        id: 'age-native-simple',
                                    }}
                                >
                                    <option aria-label="None" value="" />
                                    <option value={30}>Thirty</option>
                                </Select>
                            </FormControl>
                            </Box>
                            <Box p={2}>
                                <TextField
                                    className={classes.text}
                                    id=""
                                    label="Platillo"
                                    placeholder="Platillo"
                                    multiline
                                    variant="outlined"
                                />
                            </Box>
                            <Box p={2}>
                                <TextField
                                    className={classes.text}
                                    id=""
                                    label="Descripcion"
                                    placeholder="Descripcion"
                                    multiline
                                    variant="outlined"
                                />
                            </Box>
                            <Box p={2}>
                                <TextField
                                    className={classes.text}
                                    id=""
                                    label="Precio"
                                    placeholder="Precio"
                                    multiline
                                    variant="outlined"
                                />
                            </Box>
                            <Box p={2}>
                                <Box
                                    mt={3}
                                    className={classes.dropZone}
                                    {...getRootProps()}
                                    height={100}
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
                        >
                            Registrar
                        </Button>
                    </Box>
                   
                </Grid>
            </Grid>
        </div>
    )
}
