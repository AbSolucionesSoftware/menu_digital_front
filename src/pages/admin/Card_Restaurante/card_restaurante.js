import React, {useEffect, useState} from 'react';

import Eliminar from './services/eliminar';
import Editar from './services/editar';
import Publicar from './services/publicar'; 

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import useStyles from '../styles';
import { Box, Button, Grid } from '@material-ui/core';


export default function Cards_Restaurate(props) {
	const { empresas, setEmpresas, setUpload, upload } = props;

	const classes = useStyles();

	const render = empresas.map((empresa) => {
		return (
			<Grid lg={3}>
				<Box p={1} mt={1} display="flex" justifyContent="center" textAlign="center">
				<Card key={empresa._id} className={classes.root}>
						<Grid item lg={12} xs={12}>
							<CardContent className={classes.content}>
								<Box mt={1}>
									<Grid xs zeroMinWidth >
										<Box display="flex" justifyContent="center">
											<Typography className={classes.rootTitulo} variant="h5" noWrap>
												{empresa.nameCompany}
											</Typography>
										</Box>
									</Grid>
									<Grid xs zeroMinWidth >
										<Box display="flex" justifyContent="center">
											<Typography className={classes.rootTitulo} variant="h5" noWrap>
											{empresa.owner}
											</Typography>
										</Box>
									</Grid>
									<Grid xs zeroMinWidth >
										<Box display="flex" justifyContent="center">
											<Typography className={classes.rootTitulo} variant="h6" noWrap>
												{empresa.phone}
											</Typography>
										</Box>
									</Grid>
								</Box>
							</CardContent>
						</Grid>
						<Grid item lg={12} xs={12}>
							{empresa.type === true ? (
								<>
									<Box textAlign="center" p={1}>
										<Editar empresa={empresa}/>
									</Box>
								</>
							 ) : (
								<>
									<Box textAlign="center" p={1}>
										<Eliminar upload={upload} setUpload={setUpload} empresa={empresa}/>
									</Box>
									<Box textAlign="center" p={1}>
										<Editar empresa={empresa}/>
									</Box>
									<Box textAlign="center" p={1}>
										<Publicar upload={upload} setUpload={setUpload} empresa={empresa}/>
									</Box>
								</>
							  )}
						</Grid>
				</Card>
			</Box>
		</Grid>
		);
	});

	return (
		<Grid container>
				{render}
		</Grid>
	);
}