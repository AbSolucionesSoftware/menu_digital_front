import { Box, Button, Card, CardActions, CardContent, FormControlLabel, makeStyles, Switch, Typography } from '@material-ui/core'
import React, { useState } from 'react';
import clienteAxios from '../../../config/axios';
import Eliminar from './eliminar';
import { formatoFechaDiagonales } from '../../../config/reuserFunction'
import Registro_cupon_simple from './registro_cupon_simple';
import Spin from '../../../components/Spin/spin';
import Regsitro_cupon_productos from './regsitro_cupon_productos';

const useStyles = makeStyles((theme) => ({
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    root: {
        minWidth: 300,
    },
}))

export default function Card_cupon({ cupon, update, setUpdate }) {
    const company = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    const [loading, setLoading] = useState(false);
    const classes = useStyles();
    const [ snackbar, setSnackbar ] = useState({
		open: false,
		mensaje: '',
		status: ''
	});

    const activarCupon = async (activeCoupon) => {
        setLoading(true);
        await clienteAxios
		.put(
            `/coupon/actionActive/coupon/${cupon._id}`,{
                "activeCoupon" : activeCoupon
            },  
            {
				headers: {
					Authorization: `bearer ${token}`
				}
			}
        )
        .then((res) => {
            setUpdate(!update);
            setLoading(false);
            setSnackbar({
                open: true,
                mensaje: res.data.message,
                status: 'success'
            });
        }).catch((err) => {
            setLoading(false);
            setUpdate(!update);
            setSnackbar({
                open: true,
                mensaje: err.data.message,
                status: 'error'
            });
        });
    };

    return (
        <div>
            <Box p={1} >
            <Spin loading={loading} />
            <Card className={classes.root}>
                <CardContent>
                    <Box textAlign="center">
                        <Typography  variant="h5" component="h2">
                            Código: {cupon.couponName}
                        </Typography>
                        <Typography>
                            Tipo de Codigo: {cupon?.couponLimitado === true ? "Por productos" : "Compra General"}
                        </Typography>
                        <Box mt={2}>
                            <Typography color="textSecondary" gutterBottom>
                                Descuento: {cupon.discountCoupon}%
                            </Typography>
                        </Box>
                        <Box >
                            <Typography color="textSecondary" gutterBottom>
                                Fecha de Vencimiento: {formatoFechaDiagonales(cupon.expirationDate)}
                            </Typography>
                        </Box>
                    </Box>
                    <Box textAlign="center">
                        <FormControlLabel
                            control={
                            <Switch
                                onChange={
                                    () => {
                                        activarCupon(!cupon.activeCoupon)
                                    }
                                } 
                                defaultChecked={cupon.activeCoupon}
                                name="couponActive"
                                color="primary"
                            />
                            }
                            label={cupon.activeCoupon ? 'Código Activo' : 'Codigo Desactivado'}
                        />
                    </Box>
                </CardContent>
                <CardContent>
                    <Box display="flex" alignContent="center" textAlign="center" justifyContent="center">
                        <Box p={1}>
                            <Eliminar cupon={cupon._id} type={cupon?.couponLimitado} update={update} setUpdate={setUpdate} />
                        </Box>
                        {
                            cupon?.couponLimitado === true ? (
                                <Regsitro_cupon_productos tipo={'Actualizar'} cupon={cupon} />
                            ) : (
                                <Registro_cupon_simple tipo={'Actualizar'} cupon={cupon} />
                            )
                        }
                    </Box>
                </CardContent>
            </Card>
            </Box>

        </div>
    )
}
