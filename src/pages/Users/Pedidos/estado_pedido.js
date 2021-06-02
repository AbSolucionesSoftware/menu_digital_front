import { Box, Button, FormControl, Grid, InputLabel, makeStyles, MenuItem, Select, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import MessageSnackbar from '../../../components/Snackbar/snackbar';
import clienteAxios from '../../../config/axios';

const useStyles = makeStyles({
    root: {
      minWidth: 350,
    },
    formControl:{
        minWidth: 180,
    }
})

export default function Estado_Pedido({openEstado, setOpenEstado, pedido, loading, setLoading, update, setUpdate}) {
    const classes = useStyles();
    const [estado, setEstado] = useState("")

    function cambioStatus(pedido) {
		setLoading(!loading);
		clienteAxios
			.put(`/pedido/action/estadoPedido/${pedido._id}`, {"estadoPedido": estado})
			.then((res) => {
                setLoading(!loading);
                setUpdate(!update);
                setSnackbar({
					open: true,
					mensaje: res.data.message,
					status: 'success'
				});
			})
			.catch((err) => {
                setUpdate(!update);
                setLoading(!loading);
                setSnackbar({
					open: true,
					mensaje: err.data.message,
					status: 'error'
				});
			});
	}

    const handleChange = (event) => {
        setEstado(event.target.value);
    };

    const [ snackbar, setSnackbar ] = useState({
		open: false,
		mensaje: '',
		status: ''
	});

    return (
        <div>
            <MessageSnackbar
				open={snackbar.open}
				mensaje={snackbar.mensaje}
				status={snackbar.status}
				setSnackbar={setSnackbar}
			/>
            <Grid className={classes.root}>
                <Grid item lg={12}>
                    <Box p={3} textAlign="center">
                        <Typography variant="h5">
                            Estatus de Pedido
                        </Typography>
                    </Box>
                </Grid>

                <Grid item lg={12}>
                    <Box display="flex" justifyContent="center" textAlign="center" p={1}>
                        <Typography variant="h6">
                            Actualiza el estado de pedido
                        </Typography>
                    </Box>
                </Grid>
                <Grid item lg={12}>
                    <Box display="flex" justifyContent="center" textAlign="center" p={1}>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel>Estado de Pedido</InputLabel>
                            <Select
                                defaultValue={pedido.estadoPedido}
                                onChange={handleChange}
                                label="Estado de Pedido"
                            >
                            <MenuItem value="Realizado">Realizado</MenuItem>
                            <MenuItem value="Cancelado">Cancelado</MenuItem>
                            <MenuItem value="Enviado">Enviado</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Grid>
                <Grid item lg={12}>
                    <Box display="flex" justifyContent="center" textAlign="center" p={1}>
                        <Button
                            variant="contained" 
                            color="secondary"
                            onClick={ () => {
                                cambioStatus(pedido);
                                setOpenEstado(!openEstado)
                            }}
                        >
                            Guardar
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </div>
    )
}
