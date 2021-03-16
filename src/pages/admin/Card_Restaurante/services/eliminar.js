import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core';
import React, { useState } from 'react'
import MessageSnackbar from '../../../../components/Snackbar/snackbar';
import Spin from '../../../../components/Spin/spin';
import clienteAxios from '../../../../config/axios';
import useStyles from '../../styles';


export default function Eliminar(props){
	const { empresa, setUpload } = props;
	const token = localStorage.getItem('token');
	const classes = useStyles();

	const [ loading, setLoading ] = useState(false);
    const [ resourceDel, setResourceDel ] = useState({ open: false, resource: '' });
	const [ deleteConfimation, setDeleteConfimation ] = useState({ open: false, id: '' });


	const handleClick = (resource) => {
		setResourceDel({ open: !resourceDel.open, resource });
	};

	const handleDeleteConfimation = (idEmpresa) => {
		setDeleteConfimation({ open: !deleteConfimation.open, id: idEmpresa });
	};

	const [ snackbar, setSnackbar ] = useState({
		open: false,
		mensaje: '',
		status: ''
	});

	const eliminarEmpresaBD = async (idEmpresa) => {
			setLoading(true);
			await clienteAxios
			.delete(`/company/${idEmpresa}`,
			{
				headers: {
					Authorization: `bearer ${token}`
				}
			}
			)
			.then((res) => {
				setUpload(true);
				setLoading(false);
				setResourceDel({open: false, resource: ''});
				setSnackbar({
					open: true,
					mensaje: "Usuario eliminado exitosamente!.",
					status: 'success'
				});
			})
			.catch((err) => {
				setUpload(true);
				setLoading(false);
				setSnackbar({
					open: true,
					mensaje: "Ocurrio un problema en el servidor!.",
					status: 'error'
				});
			});
	}
	
    
    return (
        <div>
            <Spin loading={loading} />
			<MessageSnackbar
				open={snackbar.open}
				mensaje={snackbar.mensaje}
				status={snackbar.status}
				setSnackbar={setSnackbar}
			/>
			<AlertConfimationDelete
				deleteConfimation={deleteConfimation}
				handleDeleteConfimation={handleDeleteConfimation}
				eliminarEmpresaBD={eliminarEmpresaBD}
			/>
            <Button
                className={classes.boton} 
                variant="contained" 
                color="secondary"
				onClick={() => handleDeleteConfimation(empresa._id)}
            >
                Eliminar
            </Button>
        </div>
    )
}


function AlertConfimationDelete({ deleteConfimation, handleDeleteConfimation, eliminarEmpresaBD }) {
	return (
		<div>
			<Dialog
				open={deleteConfimation.open}
				onClose={handleDeleteConfimation}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">{'¿Estás seguro de eliminar esta Empresa?'}</DialogTitle>
				<DialogActions>
					<Button onClick={handleDeleteConfimation} color="primary">
						Cancelar
					</Button>
					<Button
						onClick={() => {
							handleDeleteConfimation();
							eliminarEmpresaBD(deleteConfimation.id);
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
