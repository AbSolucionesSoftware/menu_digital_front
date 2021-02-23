import Layout from '../components/Layout/layout';
import Layout_admin from '../components/Layout_admin/layout_admin';
import LayoutUser from '../components/Layout_user/layout_user'

import Panel_Admin from '../pages/admin/panel_admin'
import Registro_Menu from '../pages/admin/Registro_Menus/registro_menu'

import Publicidad from '../pages/Tiendas/Publicidad/publicidad';
import PanelUser from '../pages/Tiendas/panel_usario';
import Productos from '../pages/Tiendas/Productos/productos';

import Home from '../pages/users/home'
import LoginAdmin from '../pages/users/Login/login';
import Carrito from '../pages/users/Carrito/carrito'
import Busqueda from '../pages/users/Busqueda/busqueda'

const routes = [
	{
		path: '/admin',
		component: Layout_admin,
		exact: false,
		routes: [
			{
				path: '/admin',
				component: Panel_Admin,
				exact: true,
			},
			{
				path: '/admin/registro',
				component: Registro_Menu,
				exact: true,
			}
		]
	},
	{
		path: '/user',
		component: LayoutUser,
		exact: false,
		routes: [
			{
				path: '/user',
				component: PanelUser,
				exact: true,
			},
			{
				path: '/user/menu',
				component: Productos,
				exact: true,
			},
			{
				path: '/user/publicidad',
				component: Publicidad,
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
