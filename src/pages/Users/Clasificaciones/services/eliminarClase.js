import { Button, Dialog, DialogActions, DialogTitle, IconButton } from '@material-ui/core';
import React, { useState } from 'react'
import MessageSnackbar from '../../../../components/Snackbar/snackbar';
import Spin from '../../../../components/Spin/spin';
import clienteAxios from '../../../../config/axios';
import DeleteIcon from '@material-ui/icons/Delete';

export default function Eliminar(props){
	const { clase, setUpload, upload } = props;
	const token = localStorage.getItem('token');
	const [ loading, setLoading ] = useState(false);

    const [ resourceDel, setResourceDel ] = useState({ open: false, resource: '' });
	const [ deleteConfimation, setDeleteConfimation ] = useState({ open: false, id: '' });


	const handleClick = (resource) => {
		setResourceDel({ open: !resourceDel.open, resource });
	};

	const handleDeleteConfimation = (idClase) => {
		setDeleteConfimation({ open: !deleteConfimation.open, id: idClase });
		setUpload(!upload);
	};

	const [ snackbar, setSnackbar ] = useState({
		open: false,
		mensaje: '',
		status: ''
	});

	const eliminarPlatilloBD = async (idClase) => {
		setLoading(true);
        await clienteAxios
			.delete(`/classification/action/${idClase}`, {
                headers: {
					Authorization: `bearer ${token}`
				}
            })
			.then((res) => {
				setUpload(!upload);
                setLoading(false);
                setResourceDel({open: false, resource: ''});
				setSnackbar({
					open: true,
					mensaje: 'Clasificación eliminada con exito',
					status: 'success'
				});
			})
			.catch((err) => {
				setUpload(!upload);
                setLoading(false);
				setSnackbar({
					open: true,
					mensaje: "Ocurrio un problema en el servidor!.",
					status: 'success'
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
			<AlertConfimationDelete
				deleteConfimation={deleteConfimation}
				handleDeleteConfimation={handleDeleteConfimation}
				eliminarPlatilloBD={eliminarPlatilloBD}
			/>
            <IconButton 
                onClick={() => handleDeleteConfimation(clase)}
                ariant="contained" 
                color="secondary"
            >
                <DeleteIcon />
            </IconButton>
        </div>
    )
}


function AlertConfimationDelete({ deleteConfimation, handleDeleteConfimation, eliminarPlatilloBD }) {
	return (
		<div>
			<Dialog
				open={deleteConfimation.open}
				onClose={handleDeleteConfimation}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">{'¿Estás seguro de eliminar esta clasificación?'}</DialogTitle>
				<DialogActions>
					<Button onClick={handleDeleteConfimation} color="primary">
						Cancelar
					</Button>
					<Button
						onClick={() => {
							handleDeleteConfimation();
							eliminarPlatilloBD(deleteConfimation.id);
						}}
						color="secondary"
						autoFocus
					>
						Eliminar
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
