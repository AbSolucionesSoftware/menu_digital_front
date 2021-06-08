import { FormControlLabel, Switch, TableCell, TableRow, TextField } from '@material-ui/core';
import React from 'react';
import clienteAxios from '../../../config/axios';

export default function Dias({ row, setRows, rows, key }) {
	let dia = {
		dia: row.dia,
		key: row.key,
		horarioInicial: row ? row.horarioInicial : '',
		horarioFinal: row ? row.horarioFinal : '',
		close: row ? row.close : false
	};

	const obtenerHorario = (e) => {
		if (e.target.name === 'horarioInicial') {
			dia.horarioInicial = e.target.value;
		} else if (e.target.name === 'close'){
            dia.close = e.target.checked
        } else {
			dia.horarioFinal = e.target.value;
		}
		rows.splice(row.key, 1, dia);
	};

	return (
		<TableRow
			hover
			role="checkbox"
			name={row.key}
			value={row.key}
			tabIndex={-1}
			key={key}
		>
			<TableCell>{row.dia}</TableCell>
			<TableCell>
				<TextField
					type="input"
					id="horarioInicial" 
					name="horarioInicial"
					defaultValue={row ? row.horarioInicial : null}
					onChange={(e) => obtenerHorario(e)}
				/>
			</TableCell>
			<TableCell>
				<TextField
					type="input"
					id="horarioFinal"
					name="horarioFinal"
					onChange={(e) => obtenerHorario(e)}
					defaultValue={row ? row.horarioFinal : null}
				/>
			</TableCell>
			<TableCell>
				<FormControlLabel
					control={
						<Switch
							 onChange={(e) => obtenerHorario(e)}
							color="primary"
							defaultChecked={row ? row.close : null}
							name="close"
						/>
					}
				/>
			</TableCell>
		</TableRow>
	);
}
