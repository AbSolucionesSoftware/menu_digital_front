import React, { Fragment, useEffect, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Box, TextField, Button, IconButton, CircularProgress } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import clienteAxios from '../../../config/axios';
import MessageSnackbar from '../../../components/Snackbar/snackbar';

export default function ModalEditarCategorias({ tipo, update, setUpdate, categoria, subCategory }) {
	const [ open, setOpen ] = useState(false);
	const [ openDelete, setOpenDelete ] = useState(false);
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

	const handleModalDelete = () => {
		setOpenDelete(!openDelete);
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
				.put(`/categories/action/${categoria._id}`, {
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
				.put(`/categories/action/${categoria._id}/subCategory/${subCategory._id}`, {
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

	const handleDelete = async () => {
		setLoading(true);
		if (tipo === 'category') {
			await clienteAxios
				.delete(`/categories/action/${categoria._id}`)
				.then((res) => {
					setLoading(false);
					setUpdate(!update);
					messages('success', res.data.message);
					handleModalDelete();
				})
				.catch((err) => {
					setLoading(false);
					messages('error', 'hubo un error');
					handleModalDelete();
				});
		} else {
			await clienteAxios
				.delete(`/categories/action/${categoria._id}/subCategory/${subCategory._id}`)
				.then((res) => {
					setLoading(false);
					setUpdate(!update);
					messages('success', res.data.message);
					handleModalDelete();
				})
				.catch((err) => {
					setLoading(false);
					messages('error', 'hubo un error');
					handleModalDelete();
				});
		}
	};

	useEffect(() => {
		if (tipo === 'category') {
			setValue(categoria.category);
		} else {
			setValue(subCategory.subCategory);
		}
	}, []);

	return (
		<Fragment>
			<Box ml={2} display="flex">
				<Box mx={1}>
					<IconButton size="small" onClick={handleClickModal}>
						<EditIcon />
					</IconButton>
				</Box>
				<Box mx={1}>
					<IconButton size="small" onClick={handleModalDelete}>
						<DeleteIcon />
					</IconButton>
				</Box>
			</Box>
			<Dialog open={openDelete} onClose={handleModalDelete}>
				<DialogTitle>{'¿Estás seguro que deseas eliminar?'}</DialogTitle>
				<DialogActions>
					<Button onClick={handleModalDelete} color="secondary">
						Cancelar
					</Button>
					<Button
						onClick={() => handleDelete()}
						color="primary"
						autoFocus
						startIcon={loading ? <CircularProgress size={16} color="inherit" /> : null}
					>
						Eliminar
					</Button>
				</DialogActions>
			</Dialog>
			<Dialog open={open} onClose={handleClickModal} aria-labelledby="form-dialog-title" maxWidth="sm" fullWidth>
				<DialogTitle id="form-dialog-title">
					{tipo === 'category' ? 'Editar nueva categoria' : 'Editar subcategoria'}
				</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						label={tipo === 'category' ? 'Categoria' : 'Subcategoria'}
						fullWidth
						onChange={(e) => onChangeInput(e.target.value)}
						defaultValue={value}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClickModal} color="secondary">
						Cancel
					</Button>
					<Button
						onClick={saveDataBD}
						color="primary"
						startIcon={loading ? <CircularProgress size={16} color="inherit" /> : null}
					>
						Guardar
					</Button>
				</DialogActions>
			</Dialog>
			<MessageSnackbar
				open={snackbar.open}
				mensaje={snackbar.mensaje}
				status={snackbar.status}
				setSnackbar={setSnackbar}
			/>
		</Fragment>
	);
}
