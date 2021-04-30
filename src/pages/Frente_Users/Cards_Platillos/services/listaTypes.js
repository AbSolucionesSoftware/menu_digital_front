import { Box, Checkbox, FormControlLabel, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'

export default function ListTypes({clasesTotal, type, typeClass, index}) {
    const [control, setControl] = useState(false)

    const [ controlCheck, setControlCheck] = useState(false)

    const handleChange = (valor, index) => {       
        clasesTotal?.map((clase) => {
            valor.index = index;
            if (clase._idClass === typeClass._idClassification) {
                if (clase.types.length === 0) {
                    clase.types.push(valor);
                    setControlCheck(false);
                    // if (clase.statusAmount === true && clase.types.length === clase.maximo) {
                    //     setControl(true);
                    // }
                }else{
                    if (clase.statusAmount === true && clase.types.length === clase.maximo) {
                        setControlCheck(true);
                    }else{
                        for(let index = 0; index < clase.types.length; index++) {
                            const tiposArregloCarrito = clase.types[index];
                            if (tiposArregloCarrito._idType === valor._idType) {
                                clase.types.splice(index, 1);
                                // return clase.types;
                            }
                        }
                        setControlCheck(false);
                    }
                    // if (controlCheck === true) {
                    //     if (clase.statusAmount === true) {
                    //         clase.types.push(valor); 
                    //         if (clase.types.length === clase.maximo) {
                    //             setControl(true);
                    //         }
                    //         return clase.types;
                    //     }else{
                    //         clase.types.push(valor);
                    //         return clase.types;
                    //     }
                    // }
                }
            }
            console.log(controlCheck);
        })
    };

    function bloqueo() {
        clasesTotal?.map((clase) => {

            if (clase._idClass === typeClass._idClassification) {
                
                for(let index = 0; index < clase.types.length; index++) {
                    const tipos = clase.types[index];
                    let cont = false;
                    for (let i = 0; i < typeClass.types.length; i++) {
                        const element = typeClass.types[i];
                        if (element._idType === tipos._idType) {
                            cont = true;
                        }
                    }
                    return cont;
                }

            }else{
                return null;
            }
        })
    }

    return (
        <div>
             <Box  pl={1} display="flex" alignItems="center">
                <FormControlLabel
                    control={<Checkbox disabled={controlCheck} onChange={() =>handleChange(type, index) } name={type.name} />}
                />
                <Typography component="legend">{type.name}</Typography>
            </Box>
        </div>
    )
}
