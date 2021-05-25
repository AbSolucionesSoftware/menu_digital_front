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

    //CONSULTA CON PRODUCTOS POR SUBCATE
    // const buscarProductosSubCategoria = () => {
    //     setLoading(true)
    //     clienteAxios
    //         .post(`/product/search/subCategory/`, {subCategory: subCategoria, company: idEmpresa})
    //         .then((res) => {
    //             setLoading(false)
    //             setProductos(res.data);
    //         })
    //         .catch((err) => {
    //             setLoading(false)
    //         })
    // }


    //CONSULTA CON PRODUCTOS AGRUPADOS POR SUB CATES
    const buscarProductosCategorias = () => {
        setLoading(true)
        clienteAxios
            .post(`/product/search/company/category/`,{idCompany: idEmpresa, category: categoria})
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
        buscarProductosCategorias();
        consultarDatos();
    }, [])

    console.log(productosCate);

    return (
        <div>
            <Spin loading={loading} />
            <Grid container>
                <Grid item lg={11}  xs={12}>
                    <Box display="flex" justifyContent="center" p={2}>
                        <Typography variant="h4" style={{fontWeight: 600}}>
                            {categoria}
                        </Typography>
                    </Box>
                </Grid>
                
                <Grid item lg={1} xs={12}>
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
            
            <Grid item lg={12}>
                {
                    productosCate?.map((subCates) => (
                        <Grid>
                            <Box p={2} textAlign="center">
                                <Typography variant="h5">
                                    {subCates.nameSub}
                                </Typography>
                            </Box>
                            <Cards_Platos productos={subCates.productosSub}/>
                        </Grid>
                    ))
                }
            </Grid>
            <BotonCarrito empresa={empresa}/>
        </div>
    )
}

export default withRouter(BusquedaSubCates);