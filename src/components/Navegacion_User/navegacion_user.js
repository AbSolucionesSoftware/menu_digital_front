import { Hidden, IconButton, ListItemIcon, ListItemText, Drawer, ListItem, List, Typography, Dialog, Box, TextField, Grid,} from '@material-ui/core'
import { Link, withRouter } from 'react-router-dom';
import clienteAxios from '../../config/axios';

import MenuIcon from '@material-ui/icons/Menu';
import AddToQueueIcon from '@material-ui/icons/AddToQueue';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import CropFreeIcon from '@material-ui/icons/CropFree';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import SupervisorAccountTwoToneIcon from '@material-ui/icons/SupervisorAccountTwoTone';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';

import GenerarQr from './generarQr';
import { WhatsappIcon, WhatsappShareButton } from 'react-share';
import useStyles from './styles';

import comody from '../../img/Comody.jpeg'

import React, { useEffect, useState } from 'react';

const drawerWidth = 240;

 
export default function Navegacion_User(props) {
	const [ open, setOpen ] = useState(false);
	const [ anchorEl, setAnchorEl ] = useState(null);

	const [empresa, setEmpresa] = useState([]);

	const company = JSON.parse(localStorage.getItem('user'));
	const token = localStorage.getItem('token');

    const isMenuOpen = Boolean(anchorEl);

	var React = require('react');
	var QRCode = require('qrcode.react');

	const consultarDatos = async () => {
		await clienteAxios
			.get(`/company/${company._id}`, {
				headers: {
					Authorization: `bearer ${token}`
				}
			})
			.then((res) => {
				setEmpresa(res.data);
				
			})
			.catch((err) => {
			})
	};

    useEffect(() => {
		consultarDatos();
	}, [])

    
	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const [openDialog, setOpenDialog] = useState(false);
	const [codigoQr, setCodigoQr] = useState(false);

    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

	const clickOpen = () => {
        setCodigoQr(true);
    };

    const clickClose = () => {
        setCodigoQr(false);
    };

	const classes = useStyles();

	const handleDrawerToggle = () => {
		setOpen(!open);
	};
	
    return (
		<div>
			{/* Panel de responsivo */}
			<Hidden smUp>
				<Drawer
					anchor="left"
					open={open}
					onClose={handleDrawerToggle}
					classes={{
						paper: classes.drawerPaper,
					}}
				>
					<List>
						<ListItem>
							<Box className={classes.containerImage}>  
								<img  className={classes.image} alt="logotipo" src={comody}/>
							</Box>
						</ListItem>
						<ListItem >
							<Typography>
								Bienevenido:
							</Typography>
						</ListItem>
						<ListItem >
							<Typography variant="h5">
								{empresa.nameUser}
							</Typography>
						</ListItem>
						<ListItem button component={Link} to="/user" onClick={handleDrawerToggle}>
							<ListItemIcon><SupervisorAccountTwoToneIcon/></ListItemIcon>
							<Typography>
								Datos Empresa
							</Typography>
						</ListItem>
						<ListItem button component={Link} to={`/${company.slug}`}>
							<ListItemIcon><DesktopWindowsIcon/></ListItemIcon>
							<Typography>
								Ver mi menú digital
							</Typography>
						</ListItem>
						<ListItem button component={Link} >
							<ListItemIcon><HomeWorkIcon/></ListItemIcon>
							<Typography>
								Mis Sucursales
							</Typography>
						</ListItem>
						<ListItem button onClick={handleClickOpen}>
							<ListItemIcon><WhatsAppIcon/></ListItemIcon>
							<Typography>
								Compartir Menú
							</Typography>
						</ListItem>
						<ListItem button onClick={clickOpen}>
							<ListItemIcon><CropFreeIcon/></ListItemIcon>
							<Typography>
								Generar Codigo QR
							</Typography>
						</ListItem>
						<ListItem button component={Link} to="/user/menu" onClick={handleDrawerToggle}>
							<ListItemIcon><RestaurantMenuIcon/></ListItemIcon>
							<Typography>
								Productos Menú
							</Typography>
						</ListItem>
						<ListItem button component={Link} to="/user/categoriasmenu" onClick={handleDrawerToggle}>
							<ListItemIcon><RestaurantMenuIcon/></ListItemIcon>
							<Typography>
								Categorias Menú
							</Typography>
						</ListItem>
						<ListItem button component={Link} to="/user/clasificacionmenu" onClick={handleDrawerToggle}>
							<ListItemIcon><RestaurantMenuIcon/></ListItemIcon>
							<Typography>
								Clasificaciones Menú
							</Typography>
						</ListItem>
						<ListItem button component={Link} to="/user/publicidad" onClick={handleDrawerToggle}>
							<ListItemIcon><AddToQueueIcon/></ListItemIcon>
							<Typography>
								Publicidad
							</Typography>
						</ListItem>
						<ListItem 
							button
							component={Link} 
							to={`/${company.slug}`}
							onClick={() => {
								setTimeout(() => {  
									localStorage.removeItem('token');
									localStorage.removeItem('carritoUsuario');
									localStorage.removeItem('user');
								 }, 1000)
							}}
						>
							<ListItemIcon><ExitToAppIcon/></ListItemIcon>
							<Typography>
								Cerrar Sesión
							</Typography>
						</ListItem>
					</List>
				</Drawer>
			</Hidden>

			<Hidden xsDown>
				<Drawer
					classes={{
						paper: classes.drawerPaper,
					}}
					className={classes.appbar}
					variant="permanent"
					anchor="left"
					open={open}
				>
					<List>
						<ListItem>
							<Box className={classes.containerImage}>  
								<img  className={classes.image} alt="logotipo" src={comody}/>
							</Box>
						</ListItem>
						<ListItem >
							<Typography>
								Bienvenido:
							</Typography>
						</ListItem>
						<ListItem >
							<Typography variant="h5">
								{empresa.nameUser}
							</Typography>
						</ListItem>
						<ListItem button component={Link} to="/user">
							<ListItemIcon><SupervisorAccountTwoToneIcon/></ListItemIcon>
							<Typography>
								Datos Empresa
							</Typography>
						</ListItem>
						<ListItem button component={Link} to={`/${company.slug}`} >
							<ListItemIcon><DesktopWindowsIcon/></ListItemIcon>
							<Typography>
								Ver mi menú digital
							</Typography>
						</ListItem>
						<ListItem button component={Link} to={'/user/sucursales'}>
							<ListItemIcon><HomeWorkIcon/></ListItemIcon>
							<Typography>
								Mis Sucursales
							</Typography>
						</ListItem>
						<ListItem button onClick={handleClickOpen}>
							<ListItemIcon><WhatsAppIcon/></ListItemIcon>
							<Typography>
								Compartir Menú
							</Typography>
						</ListItem>
						<ListItem button onClick={clickOpen}>
							<ListItemIcon><CropFreeIcon/></ListItemIcon>
							<Typography>
								Generar Codigo QR
							</Typography>
						</ListItem>
						<ListItem button component={Link} to="/user/menu">
							<ListItemIcon><FastfoodIcon /></ListItemIcon>
							<Typography>
								Productos Menú
							</Typography>
						</ListItem>
						<ListItem button component={Link} to="/user/categoriasmenu">
							<ListItemIcon>< RestaurantMenuIcon/></ListItemIcon>
							<Typography>
								Categorias Menú
							</Typography>
						</ListItem>
						<ListItem button component={Link} to="/user/clasificacionmenu">
							<ListItemIcon>< RestaurantMenuIcon/></ListItemIcon>
							<Typography>
								Clasificaciones Menú
							</Typography>
						</ListItem>
						<ListItem button component={Link} to="/user/publicidad">
							<ListItemIcon><AddToQueueIcon/></ListItemIcon>
							<Typography>
								Publicidad
							</Typography>
						</ListItem>
						<ListItem 
							button 
							component={Link} 
							onClick={() => {
								localStorage.removeItem('token');
								localStorage.removeItem('user');
								localStorage.removeItem('carritoUsuario');
							}}
							to={`/${company.slug}`}
						>
							<ListItemIcon><ExitToAppIcon/></ListItemIcon>
							<Typography>
								Cerrar Sesión
							</Typography>
						</ListItem>
					</List>
				</Drawer>
			</Hidden>
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

{/* //---------------Generar codigo PARA WHATSSAPP--------------------------- */}
			<Dialog open={openDialog} onClose={handleClose}>
				<Box p={5} textAlign="center">
					<Box p={1}>
						<Typography variant="h6">
							Comparte este enlace para compartir tu Menú
						</Typography>
					</Box>
					<Box textAlign="center" p={2}>
						<TextField
							color="primary"
							style={{width: '100%'}}
							value={`http://www.comody.mx/${company.slug}`}
							name="Link"
							id="link"
							label="Link"
						>
						</TextField>
					</Box>
					<Grid >
						<Box>
							<Typography variant="h6">
								Comparte tu menú digital en WhatssAp
							</Typography>
						</Box>
						<Grid item>
							<WhatsappShareButton 
								url={`https://www.comody.mx/${company.slug}`} 
								title="Te comparto mi menú Digital" 
								separator=": ">
								<WhatsappIcon style={{ fontSize: 45, color: '#00bb2d' }} />
							</WhatsappShareButton>
						</Grid>
					</Grid>

				</Box>
            </Dialog>

{/* //---------------Generar codigo QR--------------------------- */}
			<Dialog open={codigoQr} onClose={clickClose}>
				<Box p={5} textAlign="center">
					<Box p={1}>
						<Typography variant="h6">
							Comparte este codigo para ingresar a tu menú digital de una manera mas rapida
						</Typography>
					</Box>
					<Box  textAlign="center" p={2}>
						<QRCode size={180} value={`https://www.comody.mx/${company.slug}`} />
					</Box>
					{/* <Box textAlign="center" p={2}>
						<GenerarQr empresa={empresa}/>
					</Box> */}
					{/* <Grid item>
						<WhatsappShareButton 
							url={`https://www.comody.mx/${company.slug}`} 
							title="Te comparto mi menú Digital" 
							separator=": "
						>
							<WhatsappIcon style={{ fontSize: 45, color: '#00bb2d' }} />
						</WhatsappShareButton>
					</Grid> */}
				</Box>
            </Dialog>
	</div>
    )
}



