import { Box, Button, Drawer } from '@material-ui/core';
import React, { useState } from 'react'
import clienteAxios from '../../../../config/axios';
import Editar_User from '../../../Users/PanelUsuario/editar_user';


export default function Editar(props) {
    const { empresa } = props;
    const token = localStorage.getItem('token');

    const [ open, setOpen ] = useState(false);

    const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

    const editarDatos = async (empresa) => {
        clienteAxios
        .put(
            `/company/${empresa}`,
            {
                headers: {
                    Authorization: `bearer ${token}`
                }
            }
        )
        .then((res) => {
            // setReload(!reload);
        })
        .catch((err) => {
            // errors(err);
        });
    };

    return (
        <div>
            <Button
                // className={classes.boton} 
                variant="contained" 
                color="primary"
                type="Link"
                onClick={handleDrawerOpen}
            >
                Editar
            </Button>

            <Drawer
                // className={classes.drawer}
                anchor="right"
                open={open}
                onClose={handleDrawerClose}
            >
                <Editar_User datosEmpresa={empresa} />
                <Box textAlign="center" mt={4}>
                    <Button
                        variant="contained" 
                        color="secondary"
                        size="large"
                        onClick={handleDrawerClose}
                    >
                        Salir
                    </Button>
                </Box>
            </Drawer>
        </div>
    )
}