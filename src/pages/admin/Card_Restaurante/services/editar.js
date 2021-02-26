import { Button } from '@material-ui/core';
import React from 'react'
import clienteAxios from '../../../../config/axios';


export default function Editar(props) {
    const { empresa } = props;

    const publicarDatos = async (empresa, publicado) => {
        clienteAxios
        .put(
            `/company/${empresa._id}`,{"public": `${publicado}`},
            // {
            //     headers: {
            //         Authorization: `bearer ${token}`
            //     }
            // }
        )
        .then((res) => {
            // setReload(!reload);
        })
        .catch((err) => {
            // errors(err);
        });
    };

    return (
        <div>
            <Button
                // className={classes.boton} 
                variant="contained" 
                color="primary"
                // onClick={() => publicarDatos(empresa, !empresa.publicado) }
            >
                Editar
            </Button>
        </div>
    )
}