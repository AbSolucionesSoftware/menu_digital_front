import { Button } from '@material-ui/core'
import React, { useState } from 'react'
import Spin from '../../../../components/Spin/spin';
import clienteAxios from '../../../../config/axios';



export default function Publicar(props) {
    const { empresa } = props;
	const [ loading, setLoading ] = useState(false);


    return (
        <div>
            <Spin loading={loading} />
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