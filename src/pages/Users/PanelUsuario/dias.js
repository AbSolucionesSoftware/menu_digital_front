import { Switch, TableCell, TableRow, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'

export default function Dias({row, setRows, rows}) {

    const [diaSelec, setDiaSelec] = useState([]);
    const [ diaCambio, setDiaCambio ] = useState({});

    const obtenerHorario = (e) => {
        // const newData = [ ...rows];
        // console.log(newData);
		const index = rows.findIndex((item) => diaSelec === item.key);
        const item = rows[index];

        // setDiaCambio(item);  
        console.log(e.target.value);

        setDiaCambio({
            ...item,
            [e.target.name]: e.target.value
        });

        // console.log(diaSelec);
        rows.splice(diaSelec, 1, {...diaCambio, ...diaSelec });
        // console.log(rows);
    }

    // useEffect(() => {
    // }, [])
    // console.log(rows);

    const handleClick = (e) => {
        setDiaSelec(e);
       
    };

    const arrayDias = () => {
        
    }

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
                    id="horarioInicial"
                    name="horarioInicial"
                    type="time"
                    defaultValue={row.horarioInicial}
                    onClick={arrayDias}
                    onChange={obtenerHorario}
                    InputLabelProps={{
                    shrink: true,
                    }}
                    inputProps={{
                    step: 300, // 5 min
                    }}
                />
            </TableCell>
            <TableCell>
                <TextField
                    id="horarioFinal"
                    name="horarioFinal"
                    type="time"
                    onChange={obtenerHorario}
                    defaultValue={row.horarioFinal}
                    InputLabelProps={{
                    shrink: true,
                    }}
                    inputProps={{
                    step: 300, // 5 min
                    }}
                />
            </TableCell>
            <TableCell>
                <Switch defaultValue={row.close} name="activeHorarios" />
            </TableCell>
        </TableRow>
    )
}
