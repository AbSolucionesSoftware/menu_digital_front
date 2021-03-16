import { AppBar, Badge, Button, fade, Hidden, IconButton,  
		Popover, InputBase, makeStyles, Toolbar, Typography, MenuItem, 
		ListItemIcon, ListItemText, Divider, Drawer, ListItem, List, Box 
		} from '@material-ui/core'
import {useParams, Link, withRouter } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import clienteAxios from '../../config/axios';

import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircleSharpIcon from '@material-ui/icons/AccountCircleSharp';
import HomeIcon from '@material-ui/icons/Home';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import Comody from '../../img/Comody.jpeg'

import { MenuContext } from '../../context/carritoContext';
import useStyles from './styles';

import React, { useContext, useEffect, useState } from 'react';

function Navegacion(props) {

	const [ open, setOpen ] = useState(false);
	const [ anchorEl, setAnchorEl ] = useState(null);
	const [ busqueda, setBusqueda ] = useState("");

	const token = localStorage.getItem('token');
	const company = JSON.parse(localStorage.getItem('user'));
	const datos = JSON.parse(localStorage.getItem('tienda'));
	
	const idEmpresa = props.match.params.idMenu;
	var decoded = Jwt(token);

	function Jwt(token) {
		try {
			return jwt_decode(token);
		} catch (e) {
			return null;
		}
	}

	const idMenu = props.location.pathname;
	console.log(idMenu);
	const subCategoria = props.match.params;
	console.log(props.location);
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

	const obtenerBusqueda = async () => {
		await clienteAxios
			.post(`/product/search/company${idMenu}`, {filter: "camarones"})
			.then((res) => {

			})
			.catch((err) => {
				
			})
	}

	function Jwt(token) {
		try {
			return jwt_decode(token);
		} catch (e) {
			return null;
		}
	}

	// console.log(busqueda);
	
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
						<Box className={classes.containerImage}>  
							<img  className={classes.image} alt="logotipo" src={Comody}/>
						</Box>
						<div className={classes.grow} />
						<Hidden smDown>
							
							{decoded ? (
								<Button color="inherit" component={Link} to="/user" className={classes.marginButton}>
									<AccountCircleSharpIcon/> Mi cuenta
								</Button>
							) : (
								<div />
							)}
							{/* {decoded ? (
								<Button color="inherit" 
									component={Link}
									to={`${company._id}/${company.slug}`}
									className={classes.marginButton}
									onClick={() => {
										localStorage.removeItem('carritoUsuario');
										localStorage.removeItem('token');
										localStorage.removeItem('user');
									}}
								>
									Cerrar Sesion
								</Button>
							) : (
								null
							)
							} */}
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
					{decoded ? (
						<ListItem button component={Link} to="/user" >
							<ListItemIcon>
								<AccountCircleSharpIcon/>
							</ListItemIcon>
							<ListItemText primary="Mi cuenta" />
						</ListItem>
					) : (
						<div />
					)}
					<List>
						<ListItem button component={Link} to={`/`} >
							<ListItemIcon>
								<HomeIcon />
							</ListItemIcon>
							<ListItemText primary="Inicio" />
						</ListItem>
						{decoded ? (
							<ListItem>
								<ListItemIcon>
									<ExitToAppIcon/>
								</ListItemIcon>
								
								<ListItemText
									color="inherit" 
									component={Link} to="/" 
									onClick={() => {
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
        </div>
    )
}
 export default withRouter(Navegacion);