import { Box, Button, Grid, TextField, Tooltip } from '@material-ui/core'
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

const useStyles = makeStyles((theme) => ({
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
      }
}))


export default function AgregarCarrito(props) {
    const {platillos, setOpen} = props;

    const [contador , setContador] = useState(0)
    const [carrito, setCarrito] = useState([]);
    const [ notas, setNotas] = useState("");

    const Agregar = () => {
		setContador(contador+1);
	}; 
	const Quitar = () => {
		setContador(contador-1);
	};

    let array = [ 
        {
            platillos,
            "cantidad": contador,
            notas
        }
    ] 
    ;

    
    
	const agregarCarrito = () => {
        let datos = localStorage.getItem("carritoUsuario");
        if(datos === null){
            localStorage.setItem('carritoUsuario', JSON.stringify(array))
            setOpen(false)
        } else {
            let data = JSON.parse(datos)
            let newCar = {platillos, cantidad: contador, notas}
            data.push(newCar)
            localStorage.setItem("carritoUsuario", JSON.stringify(data));
            setOpen(false)
        }
	}
    const classes = useStyles();

    return (
        <div>
            <Grid lg={12}>
                <Box p={3}> 
                    <Typography variant="h4">
                        Agregar a tu Carrito
                    </Typography>
                </Box>

                <Box p={3} display="flex" justifyContent="center" textAlign="center">
                    <Box p={1}>
                        <IconButton aria-label="play/pause" onClick={()=> Quitar() }>
                            <RemoveIcon />
                        </IconButton>
                    </Box>
                    <Box p={1}>
                        <Typography variant="h4">
                            {contador}
                        </Typography>
                    </Box>
                    <Box p={1}>
                        <IconButton aria-label="play/pause" onClick={()=> Agregar() }>
                            <AddIcon />
                        </IconButton>
                    </Box>
                </Box>

                <Box p={3} display="flex" justifyContent="center">
                    <TextField
                        // className={classes.text}
                        id="notas"
                        label="Agregar Notas"
                        placeholder="Agregar Notas"
                        multiline
                        variant="outlined"
                        onChange={(e) =>
                            setNotas({ ...notas, notas: e.target.value })
                        }
                    />
                </Box>

                <Box p={3} textAlign="center">
                    <Tooltip title="Agregar a Carrito" aria-label="add">
                        <Button 
                            size="large"
                            onClick={() => agregarCarrito()}
                            variant="contained" 
                            color="primary"
                        >
                            Agregar Carrito<AddShoppingCartIcon />
                        </Button>
                    </Tooltip>
                </Box>
            </Grid>
        </div>
    )
}
