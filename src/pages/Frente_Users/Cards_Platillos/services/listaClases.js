import React, { useEffect, useState } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Box,  Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, makeStyles, TextField, Tooltip, Typography } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ListTypes from './listaTypes';

const useStyles = makeStyles((theme) => ({
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    large: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    },
    agregar:{
        minWidth: 300
    },
    column: {
        flexBasis: '100%',
    }
}))

export default function ListaClases({clases, load, setLoad, clasesTotal}) {
    const [control, setControl] = useState(false)
    const [ typeClass, setTypeClass] = useState([]);
    const [ controlCheck, setControlCheck] = useState(true)
    const classes = useStyles();


    return (
        <div>
            <Box key={clases._id} display="flex" justifyContent="center" p={1}>
                <Accordion 
                    className={classes.column} 
                    onClick={()=> {
                        setTypeClass(clases)
                    }}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Box className={classes.column}>
                            <Typography variant="h2">
                                {clases.typeClassification}
                            </Typography>
                        </Box>
                    </AccordionSummary>
                        <FormControl component="fieldset" className={classes.formControl}>
                            {
                                clases.statusAmount === true ? (
                                    <FormLabel>Puedes elegir {clases.amountClassification}</FormLabel>
                                ):(
                                    null
                                )
                            }
                            <FormGroup>
                                { 
                                    clases.types?.map((type, index) => {
                                        return(
                                            <ListTypes 
                                                clasesTotal={clasesTotal} 
                                                index={index} type={type} 
                                                ClassificationCarrito={typeClass} 
                                                load={load} 
                                                setLoad={setLoad} 
                                            />
                                        )
                                    })
                                }
                            </FormGroup>
                        </FormControl>
                </Accordion>
            </Box>
        </div>
    )
}
