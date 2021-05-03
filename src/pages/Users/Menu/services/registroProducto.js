import React, { useCallback, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import RegistroPlatillo from './registro';
import RegistroExtras from './registro_extras';
import { Box } from '@material-ui/core';
import clienteAxios from '../../../../config/axios';
import Spin from '../../../../components/Spin/spin';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%'
	},
	backButton: {
		marginRight: theme.spacing(1)
	},
	instructions: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1)
	}
}));

export default function RegistroProducto({ handleDrawerClose, editarProducto }) {
    const token = localStorage.getItem('token');
	const classes = useStyles();
	const [ activeStep, setActiveStep ] = useState(0);
	const steps = getSteps();
    const [ producto, setProducto ] = useState();
    const [ update, setUpdate ] = useState(false);
    const [ loading, setLoading ] = useState(false);

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	function getSteps() {
		return [ 'Platillo', 'Extras' ];
	}

	const obtenerPlatillo = useCallback(
		async () => {
			setLoading(true);
			await clienteAxios
				.get(`/product/edit/${editarProducto._id}`,
                {
                    headers: {
                        Authorization: `bearer ${token}`
                    }
                })
				.then((res) => {
					setLoading(false);
					setProducto(res.data);
				})
				.catch((err) => {
					setLoading(false);
				});
		},
		[]
	);

    useEffect(() => {
        if(editarProducto !== undefined){
            obtenerPlatillo();
        }
    }, [ obtenerPlatillo, update, editarProducto ])

	function getStepContent(stepIndex) {
		switch (stepIndex) {
			case 0:
				return (
					<RegistroPlatillo
						producto={producto}
                        setProducto={setProducto}
						update={update}
						setUpdate={setUpdate}
					/>
				);
			case 1:
				return (
					<RegistroExtras
						producto={producto}
						update={update}
						setUpdate={setUpdate}
					/>
				);
			default:
				return 'Unknown stepIndex';
		}
	}

	return (
		<div className={classes.root}>
            <Spin loading={loading} />
			<Stepper activeStep={activeStep} alternativeLabel>
				{steps.map((label) => (
					<Step key={label}>
						<StepLabel>{label}</StepLabel>
					</Step>
				))}
			</Stepper>
			<div>
				{activeStep === steps.length ? null : (
					<div>
						<Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
						<Box display="flex" justifyContent="center" my={5}>
							{activeStep === steps.length - 1 ? null : (
								<Button onClick={handleDrawerClose} className={classes.backButton}>
									Salir
								</Button>
							)}
							<Button disabled={activeStep === 0} onClick={handleBack} className={classes.backButton}>
								Atras
							</Button>
							<Button
								disabled={producto === undefined ? true : false}
								variant="outlined"
								color="primary"
								onClick={() => (activeStep === steps.length - 1 ? handleDrawerClose() : handleNext())}
							>
								{activeStep === steps.length - 1 ? 'Salir' : 'Siguiente'}
							</Button>
						</Box>
					</div>
				)}
			</div>
		</div>
	);
}
