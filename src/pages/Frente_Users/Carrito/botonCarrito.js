import { Badge, Dialog,Tooltip, IconButton, SimpleDialog, Button, Typography, Box } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Sesion from '../../../components/Verificacion_sesion/verificacion_sesion';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import Carrito from './carrito'; 

import { ImageContext } from '../../../context/curso_context';

const styles = (theme) => ({
	root: {
	  margin: 0,
	  padding: theme.spacing(2),
	},
	closeButton: {
	  position: 'absolute',
	  right: theme.spacing(1),
	  top: theme.spacing(1),
	  color: theme.palette.grey[500],
	},
  });

const DialogTitle = withStyles(styles)((props) => {
	const {  classes, onClose, ...other } = props;
	return (
	  <MuiDialogTitle disableTypography className={classes.root} {...other}>
		<Box textAlign="center">
            <Typography variant="h4"> Tu pedido</Typography>
        </Box>
		{onClose ? (
		  <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
			<CloseIcon />
		  </IconButton>
		) : null}
	  </MuiDialogTitle>
	);
  });

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
                <DialogTitle id="customized-dialog-title" onClose={handleClose} />
                <Carrito empresa={empresa} setOpen={setOpen}/>
            </Dialog>
        </div>
    )
}
