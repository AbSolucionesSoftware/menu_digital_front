import { AppBar,Button, IconButton, Toolbar, ListItemIcon, ListItemText, Divider, Drawer, ListItem, List, Box, Grid, Hidden } from '@material-ui/core'
import { HashLink } from 'react-router-hash-link';
import {Link, withRouter } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import AssignmentLateIcon from '@material-ui/icons/AssignmentLate';
import DvrIcon from '@material-ui/icons/Dvr';

import Comody from '../../img/Comody.jpeg'

import useStyles from './styles';
import { ImageContext } from '../../context/curso_context';

import React, { useContext,  useState } from 'react';

function NavegacionPage(props) {

	const [ open, setOpen ] = useState(false);
	const [ anchorEl, setAnchorEl ] = useState(null);
    const {  nombre,  } = useContext(ImageContext);
	const token = localStorage.getItem('token');
	const slug = localStorage.getItem('slug');
	const id = localStorage.getItem('idEmpresa');

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

	const obtenerBusqueda = (e) => setBusqueda(e.target.value);

	const buscarBD = () => {
		if (!busqueda) {
			return;
		}
		props.history.push(`/${slug}/${id}/busqueda/${busqueda}`);
	};

	const pressEnter = (e) => {
		if(!e.target.defaultValue) return;
		if(e.key === "Enter") props.history.push(`/${slug}/${id}/busqueda/${e.target.defaultValue}`);
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
							<Box component={Link} to={`/`} className={classes.containerImage}>  
								<img  className={classes.image} alt="logotipo" src={Comody}/>
							</Box>
						<Hidden smDown>
							<Grid container justify="flex-end" >
								<Grid>
									<ListItem button component={Link} to={`/`} >
										<ListItemText primary="Inicio" />
									</ListItem>
								</Grid>
								
								<HashLink to="/#contacto" style={{textDecoration: "none", color:"white"}}>
									<ListItem>
										<ListItemText primary="Contacto" />
									</ListItem>
								</HashLink>
								<HashLink to="/#informacion" style={{textDecoration: "none", color:"white"}}>
									<ListItem>
										<ListItemText primary="Información" />
									</ListItem>
								</HashLink>
								<HashLink to="/#paquetes" style={{textDecoration: "none", color:"white"}}>
									<ListItem>
										<ListItemText primary="Paquetes" />
									</ListItem>
								</HashLink>
								<Grid>
									<ListItem button component={Link} to={`/login`}>
										<ListItemText primary="Entrar" />
									</ListItem>
								</Grid>
							</Grid>
						</Hidden>

						{/* <div className={classes.search}>
							
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
							<Grid lg={8} zeroMinWidth >
								<Box display="flex" justifyContent="center" >
									<Typography variant="h3" noWrap>
										{nombre} 
									</Typography>
								</Box>
							</Grid>
						

							<Grid  >
							<ListItem button component={Link} to={`/${slug}`} >
								<ListItemText primary="Inicio" />
							</ListItem>
							</Grid>
						</Hidden>

						<div className={classes.grow} />
						<Hidden smDown>
							{decoded ? (
								<Button color="inherit" component={Link} to="/user" className={classes.marginButton}>
									<AccountCircleSharpIcon/> Mi cuenta
								</Button>
							) : (
								<div />
							)}
						</Hidden> */}
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
						<Box component={Link} to={`/`}  onClick={handleDrawerClose} className={classes.containerImage}>  
							<img className={classes.image} alt="logotipo" src={Comody}/>
						</Box>
					</div>
					<Divider />
					{decoded ? (
						<ListItem button component={Link} to="/user" >
							<ListItemIcon>
								<AccountCircleIcon/>
							</ListItemIcon>
							<ListItemText primary="Mi cuenta" />
						</ListItem>
					) : (
						<div />
					)}
					<List>
						{/* <ListItem button component={Link} to={`/`} >
							<Typography style={{ fontWeight: 600}} variant="h5"> {nombre} </Typography>
						</ListItem> */}
						<ListItem button component={Link} to={`/`} >
							<ListItemIcon>
								<HomeIcon />
							</ListItemIcon>
							<ListItemText primary="Inicio" />
						</ListItem>
						<HashLink to="/#contacto" style={{textDecoration: "none", color:"black"}}>
							<ListItem onClick={handleDrawerClose}>
								<ListItemIcon>
									<ContactMailIcon />
								</ListItemIcon>
								<ListItemText primary="Contacto" />
							</ListItem>
						</HashLink>
						<HashLink to="/#informacion" style={{textDecoration: "none", color:"black"}}>
							<ListItem onClick={handleDrawerClose}>
								<ListItemIcon>
									<AssignmentLateIcon />
								</ListItemIcon>
								<ListItemText primary="Información" />
							</ListItem>
						</HashLink>
						<HashLink to="/#paquetes" style={{textDecoration: "none", color:"black"}}>
							<ListItem onClick={handleDrawerClose}>
								<ListItemIcon>
									<DvrIcon />
								</ListItemIcon>
								<ListItemText primary="Paquetes" />
							</ListItem>
						</HashLink>
						<ListItem button component={Link} to={`/login`} >
							<ListItemIcon>
								<ExitToAppIcon/>
							</ListItemIcon>
							<ListItemText primary="Entrar" />
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
 export default withRouter(NavegacionPage);