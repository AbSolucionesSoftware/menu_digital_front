import { Box, Grid,TextField, Button, Dialog, DialogContent, Typography} from '@material-ui/core'
import { Alert } from '@material-ui/lab';
import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import MessageSnackbar from '../../../components/Snackbar/snackbar';
import Spin from '../../../components/Spin/spin';
import clienteAxios from '../../../config/axios';
import { fechaActual } from '../../../config/reuserFunction';
import { MenuContext } from '../../../context/menuContext';


export default function Registro_cupon_simple({update, setUpdate, tipo, cupon}) {
    const { setRecargar} = useContext(MenuContext);

    const company = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    const [datosCupon, setDatosCupon] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [open, setOpen] = useState(false);
    const [validate, setValidate] = useState(false);
    const [ snackbar, setSnackbar ] = useState({
		open: false,
		mensaje: '',
		status: ''
	});

    const datosCuponArray = {
        "couponName" : datosCupon.couponName,
        "couponLimitado": false,
        "discountCoupon": datosCupon.discountCoupon,
        "expirationDate": datosCupon.expirationDate,
    }
    
    const registrarCodigo = async () => {
        setLoading(true);
        if (!datosCupon.couponName || !datosCupon.discountCoupon || !datosCupon.expirationDate ) {
			setValidate(true);
            setLoading(false);
			return;
		}
        
        if (tipo === "Actualizar") {
            await clienteAxios
            .put(
                `/coupon/action/coupon/${datosCupon._id}`, datosCuponArray,  
                {
                    headers: {
                        Authorization: `bearer ${token}`
                    }
                }
            )
            .then((res) => {
                setLoading(false);
                openDialog();
                setRecargar(true);
                setSnackbar({
                    open: true,
                    mensaje: res.data.message,
                    status: 'success'
                });
            }).catch((err) => {
                setLoading(false);
                setRecargar(true);
                openDialog();
                setSnackbar({
                    open: true,
                    mensaje: "Lo siento este nombre de código ya existe",
                    status: 'error'
                });
            });
        }else{
            await clienteAxios
            .post(
                `/coupon/actionCoupons/${company._id}`, datosCuponArray,  
                {
                    headers: {
                        Authorization: `bearer ${token}`
                    }
                }
            )
            .then((res) => {
                setLoading(false);
                setUpdate(!update);
                openDialog();
                setSnackbar({
                    open: true,
                    mensaje: res.data.message,
                    status: 'success'
                });
            }).catch((err) => {
                setLoading(false);
                openDialog();
                setUpdate(!update);
                setSnackbar({
                    open: true,
                    mensaje: "Lo siento este nombre de código ya existe",
                    status: 'error'
                });
            });
        }
    };

    const obtenerDatos = (e) =>{
        setDatosCupon({
            ...datosCupon,[e.target.name] : e.target.value
        });
    };

    const openDialog = () =>{
        setOpen(!open)
    };

    useEffect(() => {
        if (cupon) {
            setDatosCupon(cupon)
        }
    }, []);


    return (
        <div>
            <MessageSnackbar
				open={snackbar.open}
				mensaje={snackbar.mensaje}
				status={snackbar.status}
				setSnackbar={setSnackbar}
			/>
            <Spin loading={loading} />
            <Grid>
                <Box p={1}>
                    <Button
                        onClick={() => openDialog()}
                        variant={tipo === "Nuevo" ? "outlined" : "contained"} 
                        color={tipo === "Nuevo" ? "primary" : "secondary"} 
                    >
                        {tipo === "Nuevo" ? "Registrar Código de Compra" : "Editar"} 
                    </Button>
                </Box>
            </Grid>

            <Dialog
                open={open}
                onClose={openDialog}
            >
                
                <DialogContent>
                    <Grid container item lg={12} justify="center">
                        <Box>
                            <Typography variant="h5">
                                {tipo === "Nuevo" ? "Registrar nuevo código promocional" : "Editar código promocional"} 
                            </Typography>
                        </Box>
                    </Grid>
                    <Box textAlign="center" display="flex" justifyContent="center" alignItems="center" p={1}>
                        <Alert severity="warning"> 
                            Los códigos promocionales que se apliquen seran sobre el total de la cuenta del usuario, sin afectar los costos de envio.
                        </Alert>
                    </Box>
                    <Grid container item lg={12} justify="center">
                        <Box display="flex" alignContent="center" textAlign="center" justifyContent="center" flexWrap="wrap">
                            <Box p={2}>
                                <TextField
                                    error={!datosCupon.couponName && validate}
                                    helperText={!datosCupon.couponName && validate ? 'Esta campo es requerido' : null}
                                    defaultValue={cupon ? datosCupon.couponName : null}
                                    variant="outlined"
                                    name="couponName" 
                                    label="Nombre código" 
                                    onChange={(e) => obtenerDatos(e)} 
                                />
                            </Box>
                            <Box p={2}>
                                <TextField
                                    error={!datosCupon.discountCoupon && validate}
                                    helperText={!datosCupon.discountCoupon && validate ? 'Esta campo es requerido' : null}
                                    defaultValue={cupon ? datosCupon.discountCoupon : null}
                                    variant="outlined" 
                                    name="discountCoupon"
                                    type="number"
                                    label="Porciento Descuento" 
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={(e) => obtenerDatos(e)}
                                />
                            </Box>
                            <Box p={2}>
                                <TextField
                                    error={!datosCupon.expirationDate && validate}
                                    helperText={!datosCupon.expirationDate && validate ? 'Esta campo es requerido' : null}
                                    defaultValue={cupon ? datosCupon.expirationDate : '2021-06-01'}
                                    type="date" 
                                    name="expirationDate" 
                                    variant="outlined" 
                                    label="Fecha Vencimiento" 
                                    onChange={(e) => obtenerDatos(e)}
                                />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid container item lg={12} justify="center">
                        <Box p={1}>
                            <Button
                                variant="contained" 
                                color="primary"
                                onClick={() => registrarCodigo()}
                            >
                                {tipo === "Nuevo" ? "Registrar" : "Actualizar"} 
                            </Button>
                        </Box>
                    </Grid>
                </DialogContent>
            </Dialog>
            
        </div>
    )
}
