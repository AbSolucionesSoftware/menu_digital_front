import { Button } from '@material-ui/core'
import React from 'react'
import clienteAxios from '../../../../config/axios';



export default function Publicar(props) {
    const { empresa } = props;

    return (
        <div>
           <Button
                // className={classes.boton} 
                variant="contained" 
                color="primary"
                // onClick={() => publicarDatos(empresa, !empresa.publicado) }
            >
                {
                    empresa.public === true ? 
                        "Publicado"
                    : (
                        "Publicar"
                    )
                }
            </Button>
        </div>
    )
}