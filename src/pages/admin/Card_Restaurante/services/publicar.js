import { Button } from '@material-ui/core'
import React, { useState } from 'react'
import MessageSnackbar from '../../../../components/Snackbar/snackbar';
import Spin from '../../../../components/Spin/spin';
import clienteAxios from '../../../../config/axios';



export default function Publicar(props) {
    const { empresa, setUpload } = props;
	const [ loading, setLoading ] = useState(false);
	const token = localStorage.getItem('token');


    const [ snackbar, setSnackbar ] = useState({
		open: false,
		mensaje: '',
		status: ''
	});

    const publicarEmpresa = async (empresa, publicado) => {
        setLoading(true);
        await clienteAxios
		.put(
            `/company/public/action/${empresa._id}`, 
            {
              "public": publicado
            },
            {
				headers: {
					Authorization: `bearer ${token}`
				}
			}
        )
        .then((res) => {
            setUpload(true);
            console.log(setUpload);
            setLoading(false);
            setSnackbar({
                open: true,
                mensaje: "Empresa Publicada con Exito",
                status: 'success'
            });

        }).catch((err) => {
            setUpload(true);
            setLoading(false);
            setSnackbar({
                open: true,
                mensaje: "Error en el servidor",
                status: 'error'
            });

        });
    };

    return (
        <div>
            <Spin loading={loading} />
			<MessageSnackbar
				open={snackbar.open}
				mensaje={snackbar.mensaje}
				status={snackbar.status}
				setSnackbar={setSnackbar}
			/>
            <Button
                variant="contained" 
                color="primary"
                onClick={() => publicarEmpresa(empresa, !empresa.public)}
            >
                    {empresa.public ? 'Publicado' : 'Publicar'}
            </Button>
        </div>
    )
}