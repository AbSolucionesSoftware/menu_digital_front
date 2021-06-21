import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core';
import React, { useState } from 'react'
import { useContext } from 'react';
import MessageSnackbar from '../../../components/Snackbar/snackbar';
import Spin from '../../../components/Spin/spin';
import clienteAxios from '../../../config/axios';
import { MenuContext } from '../../../context/menuContext';


export default function Eliminar({cupon, type}){

	const token = localStorage.getItem('token');
    const company = JSON.parse(localStorage.getItem('user'));
	
	const { setRecargar} = useContext(MenuContext);
	
	const [ loading, setLoading ] = useState(false);
    const [ resourceDel, setResourceDel ] = useState({ open: false, resource: '' });
	const [ deleteConfimation, setDeleteConfimation ] = useState({ open: false, id: '' });


	const handleClick = (resource) => {
		setResourceDel({ open: !resourceDel.open, resource });
		setRecargar(true);
	};

	const handleDeleteConfimation = (idCupon) => {
		setDeleteConfimation({ open: !deleteConfimation.open, id: idCupon });
		setRecargar(true);
	};

	const [ snackbar, setSnackbar ] = useState({
		open: false,
		mensaje: '',
		status: ''
	});

	const eliminarPlatilloBD = async (idPlatillo) => {
		setLoading(true);
		if (type === false) {
			await clienteAxios
				.delete(`/coupon/action/coupon/${idPlatillo}`, {
					headers: {
						Authorization: `bearer ${token}`
					}
				})
				.then((res) => {
					setRecargar(true);
					setLoading(false);
					setResourceDel({open: false, resource: ''});
					setSnackbar({
						open: true,
						mensaje: res.data.message,
						status: 'success'
					});
				})
				.catch((err) => {
					setRecargar(true);
					setLoading(false);
					setSnackbar({
						open: true,
						mensaje: err.data.message,
						status: 'error'
					});
				});
		}else{
			await clienteAxios
				.delete(`/coupon/action/CouponEspecial/company/${company._id}/coupon/${idPlatillo}`, {
					headers: {
						Authorization: `bearer ${token}`
					}
				})
				.then((res) => {
					setRecargar(true);
					setLoading(false);
					setResourceDel({open: false, resource: ''});
					setSnackbar({
						open: true,
						mensaje: res.data.message,
						status: 'success'
					});
				})
				.catch((err) => {
					setRecargar(true);
					setLoading(false);
					setSnackbar({
						open: true,
						mensaje: err.data.message,
						status: 'error'
					});
				});
		}
		
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
            <Button
                variant="contained" 
                color="primary"
				onClick={() => handleDeleteConfimation(cupon)}
            >
                Eliminar
            </Button>
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
				<DialogTitle id="alert-dialog-title">{'¿Estás seguro de eliminar este Cupon?'}</DialogTitle>
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
