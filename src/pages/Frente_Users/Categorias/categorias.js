import React, { useEffect, useState } from 'react'

import { Box, Card, Container, Grid, Typography } from '@material-ui/core'
import LastPageIcon from '@material-ui/icons/LastPage';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';

import useStyles from  './styles';
import clienteAxios from '../../../config/axios';
import { PlayCircleFilledWhiteRounded } from '@material-ui/icons';
import { withRouter } from 'react-router';

function Categorias(props) {
    const {empresa} = props;
    const [categorias , setCategorias] = useState([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState([]);
    const [subcategoriaSeleccionada, setSubcategoriaSeleccionada] = useState([]);
    const classes = useStyles();
    // console.log(empresa._id);

    const consultarCates = async () => {
		await clienteAxios
			.get(`/product/categories/${empresa._id}`)
			.then((res) => {
				setCategorias(res.data);
			})
			.catch((err) => {

			})
	}

    useEffect(() => {
		consultarCates();
	}, [])

    const render = categorias.map((categoria, index) => {
        return(
            <Grid className={classes.paper} lg={3} md={6} xs={12}>
                <Card key={index} className={classes.root}
                    onClick={() => {
                        props.history.push(`/subCategorias/${categoria.categoria}/`)
                        setCategoriaSeleccionada(categoria);
                    }}
                >
                    <Box display="flex" justifyContent="center" alignItems="center" p={2} >
                        <RestaurantMenuIcon className={classes.large}/>
                        <Typography variant="h5">
                            {categoria.categoria}
                        </Typography>
                    </Box>
                </Card>
            </Grid>
        );
    })

    return (
        <div>
            <Container maxWidth="xl">
                <Grid container justify="center">
                    {render}
                </Grid>
			</Container>
        </div>
    )
}

export default withRouter(Categorias);

