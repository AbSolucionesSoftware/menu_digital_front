import React from 'react';
import { Box, Container, Grid, Hidden } from '@material-ui/core';

import Primera from './Secciones/primera';
import Tercera from './Secciones/tercera';


import { Parallax } from 'rc-scroll-anim';

// const useStyles = makeStyles((theme) => ({

// }));

export default function FrenteScroll() {
	// const classes = useStyles();

	return (
		<div>
			<Container>
			<Hidden mdDown>
				<Grid item xs={12}>
					<Box
						height="auto"
						textAlign="center"
						display="flex"
						justifyContent="center"
						alignItems="center"
					>
						<Parallax
							animation={{ x: 0, opacity: 1, playScale: [ 0.0, 0.8 ] }}
							style={{ transform: 'translateX(100px)', opacity: 0 }}
						>
							<Box my={5}>
								<Primera/>
							</Box>
						</Parallax>
					</Box>
					<Box
						height='auto'
						textAlign="center"
						display="flex"
						justifyContent="center"
						alignItems="center"
					>
							<Parallax
								animation={{ x: 0, opacity: 1, playScale: [ 0.0, 0.8 ] }}
								style={{ transform: 'translateX(-100px)', opacity: 0 }}
							>
								<Box my={5}>
									<Tercera />
								</Box>
							</Parallax>
					</Box>

					{/* <Box
						height="auto"
						textAlign="center"
						display="flex"
						justifyContent="center"
						alignItems="center"
					>
							<Parallax
								animation={{ x: 0, opacity: 1, playScale: [ 0.0, 0.8 ] }}
								style={{ transform: 'translateX(100px)', opacity: 0 }}
							>
								<Box my={5}>
									<Segunda/>
								</Box>
							</Parallax>
					</Box> */}

					{/* <Box
						height="auto"
						textAlign="center"
						display="flex"
						justifyContent="center"
						alignItems="center"
					>
							<Parallax
								animation={{ x: 0, opacity: 1, playScale: [ 0.0, 0.8 ] }}
								style={{ transform: 'translateX(-100px)', opacity: 0 }}
							>
								<Box my={5}>
									<Cuarta/>
								</Box>
							</Parallax>
					</Box> */}
				</Grid>
			</Hidden>
			<Hidden lgUp>
				<Box
					height="auto"
					// textAlign="center"
				>
					<Box my={5}>
						<Primera/>
					</Box>
				</Box>
				<Box
					height="auto"
					textAlign="center"
				>
					<Box my={5}>
						<Tercera />
					</Box>
				</Box>
				{/* <Box
					height="auto"
					textAlign="center"
				>
					<Box my={5}>
						<Segunda/>
					</Box>
				</Box>
				<Box
					height="auto"
					textAlign="center"
				>
					<Box my={5}>
						<Cuarta/>
					</Box>
				</Box> */}
			</Hidden>
			</Container>
		</div>
	);
}