import { Box, Button, Card, Container, Divider, Grid, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import { withRouter } from 'react-router';
import Cards_Platos from '../Cards_Platillos/card_plato';
import clienteAxios from '../../../config/axios';
import Spin from '../../../components/Spin/spin';
import BotonCarrito from '../Carrito/botonCarrito';
import { Link } from 'react-router-dom';
import Categorias from './categorias';


function BusquedaSubCates(props) {
    const subCategoria = props.match.params.subCategoria;
    const categoria = props.match.params.categoria;
    const idEmpresa = props.match.params.idEmpresa;
    const slug = props.match.params.slug;
    const [productos, setProductos] = useState([]);
    const [productosCate, setProductosCate] = useState([]);

    const [loading, setLoading] = useState(false)
    const [empresa, setEmpresa] = useState([])

    const consultarDatos = async () => {
		setLoading(true);
		await clienteAxios
			.get(`/company/slug/company/${slug}`)
			.then((res) => {
				setLoading(false);
				setEmpresa(res.data);
			})
			.catch((err) => {
				setLoading(false);
			})
	}

    const buscarProductosSubCategoria = () => {
        setLoading(true)
        clienteAxios
            .post(`/product/search/subCategory/`, {subCategory: subCategoria, company: idEmpresa})
            .then((res) => {
                setLoading(false)
                setProductos(res.data);
            })
            .catch((err) => {
                setLoading(false)
            })
    }

    const buscarProductosCategorias = () => {
        setLoading(true)
        clienteAxios
            .post(`/product/search/company/category`,{company: idEmpresa, category: "Tacos"})
            .then((res) => {
                setLoading(false)
                setProductosCate(res.data);
            })
            .catch((err) => {
                setLoading(false)
            })
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        consultarDatos();
        // buscarProductosCategorias();
        buscarProductosSubCategoria();
    }, [])


    return (
        <div>
            <Spin loading={loading} />
            <Grid container>
                <Grid lg={11}  xs={12}>
                    <Box display="flex" justifyContent="center" p={2}>
                        <Typography variant="h4">
                            {subCategoria}
                        </Typography>
                    </Box>
                </Grid>
                
                <Grid lg={1} xs={12}>
                    <Box display="flex" justifyContent="center" p={1}>
                        <Button
                            color="primary"
                            variant="contained"
                            component={Link}
                            to={`/${slug}`}
                        >
                            Volver
                        </Button>
                    </Box>
                </Grid>
            </Grid>
            <Grid lg={12} xs={12}>
                <Divider variant="inset:" />
            </Grid>
            <Grid lg={12}>
                <Cards_Platos productos={productos}/>
            </Grid>
            <BotonCarrito empresa={empresa}/>
        </div>
    )
}

export default withRouter(BusquedaSubCates);