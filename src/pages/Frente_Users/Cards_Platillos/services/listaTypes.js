import { Box, Checkbox, FormControlLabel, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'

export default function ListTypes({clasesTotal, type, ClassificationCarrito, index}) {
    const [controlDisabled, setControlDisabled] = useState(false)
    const [ controlCheck, setControlCheck] = useState(false);
    const [controlCambio, setControlCambio] = useState(false);

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
                if (clase.types.length === 0) {
                    // console.log(clase.statusAmount);
                    clase.types.push(valor);
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
                            // console.log(encontrado);
                        }
                    }
                    if(encontrado){
                        clase.types.splice(index, 1);
                    }else{
                        if(clase.statusAmount === false){
                            clase.types.push(valor);
                        }else if (clase.statusAmount === true && clase.types.length < clase.maximo) {
                            clase.types.push(valor);
                        }else{
                            alert(`Solo puedes selecionar ${clase.maximo} de ${clase.nombre}`)
                        }
                    }
                    setControlCambio(!controlCambio);
                    return null;
                }

            }
        })
        // console.log(clasesTotal);
    }

    return (
        <div>
             <Box  pl={1} display="flex" alignItems="center">
                <FormControlLabel
                    control={<Checkbox checked={controlCheck} disabled={controlDisabled} onChange={() =>handleChange(type) } name={type.name} />}
                />
                <Typography component="legend">{type.name}</Typography>
            </Box>
        </div>
    )
}
