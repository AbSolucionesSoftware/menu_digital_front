import { Box, Grid, Typography } from '@material-ui/core'
import React, { useState, useEffect, useContext } from 'react'
import { withRouter } from 'react-router';
import Spin from '../../components/Spin/spin';
import clienteAxios from '../../config/axios';
import { NavContext } from '../../context/context_nav'
// import Registro_Menu from './Registro_Menus/registro_menu'
import Cards_Restaurate from './Card_Restaurante/card_restaurante'

 function Panel_Admin(props) {

	const token = localStorage.getItem('token');
	const [ empresas, setEmpresas] = useState([]);
	const [ loading, setLoading] = useState(false);
    const [ upload, setUpload] = useState(false);
    const { setDtxEmpresas} = useContext(NavContext);

    const consultarDatos = async () => {
		setLoading(true);
		await clienteAxios
			.get('/company/',{
				headers: {
					Authorization: `bearer ${token}`
				}
			})
			.then((res) => {
		        setLoading(false);
                setUpload(true);
                setDtxEmpresas(res.data);
				setEmpresas(res.data);
			})
			.catch((err) => {
		        setLoading(true);
                setUpload(true);
			})
	};

    useEffect(() => {
		consultarDatos();
	}, [upload]);


    return (
        <div>
            <Spin loading={loading} />
            <Grid lg={12}>
                <Box textAlign="center" mt={3}>
                    <Typography variant="h4">
                        Establecimientos con Menú
                    </Typography>
                </Box>
            </Grid>
            <Grid lg={12}>
                <Box mt={3} display="flex" justifyContent="center">
                    <Cards_Restaurate upload={upload} setUpload={setUpload} empresas={empresas} setEmpresas={setEmpresas} />
                </Box>
            </Grid>
        </div>
    )
}
export default withRouter(Panel_Admin);