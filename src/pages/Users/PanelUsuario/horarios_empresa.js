import React, { useEffect, useState } from 'react'
import Paper from '@material-ui/core/Paper';
import { Box, Button, FormControlLabel, Grid, makeStyles, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,} from '@material-ui/core'
import Dias from './dias';
import clienteAxios from '../../../config/axios';
import jwt_decode from 'jwt-decode';
import Spin from '../../../components/Spin/spin';

const useStyles = makeStyles({
    table: {
        padding: 5
    },
    tituloTable:{
        fontSize: 18,
        fontWeight: 600
    }
});

export default function Horarios_empresa({datosEmpresa, setUpload, upload}) {
    const classes = useStyles();
    const token = localStorage.getItem('token');
    const [control, setControl] = useState(false);
    const [loading, setLoading] = useState(false);
    const company = JSON.parse(localStorage.getItem('user'));

    const [ rows, setRows ] = useState(
        datosEmpresa.horario && datosEmpresa.horario.length !== 0 ? 
            datosEmpresa.horario :
        [{ 
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
        }]
    )

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

    useEffect(() => {
        if (datosEmpresa.horario && datosEmpresa.horario.length !== 0) {
            setControl(false);
        }
    }, []);


    const subirHorarios = async () => {
        setLoading(true);
        await clienteAxios
			.put(`/company/horarios/${company._id}`, rows , {
				headers: {
					Authorization: `bearer ${token}`
				}
			})
			.then((res) => {
                setUpload(!upload);
                setLoading(false);
			})
			.catch((err) => {
                setLoading(false);
                setUpload(!upload);
            });
    }

    const horariosActive = async (active) => {
        setLoading(true);
        await clienteAxios
		.put(`/company/action/publicHorarios/${company._id}`, 
            {
              "horariosActive": active
            },
            {
				headers: {
					Authorization: `bearer ${token}`
				}
			}
        )
        .then((res) => {
            setLoading(false);
            setUpload(!upload);
        }).catch((err) => {
            setUpload(!upload);
            setLoading(false);
        });
    };
    
    
    return (
        <div>
            <Spin loading={loading} />
            <Grid item lg={12}>
                <Box p={2} display="flex" justifyContent="center" alignItems="center" textAlign="center">
                    <FormControlLabel
                        control={
                            <Switch
                                onChange={
                                    () => {
                                        horariosActive(!datosEmpresa.horariosActive)
                                    }
                                } 
                                color="primary"
                                defaultChecked={datosEmpresa.horariosActive ? datosEmpresa.horariosActive : false}
                                name="checkedA"
                            />
                        }
                        label={datosEmpresa.horariosActive ? 'Horarios Activos' : 'Horarios Desactivados'}
                    />
                </Box>
                <Grid>
                    <Box p={2}>
                    <TableContainer  component={Paper}>
                        <Table  aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    {columns?.map((colum, index) => {
                                        return(
                                            <TableCell key={index} align="center" className={ classes.tituloTable }>{colum.title}</TableCell>
                                        )
                                    })}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows?.map((row, index) => {
                                    return (
                                        <Dias key={index} setRows={setRows} rows={rows} row={row} />
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    </Box>
                </Grid>
                <Grid item lg={12}>
                    <Box p={2} textAlign="center">
                        <Button
                            color="primary"
                            onClick={() => subirHorarios()}
                            variant="contained"
                        >
                            {
                                control === false ? 
                                "Actualizar horarios"
                                : "Guardar Horarios"
                            }
                        </Button>
                    </Box>

                </Grid>
            </Grid>
        </div>
    )
}
