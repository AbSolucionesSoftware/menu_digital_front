import React, { useEffect, useState } from 'react'

import { Box, Button, Card, ClickAwayListener, Container, Grid, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Menu, MenuItem, MenuList, Paper, Typography, withStyles } from '@material-ui/core'
import LastPageIcon from '@material-ui/icons/LastPage';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';

import useStyles from  './styles';
import clienteAxios from '../../../config/axios';
import { PlayCircleFilledWhiteRounded } from '@material-ui/icons';
import { withRouter } from 'react-router';

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
  })((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      {...props}
    />
  ));

  const StyledMenuItem = withStyles((theme) => ({
    root: {
      '&:focus': {
        backgroundColor: theme.palette.primary.main,
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
          color: theme.palette.common.white,
        },
      },
    },
  }))(MenuItem);

function Categorias(props) {
    const {empresa, slug} = props;
    const [categorias , setCategorias] = useState([]);
    
    // console.log(empresa._id);

    const consultarCates = async () => {
		await clienteAxios
			.get(`/product/categories/${empresa}`)
			.then((res) => {
				setCategorias(res.data);
			})
			.catch((err) => {
			})
	}

    useEffect(() => {
		consultarCates();
	}, [])

    
    // const buscarProductos = async () => {
    //     await clienteAxios
    //         .post(`/product/search/subCategory/`, {subCategory: 'Arrachera', company: empresa._id})
    //         .then((res) => {
    //             console.log(res);
    //             // setCategorias(res.data)
    //         })
    //         .catch((err) => {
    //             console.log(err.response);
    //             console.log("No jalo");
    //         })
    // }

    useEffect(() => {

        // buscarProductos()
        
    }, [])
    
    const render = categorias.map((categoria, index) => {
        return(
            <Lista key={index} slug={slug} empresa={empresa} categoria={categoria} props={props} />
        )
    })

    return (
        <div>
            <Container maxWidth="xl">
                <Grid container justify="center">
                    {render}
                </Grid>
			</Container>
        </div>
    )
}



function Lista({categoria, props, empresa, slug}) {
    const [ancho, setAncho] = useState(null);
    const classes = useStyles();

    const handleClick = (event) => {
        setAncho(event.currentTarget);
    };
    
    const handleClose = () => {
        setAncho(null);
    };

    const tienda =
        {'tienda': empresa._id, "slug": empresa.slug }

    return(
        <Grid className={classes.paper} lg={3} md={6} xs={12}>
            <Button
                className={classes.root}
                aria-controls="customized-menu"
                aria-haspopup="true"
                variant="contained"
                color="primary"
                onClick={(e) => {
                    handleClick(e)
                }}
            >
                <Box p={2}>
                    <RestaurantMenuIcon className={classes.large}/>
                </Box>
                <Typography variant="h6">
                    {categoria.categoria}
                </Typography>
            </Button>

            <StyledMenu
                id={categoria.categoria}
                anchorEl={ancho}
                keepMounted
                open={Boolean(ancho)}
                onClose={handleClose}
            >
                {
                    categoria.subCategoria.map((sub) => {
                        return(
                            <StyledMenuItem id={sub._id}>
                                <ListItem button  
                                    onClick={() => {
                                            localStorage.setItem("tienda" , JSON.stringify(tienda))
                                            props.history.push(`/${empresa}/${slug}/subCategorias/${sub._id}`)
                                        }}  
                                >
                                    <ListItemText className={classes.subCate} >
                                        <Typography variant="h6">
                                            {sub._id}
                                        </Typography>
                                    </ListItemText>
                                </ListItem>
                            </StyledMenuItem>
                        )
                    })
                }
            </StyledMenu>
        </Grid>
    )
}

export default withRouter(Categorias);


