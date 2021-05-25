import { Box, Checkbox, FormControlLabel, Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import MessageSnackbar from '../../../../components/Snackbar/snackbar';
import Alert from '@material-ui/lab/Alert';
import { formatoMexico } from '../../../../config/reuserFunction';

const useStyles = makeStyles((theme) => ({
    column: {
        flexBasis: '50%',
    }
}))

export default function ListTypes({clasesTotal, load, setLoad, type, ClassificationCarrito, index}) {
    const [controlDisabled, setControlDisabled] = useState(false)
    const [ controlCheck, setControlCheck] = useState(false);
    const [controlCambio, setControlCambio] = useState(false);

    const [ snackbar, setSnackbar ] = useState({
		open: false,
		mensaje: '',
		status: ''
	});

    const classes = useStyles();

    useEffect(
		() => {
			verificacion(type, index);
		},
		[ controlCambio ]
	);

    const verificacion = (typeArregloCarrito) => {
        clasesTotal?.map((classificationBase) => {
            if (classificationBase._idClass === ClassificationCarrito._idClassification) {
                let encontrado = false;
                for(let index = 0; index < classificationBase.types.length; index++) {
                    const tiposArregloCarrito = classificationBase.types[index];
                    if (tiposArregloCarrito._idType === typeArregloCarrito._idType) {
                        encontrado = true;
                    }
                }
                if(encontrado){
                    setControlCheck(true);
                    setControlDisabled(false);
                }else{
                    setControlCheck(false);
                    setControlDisabled(false); 
                }

            }
        })
    }

    const handleChange = (valor) => {
        clasesTotal?.map((clase) => {
            if (clase._idClass === ClassificationCarrito._idClassification) {
                let totalClasificacion = clase.totalClasificacion;
                if (clase.types.length === 0) {
                    clase.types.push(valor);
                    if(clase.statusAmount !== true){
                        totalClasificacion += parseInt(valor.price);
                        clase.totalClasificacion = totalClasificacion;
                        setLoad(!load);
                    }
                    setControlCambio(!controlCambio);
                    return false;
                }else{
                    let encontrado = false;
                    let index = 0;
                    for(let i = 0; i < clase.types.length; i++) {
                        const tiposArregloCarrito = clase.types[i];
                        if (tiposArregloCarrito._idType === valor._idType) {
                            encontrado = true;
                            index = i;
                        }
                    }
                    if(encontrado){
                        clase.types.splice(index, 1);
                        totalClasificacion -= parseInt(valor.price);
                        setLoad(!load);
                    }else{
                        if(clase.statusAmount === false){
                            clase.types.push(valor);
                            totalClasificacion += parseInt(valor.price);
                            setLoad(!load);
                        }else if (clase.statusAmount === true && clase.types.length < clase.maximo) {
                            clase.types.push(valor);
                        }else{
                            // alert(`Solo puedes selecionar ${clase.maximo} de ${clase.nombre}`)
                            setSnackbar({
                                open: true,
                                mensaje: `Solo se puedes seleccionar ${clase.maximo} de ${clase.nombre}`,
                                status: 'error'
                            });
                        }
                    }
                    setControlCambio(!controlCambio);
                    clase.totalClasificacion = totalClasificacion
                    return null;
                }
                
            }
        })
    }
    
    return (
        <div>
            <MessageSnackbar
				open={snackbar.open}
				mensaje={snackbar.mensaje}
				status={snackbar.status}
				setSnackbar={setSnackbar}
			/>
            <Grid container>
                <Box display="flex">
                    <Box display="flex" alignItems="center" ml={1} mr={10}>
                        <FormControlLabel
                            control={<Checkbox checked={controlCheck} disabled={controlDisabled} onChange={() =>handleChange(type) } name={type.name} />}
                        />
                        <Typography component="legend">{type.name}</Typography>
                    </Box>
                    <Box display="flex" alignItems="center">
                        <Typography >{type.price === "0" ? "" : ("$" + type.price)} </Typography>
                    </Box>
                </Box>

            </Grid>
        </div>
    )
}
