import { Box, Button, FormControl, Grid, InputLabel, makeStyles, MenuItem, Select, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import clienteAxios from '../../../../config/axios';

const useStyles = makeStyles((theme) => ({
    select: {
        minWidth: 135,
    },
}))

export default function Filtro_Categorias({setCategoria, categoria, recargar, setRecargar}) {
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
    // const onCategoria = (cate) => {
    //     setCategoria(cate);
    // }
    const render = categorias.map((categoria, index) => (
        <MenuItem
            key={index}
            aria-controls="customized-menu"
            style={{textTransform: 'none'}}
            aria-haspopup="true"
            variant="contained"
            color="primary"
            value={categoria.category}
            onClick={() =>
                {
                    setCategoria(categoria.category)
                    setRecargar(!recargar)
                }
            }
        >
            {categoria.category}
        </MenuItem>
    ))

    return (
        <div>
            <Grid>
                <Box p={1}>
                    <FormControl variant="outlined">
                        <InputLabel value="Categorias" >Categorias</InputLabel>
                        <Select
                            value={categoria}
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

