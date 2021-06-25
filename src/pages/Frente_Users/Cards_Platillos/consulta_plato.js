import { Box, Container, Grid, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import Spin from '../../../components/Spin/spin';
import clienteAxios from '../../../config/axios';
import Cards_Platos from './card_plato';

export default function Consulta_platillos(props) {
    const {empresa} = props;
    const [productos, setProductos ] = useState([]);
	const [ loading, setLoading ] = useState(false);

    
	const consultarProductos = async () => {
		setLoading(true);
		await clienteAxios
			.get(`/product/${empresa._id}`)
			.then((res) => {
				setLoading(false);
				setProductos(res.data);
			})
			.catch((err) => {
				setLoading(false);
			})
	}

    useEffect(() => {
		consultarProductos();
	},
	 []);
    return (
        <Container maxWidth="xl">
			<Spin loading={loading} />
			<Grid container item lg={12} justify="center">
				<Box p={3} textAlign="center">
					<Typography variant="h4" color="primary">
						¡Nuestros platillos! 
					</Typography>
				</Box>
			</Grid>
            <Grid container item lg={12}>
                <Cards_Platos empresa={empresa} productos={productos}/>
            </Grid>
        </Container>

    )
}
