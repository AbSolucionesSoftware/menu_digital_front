import { Box, Container, Divider, Grid, Typography } from '@material-ui/core';
import React, { Fragment } from 'react'

import useStyles from '../../estilos';


export default function Cuarta() {

    const classes = useStyles();

    return (
        <Fragment>
            <Container>
                <Grid container >
                    <Grid lg={6} xs={10} >
                        <Box className={classes.cajaVideo} mt={3}>
                            <iframe 
                                className={classes.video}
                                src="https://www.youtube.com/embed/Ooj0369RNE0" 
                                frameborder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowfullscreen
                            >

                            </iframe>
                        </Box>
                    </Grid>
                    <Grid lg={6} xs={10}>
                        <Box ml={5}>
                        <Typography component="div" variant="h4">
                            <Box textAlign="left" mt={6}>
                                Description with video
                            </Box>
                        </Typography>
                        </Box>
                        <Box className={classes.margenes}>
                            <Divider variant="inset" className={classes.divisor}/>
                        </Box>
                        <Box ml={5}>
                        <Typography component="div" variant="body1" className={classes.tipografia}>
                            <Box  className={classes.margenes}>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </Box>
                            <Box  className={classes.margenes}>
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
                            </Box>
                        </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Fragment>
    )
}