import { Box, Button, Dialog, DialogActions, DialogContent, Grid, IconButton, TextField, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import EditIcon from '@material-ui/icons/Edit';
import PropTypes from 'prop-types';

import NumberFormat from 'react-number-format';
import { sub } from 'date-fns';
import MessageSnackbar from '../../../../components/Snackbar/snackbar';
import Spin from '../../../../components/Spin/spin';
import clienteAxios from '../../../../config/axios';

NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

//Funcion para tener siempre numeros
function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;

    return (
        <NumberFormat
        {...other}
        getInputRef={inputRef}
        onValueChange={(values) => {
            onChange({
            target: {
                name: props.name,
                value: values.value,
            },
            });
        }}
        thousandSeparator
        isNumericString
        prefix="$"
        />
    );
}

export default function Editar_Subtypes({clase, upload, setUpload, subType}) {
    const company = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [subTypes, setSubTypes] = useState([]);
    const [ snackbar, setSnackbar ] = useState({
		open: false,
		mensaje: '',
		status: ''
	});
    useEffect(() => {
        setSubTypes(subType)
    }, [])

    const obtenerCampos = (e) => {
        setSubTypes({
			...subTypes,
			[e.target.name]: e.target.value
		});
    };

    const handleClick = () => {
        setOpen(!open);
    }


    console.log(subTypes);

    const editarSubTypes = async (subType) => {
        // setLoading(true);
        await clienteAxios
        .put(`/classification/action/${clase}/subClassification/${subType._id}/company/${company._id}`, {
            "name": subTypes.name,
            "price": subTypes.price
        },{
            headers: {
                Authorization: `bearer ${token}`
            }
        }).then((res) => {
            setLoading(false);
            setUpload(!upload);
            setSnackbar({
                open: true,
                mensaje: res.data.message, 
                status: 'success'
            });
        })
        .catch((err) => {
            setUpload(!upload);
            setLoading(false);
            setSnackbar({
                open: true,
                mensaje: "Ocurrio un problema en el servidor", 
                status: 'error'
            });
        });
    }

    return (
        <div>
            <MessageSnackbar
				open={snackbar.open}
				mensaje={snackbar.mensaje}
				status={snackbar.status}
				setSnackbar={setSnackbar}
			/>
            <Spin loading={loading} />
            <IconButton onClick={handleClick}>
                <EditIcon/>
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClick}
            >
                <Box p={2} textAlign="center">
                    <Typography variant="h6">
                        Editar Sub Clasificación
                    </Typography>
                </Box>
                <DialogContent>
                    <Grid>
                        <Box p={2}>
                            <TextField
                                defaultValue={subTypes.name}
                                label="Nombre"
                                color="primary"
                                variant="outlined"
                                name="name"
                                id="name"
                                onChange={obtenerCampos}
                            />
                        </Box>
                        <Box p={2}>
                            <TextField
                                defaultValue={subTypes.price}
                                id="price"
                                name="price"
                                label="Precio"
                                placeholder="Precio"
                                variant="outlined"
                                InputProps={{
                                    inputComponent: NumberFormatCustom,
                                }}
                                onChange={obtenerCampos}
                            />
                        </Box>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        handleClick()
                        editarSubTypes(subType)
                    }} color="primary">
                        Editar
                    </Button>
                    <Button onClick={handleClick} color="primary" autoFocus>
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    )
}
