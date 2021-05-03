import { Avatar, Box, Button, Grid, TextField, Tooltip } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListaClases from './services/listaClases'

import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { Alert } from '@material-ui/lab';
import { ImageContext } from '../../../context/curso_context';
import { Class } from '@material-ui/icons';

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
    agregar:{
        minWidth: 300
    },
    column: {
        flexBasis: '100%',
    }
}))



export default function AgregarCarrito(props) {
    const {nombre, precio, imagen, setOpen, producto}  = props;
    const { setUpdate, setDatos} = useContext(ImageContext);
    const classes = useStyles();
    const [clasesTotal, setClasesTotal] = useState([])

    const [ disable, setDisable] = useState(false)
	const [abrir, setAbrir] = useState(false);
    const [ contador , setContador] = useState(1)
    const [ types, setTypes] = useState([])

    const [ carrito, setCarrito] = useState([]);
    const [ notas, setNotas] = useState("");
    // const [ extras, setExtras] = useState(producto.extrasActive === true ? producto.extras.split(",") : []);
    // const [ totalExtra, setTotalExtra ] = useState(0);

    useEffect(() => {
        producto.classifications?.map((clases) => (
            clasesTotal.push(
                {
                    "statusAmount": clases.statusAmount,
                    "maximo": clases.amountClassification,
                    "_idClass": clases._idClassification,
                    "nombre" : clases.typeClassification,
                    "types" : []
                }
            )
        ))
    }, [])
    
    // console.log(clasesTotal);

    const Agregar = () => {
		setContador(contador+1);
        setDisable(false);
	};

    const handleClickOpen = () => {
        setAbrir(true);
    };

    const handleClose = () => {
        setAbrir(false);
    };

    // function borrarExtra(key) {
    //     setUpload(!upload);
    //     ingredienteExtra.forEach(function(elemento, indice, array) {
    //         if(key === indice){
    //             ingredienteExtra.splice(key, 1);
    //             setUpload(!upload);
    //         }
    //     })
    // };

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
            notas,
            "clases": clasesTotal
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
                let newCar = {nombre, precio, cantidad: contador, clases: clasesTotal, notas}
                data.push(newCar);
                localStorage.setItem("carritoUsuario", JSON.stringify(data));
                setOpen(false)
            }
        }
	}

    const render = producto.classifications?.map((clases, index) => (
        <ListaClases 
            key={index}
            clases={clases} 
            clasesTotal={clasesTotal} 
        />
    ))

    return (
        <div>
            <Grid lg={12} className={classes.agregar}>
                <Box mt={1} display="flex" justifyContent="center" textAlign="center">
                    {!imagen ? null : (
                        <Avatar
                            className={classes.large}
                            alt="Imagen de prducto" 
                            src={imagen} 
                        />
                    )}
                </Box>
                <Box mt={2} display="flex" justifyContent="center" textAlign="center">
                    <Box p={1}>
                        <IconButton aria-label="play/pause" onClick={()=> Quitar() }>
                            <RemoveIcon style={{fontSize: 20}} />
                        </IconButton>
                    </Box>
                    <Box p={2}>
                        <Typography component={'span'} variant="h3">
                            {contador}
                        </Typography>
                    </Box>
                    <Box p={1}>
                        <IconButton aria-label="play/pause" onClick={()=> Agregar() }>
                            <AddIcon style={{fontSize: 20}} />
                        </IconButton>
                    </Box>
                </Box>

                {render}

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
                            <AddShoppingCartIcon /> Agregar a Orden
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
