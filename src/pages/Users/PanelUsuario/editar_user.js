import { Box, Button, Dialog, DialogTitle, Grid, makeStyles, TextField, Typography } from '@material-ui/core'
import { Alert } from '@material-ui/lab';
import { useDropzone } from 'react-dropzone';
import React, { useCallback, useEffect, useState } from 'react'
import MessageSnackbar from '../../../components/Snackbar/snackbar';
import Spin from '../../../components/Spin/spin';
import clienteAxios from '../../../config/axios';
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
      />
    );
}
NumberFormatDinero.propTypes = {
    inputRef: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

function NumberFormatDinero(props) {
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


export default function Editar_User(props) {
    const {handleDrawerClose, datosEmpresa, setDatosEmpresa, setUpload, upload} = props;
    const [open, setOpen] = useState(false);
	const [ loading, setLoading ] = useState(false);
    const [ validate, setValidate ] = useState(false);
    const [contrasena, setContrasena] = useState([]); 
    const [ redesSociales, setRedesSociales] = useState([]);

    const [ snackbar, setSnackbar ] = useState({
		open: false,
		mensaje: '',
		status: ''
	});

	const token = localStorage.getItem('token');

	const classes = useStyles();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setUpload(!upload);
        setOpen(false);
    };
//---------------------------------EDICION DE IMAGENES-----------------------------------------------
    const [ preview, setPreview ] = useState('');
    const [ datos, setDatos] = useState([]);

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
        if (datosEmpresa) {
            setPreview(datosEmpresa.logoImagenUrl);
        }
    }, [])

	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

//---------------------------FIN EDICION DE IMAGENES-----------------------------------------------
    const editarDatos = async () => {
    
	    setLoading(true);
        if (!datosEmpresa.nameCompany || !datosEmpresa.owner || !datosEmpresa.phone || !datosEmpresa.priceEnvio || !datosEmpresa.cpPrin || !datosEmpresa.calleNumeroPrin
            || !datosEmpresa.ciudadPrin || !datosEmpresa.estado || !datosEmpresa.coloniaPrin) {
			setValidate(true);
            setLoading(false);
			return;
		}

        const formData = new FormData();
        formData.append("nameCompany", datosEmpresa.nameCompany);
        formData.append("owner", datosEmpresa.owner);
        formData.append("phone", datosEmpresa.phone);
        formData.append("calleNumeroPrin", datosEmpresa.calleNumeroPrin);
        formData.append("cpPrin", datosEmpresa.cpPrin);
        formData.append("coloniaPrin", datosEmpresa.coloniaPrin);
        formData.append("ciudadPrin", datosEmpresa.ciudadPrin);
        formData.append("estado", datosEmpresa.estado);

        if (redesSociales.facebook === undefined){
            formData.append("redesSociales.facebook",  '');
        }
        if( redesSociales.instagram  === undefined){
            formData.append("redesSociales.instagram", '');
        }
        if( redesSociales.twiter  === undefined){
            formData.append("redesSociales.twiter", '');
        }else{
            formData.append("redesSociales.facebook", redesSociales.facebook);
            formData.append("redesSociales.instagram", redesSociales.instagram);
            formData.append("redesSociales.twiter", redesSociales.twiter);
        }

        if (datosEmpresa.priceEnvio === "") {
            formData.append("priceEnvio", "0");
        }else{
            formData.append("priceEnvio", datosEmpresa.priceEnvio);
        }
        if (datos.imagen) {
            formData.append("imagen", datos.imagen);
        }

        await clienteAxios
			.put(`/company/${datosEmpresa._id}`, formData, 
            {
				headers: {
					Authorization: `bearer ${token}`
				}
			})
			.then((res) => {
                setLoading(false);
                handleDrawerClose();
                setUpload(!upload);
                setSnackbar({
					open: true,
					mensaje: 'Usuario editado exitosamente!',
					status: 'success'
				});
			})
			.catch((err) => {
                setLoading(false);
                setSnackbar({
                    open: true,
                    mensaje: 'Al parecer no se a podido conectar al servidor.',
                    status: 'error'
                });
			});
    }

    const newPass = { 
        "currentPassword": contrasena.currentPassword,
        "password": contrasena.password,
        "repeatPassword" : contrasena.repeatPassword
    }

    const cambiarPassword = async (empresa) => {
        setLoading(true);
        clienteAxios
        .put(
            `/company/resetPass/user/${empresa._id}`, newPass,
            {
                headers: {
                    Authorization: `bearer ${token}`
                }
            }
        )
        .then((res) => {
            setLoading(false);
            handleClose()
            setUpload(!upload);
            setSnackbar({
                open: true,
                mensaje: 'Contraseña editada exitosamente!',
                status: 'success'
            });

        }).catch((err) => {
            setLoading(false);
            setSnackbar({
                open: true,
                mensaje: err.response.data.message,
                status: 'error'
            });

        });
    };


    const onChangeEmpresa = (e) => {
        setDatosEmpresa({
            ...datosEmpresa,
            [e.target.name]: e.target.value
        });
    }
    
    const onChangeRedes = (e) => {
        setRedesSociales({
            ...redesSociales,
            [e.target.name]: e.target.value
        });
    }

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
                <Grid item lg={12}>
                    <Box textAlign="center" p={4}>
                        <Typography variant="h4">
                            Editar mi empresa
                        </Typography>
                    </Box>
                </Grid>
                <Grid item lg={12}>
                    <Box mt={2} textAlign="center">
                            <Box p={2}>
                                <TextField
                                    defaultValue={datosEmpresa.nameCompany}
                                    className={classes.text}
                                    error={!datosEmpresa.nameCompany && validate}
									helperText={!datosEmpresa.nameCompany && validate ? 'Esta campo es requerido' : null}
                                    name="nameCompany"
                                    id="nameCompany"
                                    label="Nombre de Compania"
                                    placeholder="Nombre de Compania"
                                    multiline
                                    variant="outlined"
                                    onChange={onChangeEmpresa}
                                />
                            </Box>
                            {/* <Box p={1} display="flex" justifyContent="center" flexWrap="wrap">
                                <Alert severity="info">Un identificador para poder distinguir tu Negocio en el navegador</Alert>
                            </Box> */}
                            {/* <Box p={2}>
                                <TextField
                                    defaultValue={datosEmpresa.slug}
                                    className={classes.text}
                                    id="slug"
                                    label="Identificador"
                                    placeholder="Identificador"
                                    multiline
                                    variant="outlined"
                                    onChange={(e) =>
                                        setDatosEmpresa({ ...datosEmpresa, slug: e.target.value.replace(' ', '-').toLowerCase()})
                                    }
                                />
                            </Box> */}
                            <Box p={2}>
                                <TextField
                                    error={!datosEmpresa.owner && validate}
                                    helperText={!datosEmpresa.owner && validate ? 'Esta campo es requerido' : null}
                                    defaultValue={datosEmpresa.owner}
                                    className={classes.text}
                                    name="owner"
                                    id="owner"
                                    label="Propietario"
                                    placeholder="Propietario"
                                    multiline
                                    variant="outlined"
                                    onChange={onChangeEmpresa}
                                />
                            </Box>
                            <Box p={2}>
                                <TextField
                                    error={!datosEmpresa.phone && validate}
                                    helperText={!datosEmpresa.phone && validate ? 'Esta campo es requerido' : null}
                                    defaultValue={datosEmpresa.phone}
                                    className={classes.text}
                                    id="phone"
                                    name="phone"
                                    label="Telefono"
                                    placeholder="Telefono"
                                    multiline
                                    variant="outlined"
                                    InputProps={{
                                        inputComponent: NumberFormatCustom,
                                    }}
                                    onChange={onChangeEmpresa}
                                />
                            </Box>
                            <Box p={2}>
                                <TextField
                                    error={!datosEmpresa.priceEnvio && validate}
                                    helperText={!datosEmpresa.priceEnvio && validate ? 'Esta campo es requerido' : null}
                                    defaultValue={datosEmpresa.priceEnvio}
                                    className={classes.text}
                                    id="priceEnvio"
                                    name="priceEnvio"
                                    label="Costo de Envio"
                                    placeholder="Costo de Envio"
                                    multiline
                                    variant="outlined"
                                    InputProps={{
                                        inputComponent: NumberFormatDinero,
                                    }}
                                    onChange={onChangeEmpresa}
                                />
                            </Box>

                            {/* Datos DOMICILIARIOS */}
                            <Box textAlign="center" p={3}>
                                <Typography variant="h6">
                                   Datos Domiciliarios
                                </Typography>
                            </Box>
                            <Box display="flex" justifyContent="center" flexWrap="wrap">
                                <Box p={1}>
                                    <TextField
                                        error={!datosEmpresa.calleNumeroPrin && validate}
                                        helperText={!datosEmpresa.calleNumeroPrin && validate ? 'Esta campo es requerido' : null}
                                        defaultValue={datosEmpresa.calleNumeroPrin ? datosEmpresa.calleNumeroPrin : null}
                                        className={classes.text}
                                        name="calleNumeroPrin"
                                        id="calleNumeroPrin"
                                        label="Calle y Numero"
                                        placeholder="Calle y Numero"
                                        multiline
                                        variant="outlined"
                                        onChange={onChangeEmpresa}
                                    />
                                </Box>
                                <Box p={1}>
                                    <TextField
                                        error={!datosEmpresa.cpPrin && validate}
                                        helperText={!datosEmpresa.cpPrin && validate ? 'Esta campo es requerido' : null}
                                        defaultValue={datosEmpresa.cpPrin ? datosEmpresa.cpPrin : null}
                                        className={classes.text}
                                        name="cpPrin"
                                        id="cpPrin"
                                        label="Codigo Postal"
                                        placeholder="Codigo Postal"
                                        multiline
                                        variant="outlined"
                                        onChange={onChangeEmpresa}
                                    />
                                </Box>
                            </Box>
                            <Box display="flex" justifyContent="center" flexWrap="wrap">
                                <Box p={1}>
                                    <TextField
                                    error={!datosEmpresa.coloniaPrin && validate}
									helperText={!datosEmpresa.coloniaPrin && validate ? 'Esta campo es requerido' : null}
                                        defaultValue={datosEmpresa.coloniaPrin ? datosEmpresa.coloniaPrin : null}
                                        className={classes.text}
                                        name="coloniaPrin"
                                        id="coloniaPrin"
                                        label="Colonia"
                                        placeholder="Colonia"
                                        multiline
                                        variant="outlined"
                                        onChange={onChangeEmpresa}
                                    />
                                </Box>
                                <Box p={1}>
                                    <TextField
                                    error={!datosEmpresa.ciudadPrin && validate}
									helperText={!datosEmpresa.ciudadPrin && validate ? 'Esta campo es requerido' : null}
                                        defaultValue={datosEmpresa.ciudadPrin ? datosEmpresa.ciudadPrin : null}
                                        className={classes.text}
                                        name="ciudadPrin"
                                        id="ciudadPrin"
                                        label="Ciudad"
                                        placeholder="Ciudad"
                                        multiline
                                        variant="outlined"
                                        onChange={onChangeEmpresa}
                                    />
                                </Box>
                            </Box>
                            <Box p={1}>
                                <TextField
                                error={!datosEmpresa.estado && validate}
                                helperText={!datosEmpresa.estado && validate ? 'Esta campo es requerido' : null}
                                    defaultValue={datosEmpresa.estado ?  datosEmpresa.estado : null}
                                    style={{width: "50%"}}
                                    id="estado"
                                    name="estado"
                                    label="Estado"
                                    placeholder="Estado"
                                    multiline
                                    variant="outlined"
                                    onChange={ onChangeEmpresa }
                                />
                            </Box>
                            {/* REDES SOCIALES */}
                            <Box textAlign="center" p={3}>
                                <Typography variant="h6">
                                   Redes Sociales
                                </Typography>
                            </Box>
                            <Box p={2}>
                                <TextField
                                    defaultValue={datosEmpresa.redesSociales ?  datosEmpresa.redesSociales.facebook: null}
                                    className={classes.text}
                                    id="facebook"
                                    name="facebook"
                                    label="Facebook"
                                    placeholder="Link completo de tu red social"
                                    multiline
                                    variant="outlined"
                                    onChange={ onChangeRedes }
                                />
                            </Box>
                            <Box p={2}>
                                <TextField
                                    defaultValue={datosEmpresa.redesSociales ?  datosEmpresa.redesSociales.twiter : null}
                                    className={classes.text}
                                    id="twiter"
                                    name="twiter"
                                    label="Twitter"
                                    placeholder="Link completo de tu red social"
                                    multiline
                                    variant="outlined"
                                    onChange={ onChangeRedes }
                                />
                            </Box>
                            <Box p={2}>
                                <TextField
                                    defaultValue={datosEmpresa.redesSociales ? datosEmpresa.redesSociales.instagram : null}
                                    className={classes.text}
                                    id="instagram"
                                    name="instagram"
                                    label="Instagram"
                                    placeholder="Link completo de tu red social"
                                    multiline
                                    variant="outlined"
                                    onChange={ onChangeRedes }
                                />
                            </Box>

                            {/* ICONO DE LA IMAGEN */}
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
                    </Box>
                    <Box display="flex" justifyContent="center" flexWrap="wrap">
                        <Button
                             variant="contained" 
                             color="primary"
                             onClick={ () => editarDatos()}
                        >
                            Guardar
                        </Button>
                    </Box>
                    <Box p={3} textAlign="center">
                        <Button
                            variant="contained" 
                            color="primary"
                            onClick={handleClickOpen}
                        >
                            Cambiar Contraseña
                        </Button>
                    </Box>
                </Grid>
            </Grid>

            <Dialog open={open} onClose={handleClose}>
                <Grid item lg={12}>
                    <Box p={3}>
                        <Typography variant="h6">
                            Por favor ingrese su nueva contrasena
                        </Typography>
                    </Box>
                    <Box display="flex" justifyContent="center" flexWrap="wrap">
                        <Box p={2}>
                            <TextField
                                id="currentPassword"
                                label="Contraseña Actual"
                                placeholder="Contraseña Actual"
                                multiline
                                variant="outlined"
                                onChange={(e) =>
                                    setContrasena({ ...contrasena, currentPassword: e.target.value })
                                }
                            />
                        </Box>
                        <Box p={2}>
                            <TextField
                                id="password"
                                label="Nueva Contraeña"
                                placeholder="Nueva Contraseña"
                                multiline
                                variant="outlined"
                                onChange={(e) =>
                                    setContrasena({ ...contrasena, password: e.target.value })
                                }
                            />
                        </Box>
                        <Box p={2}>
                            <TextField
                                id="repeatPassword"
                                label="Repetir Contrasena"
                                placeholder="Repetir Contrasena"
                                multiline
                                variant="outlined"
                                onChange={(e) =>
                                    setContrasena({ ...contrasena, repeatPassword: e.target.value })
                                }
                            />
                        </Box>
                    </Box>

                    <Box p={2} textAlign="center" >
                        <Button
                            variant="contained" 
                            color="primary"
                             onClick={ () => cambiarPassword(datosEmpresa)}
                        >
                            Guardar
                        </Button>
                    </Box>
                    
                </Grid>
            </Dialog>
        </div>
    )
}
