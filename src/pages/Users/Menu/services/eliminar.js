import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core';
import React, { useState } from 'react'
import Spin from '../../../../components/Spin/spin';
import clienteAxios from '../../../../config/axios';


export default function Eliminar(props){
	const { platillo } = props;
	const token = localStorage.getItem('token');
	const [ loading, setLoading ] = useState(false);

    const [ resourceDel, setResourceDel ] = useState({ open: false, resource: '' });
	const [ deleteConfimation, setDeleteConfimation ] = useState({ open: false, id: '' });


	const handleClick = (resource) => {
		setResourceDel({ open: !resourceDel.open, resource });
	};

	const handleDeleteConfimation = (idPlatillo) => {
		setDeleteConfimation({ open: !deleteConfimation.open, id: idPlatillo });
	};

	const [ snackbar, setSnackbar ] = useState({
		open: false,
		mensaje: '',
		status: ''
	});

	const eliminarPlatilloBD = async (idPlatillo) => {
		setLoading(true);
        await clienteAxios
			.delete(`/product/edit/${idPlatillo}`, {
                headers: {
					Authorization: `bearer ${token}`
				}
            })
			.then((res) => {
                setLoading(false);
                setResourceDel({open: false, resource: ''});
				setSnackbar({
					open: true,
					mensaje: res.data.message,
					status: 'success'
				});
			})
			.catch((err) => {
                setLoading(false);
                console.log(err);
                console.log("error al eliminado");
			});
	}
	
    
    return (
        <div>
            <Spin loading={loading} />
			<AlertConfimationDelete
				deleteConfimation={deleteConfimation}
				handleDeleteConfimation={handleDeleteConfimation}
				eliminarPlatilloBD={eliminarPlatilloBD}
			/>
            <Button
                // className={classes.boton} 
                variant="contained" 
                color="secondary"
				onClick={() => handleDeleteConfimation(platillo)}
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
				<DialogTitle id="alert-dialog-title">{'¿Estás seguro de eliminar este Platillo?'}</DialogTitle>
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
