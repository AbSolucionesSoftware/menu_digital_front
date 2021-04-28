import React, { useEffect, useState } from 'react';
import { Box } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import ListaCategorias from './lista_categorias';
import ModalRegistroCategorias from './modal_registro';
import Spin from '../../../components/Spin/spin';
import clienteAxios from '../../../config/axios';


export default function Categorias() {
	const token = localStorage.getItem('token');
	const [ categoriasBD, setCategoriasBD ] = useState([]);
	const [ update, setUpdate ] = useState(false);
	const [ loading, setLoading ] = useState(false);
	let company = { _id: '' };

	if (token !== null) company = JSON.parse(localStorage.getItem('user'));

	const getCategoryBD = async () => {
		setLoading(true);
		await clienteAxios
			.get(`/categories/${company._id}`)
			.then((res) => {
				setLoading(false);
				setCategoriasBD(res.data);
			})
			.catch((err) => {
				setLoading(false);
			});
	};

	useEffect(
		() => {
			getCategoryBD();
		},
		[ update ]
	);

	const render_categorias = categoriasBD.map((categoria, index) => (
		<ListaCategorias key={index} categoria={categoria} update={update} setUpdate={setUpdate} company={company} />
	));

	return (
		<div>
			<Spin loading={loading} />
			<Box textAlign="center" mb={5}>
				<Typography variant="h4">Categorias</Typography>
			</Box>
			<ModalRegistroCategorias tipo="category" update={update} setUpdate={setUpdate} company={company} />
			{render_categorias}
		</div>
	);
}
