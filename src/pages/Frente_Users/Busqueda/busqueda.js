import { Box, Button, Divider, Grid, Typography } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react'
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import Spin from '../../../components/Spin/spin';
import clienteAxios from '../../../config/axios';
import Cards_Platos from '../Cards_Platillos/card_plato';
import BotonCarrito from '../Carrito/botonCarrito';

 function ResultadoBusqueda(props) {
    const idEmpresa = props.match.params.idEmpresa;
    const slug = props.match.params.slug;
    const busqueda = props.match.params.busqueda;
    console.log(slug);
    console.log(idEmpresa);


    const [productos, setProductos] = useState([]);
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

    const obtenerBusqueda = useCallback(
        async () => {
		await clienteAxios
			.post(`/product/filter/search/${idEmpresa}`, {filter: busqueda})
			.then((res) => {
                setProductos(res.data);
			})
			.catch((err) => {
			})
        },
		[ busqueda ]
	);

    useEffect(() => {
        window.scrollTo(0, 0);
        obtenerBusqueda();
        consultarDatos();
    }, [obtenerBusqueda])


    return (
        <div>
            <Spin loading={loading} />
            <Grid container>
                <Grid lg={11}  xs={12}>
                    <Box display="flex" justifyContent="center" p={2}>
                        <Typography variant="h4">
                            Resultados de: {busqueda}
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

export default withRouter(ResultadoBusqueda);
