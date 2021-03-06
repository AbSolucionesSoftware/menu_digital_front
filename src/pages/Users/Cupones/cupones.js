import { Box, Grid, Typography } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import clienteAxios from '../../../config/axios'
import { MenuContext } from '../../../context/menuContext'
import Card_cupon from './card_cupon'
import Registro_cupon_simple from './registro_cupon_simple';
import Registro_cupon_productos from './regsitro_cupon_productos';


export default function Cupones() {
	const { recargar, setRecargar, cargarCupones, setCargarCupones} = useContext(MenuContext);

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
        setCargarCupones(false);
        getCodigos();
    }, [cargarCupones, recargar, update ]);

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
                        Códigos de Descuento
                    </Typography>
                </Box>
                {/* <Box textAlign="center" display="flex" justifyContent="center" alignItems="center" p={1}>
                    <Alert severity="warning"> 
                        Los códigos de descuento que se apliquen serán sobre el total de la cuenta del usuario, sin afectar los costos de envió.
                    </Alert>
                </Box> */}
            </Grid>

            <Grid container justify="center">
                <Box>
                    <Registro_cupon_simple tipo={'Nuevo'} setUpdate={setUpdate} update={update} />
                </Box>
                <Box>
                    <Registro_cupon_productos tipo={'Nuevo'}  />
                </Box>
            </Grid>

            <Grid container justify="center">
               {render_cupones}
            </Grid>

        </div>
    )
}
