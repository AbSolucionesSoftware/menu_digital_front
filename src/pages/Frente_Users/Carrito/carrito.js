import { Box, Card, CardContent, Grid, Typography, Button } from '@material-ui/core'
import React from 'react'

export default function Carrito() {
    return (
        <div>
                <Grid lg={12}>
                    <Box textAlign="center">
                        <Typography variant="h4">
                            Tu pedido:
                        </Typography>
                    </Box>
                </Grid>
                <Grid lg={8}>
                    {/* <Box display="flex" justifyContent="center"> */}
                        <Card>
                            <Box>
                                <Typography>
                                    Datos domiciliarios
                                </Typography>
                            </Box>
                            <Box>
                                <Typography>
                                    Tu pedido
                                </Typography>
                            </Box>
                            <Box>
                                <Button>
                                    Realizar Pedido
                                </Button>
                            </Box>
                        </Card>
                    {/* </Box> */}
                </Grid>
        </div>
    )
}
