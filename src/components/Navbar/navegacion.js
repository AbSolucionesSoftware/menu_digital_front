import { AppBar, Badge, Button, fade, Hidden, IconButton,  Popover, InputBase, makeStyles, Toolbar, Typography, MenuItem, ListItemIcon, ListItemText, Divider, Drawer, ListItem, List } from '@material-ui/core'
import { Link, withRouter } from 'react-router-dom';
import Sesion from '../Verificacion_sesion/verificacion_sesion';

import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import useStyles from './styles';

import React, { useState } from 'react';

// const drawerWidth = 240;

export default function Navegacion(props) {

	const [ open, setOpen ] = useState(false);
	const [ anchorEl, setAnchorEl ] = useState(null);
	const [ datos, setDatos ] = useState([]);
	const sesion = Sesion(props, false);
	const [ busqueda, setBusqueda ] = useState('');
	const pedido = JSON.parse(localStorage.getItem('usuario'))

	const obtenerBusqueda = (e) => setBusqueda(e.target.value);
	const buscarBD = () => {
		if (!busqueda) {
			return;
		}
		/* setBusqueda(''); */
		props.history.push(`/busqueda/${busqueda}`);
	};

    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleMenuClose = () => {
		setAnchorEl(null);
	};

    const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};
    

	const classes = useStyles();

    return (
        <div>
            <AppBar  className={classes.appbar}>
					<Toolbar>
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
						<Typography className={classes.title} variant="h6" noWrap>
							Mi Menú Online
						</Typography>
						<div className={classes.search}>
							<InputBase
								placeholder="Busca tu platillo..."
								classes={{
									root: classes.inputRoot,
									input: classes.inputInput
								}}
								inputProps={{ 'aria-label': 'search' }}
								value={busqueda}
								onChange={obtenerBusqueda}
							/>
							<div className={classes.grow} />
							<IconButton size="small" color="inherit" onClick={() => buscarBD()}>
								<SearchIcon />
							</IconButton>
						</div>
						<div className={classes.grow} />
						<Hidden smDown>
							<Button color="inherit" component={Link} to="/" className={classes.marginButton}>
								Inicio
							</Button>
							<Button color="inherit" component={Link} to="/admin" className={classes.marginButton}>
								Admin
							</Button>
							<Button color="inherit" component={Link} to="/user" className={classes.marginButton}>
								User
							</Button>
							{sesion ? (
								<Button color="inherit" component={Link} to="/user" className={classes.marginButton}>
									Mi cuenta
								</Button>
							) : (
								<IconButton
								aria-label="show 17 new notifications"
								color="inherit"
								component={Link}
								to="/carrito"
								>
									<Badge  color="secondary">
										<ShoppingCartIcon />
									</Badge>
								</IconButton>
							)}
							{sesion ? (
								<div />
							) : (
								<div />
							)}
							{sesion ? (
								<Button color="inherit" 
									component={Link} to="/" 
									className={classes.marginButton}
									onClick={() => {
										localStorage.removeItem('token');
										localStorage.removeItem('user');
									}}
								>
									Cerrar Sesion
								</Button>
							) : (
								<Button color="inherit" component={Link} to="/login" className={classes.marginButton}>
									Iniciar sesión
								</Button>
							)
							}
						</Hidden>
						<Hidden mdUp>
							<IconButton
								aria-label="show 17 new notifications"
								color="inherit"
								component={Link}
								to="/carrito"
							>
								<Badge  color="secondary">
									<ShoppingCartIcon />
								</Badge>
							</IconButton>
						</Hidden>
					</Toolbar>
				</AppBar>
                {/* {renderMenu} */}
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
					</div>
					<Divider />
					<List>
						<ListItem button component={Link} to="/" >
							<ListItemIcon>
								<HomeIcon />
							</ListItemIcon>
							<ListItemText primary="Inicio" />
						</ListItem>
					</List>
                </Drawer>
        </div>
    )
}
