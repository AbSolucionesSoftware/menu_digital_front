import { Avatar, Box, Button, CardMedia, Grid, Paper, TextField, Tooltip } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListaClases from '../services/listaClases'
import MessageSnackbar from '../../../../components/Snackbar/snackbar'
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { ImageContext } from '../../../../context/curso_context';
import clienteAxios from '../../../../config/axios';

import useStyles from './styles';

export default function AgregarCarrito(props) {
    const {nombre, precio, imagen, setOpen, producto}  = props;

    const varDescuento = JSON.parse(localStorage.getItem('codigoIndividual'));

    const { setUpdate, setDatos} = useContext(ImageContext);
    const classes = useStyles();
    const [clasesTotal, setClasesTotal] = useState([])
    const [ notas, setNotas] = useState("");

    const [ cuponesBase, setCuponesBase ] = useState([]);
    const [ cuponInsertado, setCuponInsertado ] = useState([]);
    const [ estadoCupon, setEstadoCupon ] = useState([]);

    const [ disable, setDisable] = useState(false)
    const [load, setLoad] = useState(false)

    const [ contador , setContador] = useState(1)
    const [ total, setTotal] = useState(0);
    
    const [ snackbar, setSnackbar ] = useState({
		open: false,
		mensaje: '',
		status: ''
	});

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
                    "types" : [],
                    "totalClasificacion": 0
                }
            )
        ))
    }, [])
    
    const Agregar = () => {
		setContador(contador+1);
        setDisable(false);
        setLoad(!load);
	};

    const Quitar = () => {
        if (contador === 1 ) {
            return;
        }else{
            setContador(contador-1);
            setLoad(!load);
        }
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

    let array = [ 
        {
            nombre,
            precio,
            total,
            "cantidad": contador,
            notas,
            "clases": clasesTotal
        }
    ];

	const agregarCarrito = () => {
        setDatos(JSON.parse(localStorage.getItem('carritoUsuario')));
        setLoad(!load)
        if (contador === 0) {
            setDisable(true);
        }else{
            let datos = localStorage.getItem("carritoUsuario");
            if(datos === null){
                localStorage.setItem('carritoUsuario', JSON.stringify(array))
                setOpen(false);
            } else {
                let data = JSON.parse(datos)
                let newCar = {nombre, precio, total, cantidad: contador, clases: clasesTotal, notas}
                data.push(newCar);
                localStorage.setItem("carritoUsuario", JSON.stringify(data));
                setOpen(false);
            }
            localStorage.removeItem("codigoIndividual");
        }
	}

    const render = producto.classifications?.map((clases, index) => (
        <ListaClases 
            key={index}
            setLoad={setLoad}
            load={load}
            clases={clases} 
            clasesTotal={clasesTotal} 
        />
    ));

    const canjearCodigo = async (cuponInsertado) => {
        if (varDescuento) {
            localStorage.removeItem("codigoIndividual");
            setEstadoCupon([]);
            setLoad(!load);
        }else{
            await clienteAxios
                .post(`/coupon/action/verificarCupon/product/${producto._id}/coupon/${cuponInsertado}`)
                .then((res) => {
                    if (res.data.valor === false) {
                        setSnackbar({
                            open: true,
                            mensaje: res.data.message,
                            status: 'error'
                        });     
                    }else{
                        localStorage.setItem("codigoIndividual", JSON.stringify(res.data));
                        setEstadoCupon(res.data);
                        setSnackbar({
                            open: true,
                            mensaje: res.data.message,
                            status: 'success'
                        });
                        setLoad(!load);
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    };
    const calcularTotal = () => {
        var subtotal = 0;
        var subTotalClases = 0;
        var totalClases = 0;

        var porcentaje = 0;
        var descuento = 0
        var descuentoAplicado = 0;
        var subTotal2 = 0;
          
        if(producto === null){
            return null
        }else{
            clasesTotal.forEach(res => {
                subTotalClases += parseInt(res.totalClasificacion);
                totalClases = subTotalClases * contador;
            });

            subtotal = contador * producto.price;

            if (varDescuento) {
                porcentaje = parseInt(varDescuento?.cuponDiscount);
                descuento = (porcentaje/100);
                subTotal2 = (subtotal+totalClases);
                descuentoAplicado = (subTotal2  * descuento);
                setTotal(subTotal2-descuentoAplicado);

            }else{
                setTotal(subtotal+totalClases);
            }
        }
    }

    useEffect(() => {
        calcularTotal();
    },[load]);

    return (
        <div>
            <MessageSnackbar
				open={snackbar.open}
				mensaje={snackbar.mensaje}
				status={snackbar.status}
				setSnackbar={setSnackbar}
			/>
            <Grid item lg={12} className={classes.agregar}>
                <Box mt={1} display="flex" justifyContent="center" textAlign="center">
                    {!imagen ? null : (
                        // <Avatar
                        //     className={classes.large}
                        //     alt="Imagen de prducto" 
                        //     src={imagen} 
                        // />
                        <Paper elevation={3} className={classes.cover}>
                            <CardMedia
                                id={producto._id}
                                className={classes.cover}
                                image={imagen}
                                title="Imagen de producto"
                            />
                        </Paper>
                    )}
                </Box>
                <Box p={1} display="flex" justifyContent="center">
                    <Typography component={'span'} style={{fontSize: 25}}>
                        <b>TOTAL: $
                        {total}</b>
                    </Typography>
                </Box>
                {!producto?.couponName ? null : (
                    <Box display="flex" justifyContent="center" alignItems="center" textAlign="center">
                        <Box p={1} >
                            <TextField
                                label="Código Pormocional" 
                                variant="outlined"
                                defaultValue={!varDescuento ? "" : varDescuento.codigo}
                                disabled={varDescuento ? varDescuento.valor : null}
                                color="primary"
                                onChange={(e) => setCuponInsertado(e.target.value)}
                            />
                        </Box>
                        <Box display="flex" alignContent="center" alignItems="center" justifyContent="center" textAlign="center" p={1}>
                            <Button
                                variant="contained" 
                                color="primary"
                                onClick={() => {
                                    canjearCodigo(cuponInsertado);
                                }}
                            >
                                {!varDescuento ? "Aplicar" : "Elimnar"}
                            </Button>
                        </Box>
                    </Box>
                )}

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
            </Grid>
            <Grid container>
                <Grid item xs={5}>
                    <Paper elevation={3}>
                        <Box display="flex" justifyContent="center" textAlign="center">
                            <Box p={1}>
                                <IconButton aria-label="play/pause" onClick={()=> Quitar() }>
                                    <RemoveIcon style={{fontSize: 25}} />
                                </IconButton>
                            </Box>
                            <Box p={2}>
                                <Typography component={'span'} variant="h3">
                                    {contador}
                                </Typography>
                            </Box>
                            <Box p={1}>
                                <IconButton aria-label="play/pause" onClick={()=> Agregar() }>
                                    <AddIcon style={{fontSize: 25}} />
                                </IconButton>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={7}>
                    <Box mt={1}>
                        {/* <Tooltip title="Agregar a Carrito" aria-label="add"> */}
                            <Button 
                                onClick={() => agregarCarrito()}
                                variant="contained" 
                                color="primary"
                                style={{width: '98%', height: '100%'}}
                                disabled={disable}
                                size="large"
                            >
                                <AddShoppingCartIcon /> Agregar a Orden
                            </Button>
                        {/* </Tooltip> */}
                    </Box>
                </Grid>
            </Grid>
        </div>
    )
}
