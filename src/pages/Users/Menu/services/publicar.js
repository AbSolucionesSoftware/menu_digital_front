import { Button, FormControlLabel, Switch } from '@material-ui/core'
import React, { useContext, useState } from 'react'
import MessageSnackbar from '../../../../components/Snackbar/snackbar';
import Spin from '../../../../components/Spin/spin';
import clienteAxios from '../../../../config/axios';
import { palette } from '@material-ui/system';

import { MenuContext } from '../../../../context/carritoContext';

export default function Publicar(props) {
    const { producto, upload, setUpload  } = props;
	const token = localStorage.getItem('token');

    const [ snackbar, setSnackbar ] = useState({
		open: false,
		mensaje: '',
		status: ''
	});

    const publicarProdcuto = async (producto, publicado) => {
        await clienteAxios
		.put(
            `/product/public/action/${producto._id}`, 
            {
              "public": publicado
            },
            {
				headers: {
					Authorization: `bearer ${token}`
				}
			}
        )
        .then((res) => {
            setUpload(true);
            setSnackbar({
                open: true,
                mensaje: "Producto publicado con Exito",
                status: 'success'
            });

        }).catch((err) => {
            setUpload(true);
            setSnackbar({
                open: true,
                mensaje: "Error en el servidor",
                status: 'error'
            });

        });
    };

    return (
        <div>
			<MessageSnackbar
				open={snackbar.open}
				mensaje={snackbar.mensaje}
				status={snackbar.status}
				setSnackbar={setSnackbar}
			/>
            <FormControlLabel
                control={
                    <Switch 
                        onChange={
                            () => {
                                setUpload(!upload)
                                publicarProdcuto(producto, !producto.public)
                            }} 
                        name="checkedA"
                        defaultChecked={producto.public ? producto.public : false}
                    />
                }
                label={producto.public ? 'Publicado' : 'Publicar'}
            />
        </div>
    )
}