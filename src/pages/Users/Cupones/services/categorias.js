import { Box, Button, FormControl, Grid, InputLabel, makeStyles, MenuItem, Select, Typography } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react'
import clienteAxios from '../../../../config/axios';
import { MenuContext } from '../../../../context/menuContext';

const useStyles = makeStyles((theme) => ({
    select: {
        minWidth: 135,
    },
}))

export default function Filtro_Categorias({setCategoria, categoria, recargar, setRecargar}) {
    const classes = useStyles();
    const empresa = JSON.parse(localStorage.getItem('user'));
    const {  cargarProductos, setCargarProductos } = useContext(MenuContext);
    const [categorias , setCategorias] = useState([]);

    const consultaNuevaCategorias = async () => {
		await clienteAxios
			.get(`/categories/${empresa._id}`)
			.then((res) => {
				setCategorias(res.data);
                setCargarProductos(true);
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
            defaultValue={"Categorias"}
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
                            defaultValue={'Categoria'}
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

