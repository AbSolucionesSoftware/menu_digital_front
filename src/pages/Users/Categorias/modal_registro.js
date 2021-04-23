import React, { Fragment, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import { Box, TextField, Button, CircularProgress } from '@material-ui/core';
import clienteAxios from '../../../config/axios';
import MessageSnackbar from '../../../components/Snackbar/snackbar';

export default function ModalRegistroCategorias({ tipo, update, setUpdate, company, categoria }) {
	const [ open, setOpen ] = useState(false);
	const [ value, setValue ] = useState('');
	const [ loading, setLoading ] = useState(false);
	const [ snackbar, setSnackbar ] = useState({
		open: false,
		mensaje: '',
		status: ''
	});

	String.prototype.capitalize = function() {
		return this.charAt(0).toUpperCase() + this.slice(1);
	};

	const handleClickModal = () => {
		setOpen(!open);
	};

	const onChangeInput = (value) => {
		setValue(value.capitalize());
	};

	const messages = (status, message) => {
		setSnackbar({
			open: true,
			mensaje: message,
			status: status
		});
	};

	const saveDataBD = async () => {
		if (!value) return;
		setLoading(true);
		if (tipo === 'category') {
			await clienteAxios
				.post(`/categories/${company._id}`, {
					category: value
				})
				.then((res) => {
					setLoading(false);
					setUpdate(!update);
					messages('success', res.data.message);
					handleClickModal();
				})
				.catch((err) => {
					setLoading(false);
					messages('error', 'hubo un error');
					handleClickModal();
				});
		} else {
			await clienteAxios
				.post(`/categories/action/${categoria._id}/subCategory`, {
					subCategory: value
				})
				.then((res) => {
					setLoading(false);
					setUpdate(!update);
					messages('success', res.data.message);
					handleClickModal();
				})
				.catch((err) => {
					setLoading(false);
					messages('error', 'hubo un error');
					handleClickModal();
				});
		}
	};

	return (
		<Fragment>
			<MessageSnackbar
				open={snackbar.open}
				mensaje={snackbar.mensaje}
				status={snackbar.status}
				setSnackbar={setSnackbar}
			/>
			<Box mb={2}>
				<Button variant="text" color="primary" startIcon={<AddIcon />} onClick={handleClickModal}>
					{tipo === 'category' ? 'Añadir categoria' : 'Añadir subcategoria'}
				</Button>
			</Box>
			<Dialog open={open} onClose={handleClickModal} aria-labelledby="form-dialog-title" maxWidth="sm" fullWidth>
				<DialogTitle id="form-dialog-title">
					{tipo === 'category' ? 'Añadir nueva categoria' : 'Añadir subcategoria'}
				</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						label={tipo === 'category' ? 'Categoria' : 'Subcategoria'}
						fullWidth
						onChange={(e) => onChangeInput(e.target.value)}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClickModal} color="secondary">
						Cancelar
					</Button>
					<Button
						onClick={saveDataBD}
						color="primary"
						startIcon={loading ? <CircularProgress size={16} color="inherit" /> : null}
					>
						Añadir
					</Button>
				</DialogActions>
			</Dialog>
		</Fragment>
	);
}
