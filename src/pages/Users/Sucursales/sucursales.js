import { Box, Grid, Typography, Button, FormControlLabel, Switch } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import clienteAxios from '../../../config/axios';
import Lista_sucursales from './lista_sucursales';
import Modal_nueva_sucursal from './modal_nueva_sucursal';
import jwt_decode from 'jwt-decode';


export default function Sucursales() {
    
    const [update, setUpdate] = useState(false);
    const [company, setCompany] = useState([])
    const token = localStorage.getItem('token');
    const active = JSON.parse(localStorage.getItem('user'));

    const traerCompany= () => {
        setCompany(JSON.parse(localStorage.getItem('user')));
    }

    const render_sucursales = company.sucursales?.map((sucursal, index) => (
        <Lista_sucursales key={index} update={update} setUpdate={setUpdate} sucursal={sucursal} />
    ));

    const sucursalesPublicas = async (publicado) => {
        await clienteAxios
		.put(
            `/company/sucursal/${company._id}`, 
            {
              "sucursalesActive": publicado
            },
            {
				headers: {
					Authorization: `bearer ${token}`
				}
			}
        )
        .then((res) => {
            setUpdate(!update);
            const decoded = jwt_decode(res.data.token);
            localStorage.setItem('user', JSON.stringify(decoded));

        }).catch((err) => {
            setUpdate(!update)
        });
    };

    useEffect(() => {
        traerCompany();
    }, [update]);


    return (
        <div>
           <Grid container>
                <Grid item lg={12}>
                        <Box display="flex" justifyContent="center" textAlign="center">
                            <Typography variant="h4">
                                Tus Sucursales
                            </Typography>
                        </Box>
                </Grid>
                <Grid item lg={5}>
                    <Modal_nueva_sucursal update={update} setUpdate={setUpdate} tipo="Nueva" />
                </Grid>
                <Grid item lg={5}>
                    <Box p={2} display="flex" justifyContent="center" alignItems="center" textAlign="center">
                        <FormControlLabel
                            control={
                                <Switch
                                    onChange={
                                        () => {
                                            sucursalesPublicas(!company.sucursalesActive)
                                        }
                                    } 
                                    color="primary"
                                    defaultChecked={active.sucursalesActive ? active.sucursalesActive : false}
                                    name="checkedA"
                                />
                            }
                            label={company.sucursalesActive ? 'Sucursales Activas' : 'Sucursales Desactivadas'}
                        />
                    </Box>
               </Grid>
           </Grid>
           <Grid container>
            {render_sucursales}
           </Grid>
        </div>
    )
}
