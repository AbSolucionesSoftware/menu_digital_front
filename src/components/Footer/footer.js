import { Box, Grid } from '@material-ui/core'
import React from 'react'

export default function Footer() {
    return (
        <div>
            <Grid container>
                <Grid lg={12}>
                    <Box textAlign="center" mt={5}>
                        Todos los derechos reservados de AB Soluciones Empresariales
                    </Box>
                </Grid>
            </Grid>
        </div>
    )
}
;