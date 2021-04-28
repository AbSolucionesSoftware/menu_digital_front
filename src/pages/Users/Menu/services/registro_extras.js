import {
	Typography,
	Box,
	Button,
	TextField,
	makeStyles,
	Switch,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Checkbox,
	FormControlLabel,
	AccordionActions,
	DialogTitle,
	Dialog,
	DialogActions
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import clienteAxios from '../../../../config/axios';
import Spin from '../../../../components/Spin/spin';
import MessageSnackbar from '../../../../components/Snackbar/snackbar';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EnhancedTable from './tabla_extras';

const useStyles = makeStyles((theme) => ({
	root: {
		minWidth: '50vw',
		display: 'flex'
	},
	acordion: {
		width: '100%'
	}
}));

export default function RegistroExtras({ producto, update, setUpdate }) {
	const classes = useStyles();
	const token = localStorage.getItem('token');
	const company = JSON.parse(localStorage.getItem('user'));
	const [ loading, setLoading ] = useState(false);
	const [ types, setTypes ] = useState([]);

	const [ snackbar, setSnackbar ] = useState({
		open: false,
		mensaje: '',
		status: ''
	});

	const obtenerTypes = async () => {
		setLoading(true);
		await clienteAxios
			.get(`/classification/${company._id}`, {
				headers: {
					Authorization: `bearer ${token}`
				}
			})
			.then((res) => {
				setTypes(res.data);
				setLoading(false);
			})
			.catch((err) => {
				setLoading(false);
				setSnackbar({
					open: true,
					mensaje: 'Ocurrio un problema en el servidor',
					status: 'error'
				});
			});
	};

	useEffect(() => {
		obtenerTypes();
	}, []);

	const render_extras = types.map((type, index) => (
		<Extras
			key={index}
			type={type}
			producto={producto}
			update={update}
			setUpdate={setUpdate}
		/>
	));

	return (
		<div className={classes.root}>
			<MessageSnackbar
				open={snackbar.open}
				mensaje={snackbar.mensaje}
				status={snackbar.status}
				setSnackbar={setSnackbar}
			/>
			<Spin loading={loading} />
			<Box textAlign="center" p={1} mt={2} width="100%">
				<Typography variant="h4">Extras</Typography>
				{render_extras}
			</Box>
		</div>
	);
}

const Extras = ({ type, producto, update, setUpdate }) => {
	const classes = useStyles();
	const token = localStorage.getItem('token');
	const [ openDelete, setOpenDelete ] = useState(false);
	const [ openExtra, setOpenExtra ] = useState(false);
	const [ limiteExtrasCheck, setLimiteExtrasCheck ] = useState(false);
	const [ control, setControl ] = useState(false);
	const [ loading, setLoading ] = useState(false);
	const [ idClassification, setIdClassification ] = useState('');
	const [ extras, setExtras ] = useState({
		typeClassification: '',
		amountClassification: 0,
		statusAmount: false,
		_idClassification: type._id,
		types: []
	});
	const [ snackbar, setSnackbar ] = useState({
		open: false,
		mensaje: '',
		status: ''
	});
    const [ selected, setSelected ] = useState([]);
	const [ select, setSelect ] = useState([]);

	const handleCloseDelete = () => setOpenDelete(!openDelete);

	const messages = (status, message) => {
		setUpdate(!update);
		setLoading(false);
		setSnackbar({
			open: true,
			mensaje: message,
			status: status
		});
	};

    const clear = () => {
        setExtras({
            typeClassification: '',
            amountClassification: 0,
            statusAmount: false,
            _idClassification: type._id,
            types: []
        });
        setLimiteExtrasCheck(false);
        setSelect([]);
        setSelected([]);
        setOpenExtra(false);
    }

	const handleChangeCheckLimite = (event) => {
		setLimiteExtrasCheck(event.target.checked);
		setExtras({
			...extras,
			statusAmount: event.target.checked
		});
		if (!event.target.checked) {
			setExtras({
				...extras,
				amountClassification: 0
			});
		}
	};

	const obtenerCantidadExtras = (value) => {
		setExtras({
			...extras,
			amountClassification: value === 0 ? 0 : value
		});
	};

	const handleSwitch = (e) => {
		if (!e.target.checked && control) {
			handleCloseDelete();
			return;
		}
		setOpenExtra(e.target.checked);
		setExtras({
			...extras,
			typeClassification: type.type
		});
		document.getElementById(`button-${type._id}`).click();
	};

	const deleteClassification = async () => {
		await clienteAxios
			.delete(`/product/action/classification/${producto._id}/subClassification/${idClassification}`, {
				headers: {
					Authorization: `bearer ${token}`
				}
			})
			.then((res) => {
				messages('success', 'Cambios realizados');
                clear();
				handleCloseDelete();
				document.getElementById(`button-${type._id}`).click();
			})
			.catch((err) => {
				messages('error', 'Ocurrio un problema con el servidor');
                handleCloseDelete();
			});
	};

	const saveChanges = async () => {
		setLoading(true);
		if (control) {
			await clienteAxios
				.put(
					`/product/action/classification/${producto._id}/subClassification/${idClassification}`,
					extras,
					{
						headers: {
							Authorization: `bearer ${token}`
						}
					}
				)
				.then((res) => {
					messages('success', 'Cambios realizados');
				})
				.catch((err) => {
					messages('error', 'Ocurrio un problema con el servidor');
				});
		} else {
			await clienteAxios
				.post(`/product/aggregate/classification/${producto._id}`, extras, {
					headers: {
						Authorization: `bearer ${token}`
					}
				})
				.then((res) => {
					messages('success', 'Cambios realizados');
				})
				.catch((err) => {
					messages('error', 'Ocurrio un problema con el servidor');
				});
		}
	};

	const checkUpdated = () => {
		producto.classifications.forEach((product) => {
			if (product._idClassification === type._id) {
				setIdClassification(product._id);
				setOpenExtra(true);
				setLimiteExtrasCheck(product.statusAmount);
				setExtras({
					...extras,
					typeClassification: product.typeClassification,
					amountClassification: product.amountClassification,
					statusAmount: product.statusAmount,
					types: product.types
				});
			}
		});
	};

	const verifyRegisterOrUpdate = () => {
        setControl(false);
		if (producto !== undefined) {
			producto.classifications.forEach((type_classification) => {
				if (type_classification._idClassification === type._id) {
					setControl(true);
					checkUpdated();
				}
			});
		}
	};

	useEffect(() => {
		verifyRegisterOrUpdate();
	}, [ update, producto ]);

	return (
		<Box display="flex" alignItems="center">
			<Spin loading={loading} />
			<Switch checked={openExtra} onChange={handleSwitch} color="primary" name="checkedB" />
			<Accordion square disabled={!openExtra} className={classes.acordion}>
				<AccordionSummary expandIcon={<ExpandMoreIcon />} IconButtonProps={{ id: `button-${type._id}` }}>
					<Typography variant="h6">{type.type}</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Box width="100%">
						<FormControlLabel
							control={
								<Checkbox
									checked={limiteExtrasCheck}
									onChange={handleChangeCheckLimite}
									disabled={!openExtra}
								/>
							}
							label="cantidad de extras limitada"
						/>
						<Box mb={2}>
							<TextField
								style={{ width: 140 }}
								disabled={!limiteExtrasCheck}
								onChange={(e) => obtenerCantidadExtras(e.target.value)}
								label="Cantidad de extras"
								type="number"
								InputLabelProps={{
									shrink: true
								}}
								InputProps={{ inputProps: { min: 0, max: type.types?.length } }}
								variant="outlined"
								size="small"
								defaultValue={0}
								value={extras.amountClassification}
							/>
						</Box>
						<EnhancedTable
							openExtra={openExtra}
							types={type.types}
							extras={extras}
							setExtras={setExtras}
							control={control}
							producto={producto}
                            select={select}
                            setSelect={setSelect}
                            selected={selected}
                            setSelected={setSelected}
						/>
					</Box>
				</AccordionDetails>
				<AccordionActions>
					{control ? (
						<Button size="small" color="primary" onClick={handleCloseDelete} disabled={!openExtra}>
							Eliminar
						</Button>
					) : null}
					<Button
						size="small"
						variant="contained"
						color="primary"
						onClick={saveChanges}
						disabled={!openExtra}
					>
						Guardar
					</Button>
				</AccordionActions>
			</Accordion>
			<MessageSnackbar
				open={snackbar.open}
				mensaje={snackbar.mensaje}
				status={snackbar.status}
				setSnackbar={setSnackbar}
			/>
			<Dialog open={openDelete} onClose={handleCloseDelete}>
				<DialogTitle>{'¿Estás seguro de eliminar?'}</DialogTitle>
				<DialogActions>
					<Button onClick={handleCloseDelete} color="secondary">
						Cancelar
					</Button>
					<Button onClick={deleteClassification} color="primary" autoFocus>
						Eliminar
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
};
