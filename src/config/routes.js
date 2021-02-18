 import Layout from '../components/Layout/layout';
import Layou_admin from '../components/Layout_admin/layout_admin';

 import Home from '../pages/users/home'


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
			}
		]
	}
];

export default routes;
