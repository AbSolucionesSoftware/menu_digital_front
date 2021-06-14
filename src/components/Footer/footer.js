import { Box, Button, Dialog, Grid, Hidden, IconButton, makeStyles, Typography } from '@material-ui/core'
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
    height: 130,
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
    const [open, setOpen] = useState(false);

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

    const handleClickOpen =() => {
        setOpen(!open);
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
                        <Box dsiplay="flex" textAlign="center" justifyContent="center" alignItems="center" alignContent="center">
                            <Box mt={2} p={1} >
                                <Typography variant="h4">
                                    {empresa.nameCompany}
                                </Typography>
                            </Box>
                            <Box display="flex" textAlign="center" justifyContent="center" alignItems="center">
                                <Box mr={2}>
                                    <PhoneForwardedIcon style={{fontSize: 30}}/>
                                </Box>
                                <Typography variant="body1">
                                    {empresa.phone}
                                </Typography>
                            </Box>
                            {
                                empresa.calleNumeroPrin && empresa.coloniaPrin ? (
                                    <Box mt={1}>
                                        <Typography variant="body1"> 
                                            Dom. {empresa.calleNumeroPrin}, Col. {empresa.coloniaPrin}
                                        </Typography>
                                    </Box>
                                ):(null)
                            }
                            {
                                empresa.cpPrin && empresa.ciudadPrin &&  empresa.estado ? (
                                    <Box>
                                        <Typography variant="body1">
                                            CP. {empresa.cpPrin}, {empresa.ciudadPrin}, {empresa.estado}
                                        </Typography>
                                    </Box>
                                ):(null)
                            }

                            <Box display="flex" justifyContent="center" flexWrap="wrap">
                                { empresa.redesSociales && empresa.redesSociales.facebook ? (
                                    <Box p={1}>
                                        <a target="_blank" href={empresa.redesSociales.facebook}>
                                            <FacebookIcon style={{color: "white",fontSize: 45}}/>
                                        </a>
                                    </Box>
                                ):(
                                    null
                                )
                                }
                                { empresa.redesSociales && empresa.redesSociales.instagram ? (
                                    <Box p={1}>
                                        <a target="_blank" href={empresa.redesSociales.instagram}>
                                            <InstagramIcon style={{color: "white",fontSize: 45}}/>
                                        </a>
                                    </Box>
                                ):(
                                    null
                                )
                                }
                                { empresa.redesSociales && empresa.redesSociales.twiter ? (
                                    <Box p={1}>
                                        <a target="_blank" href={empresa.redesSociales.twiter}>
                                            <TwitterIcon style={{color: "white",fontSize: 45}}/>
                                        </a>
                                    </Box>
                                ):(
                                    null
                                )
                                }
                            </Box>

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
                        {
                            empresa?.horariosActive === true ? (
                                    <>
                                        <Box p={1} textAlign="center">
                                            <Typography  variant="h6">
                                                Nuestros Horarios de Atención
                                            </Typography>
                                        </Box>
                                        <Box p={1}>
                                            {empresa?.horario?.map((dia) => (
                                                <Box display="flex" alignItem="center" justifyContent="center">
                                                    <Typography style={{fontWeight: 600}} variant="body1" >
                                                        {dia.dia}:   
                                                    </Typography>
                                                    <Typography variant="body1">
                                                        {dia.close === true ? (
                                                                dia.horarioInicial + "  a  " + dia.horarioFinal
                                                            ) :
                                                            (
                                                                "Cerrado"
                                                            )
                                                        }
                                                    </Typography>
                                                </Box>
                                            ))}
                                        </Box>
                                    </>
                            ) : null
                        }
                        
                    </Grid>
                    {/* <Grid item lg={12} xs={12}>
                        <Box textAlign="center">
                            <Typography variant="body1">
                                Todos los derechos reservados de COMODY, AB Soluciones Empresariales 2021
                            </Typography>
                        </Box>
                    </Grid> */}

                    <Dialog
                         open={open} 
                         onClose={handleClickOpen}
                    >
                        <Grid item lg={12}>
                            <Box p={2} textAlign="center">
                                <Typography  variant="h6">
                                    Nuestros Horarios de Atención
                                </Typography>
                            </Box>
                            <Box p={1} mb={2}>
                                {empresa?.horario?.map((dia) => (
                                    <Box display="flex" alignItem="center" justifyContent="center">
                                        <Typography style={{fontWeight: 600}} >
                                            {dia.dia}:   
                                        </Typography>
                                        <Typography>
                                            {dia.close === true ? (
                                                    dia.horarioInicial + "  a  " + dia.horarioFinal
                                                ) :
                                                (
                                                    "Cerrado"
                                                )
                                            }
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                        </Grid>
                    </Dialog>
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