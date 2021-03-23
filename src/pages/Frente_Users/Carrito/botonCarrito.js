import { Badge, Dialog,Tooltip, IconButton, SimpleDialog, Button } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { makeStyles } from '@material-ui/core/styles';
import Sesion from '../../../components/Verificacion_sesion/verificacion_sesion';

import Carrito from './carrito'; 

import { ImageContext } from '../../../context/curso_context';


const useStyles = makeStyles((theme) => ({
    float:{
        display: "scroll",
        position: "fixed",
        bottom: 50,
        right: 35,
        "&:hover": {
            backgroundColor: "#bb2225"
        },
        background: "#bb2225",
        color: "white"
    },
    icono:{
        fontSize: 60,
        padding: 2
    }
    
}))

export default function BotonCarrito(props) {
    const {empresa} = props;
	const sesion = Sesion(props, false);
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const pedido = JSON.parse(localStorage.getItem('carritoUsuario'));
    
    const { update } = useContext(ImageContext);
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
                        onClick={handleClickOpen}
                        className={classes.float}
                    >
                        <Badge color="secondary" overlap="circle" badgeContent={pedido === null ? null : pedido.length} >
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
