import { Box, Button, Divider, Grid, Typography } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react'
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import CardPlato from '../Menu/cardPlato'
import Spin from '../../../components/Spin/spin';
import clienteAxios from '../../../config/axios';

export default function BusquedaUser(props) {

    const idEmpresa = props.match.params.idEmpresa;
    const busqueda = props.match.params.busqueda;

    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [ upload, setUpload ] = useState(false);

    const obtenerBusqueda = useCallback(
        
        async () => {
        setLoading(true);
		await clienteAxios
			.post(`/product/filter/search/${idEmpresa}`, {filter: busqueda})
			.then((res) => {
                setLoading(false);
                setProductos(res.data);
                setUpload(!upload);
			})
			.catch((err) => {
                setLoading(false);
                setUpload(!upload);
			})
        },
		[ busqueda ]
	);

    useEffect(() => {
        window.scrollTo(0, 0);
        obtenerBusqueda();
    }, 
        [obtenerBusqueda, upload]
    );

    return (
        <div>
             <div>
            <Spin loading={loading} />
            <Grid container>
                <Grid lg={11}  xs={12}>
                    <Box display="flex" justifyContent="center" p={2}>
                        <Typography variant="h4">
                            Tus platillos de {busqueda}
                        </Typography>
                    </Box>
                </Grid>
                <Grid lg={1} xs={12}>
                    <Box display="flex" justifyContent="center" p={1}>
                        <Button
                            color="primary"
                            variant="contained"
                            component={Link}
                            to={`/user/menu`}
                        >
                            Volver
                        </Button>
                    </Box>
                </Grid>
            </Grid>
            
            <Grid lg={12}>
                <CardPlato setUpload={setUpload} upload={upload} productos={productos}/>
            </Grid>
        </div>
        </div>
    )
}
