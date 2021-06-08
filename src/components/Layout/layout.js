import React, { useCallback, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import Navegacion from '../Navbar/navegacion';
import NavegacionPage from '../Navbar_Page/navegacionPage';
import Footer from '../Footer/footer'
import FooterPage from '../Footer/footerPage'
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import { AppBar, CssBaseline, Slide, useScrollTrigger } from '@material-ui/core';

import {  NavProvider } from '../../context/context_nav';
import { ImageProvider } from '../../context/curso_context';
import clienteAxios from '../../config/axios';

import { MenuContext } from '../../context/menuContext';

const useStyles = makeStyles((theme) => ({
	fondo:{
		// backgroundColor: "black"
	}
}))


function HideOnScroll(props) {
	const { children, window } = props;
	const trigger = useScrollTrigger({ target: window ? window() : undefined });
  
	return (
	  <Slide appear={false} direction="down" in={!trigger}>
		{children}
	  </Slide>
	);
}

HideOnScroll.propTypes = {
	children: PropTypes.element.isRequired,
	window: PropTypes.func,
};


export default function LayoutUsers(props) {

	const { empresa, setEmpresa, recargar, setRecargar } = useContext(MenuContext);

	const classes = useStyles();
	const { routes } = props;
	const [stateFooter, setStateFooter] = useState(false);
	// const [ empresa, setEmpresa ] = useState([]);

	const navs = props.location.pathname;
	
	const consultarDatos = useCallback(
		async () => {
		setStateFooter(false);
		await clienteAxios
			.get(`/company/slug/company${navs}`)
			.then((res) => {
				if (res.data === null) {
					setStateFooter(false);
					return 0;
				}else{
					setStateFooter(true);
					setEmpresa(res.data);
				}
			})
			.catch((err) => {
			})
		},
		[ empresa, recargar ]
	)

	useEffect(() => {
		consultarDatos();
		setRecargar(false);
	}, [recargar])


	return (
		<ThemeProvider >
			<CssBaseline />
			<ImageProvider>
				<div className={classes.fondo}>
					<NavProvider>
						<HideOnScroll {...props}>
							<AppBar>
								<Toolbar>
									{
										navs === "/" || navs === "/login" ? (
											<NavegacionPage />
										):(
											<Navegacion />
										)
									}
								</Toolbar>
							</AppBar>
						</HideOnScroll>
						<Toolbar />
						<div style={{ minHeight: '90vh' }}>
							<LoadRoutes routes={routes} />
						</div>
					</NavProvider>

					<div>
					{
						stateFooter === false ? (
							<FooterPage />
						):(
							<Footer />
						)
					}
					</div>
				</div>
			</ImageProvider>
		</ThemeProvider>
	);
}

function LoadRoutes({ routes }) {

	return (
		<Switch>
			{routes.map((route, index) => (
				<Route key={index} path={route.path} exact={route.exact} component={route.component} />
			))}
		</Switch>
	);
}
