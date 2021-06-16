import React, { useEffect, useState } from 'react'
import MessageSnackbar from '../../../components/Snackbar/snackbar'
import Filtro_Categorias from './services/categorias'
import Spin from '../../../components/Spin/spin'

import { Box, Button, Drawer, Grid, IconButton, makeStyles, Table, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, useTheme } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import PropTypes from 'prop-types';
import LastPageIcon from '@material-ui/icons/LastPage';
import { propTypes } from 'react-bootstrap/esm/Image';
import clienteAxios from '../../../config/axios';


const useStyles = makeStyles({
    table: {
      minWidth: 100,
    },
    tituloTable:{
        fontSize: 18,
        fontWeight: 600
    },
});

const useStyles1 = makeStyles((theme) => ({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },
}));


function TablePaginationActions(props) {
    const classes = useStyles();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;
  
    const handleFirstPageButtonClick = (event) => {
      onChangePage(event, 0);
    };
  
    const handleBackButtonClick = (event) => {
      onChangePage(event, page - 1);
    };
  
    const handleNextButtonClick = (event) => {
      onChangePage(event, page + 1);
    };
  
    const handleLastPageButtonClick = (event) => {
      onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
  
    return (
      <div className={classes.root}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
  
  TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  };

export default function Regsitro_cupon_productos({update, setUpdate, tipo}) {
    const company = JSON.parse(localStorage.getItem('user'));

    const [categoria, setCategoria] = useState([]);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false)
    const [productosCate, setProductosCate] = useState([])
    const classes = useStyles();
    const [ page, setPage ] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [ snackbar, setSnackbar ] = useState({
		open: false,
		mensaje: '',
		status: ''
	});

    const handleOpenRegistro = () => {
        setOpen(!open);
    }

    const buscarProductosCategorias = () => {
        setLoading(true);
        clienteAxios
            .post(`/product/search/company/category/`,{idCompany: company._id, category: categoria})
            .then((res) => {
                setLoading(false)
                setProductosCate(res.data);
            })
            .catch((err) => {
                setLoading(false)
            })
    }

    console.log(categoria);
    console.log(productosCate);

    useEffect(() => {
        
    }, [])
    

    return (
        <div>
            <MessageSnackbar
				open={snackbar.open}
				mensaje={snackbar.mensaje}
				status={snackbar.status}
				setSnackbar={setSnackbar}
			/>
            {/* <Spin loading={loading} /> */}
            <Grid>
                <Box p={2}>
                    <Button
                        onClick={() => handleOpenRegistro()}
                        variant={tipo === "Nuevo" ? "outlined" : "contained"} 
                        color={tipo === "Nuevo" ? "primary" : "secondary"} 
                    >
                        {tipo === "Nuevo" ? "Registrar codigo limitado" : "Editar"} 
                    </Button>
                </Box>
            </Grid>

            <Drawer anchor="bottom" open={open} onClose={handleOpenRegistro}>
                <Grid container justify="center">
                    <Box p={1}>
                        <Typography variant="h5">
                            Codigo Promocionales por Productos
                        </Typography>
                    </Box>
                </Grid>
                <Grid container justify="center">
                    <Box p={1}>
                        <Typography variant="h6">
                            Selecciona los productos a los que deseas agregar codigo promocional.
                        </Typography>
                    </Box>
                </Grid>

                <Grid container justify="center">
                    <Grid item lg={7} xs={12} justify="center">
                        <Box display="flex" justifyContent="center" alignItems="center">
                            <Box p={1} textAlign="center">
                                <Typography>
                                    Busca productos por categorias
                                </Typography>
                            </Box>
                            <Box p={1} textAlign="center">
                                <Filtro_Categorias setCategoria={setCategoria} />
                            </Box>
                        </Box>
                        <Box p={2}>
                            <TableContainer component={Paper}>
                                <Table className={classes.table} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center" className={ classes.tituloTable }></TableCell>
                                            <TableCell align="center" className={ classes.tituloTable }>Imagen</TableCell>
                                            <TableCell align="center" className={ classes.tituloTable }>Imagen</TableCell>
                                            <TableCell align="center" className={ classes.tituloTable }>Producto</TableCell>
                                            <TableCell align="center" className={ classes.tituloTable }>Promocion</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    {/* <TableBody>
                                        {(rowsPerPage > 0
                                                ? pedidos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                : pedidos
                                            )?.map((pedido) => (
                                            <TableRow key={pedido._id}>
                                                <TableCell align="center"> {formatoFecha(pedido.createdAt)} </TableCell>
                                                <TableCell align="center"> {pedido.nombreCliente} </TableCell>
                                                <TableCell align="center"> {pedido.telefono} </TableCell>
                                                <TableCell align="center"> 
                                                    <Chip style={pedido.tipoEnvio === "Recogera en Sucursal" ? {background:  "#48F273"} : {background: "yellow"}} label={pedido.tipoEnvio}  /> 
                                                </TableCell>
                                                <TableCell align="center">
                                                {
                                                    pedido.tipoEnvio === "Envio a Domicilio" ? (
                                                        <>
                                                            Calle {pedido.calleNumero} Col. {pedido.colonia}
                                                        </>
                                                    ) : null
                                                }    
                                                </TableCell>
                                                <TableCell align="center"> {pedido.estadoPedido} </TableCell>
                                                <TableCell align="center"> {pedido.cupon} </TableCell>
                                                <TableCell align="center"> ${formatoMexico(pedido.totalPedido)} </TableCell>
                                                <TableCell align="center">  
                                                    <Button
                                                        variant="contained" 
                                                        color="secondary"
                                                        onClick={() => {
                                                            handleDetalles()
                                                            setDetallesPedido(pedido)
                                                        }}
                                                    >
                                                        Ver Detalles
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody> */}
                                </Table>
                            </TableContainer>
                        </Box>
                    </Grid>
                    <Grid item lg={5} xs={12}>
                        <Box textAlign="center">
                            <Typography>
                                Completa los datos de tu cupon
                            </Typography>
                        </Box>
                        <Box display="flex" alignContent="center" textAlign="center" justifyContent="center" flexWrap="wrap">
                            <Box p={2}>
                                <TextField
                                    // error={!datosCupon.couponName && validate}
                                    // helperText={!datosCupon.couponName && validate ? 'Esta campo es requerido' : null}
                                    // defaultValue={cupon ? datosCupon.couponName : null}
                                    variant="outlined"
                                    name="couponName" 
                                    label="Nombre código" 
                                    // onChange={(e) => obtenerDatos(e)} 
                                />
                            </Box>
                            <Box p={2}>
                                <TextField
                                    // error={!datosCupon.discountCoupon && validate}
                                    // helperText={!datosCupon.discountCoupon && validate ? 'Esta campo es requerido' : null}
                                    // defaultValue={cupon ? datosCupon.discountCoupon : null}
                                    variant="outlined" 
                                    name="discountCoupon"
                                    type="number"
                                    label="Porciento Descuento" 
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    // onChange={(e) => obtenerDatos(e)}
                                />
                            </Box>
                            <Box p={2}>
                                <TextField
                                    // error={!datosCupon.expirationDate && validate}
                                    // helperText={!datosCupon.expirationDate && validate ? 'Esta campo es requerido' : null}
                                    defaultValue='2021-06-01'
                                    type="date" 
                                    name="expirationDate" 
                                    variant="outlined" 
                                    label="Fecha Vencimiento" 
                                    // onChange={(e) => obtenerDatos(e)}
                                />
                            </Box>
                        </Box>
                        <Box textAlign="center" p={2}>
                            <Button
                                onClick={() => handleOpenRegistro()}
                                variant={tipo === "Nuevo" ? "outlined" : "contained"} 
                                color={tipo === "Nuevo" ? "primary" : "secondary"} 
                            >
                                {tipo === "Nuevo" ? "Registrar Código" : "Editar Código"} 
                            </Button>
                        </Box>
                    </Grid>
                </Grid>

            </Drawer>
        </div>
    )
}
