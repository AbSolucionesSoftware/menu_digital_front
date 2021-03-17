import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core';
import React, { useContext, useState } from 'react'
import MessageSnackbar from '../../../../components/Snackbar/snackbar';
import Spin from '../../../../components/Spin/spin';
import clienteAxios from '../../../../config/axios';
import { ImageContext } from '../../../../context/curso_context';


export default function Eliminar(props){
	const { banner } = props;
	const [ loading, setLoading ] = useState(false);
	const token = localStorage.getItem('token');
	const {  update, setUpdate} = useContext(ImageContext);
    const [ resourceDel, setResourceDel ] = useState({ open: false, resource: '' });
	const [ deleteConfimation, setDeleteConfimation ] = useState({ open: false, id: '' });


	const handleClick = (resource) => {
		setResourceDel({ open: !resourceDel.open, resource });
	};

	const handleDeleteConfimation = (idBanner) => {
		setDeleteConfimation({ open: !deleteConfimation.open, id: idBanner });
	};

	const [ snackbar, setSnackbar ] = useState({
		open: false,
		mensaje: '',
		status: ''
	});

	const eliminarBannerBD = async (idBanner) => {
		setLoading(true);
        await clienteAxios
			.delete(`/banner/${idBanner}`, {
                headers: {
					Authorization: `bearer ${token}`
				}
            })
			.then((res) => {
				setLoading(false);
				setUpdate(!update);
				console.log(res);
				setSnackbar({
					open: true,
					mensaje: "Banner eliminado exitosamente!",
					status: 'success'
				});
			})
			.catch((err) => {
				setLoading(false);
				console.log(err);
				setUpdate(!update);
				setSnackbar({
					open: true,
					mensaje:'Al parecer no se a podido conectar al servidor.', 
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
				eliminarBannerBD={eliminarBannerBD}
			/>
            <Button
                variant="contained" 
                color="secondary"
				onClick={() => handleDeleteConfimation(banner)}
            >
                Eliminar
            </Button>
        </div>
    )
}


function AlertConfimationDelete({ deleteConfimation, handleDeleteConfimation, eliminarBannerBD }) {
	return (
		<div>
			<Dialog
				open={deleteConfimation.open}
				onClose={handleDeleteConfimation}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">{'¿Estás seguro de eliminar esta Banner?'}</DialogTitle>
				<DialogActions>
					<Button onClick={handleDeleteConfimation} color="primary">
						Cancelar
					</Button>
					<Button
						onClick={() => {
							handleDeleteConfimation();
							eliminarBannerBD(deleteConfimation.id);
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
