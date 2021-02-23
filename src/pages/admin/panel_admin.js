import { Box, Button, Drawer, Grid, makeStyles, SwipeableDrawer, Typography } from '@material-ui/core'
import React, { useState } from 'react'

import Registro_Menu from './Registro_Menus/registro_menu'
import Cards_Restaurate from './Card_Restaurante/card_restaurante'

const useStyles = makeStyles((theme) => ({
    
}))

export default function Panel_Admin() {
    
	const classes = useStyles();

    const [ open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

    
    return (
        <div>
            <Grid lg={12}>
                <Box textAlign="center" mt={3}>
                    <Typography variant="h4">
                        Panel de Administrador
                    </Typography>
                </Box>
            </Grid>
            <Grid lg={12}>
                <Box mt={5} display="flex" justifyContent="center">
                    <Cards_Restaurate/>
                </Box>
            </Grid>
        </div>
    )
}
