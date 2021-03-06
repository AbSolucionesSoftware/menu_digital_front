import { Hidden, IconButton, ListItemIcon, ListItemText, Drawer, ListItem, List, Typography, Box,} from '@material-ui/core'
import { Link } from 'react-router-dom';

import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SupervisorAccountTwoToneIcon from '@material-ui/icons/SupervisorAccountTwoTone';

import comody from '../../img/Comody.jpeg'
import useStyles from './styles';

import React, { useState } from 'react';

const drawerWidth = 240;


export default function Navegacion_Admin(props) {
	const { window } = props;
	const [ open, setOpen ] = useState(false);
	const [ anchorEl, setAnchorEl ] = useState(null);
	// const sesion = Sesion(props, false);
	const [ datos, setDatos ] = useState([]);
	const [ busqueda, setBusqueda ] = useState('');

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

	const container = window !== undefined ? () => window().document.body : undefined;
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
							<Typography variant="h6">
								Administrador
							</Typography>
						</ListItem>
						<ListItem button component={Link} to="/admin" onClick={handleDrawerToggle}>
							<ListItemIcon><SupervisorAccountTwoToneIcon/></ListItemIcon>
							<Typography>
								Empresas con Menú
							</Typography>
						</ListItem>
						<ListItem button component={Link} to="/admin/registro"  onClick={handleDrawerToggle}>
							<ListItemIcon><PersonAddIcon/></ListItemIcon>
							<Typography>
								Registro
							</Typography>
						</ListItem>
						<ListItem 
							button 
							component={Link} to="/login"  
							onClick={() => {
								localStorage.removeItem('token');
								localStorage.removeItem('admin');
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
							<Typography variant="h6">
								Administrador
							</Typography>
						</ListItem>
						<ListItem button component={Link} to="/admin">
							<ListItemIcon><SupervisorAccountTwoToneIcon/></ListItemIcon>
							<Typography>
								Empresas con Menú
							</Typography>
						</ListItem>
						<ListItem button component={Link} to="/admin/registro">
							<ListItemIcon><PersonAddIcon/></ListItemIcon>
							<Typography>
								Registro
							</Typography>
						</ListItem>
						<ListItem 
							button 
							component={Link} 
							to="/login"
							onClick={() => {
								localStorage.removeItem('token');
								localStorage.removeItem('user');
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
	</div>
    )
}
