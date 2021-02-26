import React, {useEffect, useState} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import Eliminar from './services/eliminar';
import Editar from './services/editar';
import Publicar from './services/publicar'; 

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import useStyles from '../styles';
import { Box, Button, Grid } from '@material-ui/core';
// import clienteAxios from '../../../config/axios';


export default function Cards_Restaurate(props) {
	const { empresas } = props;

	const classes = useStyles();

	const render = empresas.map((empresa) => {
		return (
			<Box mt={3}>
				<Card key={empresa._id} className={classes.root}>
					<Grid container>
						<Grid item lg={6} xs={12}>
							<CardContent className={classes.content}>
								<Box textAlign="center" mt={2}>
									<Typography variant="h5">
										{empresa.nameCompany}
									</Typography>
									<Typography variant="h6" >
										{empresa.owner}
									</Typography>
									<Typography variant="h6">
										{empresa.phone}
									</Typography>
								</Box>
							</CardContent>
						</Grid>
						<Grid item lg={6} xs={12}>
							<Box textAlign="center" p={1}>
								<Eliminar empresa={empresa}/>
							</Box>
							<Box textAlign="center" p={1}>
								<Editar empresa={empresa}/>
							</Box>
							<Box textAlign="center" p={1}>
								<Publicar empresa={empresa}/>
							</Box>
						</Grid>
					</Grid>
				</Card>
			</Box>
		);
	});

	return (
		<Grid item lg={8}>
			{render}
		</Grid>
	);
}