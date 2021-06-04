import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper';
import { Box, Checkbox, FormControlLabel, Grid, makeStyles, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Toolbar, Tooltip, Typography } from '@material-ui/core'
import Dias from './dias';

const useStyles = makeStyles({
    table: {
        padding: 5
    },
    tituloTable:{
        fontSize: 18,
        fontWeight: 600
    }
});

function createData(dia, horarioInicial, horarioFinal, close) {
    return { dia, horarioInicial, horarioFinal, close };
}


export default function Horarios_empresa() {

    const classes = useStyles();


    const [ rows, setRows ] = useState([
        { 
            dia: "Lunes",
            key: 0,
            horarioInicial: "",
            horarioFinal: "",
            close: false
        },
        { 
            dia: "Martes",
            key: 1,
            horarioInicial: "",
            horarioFinal: "",
            close: false
        },
        { 
            dia: "Miercoles",
            key: 2,
            horarioInicial: "",
            horarioFinal: "",
            close: false
        },
        { 
            dia: "Jueves",
            key: 3,
            horarioInicial: "",
            horarioFinal: "",
            close: false
        },
        { 
            dia: "Viernes",
            key: 4,
            horarioInicial: "",
            horarioFinal: "",
            close: false
        },
        { 
            dia: "Sabado",
            key: 5,
            horarioInicial: "",
            horarioFinal: "",
            close: false
        },
        { 
            dia: "Domingo",
            key: 6,
            horarioInicial: "",
            horarioFinal: "",
            close: false
        },
    
    ])

    const columns = [
		{
			title: 'Dia',
			dataIndex: 'dia',
			editable: false,
			width: '25%'
		},
		{
			title: 'Hora apertura',
			dataIndex: 'horarioInicial',
			editable: true,
			width: '25%'
		},
		{
			title: 'Hora de cierre',
			dataIndex: 'horarioFinal',
			editable: true,
			width: '25%'
		},
		{
			title: 'Dias abiertos',
			dataIndex: 'close',
			width: '10%',
			render: (_, record) => (
				<Switch
					checked={record.close}
					checkedChildren="Abierto"
					unCheckedChildren="Cerrado"
					// onChange={(value) => onChangeCloseDay(value, record)}
				/>
			)
		}
	];

    const obtenerHorario = (e) => {
        // console.log(e.lenght)
        // console.log(e.target.value);//PARA LA HORA
        rows.forEach(dia => {
            console.log(dia.key);
        });
        // setRows({
        //     ...rows,
        //     [e.target.name]: e.target.value
        // });
    }

    // console.log(rows);

    return (
        <div>
            <Grid item lg={12}>
                <Box p={2}>
                    <FormControlLabel
                        control={<Switch  name="activeHorarios" />}
                        label="Activar Horarios"
                    />
                </Box>
                <Grid>
                    <Box p={2}>
                    <TableContainer  component={Paper}>
                        <Table  aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    {columns?.map((colum) => {
                                        return(
                                            <TableCell align="center" className={ classes.tituloTable }>{colum.title}</TableCell>
                                        )
                                    })}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows?.map((row) => {
                                    return (
                                        <Dias row={row} setRows={setRows} rows={rows} />
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    </Box>
                </Grid>
            </Grid>
        </div>
    )
}
