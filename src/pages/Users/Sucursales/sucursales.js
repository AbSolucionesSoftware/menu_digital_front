import { Box, Grid, Typography, Button } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Lista_sucursales from './lista_sucursales';
import Modal_nueva_sucursal from './modal_nueva_sucursal';


export default function Sucursales() {

    const company = JSON.parse(localStorage.getItem('user'));
    const [update, setUpdate] = useState(false)


    const render_sucursales = company.sucursales?.map((sucursal, index) => (
        <Lista_sucursales key={index} sucursal={sucursal} />
    ));
    
    useEffect(() => {
       
    }, [update,render_sucursales])

    return (
        <div>
           <Grid container>
               <Grid item lg={12}>
                    <Box display="flex" justifyContent="center" textAlign="center">
                        <Typography variant="h5">
                            Tus Sucursales
                        </Typography>
                    </Box>
               </Grid>
               <Modal_nueva_sucursal  update={update} setUpdate={setUpdate} tipo="Nueva" />
           </Grid>
           <Grid container>
            {render_sucursales}
           </Grid>
        </div>
    )
}
