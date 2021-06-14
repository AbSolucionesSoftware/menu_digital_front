import { Box, Grid, Typography } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import clienteAxios from '../../../config/axios'
import { MenuContext } from '../../../context/menuContext'
import Card_cupon from './card_cupon'
import Registro_cupon from './registro_cupon'


export default function Cupones() {
	const { recargar, setRecargar} = useContext(MenuContext);

    const company = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    const [update, setUpdate] = useState(false);
    const [codigoEmpresa, setCodigoEmpresa] = useState([]);

    const getCodigos = async () => {
        await clienteAxios
		.get(
            `/coupon/actionCoupons/${company._id}`, 
            {
				headers: {
					Authorization: `bearer ${token}`
				}
			}
        )
        .then((res) => {
            setCodigoEmpresa(res.data);
        }).catch((err) => {
        });
    };

    useEffect(() => {
        setRecargar(false);
        getCodigos();
    }, [update, recargar]);

    const render_cupones = codigoEmpresa?.map((cupon, index) => {
        return(
            <Card_cupon cupon={cupon} key={index} setUpdate={setUpdate} update={update} />
        )
    })

    return (
        <div>
            
            <Grid item lg={12}>
                <Box display="flex" justifyContent="center" textAlign="center">
                    <Typography variant="h4">
                        Códigos Promocionales
                    </Typography>
                </Box>
                <Box textAlign="center" display="flex" justifyContent="center" alignItems="center" p={1}>
                    <Alert severity="warning"> 
                        Los códigos promocionales que se apliquen seran sobre el total de la cuenta del usuario, sin afectar los costos de envio.
                    </Alert>
                </Box>
            </Grid>

            <Grid container justify="center">
                <Registro_cupon tipo={'Nuevo'} setUpdate={setUpdate} update={update} />
            </Grid>

            <Grid container justify="center">
               {render_cupones}
            </Grid>

        </div>
    )
}
