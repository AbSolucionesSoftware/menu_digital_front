import React from 'react'
import clienteAxios from '../../../config/axios';
import Cards_Platos from '../Cards_Platillos/card_plato';

export default function ResultadoBusqueda(props) {
    const idMenu = props.match.params.id;
    const parametro = props.match.params.url;
    console.log(idMenu, parametro);

    const obtenerBusqueda = async () => {
		await clienteAxios
			.post(`/product/search/company${idMenu}`, {filter: "busqueda"})
			.then((res) => {

			})
			.catch((err) => {
				console.log("No jalo esa mamada");
				console.log(err.response);
			})
	}

    return (
        <div>
            <Cards_Platos />
        </div>
    )
}
