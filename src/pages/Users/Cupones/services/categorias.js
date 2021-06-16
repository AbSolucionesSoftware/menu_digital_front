import { Box, Button, FormControl, Grid, InputLabel, makeStyles, MenuItem, Select, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import clienteAxios from '../../../../config/axios';

const useStyles = makeStyles((theme) => ({
    select: {
        minWidth: 135,
    },
}))

export default function Filtro_Categorias({setCategoria}) {
    const classes = useStyles();
    const empresa = JSON.parse(localStorage.getItem('user'));

    const [categorias , setCategorias] = useState([]);

    const consultaNuevaCategorias = async () => {
		await clienteAxios
			.get(`/categories/${empresa._id}`)
			.then((res) => {
				setCategorias(res.data);
			})
			.catch((err) => {
			})
	}

    useEffect(() => {
        consultaNuevaCategorias();
	}, [])

    const render = categorias.map((categoria, index) => (
        <Lista categoria={categoria} setCategoria={setCategoria}/>
    ))

    return (
        <div>
            <Grid>
                <Box p={1}>
                    <FormControl variant="outlined">
                        <InputLabel >Categorias</InputLabel>
                        <Select
                            // value=""
                            className={classes.select}
                            label="Categorias"
                        >
                            {render}   
                        </Select>
                    </FormControl>
                </Box>
            </Grid>
           
        </div>
    )
}

function Lista({categoria, setCategoria}) {
    

    const onCategoria = (cate) => {
        setCategoria(cate);
    }

    return(
        <MenuItem
            aria-controls="customized-menu"
            style={{textTransform: 'none'}}
            aria-haspopup="true"
            variant="contained"
            color="primary"
            value={categoria.category}
            // onChange={(e) => console.log(e.target.value)}
            // setCategoria(categoria.category)
            // onClick={() => {
            //     props.history.push(`/${slug}/${empresa._id}/categorias/${categoria.category}`)
            // }}  
            onClick={() =>
                onCategoria(categoria.category)
            }
        >
            {categoria.category}
        </MenuItem>
    )
}
