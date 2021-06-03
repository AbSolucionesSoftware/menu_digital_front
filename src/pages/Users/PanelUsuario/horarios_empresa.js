import { Box, Checkbox, FormControlLabel, Grid, IconButton, makeStyles, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Tooltip, Typography } from '@material-ui/core'
import React from 'react'
import Paper from '@material-ui/core/Paper';


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

const rows = [
    createData('Lunes', "" ,"", false),
    createData('Martes', "" ,"", false ),
    createData('Miercoles',  "" ,"", false ),
    createData('Jueves',  "" ,"", false ),
    createData('Viernes',  "" ,"", false ),
    createData('Sabado',  "" ,"", false ),
    createData('Domingo', "" ,"", false ),
];

export default function Horarios_empresa() {

    const classes = useStyles();

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
                                    <TableCell align="center" className={ classes.tituloTable }> Dias </TableCell>
                                    <TableCell align="center" className={ classes.tituloTable }> Horario apertura </TableCell>
                                    <TableCell align="center" className={ classes.tituloTable }> Hora de cierre </TableCell>
                                    <TableCell align="center" className={ classes.tituloTable }> Dias abiertos </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows?.map((row) => {
                                    return (
                                        <TableRow
                                            hover
                                            // onClick={(event) => handleClick(event, row.name)}
                                            role="checkbox"
                                            // aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.name}
                                            // selected={isItemSelected}
                                        >
                                            <TableCell>{row.dia}</TableCell>
                                            <TableCell>{row.horarioInicial}</TableCell>
                                            <TableCell>{row.horarioFinal}</TableCell>
                                            <TableCell>
                                                <Switch defaultValue={row.close} name="activeHorarios" />
                                            </TableCell>
                                        </TableRow>
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
