import { Box, Card, Typography } from '@material-ui/core';
import React from 'react';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import { withRouter } from 'react-router';


function BusquedaSubCates(props) {
    const categoria = props.match.params.categoria;
    console.log(props.match.params.categoria);

    // const render = 

    return (
        <div>
            <Card
                    onClick={() => {
                        props.history.push(`/subCategorias/${categoria.categoria}/`)
                    }}
                >
                    <Box display="flex" justifyContent="center" alignItems="center" p={2} >
                        <RestaurantMenuIcon/>
                        <Typography variant="h5">
                            Productos
                        </Typography>
                    </Box>
                </Card>
        </div>
    )
}

export default withRouter(BusquedaSubCates);