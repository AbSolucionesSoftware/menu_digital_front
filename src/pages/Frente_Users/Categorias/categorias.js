import React, { useContext, useEffect, useState } from 'react'
import { Box, Button, Container, Grid, Hidden, Menu, MenuItem, Typography, withStyles } from '@material-ui/core'
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import useStyles from  './styles';
import clienteAxios from '../../../config/axios';
import { withRouter } from 'react-router';
import { verificarDiasLaborales } from '../../../config/reuserFunction';
import { MenuContext } from '../../../context/menuContext';
import MuiAlert from '@material-ui/lab/Alert';

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
    const { empresa } = useContext(MenuContext);
    const [diaLaboral, setDiaLaboral] = useState();
    const idEmpresa = localStorage.getItem('idEmpresa');
    const [categorias , setCategorias] = useState([]);

    const consultaNuevaCategorias = async () => {
		await clienteAxios
			.get(`/categories/${idEmpresa}`)
			.then((res) => {
				setCategorias(res.data);
			})
			.catch((err) => {
			})
	}

    useEffect(() => {
		// consultarCates();
        consultaNuevaCategorias();
        setDiaLaboral(verificarDiasLaborales(empresa));
	}, [empresa])

    function Alert(props) {

        return <MuiAlert elevation={6} variant="filled" {...props} />;
    
    }
    const render = categorias.map((categoria, index) => {
        return(
            <Lista key={index} slug={empresa.slug} diaLaboral={diaLaboral} empresa={empresa} categoria={categoria} props={props} />
        )
    })

    return (
        <div>
            <Container maxWidth="xl">
                <Grid container justify="center">
                    {
                        diaLaboral === true ? (
                            <Hidden mdUp>
                                <Box p={1}>
                                    <Alert severity="warning">Lo sentimos el dia de hoy no Laboramos</Alert>
                                </Box>
                            </Hidden>
                        ) : null
                    }
                    {render}
                </Grid>
			</Container>
        </div>
    )
}

function Lista({categoria, empresa, props, diaLaboral, slug}) {
    
    const classes = useStyles();

    //SE SUSTITUYO Y COMENTO LA RUTA DE CATEGORIAS PARA PODER TOMAR LA NUEVA CREADA CON TODO EL AGRUPAMIENTO DE PRODUCTOS
    return(
        <Grid key={categoria._id} className={classes.paper} item lg={3} md={6} xs={12}>
            {
                diaLaboral === true ? (
                    <>
                    
                        <Button
                            className={classes.root}
                            aria-controls="customized-menu"
                            style={{textTransform: 'none'}}
                            aria-haspopup="true"
                            variant="contained"
                            color="primary"
                            disabled={true}
                        >
                            <Box>
                                <RestaurantMenuIcon className={classes.large}/>
                            </Box>
                            <Box>
                                <Typography variant="h5">
                                    {categoria.category}
                                </Typography>
                            </Box>
                        </Button>
                    </>
                ) : (
                    <Button
                        className={classes.root}
                        aria-controls="customized-menu"
                        style={{textTransform: 'none'}}
                        aria-haspopup="true"
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            props.history.push(`/${slug}/${empresa._id}/categorias/${categoria.category}`)
                        }}  
                    >
                        <Box>
                            <RestaurantMenuIcon className={classes.large}/>
                        </Box>
                        <Box>
                            <Typography variant="h5">
                                {categoria.category}
                            </Typography>
                        </Box>
                    </Button>
                )
            }

            {/* <StyledMenu
                id={categoria.category}
                anchorEl={ancho}
                open={Boolean(ancho)}
                onClose={handleClose}
            >
                {
                    categoria.subCategories.map((sub, index) => {
                        return(
                            <StyledMenuItem key={index} id={sub._id}>
                                <ListItem button  
                                    onClick={() => {
                                            props.history.push(`/${slug}/${empresa}/subCategorias/${sub.subCategory}`)
                                        }}  
                                >
                                    <ListItemText className={classes.subCate} >
                                        <Typography variant="h6">
                                            {sub.subCategory}
                                        </Typography>
                                    </ListItemText>
                                </ListItem>
                            </StyledMenuItem>
                        )
                    })
                }
            </StyledMenu> */}
        </Grid>
    )
}

export default withRouter(Categorias);


