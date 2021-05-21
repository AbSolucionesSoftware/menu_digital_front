import { Box, Button, Dialog, IconButton, TextField, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import MessageSnackbar from '../../../../components/Snackbar/snackbar';
import Spin from '../../../../components/Spin/spin';
import clienteAxios from '../../../../config/axios';

export default function Editar_clase({clase, upload, setUpload}) {

    const company = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    const [abrir, setAbrir] = useState(false);
    const [ loading, setLoading ] = useState(false);
    const [classe, setClasse] = useState([]);

    const [ snackbar, setSnackbar ] = useState({
		open: false,
		mensaje: '',
		status: ''
	});

    const editarSubTypes = async () => {
        setLoading(true)
        await clienteAxios
			.put(`/classification/action/${clase._id}`,
            {
                "type": classe.type
            },
            {
                headers: {
                    Authorization: `bearer ${token}`
                }
            }).then((res) => {
                setUpload(!upload);
                setLoading(false);
                setSnackbar({
					open: true,
					mensaje: res.data.message,
					status: 'success'
				});
			})
			.catch((err) => {
                setSnackbar({
					open: true,
					mensaje: "Problemas al agregar clasificacion",
					status: 'error'
				});
			});
    }

    const handleClickOpen = () => {
        setAbrir(!abrir);
    };

    useEffect(() => {
        if (clase) {
            setClasse(clase)
        }
    }, [])

    return (
        <div>
            <MessageSnackbar
				open={snackbar.open}
				mensaje={snackbar.mensaje}
				status={snackbar.status}
				setSnackbar={setSnackbar}
			/>
            <Spin loading={loading} />
            <Box>
                <IconButton 
                    ariant="contained" 
                    color="secondary"
                    onClick={handleClickOpen}
                >
                    <EditIcon />
                </IconButton>
            </Box>

            <Dialog
                open={abrir}
                onClose={handleClickOpen}
            >
                <Box p={3}>
                    <Typography>
                        Editar tipo clasificación
                    </Typography>
                </Box>
                <Box p={2}>
                    <TextField
                        defaultValue={classe ? classe.type : null}
                        id="type"
                        name="type"
                        label="Editar Clasificación"
                        placeholder="Editar Clasificación"
                        multiline
                        variant="outlined"
                        onChange={(e) =>
                            setClasse({ ...classe, [e.target.name]: e.target.value })
                        }
                    />
                </Box>
                <Box p={2} textAlign="center" display="flex" justifyContent="center" >
                    <Button
                        color="primary"
                        variant="outlined"
                        onClick={() => {
                            editarSubTypes()
                            handleClickOpen()
                        }}
                    >
                        Guardar
                    </Button>
                </Box>
            </Dialog>
        </div>
    )
}
