import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core';
import React, { useState } from 'react'
import clienteAxios from '../../../../config/axios';


export default function Eliminar(props){
	const { banner } = props;
	const token = localStorage.getItem('token');

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
        await clienteAxios
			.delete(`/banner/${idBanner}`, {
                headers: {
					Authorization: `bearer ${token}`
				}
            })
			.then((res) => {
                setResourceDel({open: false, resource: ''});
				window.location.reload();
				setSnackbar({
					open: true,
					mensaje: res.data.message,
					status: 'success'
				});
			})
			.catch((err) => {
                // setLoading(false);
                console.log(err);
                console.log("error al eliminado");
			});
	}
	
    
    return (
        <div>
			<AlertConfimationDelete
				deleteConfimation={deleteConfimation}
				handleDeleteConfimation={handleDeleteConfimation}
				eliminarBannerBD={eliminarBannerBD}
			/>
            <Button
                // className={classes.boton} 
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
