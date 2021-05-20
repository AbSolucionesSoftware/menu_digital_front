import { Box, Grid, Hidden, IconButton, makeStyles, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'

import comody from '../../img/Comody.jpeg';
import PhoneForwardedIcon from '@material-ui/icons/PhoneForwarded';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import clienteAxios from '../../config/axios';
import { withRouter } from 'react-router';

const useStyles = makeStyles((theme) => ({
image: {
    maxHeight: '100%',
    maxWidth: '100%'
},
containerImage:{
    height: 90,
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(3)
},
fondo:{
    background: "#160404",
    color: "white"
}
}));

function Footer(props) {

	const classes = useStyles();
    const slug = localStorage.getItem('slug');
	const login = props.location.pathname;
	const [empresa, setEmpresa] = useState([]);

    const consultarDatos = async () => {
		await clienteAxios
			.get(`/company/slug/company/${slug}`)
			.then((res) => {
				if (res.data === null) {
					return 
				}else{
					setEmpresa(res.data);
				}
			})
			.catch((err) => {

			})
	}

	useEffect(() => {
		consultarDatos();
	}, [])

    if (empresa === null) {
		return 0;
	}else{
		if (empresa.public === true) {
			return(
                <Grid container className={classes.fondo}>
                    <Grid item lg={4} xs={12}>
                        <Box ml={9} dsiplay="flex" textAlign="center" justifyContent="center" alignItems="center">
                            <Box mt={2} p={1} >
                                <Typography variant="h4">
                                    {empresa.nameCompany}
                                </Typography>
                            </Box>
                            <Box display="flex" textAlign="center" justifyContent="center" alignItems="center">
                                <Box mr={2}>
                                    <PhoneForwardedIcon style={{fontSize: 35}}/>
                                </Box>
                                <Typography variant="h6">
                                    {empresa.phone}
                                </Typography>
                            </Box>
                            {
                                empresa.calleNumeroPrin && empresa.coloniaPrin ? (
                                    <Box p={1}>
                                        <Typography variant="h6"> 
                                            Dom. {empresa.calleNumeroPrin}, Col. {empresa.coloniaPrin}
                                        </Typography>
                                    </Box>
                                ):(null)
                            }
                            {
                                empresa.cpPrin && empresa.ciudadPrin &&  empresa.estado ? (
                                    <Box p={1}>
                                        <Typography variant="h6">
                                            CP. {empresa.cpPrin}, {empresa.ciudadPrin}, {empresa.estado}
                                        </Typography>
                                    </Box>
                                ):(null)
                            }
                        </Box>
                    </Grid>
                    <Hidden xsDown>
                        <Grid item lg={4} >
                            <Box mb={2} mt={2}>
                                {empresa.logoImagenUrl === "" ? (
                                    <div className={classes.containerImage}>
                                        <img className={classes.image} alt="logotipo" src={comody}/>
                                    </div>
                                ):(
                                    <div className={classes.containerImage}>
                                        <img className={classes.image} alt="logotipo" src={empresa.logoImagenUrl}/>
                                    </div>
                                )}
                            </Box>
                        </Grid>
                    </Hidden>
                    <Grid item lg={4} xs={12}>
                        { empresa.redesSociales && empresa.redesSociales.length > 0  ? (
                            <Box mt={2} p={1} textAlign="center"> 
                                <Typography variant="body1">
                                    Siguenos en nuestras redes
                                </Typography>
                            </Box>
                        ):(
                            null
                        )
                        }   
                    <Box display="flex" justifyContent="center" flexWrap="wrap">
                        { empresa.redesSociales && empresa.redesSociales.facebook ? (
                            <Box p={1}>
                                <a target="_blank" href={empresa.redesSociales.facebook}>
                                    <FacebookIcon style={{color: "black",fontSize: 60}}/>
                                </a>
                            </Box>
                        ):(
                            null
                        )
                        }
                        { empresa.redesSociales && empresa.redesSociales.instagram ? (
                            <Box p={1}>
                                <a target="_blank" href={empresa.redesSociales.instagram}>
                                    <InstagramIcon style={{color: "black",fontSize: 60}}/>
                                </a>
                            </Box>
                        ):(
                            null
                        )
                        }
                        { empresa.redesSociales && empresa.redesSociales.twiter ? (
                            <Box p={1}>
                                <a target="_blank" href={empresa.redesSociales.twiter}>
                                    <TwitterIcon style={{color: "black",fontSize: 60}}/>
                                </a>
                            </Box>
                        ):(
                            null
                        )
                        }
                    </Box>
                    </Grid>

                    <Grid item lg={12} xs={12}>
                        <Box textAlign="center">
                            <Typography variant="body1">
                                Todos los derechos reservados de COMODY, AB Soluciones Empresariales 2021
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
			);
		}else{
            return(
                null
            )
		}
	}
};

export default withRouter(Footer);