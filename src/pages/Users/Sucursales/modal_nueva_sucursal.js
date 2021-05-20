import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, makeStyles, TextField, Typography } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'

import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';

import AddIcon from '@material-ui/icons/Add';
import MessageSnackbar from '../../../components/Snackbar/snackbar';
import Spin from '../../../components/Spin/spin';
import clienteAxios from '../../../config/axios';
import jwt_decode from 'jwt-decode';

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

const useStyles = makeStyles(() => ({
    text:{
        width: "100%"
    },
}))

export default function Modal_nueva_sucursal(props) {

    const {setUpdate, update, tipo, editarSucursal} = props;
    const company = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    const classes = useStyles();
    const [ validate, setValidate ] = useState(false);
    const [ loading, setLoading ] = useState(false);
    const [sucursal, setSucursal] = useState([])
    const [ open, setOpen ] = useState(false);
    const handleClickModal = () => {
		setOpen(!open);
	};

    const [ snackbar, setSnackbar ] = useState({
		open: false,
		mensaje: '',
		status: ''
	});
    const messages = (status, message) => {
		setSnackbar({
			open: true,
			mensaje: message,
			status: status
		});
	};

    const onChangeSucursal = (e) => {
        setSucursal({
            ...sucursal,
            [e.target.name]: e.target.value
        });
    }

    const nuevaSucursal = {
        "costoEnvio": sucursal.costoEnvio,
        "nombreSucursal": sucursal.nombreSucursal,
        "calleNumeroSucursal":sucursal.calleNumeroSucursal,
        "coloniaSucursal": sucursal.coloniaSucursal,
        "telefonoSucursal": sucursal.telefonoSucursal,
        "ciudadSucursal": sucursal.ciudadSucursal,
        "cpSucursal": sucursal.cpSucursal
    }

    useEffect(() => {
        if (tipo === "Editar") {
            setSucursal(editarSucursal) 
        }
    }, [])

    const registroSucursal =  async () => {
        if (tipo === "Nueva") {
            setLoading(true);
            await clienteAxios
                .post(`/company/sucursal/${company._id}`, nuevaSucursal, {
                    headers: {
                        Authorization: `bearer ${token}`
                    }
                }).then((res) => {
                    setLoading(false);
                    const decoded = jwt_decode(res.data.token);
                    localStorage.setItem('user', JSON.stringify(decoded));
                    messages('success', res.data.message);
                    handleClickModal();
                })
                .catch((err) => {
                    setLoading(false);
                    messages('error', 'hubo un error');
                    handleClickModal();
                });
        }else{
            setLoading(true);
            await clienteAxios
                .put(`/company/action/company/${company._id}/sucursal/${editarSucursal._id}`, nuevaSucursal, {
                    headers: {
                        Authorization: `bearer ${token}`
                    }
                }).then((res) => {
                    setLoading(false);
                    const decoded = jwt_decode(res.data.token);
                    localStorage.setItem('user', JSON.stringify(decoded));
                    messages('success', res.data.message);
                    handleClickModal();
                })
                .catch((err) => {
                    setLoading(false);
                    messages('error', 'hubo un error');
                    handleClickModal();
                });
        }
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
                <Box p={1} display="flex" flexDirection="row" textAlign="center">
                    <Button variant="text" color="primary" startIcon={tipo === 'Nueva' ? <AddIcon /> : null} onClick={handleClickModal}>
                        {tipo === 'Nueva' ? 'Añadir Nueva Sucursal' : 'Editar Sucursal'}
                    </Button>
                </Box>
            </Grid>
            <Dialog open={open} onClose={handleClickModal} aria-labelledby="form-dialog-title" maxWidth="sm" fullWidth>
				<DialogTitle id="form-dialog-title">
                    {tipo === 'Nueva' ? 'Añadir Nueva Sucursal' : 'Editar Sucursal'}
				</DialogTitle>
				<DialogContent>
                    <Box p={1}>
                        <TextField
                            defaultValue={sucursal.nombreSucursal ? sucursal.nombreSucursal : null}
                            error={!sucursal.nombreSucursal && validate}
                            helperText={!sucursal.nombreSucursal && validate ? 'Esta campo es requerido' : null}
                            label="Nombre Sucursal"
                            placeholder="Nombre Sucursal"
                            autoFocus
                            name="nombreSucursal"
                            margin="dense"
                            fullWidth
                            onChange={onChangeSucursal}
                        />
                    </Box>
                    <Box p={1}>
                        <TextField
                            defaultValue={sucursal.telefonoSucursal ? sucursal.telefonoSucursal : null}
                            error={!sucursal.telefonoSucursal && validate}
                            helperText={!sucursal.telefonoSucursal && validate ? 'Esta campo es requerido' : null}
                            label="Telefono Sucursal"
                            placeholder="Recuerda a este Tel. llegaran todos los pedidos designados a la sucursal"
                            autoFocus
                            name="telefonoSucursal"
                            margin="dense"
                            fullWidth
                            onChange={onChangeSucursal}
                        />
                    </Box>
                    <Box p={1}>
                        <TextField
                            defaultValue={sucursal.costoEnvio ? sucursal.costoEnvio : null}
                            error={!sucursal.costoEnvio && validate}
                            helperText={!sucursal.costoEnvio && validate ? 'Esta campo es requerido' : null}
                            label="Costo de Envio de Sucursal"
                            placeholder="Costo de Envio de Sucursal"
                            autoFocus
                            name="costoEnvio"
                            margin="dense"
                            fullWidth
                            InputProps={{
                                inputComponent: NumberFormatDinero,
                            }}
                            onChange={onChangeSucursal}
                        />
                    </Box>
                    <Box textAlign="center" mt={1}>
                        <Typography>
                            Domicilio Sucursal
                        </Typography>
                    </Box>
                    <Box display="flex" justifyContent="center" flexWrap="wrap">
                        <Box p={1}>
                            <TextField
                                defaultValue={sucursal.calleNumeroSucursal ? sucursal.calleNumeroSucursal : null}
                                error={!sucursal.calleNumeroSucursal && validate}
                                helperText={!sucursal.calleNumeroSucursal && validate ? 'Esta campo es requerido' : null}
                                className={classes.text}
                                label="Calle y Numero"
                                placeholder="Calle y Numero"
                                autoFocus
                                name="calleNumeroSucursal"
                                margin="dense"
                                onChange={onChangeSucursal}
                            />
                        </Box>
                        <Box p={1}>
                            <TextField
                                defaultValue={sucursal.coloniaSucursal ? sucursal.coloniaSucursal : null}
                                error={!sucursal.coloniaSucursal && validate}
                                helperText={!sucursal.coloniaSucursal && validate ? 'Esta campo es requerido' : null}
                                label="Colonia"
                                placeholder=" Colonia"
                                autoFocus
                                name="coloniaSucursal"
                                margin="dense"
                                onChange={onChangeSucursal}
                            />
                        </Box>
                        <Box p={1}>
                            <TextField
                                defaultValue={sucursal.cpSucursal ? sucursal.cpSucursall : null}
                                error={!sucursal.cpSucursal && validate}
                                helperText={!sucursal.cpSucursal && validate ? 'Esta campo es requerido' : null}
                                label="Codigo Postal"
                                placeholder=" Codigo Postal"
                                autoFocus
                                name="cpSucursal"
                                margin="dense"
                                onChange={onChangeSucursal}
                            />
                        </Box>
                        <Box p={1}>
                            <TextField
                                defaultValue={sucursal.ciudadSucursal ? sucursal.ciudadSucursal : null}
                                error={!sucursal.ciudadSucursal && validate}
                                helperText={!sucursal.ciudadSucursal && validate ? 'Esta campo es requerido' : null}
                                label="Ciudad"
                                placeholder=" Ciudad"
                                autoFocus
                                name="ciudadSucursal"
                                margin="dense"
                                onChange={onChangeSucursal}
                            />
                        </Box>
                    </Box>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClickModal} color="secondary">
						Cancelar
					</Button>
					<Button
						color="primary"
                        onClick={registroSucursal}
					>
						{tipo === 'Nueva' ? 'Añadir' : 'Editar'}
					</Button>
				</DialogActions>
			</Dialog>
        </div>
    )
}
