import { Box, Button, Card, Drawer, Grid, makeStyles, Paper, Typography } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'

import clienteAxios from '../../../config/axios';
import RegistroBanner from './services/registroBanner';
import Eliminar from './services/eliminar';
import Spin from '../../../components/Spin/spin';
import { ImageContext } from '../../../context/curso_context';
const useStyles = makeStyles((theme) => ({
    root:{
        marginTop: 10,
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
    },
    containerImagen:{
        height: "auto",
        display: "flex",
        justifyContent: "center",
        alignContent: "center"
    }, 
    containerBanner:{
        height: "auto",
        // width: "100%",
    },
    imagen:{
        maxWidth: "100%",
        maxHeight:  "100%"   
    }
}))

export default function Banner() {

    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'))
	const [ loading, setLoading ] = useState(false);
    const [ banners, setBanners ] = useState([]);
    const { update, setUpdate } = useContext(ImageContext);
    const [editarBanner, setEditarBanner ] = useState();
    const classes = useStyles();

    const [ open, setOpen ] = useState(false);

    const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

    const traerBanner = async () => {
        setLoading(true);
        await clienteAxios
			.get(`/adminBanner/banner-company`)
			.then((res) => {
                setUpdate(false);
                setLoading(false);
                setBanners(res.data);
			})
			.catch((err) => {
                setLoading(false);
			});
    };

    useEffect(() => {
        traerBanner(); 
    }, [update])


    const render = banners.map((banner, index) => {
        return(
            <Paper elevation={3} key={index} className={classes.root}>
                <Grid container>
                    <Grid item lg={12} xs={12}>
                        <Box display="flex" justifyContent="center">
                            <Box p={1} display="flex" justifyContent="center">
                                {/* <Button 
                                    variant="contained" 
                                    color="primary"
                                    onClick={() => {
                                        handleDrawerOpen()
                                        setEditarBanner(banner)
                                    }}
                                >
                                    Editar
                                </Button> */}
                            </Box>
                            <Box p={1} display="flex" justifyContent="center">
                                <Eliminar banner={banner._id} />
                            </Box>
                        </Box>
                        <Box textAlign="center">
                            <Typography>
                                <b>Compania Asociada</b>: {banner.empresaAsociada}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item lg={12} xs={12} className={classes.containerImagen}>
                        <Box p={2} className={classes.containerBanner} >
                            <img className={classes.imagen} alt="No imagen" src={banner.imgBannerAdminUrl}/>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        )
    });

        
    return (
        <div>
            <Spin loading={loading} />
            {render}

            <Drawer
                anchor="right"
                open={open}
                onClose={handleDrawerClose}
            >
                <RegistroBanner handleDrawerClose={handleDrawerClose} editarBanner={editarBanner}  />
                <Box textAlign="center" mt={4}>
                    <Button
                        variant="contained" 
                        color="secondary"
                        size="large"
                        onClick={handleDrawerClose}
                    >
                        Salir
                    </Button>
                </Box>
            </Drawer>
            
        </div>
    )
}