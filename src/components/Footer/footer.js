import { Box, Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'

import comody from '../../img/Comody.jpeg';


const useStyles = makeStyles((theme) => ({
image: {
    display: "flex",
    maxHeight: '100%',
    maxWidth: '100%'
},
containerImage:{
    display: "flex",
    width: 140,
    height: 50
}
}));

export default function Footer() {

	const classes = useStyles();
    return (
        <div>
                <Grid lg={12}  container
  direction="row"
  justify="center">
                    <Box justifyContent="center" textAlign="center">
                        <Box>
                            <Typography variant="body1">
                                Todos los derechos reservados de COMODY, AB Soluciones Empresariales 2021
                            </Typography>
                        </Box>
                        {/* <Box textAlign="center" className={classes.containerImage}>  
                            <img className={classes.image} alt="logotipo" src={comody}/>
                        </Box> */}
                    </Box>
                </Grid>
                
        </div>
    )
}
;