import { Hidden, IconButton, ListItemIcon, ListItemText, Drawer, ListItem, List, Typography,} from '@material-ui/core'
import { Link } from 'react-router-dom';
import Sesion from '../Verificacion_sesion/verificacion_sesion';

import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SupervisorAccountTwoToneIcon from '@material-ui/icons/SupervisorAccountTwoTone';
import useStyles from './styles';

import React, { useState } from 'react';

const drawerWidth = 240;


export default function Navegacion_User(props) {
	const { window } = props;
	const [ open, setOpen ] = useState(false);
	const [ anchorEl, setAnchorEl ] = useState(null);
	const sesion = Sesion(props, false);
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
						<ListItem >
							<Typography>
								Mi menu digital
							</Typography>
						</ListItem>
						<ListItem >
							<Typography>
								Usuario
							</Typography>
						</ListItem>
						<ListItem button component={Link} to="/user">
							<ListItemIcon><SupervisorAccountTwoToneIcon/></ListItemIcon>
							<Typography>
								Panel User
							</Typography>
						</ListItem>
						<ListItem button component={Link} to="/user/menu">
							<ListItemIcon><SupervisorAccountTwoToneIcon/></ListItemIcon>
							<Typography>
								Menu
							</Typography>
						</ListItem>
						<ListItem button component={Link} to="/user/publicidad">
							<ListItemIcon><PersonAddIcon/></ListItemIcon>
							<Typography>
								Publicidad
							</Typography>
						</ListItem>
						<ListItem button component={Link} to="/">
							<ListItemIcon><HomeIcon/></ListItemIcon>
							<Typography>
								Vista Principal
							</Typography>
						</ListItem>
						<ListItem button component={Link} to="/">
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
						<ListItem >
							<Typography>
								Mi menu digital
							</Typography>
						</ListItem>
						<ListItem >
							<Typography>
								Usuario
							</Typography>
						</ListItem>
						<ListItem button component={Link} to="/user">
							<ListItemIcon><SupervisorAccountTwoToneIcon/></ListItemIcon>
							<Typography>
								Panel User
							</Typography>
						</ListItem>
						<ListItem button component={Link} to="/user/menu">
							<ListItemIcon><SupervisorAccountTwoToneIcon/></ListItemIcon>
							<Typography>
								Menu
							</Typography>
						</ListItem>
						<ListItem button component={Link} to="/user/publicidad">
							<ListItemIcon><PersonAddIcon/></ListItemIcon>
							<Typography>
								Publicidad
							</Typography>
						</ListItem>
						<ListItem button component={Link} to="/">
							<ListItemIcon><HomeIcon/></ListItemIcon>
							<Typography>
								Vista Principal
							</Typography>
						</ListItem>
						<ListItem 
							button 
							component={Link} 
							to="/"
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
