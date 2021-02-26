import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core';
import React, { useState } from 'react'
import clienteAxios from '../../../../config/axios';


export default function Eliminar(props){
	const { empresa } = props;

    const [ resourceDel, setResourceDel ] = useState({ open: false, resource: '' });
	const handleClick = (resource) => {
		setResourceDel({ open: !resourceDel.open, resource });
	};
	const [ snackbar, setSnackbar ] = useState({
		open: false,
		mensaje: '',
		status: ''
	});

    const eliminarEmpresa = async (empresa) => {
		// setLoading(true);
		await clienteAxios
			.delete(`/company/${empresa}`
			// {
			// 	headers: {
			// 		Authorization: `bearer ${token}`
			// 	}
			// }
			)
			.then((res) => {
				setResourceDel({open: false, resource: ''});
				setSnackbar({
					open: true,
					mensaje: res.data.message,
					status: 'success'
				});
			})
			.catch((err) => {
				// setLoading(false);
				// errors(err);
			});
	};

    const confirmacionDelete = ({ empresa }) => {
		return (
			<Dialog
				open={resourceDel.open}
				onClose={handleClick}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">{"¿Estás seguro de eliminar esta empresa?"}</DialogTitle>
				<DialogActions>
					<Button onClick={handleClick} color="primary">
						Cancelar
					</Button>
					<Button onClick={() => eliminarEmpresa(empresa)} color="secondary" autoFocus>
						Eliminar
					</Button>
				</DialogActions>
			</Dialog>
		);
 	}
    
    return (
        <div>
            <Button
                // className={classes.boton} 
                variant="contained" 
                color="secondary"
                // onClick={() => publicarDatos(empresa, !empresa.publicado) }
            >
                Eliminar
            </Button>
        </div>
    )
}
