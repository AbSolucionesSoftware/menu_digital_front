import Layout from '../components/Layout/layout';
import Layout_admin from '../components/Layout_admin/layout_admin';
import LayoutUser from '../components/Layout_user/layout_user'

import Panel_Admin from '../pages/admin/panel_admin'
import Registro_User from '../pages/admin/Registro_User/registro_user'

import Publicidad from '../pages/Users/Publicidad/publicidad';
import PanelUser from '../pages/Users/PanelUsuario/panel_usario';
import Menu from '../pages/Users/Menu/menu';

import Home from '../pages/Frente_Users/home'
import LoginAdmin from '../pages/Frente_Users/Login/login';
import Carrito from '../pages/Frente_Users/Carrito/carrito';
import Busqueda from '../pages/Frente_Users/Busqueda/busqueda';
import Menu_Front from '../pages/Frente_Users/Menu_Front/menu_front';
import BusquedaSubCates from '../pages/Frente_Users/Categorias/busquedaSubCates';

import ResultadoBusqueda from '../pages/Frente_Users/Busqueda/busqueda';

import Error404 from '../components/error'

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
				component: Registro_User,
				exact: true,
			},
			{
				component: Error404
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
				component: Menu,
				exact: true,
			},
			{
				path: '/user/publicidad',
				component: Publicidad,
				exact: true,
			},
			{
				component: Error404
			}
		]
	},
	{
		path: '/',
		component: Layout,
		exact: false,
		routes: [
			
			{
				path: '/:idMenu/:slug',
				component: Menu_Front,
				exact: true
			},
			{
				path: '/:idMenu/:slug/subCategorias/:subCategoria',
				component: BusquedaSubCates,
				exact: true
			},
			{
				path: '/:idMenu/:slug/busqueda/:busqueda',
				component: ResultadoBusqueda,
				exact: true
			},
			{
				path: '/login',
				component: LoginAdmin,
				exact: true
			},
			{
				component: Error404
			}
			
		]
	}
];

export default routes;
