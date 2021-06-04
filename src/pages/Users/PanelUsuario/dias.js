import { FormControlLabel, Switch, TableCell, TableRow, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import clienteAxios from '../../../config/axios';

export default function Dias({row, setRows, rows}) {

    const [diaSelec, setDiaSelec] = useState([]);
    
    const [diaActivo, setdiaActivo] = useState(false);

    const index = rows.findIndex((item) => diaSelec === item.key);
    const item = rows[index];

    const [ diaCambio, setDiaCambio ] = useState(item);

    

    const obtenerHorario = (e) => {
        if ( e.target.name === "horarioInicial" ) {
            const dia = {
                dia: row.dia,
                key: row.key,
                horarioInicial: e.target.value ,
                horarioFinal: row.horarioFinal,
                close: false
            }
            rows.splice(diaSelec, 1, {...dia,dia});
        }else{
            const dia = {
                dia: row.dia,
                key: row.key,
                horarioInicial: row.horarioInicial,
                horarioFinal:e.target.value,
                close: false
            }
            rows.splice(diaSelec, 1, {...dia,dia});
        }
        // if (e.target.name === "close") {
        //     console.log("Si entra actualizar");
        //     setDiaCambio({
        //         ...item,
        //         [e.target.name]: e.target.checked
        //     });
        //     console.log(diaCambio);
        // }else{
        // setDiaCambio({
        //     ...row,
        //     [e.target.name]: e.target.value
        // });
        // }

        
       /* console.log(rows); */
     console.log(rows);

    }

     console.log(rows);
     // console.log(diaCambio); 

    const handleClick = (e) => {
        setDiaSelec(e);
    };

    return (
        <TableRow
            hover
            onClick={() => handleClick(row.key)}
            role="checkbox"
            name={row.key}
            value={row.key}
            // aria-checked={handleClick}
            tabIndex={-1}
            key={row.key}
            // selected={handleClick}
        >
            <TableCell>{row.dia}</TableCell>
            <TableCell>
                <TextField
                    /* id="horarioInicial" */
                    name="horarioInicial"
                    defaultValue={row.horarioInicial}
                    // onClick={arrayDias}
                    onChange={(e) => obtenerHorario(e)}
                />
            </TableCell>
            <TableCell>
                <TextField
                   /*  id="horarioFinal" */
                    name="horarioFinal"
                    onChange={(e) => obtenerHorario(e)}
                    defaultValue={row.horarioFinal}
                />
            </TableCell>
            <TableCell>
                <FormControlLabel
                    control={
                        <Switch
                           /*  onChange={(e) => obtenerHorario(e)} */
                            color="primary"
                            defaultChecked={row.close}
                            name="close"
                        />
                    }
                />
            </TableCell>
        </TableRow>
    )
}
