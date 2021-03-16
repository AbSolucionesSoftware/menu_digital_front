import { Badge, Dialog,Tooltip, IconButton, SimpleDialog } from '@material-ui/core'
import React, { useState } from 'react';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { makeStyles } from '@material-ui/core/styles';
import Sesion from '../../../components/Verificacion_sesion/verificacion_sesion';


import Carrito from './carrito'; 

const useStyles = makeStyles((theme) => ({
    float:{
        display: "scroll",
        position: "fixed",
        bottom: 50,
        right: 35,
    }, 
    icono:{
        fontSize: 60
    }
}))

export default function BotonCarrito(props) {
    const {empresa} = props;
	const sesion = Sesion(props, false);
	const pedido = JSON.parse(localStorage.getItem('carritoUsuario'));

    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
    };

    return (
        <div>
           
            {sesion ? (
               null
            ) : (
                <Tooltip title="Tu carrito" >
                    <IconButton
                        aria-label="show 17 new notifications"
                        onClick={handleClickOpen}
                        className={classes.float}
                        color="primary" 
                        aria-label="upload picture" 
                        component="span"
                    >
                        <Badge badgeContent={pedido === null ? null : pedido.length} color="secondary">
                            <ShoppingCartIcon className={classes.icono}/>
                        </Badge>
                    </IconButton>
                </Tooltip>
             )}

            <Dialog open={open} onClose={handleClose}>
                <Carrito empresa={empresa} setOpen={setOpen}/>
            </Dialog>
        </div>
    )
}
