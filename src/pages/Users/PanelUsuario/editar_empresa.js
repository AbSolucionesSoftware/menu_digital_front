import { StepLabel, Stepper, Typography, Button, Box, Step } from '@material-ui/core';
import React from 'react'
import Editar_User from './editar_user';
import Horarios_empresa from './horarios_empresa';

export default function Editar_empresa({ handleDrawerClose, datosEmpresa, setDatosEmpresa, setUpload, upload }) {


    function getSteps() {
        return ['Datos Empresa', 'Horarios'];
    }

    function getStepContent(step) {
        switch (step) {
            case 0:
                return (<>
                    <Editar_User
                        handleDrawerClose={handleDrawerClose} 
                        setUpload={setUpload} 
                        datosEmpresa={datosEmpresa} 
                        setDatosEmpresa={setDatosEmpresa}
                        upload={upload}
                    />
                </>)
            case 1:
                return (<>
                    <Horarios_empresa 
                        handleDrawerClose={handleDrawerClose} 
                        setUpload={setUpload} 
                        datosEmpresa={datosEmpresa} 
                        setDatosEmpresa={setDatosEmpresa}
                        upload={upload}
                    />
                </>)
                
        }
    }

    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();
  
    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    const handleReset = () => {
      setActiveStep(0);
    };


    return (
        <>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                <Step key={label}>
                    <StepLabel>
                        <Typography component={'span'} variant="h5">
                            {label}
                        </Typography>
                    </StepLabel>
                </Step>
                ))}
            </Stepper>
            <div>
                {activeStep === steps.length ? (
                <div>
                    <Button onClick={handleReset}>Volver</Button>
                </div>
                ) : (
                <div>
                    <Typography >{getStepContent(activeStep)}</Typography>
                    <Box display="flex" justifyContent="center">
                            <Box p={1}>
                                <Button
                                    variant="contained" 
                                    color="secondary"
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    // className={classes.backButton}
                                >
                                    Atras
                                </Button>
                            </Box>
                            {activeStep === steps.length -1 ? (
                                <Box p={1}>
                                    <Button
                                        // className={classes.backButton}
                                        variant="contained" 
                                        color="primary"
                                        onClick={() => handleDrawerClose()}
                                    >
                                        Salir
                                    </Button>
                                </Box>
                            ) : (
                                <Box p={1}>
                                    <Button variant="contained" color="primary" onClick={handleNext}>
                                        Siguiente
                                    </Button>
                                </Box>
                               
                            )}
                    </Box>
                </div>
                )}
            </div>
        </>
    )
}
