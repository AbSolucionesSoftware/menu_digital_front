import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import Footer from '../Footer/footer'
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import { AppBar, CssBaseline, Slide, useScrollTrigger } from '@material-ui/core';

import { NavProvider } from '../../context/context_nav';
import { ImageProvider } from '../../context/curso_context';
import Navegacion_User from '../Navegacion_User/navegacion_user';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	drawer: {
		[theme.breakpoints.up('sm')]: {
		width: drawerWidth,
		flexShrink: 0,
		},
	},
	appBar: {
		[theme.breakpoints.up('sm')]: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		},
	},
	menuButton: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up('sm')]: {
		display: 'none',
		},
	},
	// necessary for content to be below app bar
	toolbar: theme.mixins.toolbar,
	drawerPaper: {
		width: drawerWidth,
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
}));

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


export default function LayoutUser(props) {
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
		<div className={classes.root}>
		<ThemeProvider >
		<CssBaseline />
		<ImageProvider>
			<nav className={classes.drawer} aria-label="mailbox folders">
				<Navegacion_User />
			</nav>
			<div className={classes.content}>
				<NavProvider>
					<div style={{ minHeight: '90vh' }}>
						<LoadRoutes routes={routes} />
					</div>
				</NavProvider>
				<div>
					<Footer />
				</div>
			</div>
		</ImageProvider>
		</ThemeProvider>
		</div>

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
