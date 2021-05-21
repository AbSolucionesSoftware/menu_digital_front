import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core';
import React, { useState } from 'react'
import MessageSnackbar from '../../../components/Snackbar/snackbar';
import Spin from '../../../components/Spin/spin';
import clienteAxios from '../../../config/axios';
import jwt_decode from 'jwt-decode';

export default function Eliminar({ idSucursal, update, setUpdate}){
	const company = JSON.parse(localStorage.getItem('user'));

	const token = localStorage.getItem('token');
	const [ loading, setLoading ] = useState(false);

    const [ resourceDel, setResourceDel ] = useState({ open: false, resource: '' });
	const [ deleteConfimation, setDeleteConfimation ] = useState({ open: false, id: '' });


	const handleClick = (resource) => {
		setResourceDel({ open: !resourceDel.open, resource });
		setUpdate(true);
	};

	const handleDeleteConfimation = (idSucursal) => {
		setDeleteConfimation({ open: !deleteConfimation.open, id: idSucursal });
		setUpdate(true);
	};

	const [ snackbar, setSnackbar ] = useState({
		open: false,
		mensaje: '',
		status: ''
	});

	const eliminarSucursal = async (idSucursal) => {
		setLoading(true);
        await clienteAxios
			.delete(`/company/action/company/${company._id}/sucursal/${idSucursal}`, {
                headers: {
					Authorization: `bearer ${token}`
				}
            })
			.then((res) => {
				setUpdate(true);
                setLoading(false);
				const decoded = jwt_decode(res.data.token);
				localStorage.setItem('user', JSON.stringify(decoded));
				window.location.reload();
                setResourceDel({open: false, resource: ''});
				setSnackbar({
					open: true,
					mensaje: res.data.message,
					status: 'success'
				});
			})
			.catch((err) => {
				setUpdate(!update);
                setLoading(false);
				setSnackbar({
					open: true,
					mensaje: err.data.message,
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
			<AlertConfimationDelete
				deleteConfimation={deleteConfimation}
				handleDeleteConfimation={handleDeleteConfimation}
				eliminarSucursal={eliminarSucursal}
			/>
            <Button
                // className={classes.boton} 
                variant="contained" 
                color="secondary"
				onClick={() => handleDeleteConfimation(idSucursal)}
            >
                Eliminar
            </Button>
        </div>
    )
}


function AlertConfimationDelete({ deleteConfimation, handleDeleteConfimation, eliminarSucursal }) {
	return (
		<div>
			<Dialog
				open={deleteConfimation.open}
				onClose={handleDeleteConfimation}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">{'¿Estás seguro de Eliminar esta Sucursal?'}</DialogTitle>
				<DialogActions>
					<Button onClick={handleDeleteConfimation} color="primary">
						Cancelar
					</Button>
					<Button
						onClick={() => {
							handleDeleteConfimation();
							eliminarSucursal(deleteConfimation.id);
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
