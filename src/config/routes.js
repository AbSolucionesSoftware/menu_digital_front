import Layout from '../components/Layout/layout';
import Layou_admin from '../components/Layout_admin/layout_admin';

import Home from '../pages/users/home'
import LoginAdmin from '../pages/users/Login/login';
import Carrito from '../pages/users/Carrito/carrito'
import Busqueda from '../pages/users/Busqueda/busqueda'

const routes = [
	{
		path: '/admin',
		component: Layou_admin,
		exact: false,
		routes: [
			{
				path: '/admin',
				// component: AdminHome,
				exact: true,
			}
		]
	},
	{
		path: '/',
		component: Layout,
		exact: false,
		routes: [
			{
				path: '/',
				component: Home,
				exact: true
			},
			{
				path: '/login',
				component: LoginAdmin,
				exact: true
			},
			{
				path: '/carrito',
				component: Carrito,
				exact: true
			},
			{
				path: '/busqueda/:url',
				component: Busqueda,
				exact: true
            },
		]
	}
];

export default routes;
