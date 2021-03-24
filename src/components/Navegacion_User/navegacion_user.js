import { Hidden, IconButton, ListItemIcon, ListItemText, Drawer, ListItem, List, Typography, Dialog, Box, TextField, Grid,} from '@material-ui/core'
import { Link, withRouter } from 'react-router-dom';
import clienteAxios from '../../config/axios';

import MenuIcon from '@material-ui/icons/Menu';
import AddToQueueIcon from '@material-ui/icons/AddToQueue';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import SupervisorAccountTwoToneIcon from '@material-ui/icons/SupervisorAccountTwoTone';

import { FacebookIcon, FacebookShareButton, WhatsappIcon, WhatsappShareButton } from 'react-share';

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

    // const handleProfileMenuOpen = (event) => {
	// 	setAnchorEl(event.currentTarget);
	// };
	// const handleMenuClose = () => {
	// 	setAnchorEl(null);
	// };
	// const handleDrawerClose = () => {
	// 	setOpen(false);
	// };
	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const [openDialog, setOpenDialog] = useState(false);

    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
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
						<ListItem button component={Link} to="/user">
							<ListItemIcon><SupervisorAccountTwoToneIcon/></ListItemIcon>
							<Typography>
								Datos Empresa
							</Typography>
						</ListItem>
						<ListItem button component={Link} to={`/${company._id}/${company.slug}`}>
							<ListItemIcon><DesktopWindowsIcon/></ListItemIcon>
							<Typography>
								Ver mi menu digital
							</Typography>
						</ListItem>
						<ListItem button onClick={handleClickOpen}>
							<ListItemIcon><DoubleArrowIcon/></ListItemIcon>
							<Typography>
								Compartir Menu
							</Typography>
						</ListItem>
						<ListItem button component={Link} to="/user/menu">
							<ListItemIcon><RestaurantMenuIcon/></ListItemIcon>
							<Typography>
								Menu
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
							to={`${company._id}/${company.slug}`}
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
						<ListItem button component={Link} to={`/${company._id}/${company.slug}`}>
							<ListItemIcon><DesktopWindowsIcon/></ListItemIcon>
							<Typography>
								Ver mi menu digital
							</Typography>
						</ListItem>
						<ListItem button onClick={handleClickOpen}>
							<ListItemIcon><DoubleArrowIcon/></ListItemIcon>
							<Typography>
								Compartir Menu
							</Typography>
						</ListItem>
						<ListItem button component={Link} to="/user/menu">
							<ListItemIcon>< RestaurantMenuIcon/></ListItemIcon>
							<Typography>
								Menu
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
							to={`${company._id}/${company.slug}`}
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

			<Dialog open={openDialog} onClose={handleClose}>
				<Box p={5} textAlign="center">
					<Box p={1}>
						<Typography variant="h6">
							Comparte este enlace para poder compartir tu Menu!
						</Typography>
					</Box>
					<Box textAlign="center" p={2}>
						<TextField
							color="primary"
							style={{width: '100%'}}
							value={`http://www.comody.mx/${company._id}/${company.slug}`}
							name="Link"
							id="link"
							label="Link"
						>
						</TextField>
					</Box>
					<Grid spacing={3} justify="center">
						<Box>
							<Typography variant="h6">
								Comparte tu menu digital en WhatssAp
							</Typography>
						</Box>
						<Grid item>
							<WhatsappShareButton 
								url={`https://www.comody.mx/${company._id}/${company.slug}`} 
								title="Te comparto mi menu Digital" 
								separator=": ">
								<WhatsappIcon style={{ fontSize: 45, color: '#00bb2d' }} />
							</WhatsappShareButton>
						</Grid>
					</Grid>

				</Box>
            </Dialog>
	</div>
    )
}



