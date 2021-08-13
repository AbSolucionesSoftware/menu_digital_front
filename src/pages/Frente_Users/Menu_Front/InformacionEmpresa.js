import React from 'react'

import { Grid, Paper, Avatar, Box, makeStyles, Typography, Hidden } from '@material-ui/core'
import RoomIcon from '@material-ui/icons/Room';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    imagen: {
		maxHeight: '100%',
		maxWidth: '100%'
	},
	containerImage:{
		width: 150,
		height: 90
	},
	large: {
		width: theme.spacing(22),
		height: theme.spacing(22),
	},
    largeXs: {
		width: theme.spacing(11),
		height: theme.spacing(11),
	},
}));


export default function InformacionEmpresa({empresa}) {

    const classes = useStyles();

    return (
        <div>
            <Grid container>
                <Hidden mdDown>
                    <Grid item lg={2} xs={8}>
                        <Box display="flex" justifyContent="flex-end">
                            <Avatar className={classes.large} alt="Remy Sharp"  src={empresa.logoImagenUrl} />
                        </Box>
                    </Grid>
                    <Grid item lg={10} xs={12}>
                        <Box>
                            <Box p={1} textAlign="left">
                                <Typography style={{fontSize: 40}}>
                                    <b>{empresa.nameCompany}</b>
                                </Typography>
                            </Box>
                        </Box>
                        <Box p={1} textAlign="left" display="flex" alignItems="center"> 
                            <Box pr={1} textAlign="left" display="flex" alignItems="center">
                                <Box>
                                    <RoomIcon style={{fontSize: 30}}/>
                                </Box>
                                <Typography variant="h5">
                                    {empresa.calleNumeroPrin}, Col. {empresa.coloniaPrin}, C.P. {empresa.cpPrin}, {empresa.ciudadPrin} {empresa.estado}
                                </Typography>
                            </Box>
                        </Box>
                        <Box ml={2} display="flex">
                            <Paper elevation={3}>
                                <Box p={1}>
                                    <Typography>
                                        <b>Costo Envio:</b>  ${empresa.priceEnvio}
                                    </Typography>
                                </Box>
                            </Paper>
                        </Box>
                    </Grid>
                </Hidden>
{/* //////////////////////RESPONSIVO /////////////////////// */}
                <Hidden mdUp>
                    <Grid item xs={3}>
                        <Box ml={1} display="flex" justifyContent="flex-end">
                            <Avatar className={classes.largeXs} alt="Remy Sharp"  src={empresa.logoImagenUrl} />
                        </Box>
                    </Grid>
                    <Grid item xs={9}>
                        <Box mt={2}>
                            <Box p={1} textAlign="left">
                                <Typography style={{fontSize: 24}}>
                                    <b>{empresa.nameCompany}</b>
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Hidden>
            </Grid>
        </div>
    )
}
