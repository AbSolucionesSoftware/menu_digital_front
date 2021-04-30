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

export default function ListaClases({clases, clasesTotal}) {
    const [control, setControl] = useState(false)
    const [ typeClass, setTypeClass] = useState([]);
    const [ controlCheck, setControlCheck] = useState(true)
    const classes = useStyles();

    const handleChange = (valor, index) => {
        clasesTotal?.map((clase) => {
            valor.index = index;
            if (clase._idClass === typeClass._idClassification) {
                if (clase.types.length === 0) {
                    if (clase.statusAmount === true) {
                        clase.types.push(valor);
                        console.log(index);
                        console.log(clase.types);
                        if (clase.types.length === clase.maximo) {
                            setControl(true);
                        }
                    }else{
                        clase.types.push(valor);
                    }
                }else{
                    for(let index = 0; index < clase.types.length; index++) {
                        const element = clase.types[index];
                        if (element._idType === valor._idType) {
                            clase.types.splice(index, 1);
                            return clase.types;
                        }else {
                            setControlCheck(true);
                        }
                    }
                    if (controlCheck === true) {
                        if (clase.statusAmount === true) {
                            clase.types.push(valor); 
                            if (clase.types.length === clase.maximo) {
                                setControl(true);
                            }
                            return clase.types;
                        }else{
                            clase.types.push(valor);
                            return clase.types;
                        }
                    }
                }
            }else{
                return null;
            }
        })
    };

    // function bloqueo(clase, valor) {
    //     if (clase._idClass === typeClass._idClassification) {
    //         if (clase.types.length === 0) {
    //             clase.types.push(valor);
    //         }else{
    //             for(let index = 0; index < clase.types.length; index++) {
    //                 const element = clase.types[index];
    //                 if (element._idType === valor._idType) {
    //                     clase.types.splice(index, 1);
    //                     return clase.types;
    //                 }else{
    //                     setControlCheck(true);
    //                 }
    //             }
    //             if (controlCheck === true) {
    //                 clase.types.push(valor);
    //                 return clase.types;
    //             }
    //         }
    //     }else{
    //         return null;
    //     }
    // }
    //FUNCION ORIGINAL QUE AYUDA A GUARDAR Y ELIMINAR
    

   
    
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
                        <FormLabel >Puedes elegir {clases.amountClassification}</FormLabel>
                            <FormGroup>
                                { 
                                    clases.types?.map((type, index) => {
                                        return(
                                            <ListTypes  clasesTotal={clasesTotal} index={index} type={type} ClassificationCarrito={typeClass} />
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
