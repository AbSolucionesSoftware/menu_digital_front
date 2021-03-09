import { Container, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import clienteAxios from '../../../config/axios';
import Cards_Platos from './card_plato';

export default function Consulta_platillos(props) {
    const {empresa} = props;
    const [productos, setProductos ] = useState([]);
    
	const consultarProductos = async () => {
		await clienteAxios
			.get(`/product/${empresa._id}`)
			.then((res) => {
				setProductos(res.data);
			})
			.catch((err) => {

			})
	}

    useEffect(() => {
		consultarProductos();
	},
	 []);
    return (
        <Container maxWidth="xl">
            <Grid container lg={12}>
                <Cards_Platos productos={productos}/>
            </Grid>
        </Container>

    )
}
