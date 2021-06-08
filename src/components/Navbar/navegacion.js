import { AppBar, Badge, Button, fade, Hidden, IconButton,  
		Popover, InputBase, makeStyles, Toolbar, Typography, MenuItem, 
		ListItemIcon, ListItemText, Divider, Drawer, ListItem, List, Box, Grid, Dialog, withStyles 
		} from '@material-ui/core'
import {Link, withRouter } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import SearchIcon from '@material-ui/icons/Search';
import Reservaciones from './reservaciones'
import AccessTimeIcon from '@material-ui/icons/AccessTime';
// import clienteAxios from '../../config/axios';

import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import MenuIcon from '@material-ui/icons/Menu';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import AccountCircleSharpIcon from '@material-ui/icons/AccountCircleSharp';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';

import Comody from '../../img/Comody.jpeg'

import useStyles from './styles';
import { ImageContext } from '../../context/curso_context';

import React, { useContext,  useState } from 'react';
import { MenuContext } from '../../context/menuContext';

function Navegacion(props) {

	const [ open, setOpen ] = useState(false);
	const { recargar, setRecargar, empresa} = useContext(MenuContext);
	const token = localStorage.getItem('token');
	const [ busqueda, setBusqueda ] = useState('');
	
	var decoded = Jwt(token);

	function Jwt(token) {
		try {
			return jwt_decode(token);
		} catch (e) {
			return null;
		}
	}

    const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};
	
	const [ reservacion, setReservacion ] = useState(false);

	const handleOpen = () => {
		setReservacion(true);
	};

	const handleClose = () => {
		setReservacion(false);
	};

	const [ openHorario, setOpenHorario ] = useState(false);

	const handleClickOpen =() => {
		setOpenHorario(!openHorario)
	}

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
				{/* <Typography variant="h4"> Tu pedido</Typography> */}
			</Box>
			{onClose ? (
				<IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
				<CloseIcon />
				</IconButton>
			) : null}
			</MuiDialogTitle>
		);
	});
	
	const cerrarSesiones = () => {
		setRecargar(!recargar);
		localStorage.removeItem('carritoUsuario');
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		localStorage.removeItem('idEmpresa');
		localStorage.removeItem('slug');
	}

	const obtenerBusqueda = (e) => setBusqueda(e.target.value);

	const buscarBD = () => {
		if (!busqueda) {
			return;
		}
		props.history.push(`/${empresa.slug}/${empresa._id}/busqueda/${busqueda}`);
	};

	const pressEnter = (e) => {
		if(!e.target.defaultValue) return;
		if(e.key === "Enter") props.history.push(`/${empresa.slug}/${empresa._id}/busqueda/${e.target.defaultValue}`);
	};

	function Jwt(token) {
		try {
			return jwt_decode(token);
		} catch (e) {
			return null;
		}
	}
	const classes = useStyles();
    return (
        <div>
            <AppBar className={classes.appbar}>
					<Toolbar>
					{/* {login  === "/login" ? null : ( */}
						<>
							<Hidden mdUp>
								<IconButton
									edge="start"
									aria-label="show more"
									aria-haspopup="true"
									onClick={handleDrawerOpen}
									color="inherit"
									className={classes.menuButton}
								>
									<MenuIcon />
								</IconButton>
							</Hidden>
							<Hidden smDown>
								<Box component={Link} to={`/`} className={classes.containerImage}>  
									<img onClick={() => cerrarSesiones()} className={classes.image} alt="logotipo" src={Comody}/>
								</Box>
							</Hidden>
							<div className={classes.search}>
								<InputBase
									placeholder="¿Qué quieres comer hoy?"
									classes={{
										root: classes.inputRoot,
										input: classes.inputInput
									}}
									inputProps={{ 'aria-label': 'search' }}
									value={busqueda}
									onChange={obtenerBusqueda}
									onKeyPress={pressEnter}
								/>
								<div className={classes.grow} />
								<IconButton size="small" color="inherit"  onClick={() => buscarBD()} >
									<SearchIcon />
								</IconButton>
							</div>
							<Hidden smDown>
								<Grid item lg={8} zeroMinWidth >
									<Box display="flex" justifyContent="center" >
										<Typography variant="h3" noWrap>
											{empresa.nameCompany} 
										</Typography>
									</Box>
								</Grid>					
								<Grid>
									<ListItem button component={Link} to={`/${empresa.slug}`} >
										<ListItemText primary="Inicio" />
									</ListItem>
								</Grid>
								<Grid>
									<ListItem button onClick={handleOpen}>
										<ListItemText primary="Reservar" />
									</ListItem>
								</Grid>
								<Grid>
									{empresa?.horariosActive === true ? (
										<ListItem button onClick={handleClickOpen}>
											<ListItemText primary="Horario" />
										</ListItem>
									) : null}
								</Grid>
							</Hidden>
						</>
						{/* )} */}

						<div className={classes.grow} />
						<Hidden smDown>
							{decoded ? (
								<Button color="inherit" component={Link} to="/user" className={classes.marginButton}>
									<AccountCircleSharpIcon/> Mi cuenta
								</Button>
							) : (
								<div />
							)}
						</Hidden>
					</Toolbar>
				</AppBar>
                {/* {renderMenu} */}
				{/* {login  === "/login" ? null : ( */}
					<Drawer
						className={classes.drawer}
						anchor="left"
						open={open}
						onClose={handleDrawerClose}
						classes={{
							paper: classes.drawerPaper
						}}
					>
						<div className={classes.drawerHeader}>
							<IconButton onClick={handleDrawerClose}>
								<ChevronLeftIcon />
							</IconButton>
							<Box onClick={() => {
								cerrarSesiones()
								handleDrawerClose()
							}} component={Link} to={`/`} className={classes.containerImage}>  
								<img className={classes.image} alt="logotipo" src={Comody}/>
							</Box>
						</div>
						<Divider />
						{decoded ? (
							<ListItem button component={Link} to="/user" onClick={handleDrawerClose}>
								<ListItemIcon>
									<AccountCircleSharpIcon/>
								</ListItemIcon>
								<ListItemText primary="Mi cuenta" />
							</ListItem>
						) : (
							<div />
						)}
						<List>
							<ListItem button component={Link} to={`/${empresa.slug}`} >
								<Typography style={{ fontWeight: 600}} variant="h5"> {empresa.nameCompany} </Typography>
							</ListItem>
							<ListItem button component={Link} to={`/${empresa.slug}`} onClick={handleDrawerClose}>
								<ListItemIcon>
									<HomeIcon />
								</ListItemIcon>
								<ListItemText primary="Inicio" />
							</ListItem>
							<ListItem button onClick={handleOpen}>
								<ListItemIcon>
									<RestaurantIcon/>
								</ListItemIcon>
								<ListItemText primary="Reservar" />
							</ListItem>

							{empresa?.horariosActive === true ? (
								<ListItem button onClick={handleClickOpen}>
									<ListItemIcon>
										<AccessTimeIcon/>
									</ListItemIcon>
									<ListItemText primary="Horario" />
								</ListItem>
							) : null}

							{decoded ? (
								<ListItem onClick={handleDrawerClose}>
									<ListItemIcon>
										<ExitToAppIcon/>
									</ListItemIcon>
									
									<ListItemText
										color="inherit" 
										component={Link} to="/" 
										onClick={() => {
											setRecargar(!recargar);
											localStorage.removeItem('carritoUsuario');
											localStorage.removeItem('token');
											localStorage.removeItem('user');
										}}
									>
										Cerrar sesion
									</ListItemText>
								</ListItem>
								) : (
									null
								)
							}
						</List>
					</Drawer>
					{/* )} */}

				<div>
					<Hidden mdUp>
						<Drawer
							anchor="bottom"
							open={reservacion}
							onClose={handleClose}
						>
							<DialogTitle id="customized-dialog-title" onClose={handleClose} />
							<Reservaciones slug={empresa.slug}/>
						</Drawer>
					</Hidden>
					<Hidden smDown>
						<Dialog open={reservacion} onClose={handleClose}>
							<DialogTitle id="customized-dialog-title" onClose={handleClose} />
							<Reservaciones slug={empresa.slug}/>
						</Dialog>
					</Hidden>
				</div>

				<Dialog
					open={openHorario} 
					onClose={handleClickOpen}
				>
					<Grid item lg={12}>
						<Box p={2} textAlign="center">
							<Typography  variant="h6">
								Nuestros Horarios de Atención
							</Typography>
						</Box>
						<Box p={1} mb={2}>
							{empresa?.horario?.map((dia) => (
								<Box display="flex" alignItem="center" justifyContent="center">
									<Typography style={{fontWeight: 600}} >
										{dia.dia}:   
									</Typography>
									<Typography>
										{dia.close === true ? (
												dia.horarioInicial + "  a  " + dia.horarioFinal
											) :
											(
												"Cerrado"
											)
										}
									</Typography>
								</Box>
							))}
						</Box>
					</Grid>
				</Dialog>
		</div>
    )

}



 export default withRouter(Navegacion);


 