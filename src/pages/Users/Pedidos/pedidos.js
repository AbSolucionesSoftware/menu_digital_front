import React, { useEffect, useState } from 'react'
import Spin from '../../../components/Spin/spin';
import clienteAxios from '../../../config/axios';
import Pagination from '@material-ui/lab/Pagination';
import List_Pedidos from './list_pedidos'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Box, Button, Chip, Dialog, Grid, TableFooter, TablePagination, Typography } from '@material-ui/core';
import { formatoFecha, formatoMexico } from '../../../config/reuserFunction';
import Detalle_Pedido from './detalle_pedido';

const useStyles1 = makeStyles((theme) => ({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },
  }));
  
function TablePaginationActions(props) {
    const classes = useStyles1();
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

const useStyles = makeStyles({
    table: {
      minWidth: 100,
    },
    tituloTable:{
        fontSize: 18,
        fontWeight: 600
    }
  });

export default function Pedidos() {
    const [ pedidos, setPedidos ] = useState([]);

    const [ loading, setLoading ] = useState(false);
    const [ update, setUpdate ] = useState(false);
    const [ detallesPedido, setDetallesPedido ] = useState(false);
    const [ openDetalles, setOpenDetalles ] = useState(false);

    const [ page, setPage ] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleDetalles = () =>{
        setOpenDetalles(!openDetalles)
    }

    const classes = useStyles();
    
    const company = JSON.parse(localStorage.getItem('user'))

    function getPedidos() {
		setLoading(true);
		clienteAxios
			.get(`/pedido/${company._id}`)
			.then((res) => {
				setPedidos(res.data);
				setLoading(false);
			})
			.catch((err) => {
                setLoading(false);
			});
	}

    useEffect(() => {
        getPedidos();
    }, [!update])

    const handleChange = (event, value) => {
        setPage(value);
    }

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, pedidos.length - page * rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div>
            <Spin loading={loading} />
            <Grid >
                {/* {render_pedidos} */}
                <Box display="flex" justifyContent="center" textAlign="center">
                    <Typography variant="h4">
                        Tus Pedidos
                    </Typography>
                </Box>
            </Grid>
            <Box mt="1" />
            <Grid lg={12} xs={12}>
                <TableContainer mt="2" component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell align="center" className={ classes.tituloTable }>Fecha</TableCell>
                            <TableCell align="center" className={ classes.tituloTable }>Cliente</TableCell>
                            <TableCell align="center" className={ classes.tituloTable }>Telefono</TableCell>
                            <TableCell align="center" className={ classes.tituloTable }>Tipo Envio</TableCell>
                            <TableCell align="center" className={ classes.tituloTable }>Domicilio</TableCell>
                            <TableCell align="center" className={ classes.tituloTable }>Estatus</TableCell>
                            <TableCell align="center" className={ classes.tituloTable }>Codigo Promo.</TableCell>
                            <TableCell align="center" className={ classes.tituloTable }>Total</TableCell>
                            <TableCell align="center" className={ classes.tituloTable }>Detalles</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
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
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={false}
                                    // colSpan={3}
                                    count={pedidos.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    SelectProps={{
                                        inputProps: { 'aria-label': 'rows per page' },
                                        native: true,
                                    }}
                                    onChangePage={handleChangePage}
                                    // onChangeRowsPerPage={handleChangeRowsPerPage}
                                    ActionsComponent={TablePaginationActions}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            </Grid>
                                
            <Dialog  onClose={handleDetalles} open={openDetalles}>
                <Detalle_Pedido
                    pedido={detallesPedido} 
                />
            </Dialog>
            {/* <Grid container justify="center">
                <Pagination count={pedidos.totalPages}  onChange={handleChange} />
            </Grid> */}
        </div>
    )
}

