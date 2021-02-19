import { Container, Grid } from '@material-ui/core';
import React from 'react'
import Cards_Platos from './card_plato';

export default function Consulta_platillos() {
    return (
        <Container>
            <Grid container lg={12}>
                <Cards_Platos/>
            </Grid>
        </Container>

    )
}
