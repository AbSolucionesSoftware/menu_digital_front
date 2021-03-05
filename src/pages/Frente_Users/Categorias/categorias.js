import React, { useEffect, useState } from 'react'

import { Box, Card, Container, Grid, Typography } from '@material-ui/core'
import LastPageIcon from '@material-ui/icons/LastPage';

import useStyles from  './styles';
import clienteAxios from '../../../config/axios';

export default function Categorias(props) {
    const {empresa} = props;
    const [categorias , setCategorias] = useState([]);
    const classes = useStyles();
    // console.log(empresa._id);

    const consultarCates = async () => {
		await clienteAxios
			.get(`/product/categories/${empresa._id}`)
			.then((res) => {
				// setCategorias(res.data);
                console.log(res);
			})
			.catch((err) => {

			})
	}

    useEffect(() => {
		consultarCates();
	}, [])

    // const render = empresa.map((empresa) => {
    //     console.log(empresa);
    // })

    return (
        <div>
            <Container maxWidth="xl">
                <Grid container justify="center">
                    <Grid className={classes.paper} lg={3} xs={12}>
                        <Card className={classes.root}>
                            <Box p={2} display="flex" alignItems="center">
                                <LastPageIcon className={classes.large}/>
                                <Typography variant="h5">
                                    Cortes Finos
                                </Typography>
                            </Box>
                        </Card>
                    </Grid>
                    <Grid className={classes.paper} lg={3} xs={12}>
                        <Card className={classes.root}>
                            <Box p={2} display="flex" alignItems="center">
                                <LastPageIcon className={classes.large}/>
                                <Typography variant="h5">
                                    Cortes Finos
                                </Typography>
                            </Box>
                        </Card>
                    </Grid>
                    <Grid className={classes.paper} lg={3} xs={12}>
                        <Card className={classes.root}>
                            <Box p={2} display="flex" alignItems="center">
                                <LastPageIcon className={classes.large}/>
                                <Typography variant="h5">
                                    Cortes Finos
                                </Typography>
                            </Box>
                        </Card>
                    </Grid>
                    <Grid className={classes.paper} lg={3} xs={12}>
                        <Card className={classes.root}>
                            <Box p={2} display="flex" alignItems="center">
                                <LastPageIcon className={classes.large}/>
                                <Typography variant="h5">
                                    Cortes Finos
                                </Typography>
                            </Box>
                        </Card>
                    </Grid>
                    <Grid className={classes.paper} lg={3} xs={12}>
                        <Card className={classes.root}>
                            <Box p={2} display="flex" alignItems="center">
                                <LastPageIcon className={classes.large}/>
                                <Typography variant="h5">
                                    Cortes Finos
                                </Typography>
                            </Box>
                        </Card>
                    </Grid>
                    <Grid className={classes.paper} lg={3} xs={12}>
                        <Card className={classes.root}>
                            <Box p={2} display="flex" alignItems="center">
                                <LastPageIcon className={classes.large}/>
                                <Typography variant="h5">
                                    Cortes Finos
                                </Typography>
                            </Box>
                        </Card>
                    </Grid>
                </Grid>
			</Container>
        </div>
    )
}
