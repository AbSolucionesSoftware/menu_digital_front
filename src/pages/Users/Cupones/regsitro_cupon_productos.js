import React, { useContext, useEffect, useState } from 'react'
import MessageSnackbar from '../../../components/Snackbar/snackbar'
import Filtro_Categorias from './services/categorias'
import Spin from '../../../components/Spin/spin'
import TablaProductosDescuentos from './services/table_Productos'
import {  Box, Button, Drawer, Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import clienteAxios from '../../../config/axios';
import { MenuContext } from '../../../context/menuContext'

const useStyles = makeStyles({
    table: {
      minWidth: 100,
      height: 300
    },
    tituloTable:{
        fontSize: 18,
        fontWeight: 600
    },
});


const useStyles1 = makeStyles((theme) => ({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },
}));


export default function Registro_cupon_productos({ tipo, cupon}) {
    const company = JSON.parse(localStorage.getItem('user'));
    const { cargarCupones, setCargarCupones } = useContext(MenuContext);

    const [categoria, setCategoria] = useState([]);
    const [productosCate, setProductosCate] = useState([]);

    const [ open, setOpen] = useState(false);
    const [ loading, setLoading] = useState(false);
    const [ recargar, setRecargar ] = useState(false);
    const [ control, setControl ] = useState(false);
    const [ validate, setValidate] = useState(false);

    const [ datosCupon, setDatosCupon ] = useState([]);
    const [ selected, setSelected ] = useState([]);
    const [ select, setSelect ] = useState([]);
    const [ productoGuardados, setProductoGuardados] = useState([])


    const classes = useStyles();

    const [ snackbar, setSnackbar ] = useState({
		open: false,
		mensaje: '',
		status: ''
	});

    const handleOpenRegistro = () => {
        setOpen(!open);
    }

    const buscarProductosCategorias = (categoria) => {
        setLoading(true);
        clienteAxios
            .post(`/product/search/category/`,{company: company._id, category: categoria})
            .then((res) => {
                setLoading(false);

                const productosDisponibles = [];
                for (let i = 0; i < res.data.length; i++) {
                    if ( res.data[i].idCoupon === cupon?._id || !res.data[i].idCoupon) {
                        productosDisponibles.push(res.data[i])
                    }
                }
                setProductosCate(productosDisponibles);
            })
            .catch((err) => {
                setLoading(false)
            })
    };

    const onChangeDatosCupon = (e) => {
        setDatosCupon({
            ...datosCupon,[e.target.name] : e.target.value
        });
    }

    const datosCuponArray = {
        "couponName" : datosCupon.couponName,
        "couponLimitado": true,
        "discountCoupon": datosCupon.discountCoupon,
        "expirationDate": datosCupon.expirationDate,
        "productos": productoGuardados.productos
    }

    const registrarCuponEspecial = async (e) => {
        setLoading(true);
        if (!datosCupon.couponName || !datosCupon.discountCoupon || !datosCupon.expirationDate) {
            setValidate(false);
            setLoading(false);
            setSnackbar({
                open: true,
                mensaje: "Por favor llene todos los campos",
                status: 'error'
            });
            return null;
        }
        if (tipo === "Actualizar") {
            await clienteAxios
                .put(`/coupon/action/CouponEspecial/company/${company._id}/coupon/${cupon._id}`, datosCuponArray,)
                .then((res) => {
                    setCargarCupones(true);
                    setSnackbar({
                        open: true,
                        mensaje: "Cupon editado correctamente",
                        status: 'success'
                    });
                    setCategoria([]);
                    setProductosCate([]);
                    setSelected([]);
                    setLoading(false);
                })
                .catch((err) => {
                    setLoading(false);
                    console.log(err);
                    setSnackbar({
                        open: true,
                        mensaje: "Ocurrio un problema en el servidor",
                        status: 'error'
                    });
                })
        }else{
            await clienteAxios
                .post(`/coupon/action/newCouponLimited/${company._id}`, datosCuponArray ,)
                .then((res) => {
                    setCargarCupones(true);
                    setSnackbar({
                        open: true,
                        mensaje: "Código registrado correctamente",
                        status: 'success'
                    });
                    setSelected([]);
                    setCategoria([]);
                    setProductosCate([]);
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setLoading(false);
                    setSnackbar({
                        open: true,
                        mensaje: "Ocurrio un problema en el servidor",
                        status: 'error'
                    });
                })
        }
    }

    useEffect(() => {
        if (cupon) {
            setDatosCupon(cupon);
            setControl(true);
        }
        buscarProductosCategorias(categoria);
    }, [recargar])
    

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
                        onClick={() => {
                            handleOpenRegistro()
                        }}
                        variant={tipo === "Nuevo" ? "outlined" : "contained"} 
                        color={tipo === "Nuevo" ? "primary" : "secondary"} 
                    >
                        {tipo === "Nuevo" ? "Registrar Codigo Productos" : "Editar"} 
                    </Button>
                </Box>
            </Grid>

            <Drawer anchor="bottom" open={open} onClose={handleOpenRegistro}>
                <Grid container justify="center">
                    <Box p={1}>
                        <Typography variant="h5">
                            Codigo Promocionales por Productos
                        </Typography>
                    </Box>
                </Grid>
                <Grid>
                    <Box p={1} textAlign="center">
                        <Typography variant="h6">
                            Selecciona los productos a los que deseas agregarle el codigo promocional.
                        </Typography>
                    </Box>
                </Grid>

                <Grid container justify="center">
                    <Grid item lg={7} xs={12} >
                        <Box display="flex" justifyContent="center" alignItems="center">
                            <Box p={1} textAlign="center">
                                <Typography>
                                    Busca productos por categorias
                                </Typography>
                            </Box>
                            <Box p={1} textAlign="center">
                                <Filtro_Categorias 
                                    setCategoria={setCategoria} 
                                    categoria={categoria} 
                                    setRecargar={setRecargar} 
                                    recargar={recargar}
                                />
                            </Box>
                        </Box>
                        <Box p={2}>
                            <TablaProductosDescuentos
                                setProductosCate={setProductosCate}
                                productosCate={productosCate}
                                selected={selected} 
                                setSelected={setSelected} 
                                cupon={cupon}
                                productoGuardados={productoGuardados} 
                                setProductoGuardados={setProductoGuardados}
                                control={control}
                                setControl={setControl}
                                select={select} 
                                setSelect={setSelect}
                            />
                        </Box>
                    </Grid>
                    <Grid item lg={5} xs={12}>
                        <Box textAlign="center" mt={5}>
                            <Typography>
                                Completa los datos de tu cupon
                            </Typography>
                        </Box>
                        <Box display="flex" alignContent="center" textAlign="center" justifyContent="center" flexWrap="wrap">
                            <Box p={2}>
                                <TextField
                                    error={!datosCupon.couponName && validate}
                                    helperText={!datosCupon.couponName && validate ? 'Esta campo es requerido' : null}
                                    defaultValue={cupon ? datosCupon.couponName : null}
                                    variant="outlined"
                                    name="couponName" 
                                    label="Nombre código" 
                                    onChange={(e) => onChangeDatosCupon(e)} 
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
                                    onChange={(e) => onChangeDatosCupon(e)}
                                />
                            </Box>
                            <Box p={2}>
                                <TextField
                                    error={!datosCupon.expirationDate && validate}
                                    helperText={!datosCupon.expirationDate && validate ? 'Esta campo es requerido' : null}
                                    defaultValue={cupon ? datosCupon.expirationDate : '2021-06-01'}
                                    defaultValue='2021-06-01'
                                    type="date" 
                                    name="expirationDate" 
                                    variant="outlined" 
                                    label="Fecha Vencimiento" 
                                    onChange={(e) => onChangeDatosCupon(e)}
                                />
                            </Box>
                        </Box>
                        <Box textAlign="center" p={2}>
                            <Button
                                onClick={() => {
                                    handleOpenRegistro()
                                    registrarCuponEspecial()
                                }}
                                variant={tipo === "Nuevo" ? "outlined" : "contained"} 
                                color={tipo === "Nuevo" ? "primary" : "secondary"} 
                            >
                                {tipo === "Nuevo" ? "Registrar Código" : "Editar Código"} 
                            </Button>
                        </Box>
                        <Box textAlign="center" p={1}>
                            <Button
                                onClick={() => {
                                    handleOpenRegistro()
                                }}
                                variant={"outlined"} 
                                color={"primary"} 
                            >
                                Salir
                            </Button>
                        </Box>
                    </Grid>
                </Grid>

            </Drawer>
        </div>
    )
}
