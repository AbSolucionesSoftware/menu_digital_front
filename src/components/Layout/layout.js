import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import Navegacion from '../Navbar/navegacion';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import { AppBar, CssBaseline, Slide, useScrollTrigger } from '@material-ui/core';

import { NavProvider } from '../../context/context_nav';

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
	const classes = useStyles();
	let thema = localStorage.getItem('tema');
	let tema = JSON.parse(thema);
	const { routes } = props;

	useEffect(
		() => {
			if (tema === null) {
				localStorage.setItem('tema', false);
				return;
			}
		},
		[ tema ]
	);

	return (
		<ThemeProvider >
			<CssBaseline />
			<div className={classes.fondo}>
				<NavProvider>
					<HideOnScroll {...props}>
						<AppBar>
							<Toolbar>
								<Navegacion />
							</Toolbar>
						</AppBar>
					</HideOnScroll>
					<Toolbar />
					<div style={{ minHeight: '90vh' }}>
						<LoadRoutes routes={routes} />
					</div>
				</NavProvider>

				<div>
					{/* <Footer /> */}
				</div>
			</div>
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
