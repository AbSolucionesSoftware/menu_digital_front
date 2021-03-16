import { Box, Card, Container, Grid, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import { withRouter } from 'react-router';
import Cards_Platos from '../Cards_Platillos/card_plato';
import clienteAxios from '../../../config/axios';
import Spin from '../../../components/Spin/spin';
import BotonCarrito from '../Carrito/botonCarrito';


function BusquedaSubCates(props) {
    const subCategoria = props.match.params.subCategoria;
    const idEmpresa = props.match.params.idMenu;
    
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(false)
    const [empresa, setEmpresa] = useState([])

    const consultarDatos = async () => {
		setLoading(true);
		await clienteAxios
			.get(`/company/${idEmpresa}`)
			.then((res) => {
				setLoading(false);
                console.log(res.data);
				setEmpresa(res.data);
			})
			.catch((err) => {
				setLoading(false);
			})
	}

    const buscarProductos = async () => {
        setLoading(true)
        await clienteAxios
            .post(`/product/search/subCategory/`, {subCategory: subCategoria, company: idEmpresa})
            .then((res) => {
                setLoading(false)
                setProductos(res.data)
            })
            .catch((err) => {
                setLoading(false)
            })
    }

    useEffect(() => {
        buscarProductos();
        consultarDatos();
    }, [])

    return (
        <div>
            <Spin loading={loading} />
            <Grid lg={12}>
                <Box textAlign="center" p={3}>
                    <Typography variant="h5">
                        Resultados de: {subCategoria}
                    </Typography>
                </Box>

                <Cards_Platos productos={productos}/>
            </Grid>
            <BotonCarrito empresa={empresa}/>
        </div>
    )
}

export default withRouter(BusquedaSubCates);