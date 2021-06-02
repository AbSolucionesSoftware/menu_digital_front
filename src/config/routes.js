import Layout from '../components/Layout/layout';
import Layout_admin from '../components/Layout_admin/layout_admin';
import LayoutUser from '../components/Layout_user/layout_user'

import Panel_Admin from '../pages/admin/panel_admin'
import Registro_User from '../pages/admin/Registro_User/registro_user'

import Publicidad from '../pages/Users/Publicidad/publicidad';
import RegistroProducto from '../pages/Users/Menu/services/registroProducto'
import PanelUser from '../pages/Users/PanelUsuario/panel_usario';
import BusquedaUser from '../pages/Users/Busqueda/busqueda'
import Menu from '../pages/Users/Menu/menu';
import Categorias from '../pages/Users/Categorias/categorias'
import Clasificaciones from '../pages/Users/Clasificaciones/clasificaciones'
import Sucursales from '../pages/Users/Sucursales/sucursales'
import Pedidos from '../pages/Users/Pedidos/pedidos'

import Home from '../pages/Frente_Users/home'
import LoginAdmin from '../pages/Frente_Users/Login/login';
import Carrito from '../pages/Frente_Users/Carrito/carrito';
import Busqueda from '../pages/Frente_Users/Busqueda/busqueda';
import Menu_Front from '../pages/Frente_Users/Menu_Front/menu_front';
import BusquedaSubCates from '../pages/Frente_Users/Categorias/busquedaSubCates';
import ResultadoBusqueda from '../pages/Frente_Users/Busqueda/busqueda';

import HomePublicidad from '../pages/Publicidad/Home/home'

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
				path: '/user/categoriasmenu',
				component: Categorias,
				exact: true,
			},
			{
				path: '/user/clasificacionmenu',
				component: Clasificaciones,
				exact: true,
			},
			{
				path: '/user/publicidad',
				component: Publicidad,
				exact: true,
			},
			{
				path: '/user/:idEmpresa/:busqueda',
				component: BusquedaUser,
				exact: true,
			},
			{
				path: '/user/sucursales',
				component: Sucursales,
				exact: true,
			},
			{
				path: '/user/pedidos',
				component: Pedidos,
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
				path: '/',
				component: HomePublicidad,
				exact: true
			},
			{
				path: '/login',
				component: LoginAdmin,
				exact: true
			},
			{
				path: '/:slug',
				component: Menu_Front,
				exact: true
			},
			{
				path: '/:slug/:idEmpresa/subCategorias/:subCategoria',
				component: BusquedaSubCates,
				exact: true
			},
			{
				path: '/:slug/:idEmpresa/categorias/:categoria',
				component: BusquedaSubCates,
				exact: true
			},
			{
				path: '/:slug/:idEmpresa/busqueda/:busqueda',
				component: ResultadoBusqueda,
				exact: true
			},
			{
				component: Error404
			}
			
		]
	},
	
];

export default routes;
