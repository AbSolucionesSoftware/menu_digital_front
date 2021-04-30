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
                    // clase.types.splice(index, 1);
                    setControlCheck(true);
                    setControlDisabled(false);
                    // if(classificationBase.statusAmount === true && classificationBase.types.length < classificationBase.maximo){
                    //     setControlDisabled(false);
                    // }
                }else{
                    // clase.types.push(valor);
                    setControlCheck(false);
                    setControlDisabled(false); 
                }

                // if (classificationBase.types.length === 0) {
                //     clase.types.push(valor);
                //     setControlCheck(true);
                //     setControlDisabled(false);
                //     if (clase.statusAmount === true && clase.types.length === clase.maximo) {
                //         setControl(true);
                //     }
                // }else{
                //     if (classificationBase.statusAmount === true && classificationBase.types.length === classificationBase.maximo) {
                //         setControlCheck(false);
                //         setControlDisabled(true);
                //     }else{
                //         let encontrado = false;
                        

                        
                //     }
                //     if (controlCheck === true) {
                //         if (clase.statusAmount === true) {
                //             clase.types.push(valor); 
                //             if (clase.types.length === clase.maximo) {
                //                 setControl(true);
                //             }
                //             return clase.types;
                //         }else{
                //             clase.types.push(valor);
                //             return clase.types;
                //         }
                //     }
                // }
            }
            // console.log(classificationBase.types);
        })
        // console.log(controlDisabled);
    }


    const handleChange = (valor) => {
        clasesTotal?.map((clase) => {
            if (clase._idClass === ClassificationCarrito._idClassification) {
                if (clase.types.length === 0) {
                    console.log(clase.statusAmount);
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
                            console.log(encontrado);
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
            // console.log(clase.types);
        })
        console.log(clasesTotal);
    }

    /* const handleChange = (valor, index) => {       
        clasesTotal?.map((clase) => {
            valor.index = index;
            if (clase._idClass === typeClass._idClassification) {
                if (clase.types.length === 0) {
                    clase.types.push(valor);
                    setControlCheck(true);
                    setControlDisabled(false);
                    // if (clase.statusAmount === true && clase.types.length === clase.maximo) {
                    //     setControl(true);
                    // }
                }else{
                    if (clase.statusAmount === true && clase.types.length === clase.maximo) {
                        setControlCheck(false);
                        setControlDisabled(true);
                    }else{
                        let encontrado = false;
                        for(let index = 0; index < clase.types.length; index++) {
                            const tiposArregloCarrito = clase.types[index];
                            if (tiposArregloCarrito._idType === valor._idType) {
                                encontrado = true;
                            }
                        }

                        if(encontrado){
                            clase.types.splice(index, 1);
                            setControlCheck(false);
                            if(clase.statusAmount === true && clase.types.length < clase.maximo){
                                setControlDisabled(false);
                            }
                        }else{
                            clase.types.push(valor);
                            setControlCheck(true);
                            setControlDisabled(false); 
                        }
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
            console.log(clase.types);
        })
        console.log(controlDisabled);
    }; */

    /* function bloqueo() {
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
    } */

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
