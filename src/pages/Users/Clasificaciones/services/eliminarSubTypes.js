import { Button, Dialog, DialogActions, DialogTitle, IconButton } from '@material-ui/core';
import React, { useState } from 'react'
import MessageSnackbar from '../../../../components/Snackbar/snackbar';
import Spin from '../../../../components/Spin/spin';
import clienteAxios from '../../../../config/axios';
import DeleteIcon from '@material-ui/icons/Delete';

export default function EliminarSubTypes(props){
	const { clase, subType, setUpload, upload } = props;
	const token = localStorage.getItem('token');
	const company = JSON.parse(localStorage.getItem('user'));
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

	const eliminarPlatilloBD = async (idSubType) => {
		setLoading(true);
		console.log(clase, idSubType, company._id);
        await clienteAxios
			.delete(`/classification/action/${clase}/subClassification/${idSubType}/company/${company._id}`, {
                headers: {
					Authorization: `bearer ${token}`
				}
            })
			.then((res) => {
				setUpload(!upload);
                setLoading(false);
				console.log(res);
                setResourceDel({open: false, resource: ''});
				setSnackbar({
					open: true,
					mensaje: res.data.message,
					status: 'success'
				});
			})
			.catch((err) => {
				setUpload(!upload);
				if (err.response) {
					setLoading(false);
					setSnackbar({
						open: true,
						mensaje: err.response.data.message,
						status: 'error'
					});
				}else{
					setLoading(false);
					setSnackbar({
						open: true,
						mensaje: "Error en el servidor",
						status: 'error'
					});
				}
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
                onClick={() => handleDeleteConfimation(subType)}
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
				<DialogTitle id="alert-dialog-title">{'¿Estás seguro de eliminar esta clasificiación?'}</DialogTitle>
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
