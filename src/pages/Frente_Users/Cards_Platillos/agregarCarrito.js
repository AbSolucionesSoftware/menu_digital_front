import { Avatar, Box, Button, Chip, Divider, Grid, TextField, Tooltip } from '@material-ui/core'
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';


import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { Alert } from '@material-ui/lab';
import { ImageContext } from '../../../context/curso_context';

const useStyles = makeStyles((theme) => ({
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    large: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    },
}))


export default function AgregarCarrito(props) {
    const {nombre, precio, imagen, setOpen, productos} = props;
    const { setUpdate, setDatos} = useContext(ImageContext);
    const classes = useStyles();

    const [disable, setDisable] = useState(false)
    const [contador , setContador] = useState(1)
    const [carrito, setCarrito] = useState([]);
    const [ notas, setNotas] = useState("");

    const Agregar = () => {
		setContador(contador+1);
        setDisable(false);
	}; 

	const Quitar = () => {
        if (contador === 1 ) {
            return;
        }else{
            setContador(contador-1);
        }
	};
    let array = [ 
        {
            nombre,
            precio,
            "cantidad": contador,
            notas
        }
    ];
    
	const agregarCarrito = () => {
        setDatos(JSON.parse(localStorage.getItem('carritoUsuario')));

        if (contador === 0) {
            setDisable(true);
        }else{
            let datos = localStorage.getItem("carritoUsuario");
            if(datos === null){
                localStorage.setItem('carritoUsuario', JSON.stringify(array))
                setOpen(false);
            } else {
                let data = JSON.parse(datos)
                let newCar = {nombre, precio, cantidad: contador, notas}
                data.push(newCar)
                localStorage.setItem("carritoUsuario", JSON.stringify(data));
                setOpen(false)
            }
        }

	}

    const [ extras, setExtras] = useState(productos.extras.split(","))
    console.log(productos);
    console.log(extras);

    return (
        <div>
            <Grid lg={12}>
                <Box mt={1} display="flex" justifyContent="center" textAlign="center">
                    {!imagen ? null : (
                        <Avatar
                            className={classes.large}
                            alt="Imagen de prducto" 
                            src={imagen} 
                        />
                    )}
                </Box>
                {/* <Box display="flex" justifyContent="center" textAlign="center">
                    <Divider style={{width: "80%"}}/>
                </Box> */}
                {/* <Box  display="flex" justifyContent="center" textAlign="center">
                    <Divider style={{width: "50%"}}/>
                </Box> */}
                <Box mt={2} display="flex" justifyContent="center" textAlign="center">
                    <Box p={1}>
                        <IconButton aria-label="play/pause" onClick={()=> Quitar() }>
                            <RemoveIcon style={{fontSize: 20}} />
                        </IconButton>
                    </Box>
                    <Box p={2}>
                        <Typography variant="h3">
                            {contador}
                        </Typography>
                    </Box>
                    <Box p={1}>
                        <IconButton aria-label="play/pause" onClick={()=> Agregar() }>
                            <AddIcon style={{fontSize: 20}} />
                        </IconButton>
                    </Box>
                </Box>
                {
                    productos.extrasActive === true ? (
                        <>
                            <Box textAlign="center">
                                <Typography>
                                    Agrega extras a tu platillo
                                </Typography>
                            </Box>
                            <Box textAlign>
                                {extras.map((extra) => {
                                    return(
                                        <Chip>
                                            {extra}
                                        </Chip>
                                    )
                                })}
                            </Box>
                            <Box>
                                <TextField>

                                </TextField>
                            </Box>
                        </>
                    ):(
                        null
                    )
                }
                
                {/* <Box p={1} display="flex" justifyContent="center" flexWrap="wrap">
                    <Alert severity="info">Agrega notas a tu platillo o ingrendientes extras</Alert>
                </Box> */}
                <Box p={2} display="flex" justifyContent="center">
                    <TextField
                        id="notas"
                        label="Notas"
                        placeholder="Ejemplo: 2 sin cebolla"
                        multiline
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        onChange={(e) =>
                            setNotas({ ...notas, notas: e.target.value })
                        }
                    />
                </Box>

                <Box p={1} textAlign="center">
                    <Tooltip title="Agregar a Carrito" aria-label="add">
                        <Button 
                            size="large"
                            onClick={() => agregarCarrito()}
                            variant="contained" 
                            color="primary"
                            disabled={disable}
                        >
                            <AddShoppingCartIcon /> Agregar a Oden 
                        </Button>
                    </Tooltip>
                </Box>
                <Box p={1} textAlign="center">
                    <Button
                        className={classes.buton}
                        variant="contained" 
                        color="primary"
                        size="large"
                        onClick={() => setOpen(false)}
                    >
                        Salir
                    </Button>
                </Box>
            </Grid>
        </div>
    )
}
