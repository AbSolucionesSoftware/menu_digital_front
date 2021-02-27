import { Grid, Card, CardMedia, CardContent, Typography, Button, Box } from '@material-ui/core'
import React from 'react'
import useStyles from './styles';

export default function CardPlato() {

  const classes = useStyles();

    return (
        <div>
            <Grid lg={4}>
                <Card className={classes.root}>
                    <CardMedia
                        className={classes.cover}
                        image="/static/images/cards/live-from-space.jpg"
                        title="Live from space album cover"
                    />
                    <div className={classes.details}>
                        <CardContent className={classes.content}>
                            <Typography component="h5" variant="h5">
                                Plato de Pozole 
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary">
                               Mariscos
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary">
                                Rico pozole mexicano de Izxtapa Cihuatlnejo
                            </Typography>
                        </CardContent>
                        <CardContent className={classes.content}>
                            <Box display="flex" justifyContent="center">
                                <Box p={1}>
                                    <Button
                                        variant="contained" 
                                        color="primary"
                                        size="medium"
                                    >
                                        Editar
                                    </Button>
                                </Box>
                                <Box p={1}>
                                    <Button
                                        variant="contained" 
                                        color="secondary"
                                        size="medium"
                                    >
                                        Eliminar
                                    </Button>
                            </Box>
                            </Box>
                        </CardContent>
                    </div>
                </Card>
            </Grid>
        </div>
    )
}
