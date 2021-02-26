import { Box, Button, Card, Grid, List, makeStyles } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import clienteAxios from '../../../config/axios';

const useStyles = makeStyles((theme) => ({
    root:{
        marginTop: 10,
        display: "flex",
        justifyContent: "center",
        alignContent: "center"
    },
    containerImagen:{
        display: "flex",
        justifyContent: "center",
        alignContent: "center"
    }, 
    containerBanner:{
        height: 350,
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

    const [ banners, setBanners ] = useState([]);

    const classes = useStyles();

    const traerBanner = async () => {
        await clienteAxios
			.get(`/banner/banner-company/${user._id}`)
			.then((res) => {
                setBanners(res.data);
                console.log(res.data);
                console.log("si hay datos");
			})
			.catch((err) => {
                console.log(err);
			});
    };

    const eliminarBanner = async (idBanner) => {
        await clienteAxios
			.delete(`/banner/${idBanner}`, {
                headers: {
					Authorization: `bearer ${token}`
				}
            })
			.then((res) => {
                // console.log(res);
			})
			.catch((err) => {
                console.log(err);
                console.log("error al eliminado");
			});
    };

    useEffect(() => {
        traerBanner(); 
    }, [])

    const render = banners.map((banner) => {
        return(
            <Card className={classes.root}>
                <Grid container>
                    <Grid item lg={12} xs={12}>
                        <Box  display="flex" justifyContent="center">
                            <Box p={1} display="flex" justifyContent="center">
                                <Button variant="contained" color="primary">
                                    Editar
                                </Button>
                            </Box>
                            <Box p={1} display="flex" justifyContent="center">
                                <Button 
                                    variant="contained" 
                                    color="secondary"
                                    onClick={() => eliminarBanner(banner._id)}
                                >
                                    Eliminar
                                </Button>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item lg={12} xs={12} className={classes.containerImagen}>
                        <Box p={2} className={classes.containerBanner} >
                            <img className={classes.imagen} alt="No imagen" src={banner.imagenBannerUrl}/>
                        </Box>
                    </Grid>
                </Grid>
            </Card>
        )
    });

        
    return (
        <div>
            {render}
        </div>
    )
}
