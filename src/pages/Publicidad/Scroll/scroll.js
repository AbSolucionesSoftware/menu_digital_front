import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import { Box, Container, Grid, Hidden } from '@material-ui/core';

import Primera from './Secciones/primera';
import Segunda from './Secciones/segunda';
import Tercera from './Secciones/tercera';
import Cuarta from './Secciones/cuarta'
// import Imagen from '../../../images/imagenCorporativa.png';
// import ExtensionIcon from '@material-ui/icons/Extension';
// import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
// import UpdateIcon from '@material-ui/icons/Update';
// import Scroll from '../../components/ScrolltoTop/scroll';

import { Parallax } from 'rc-scroll-anim';

// const useStyles = makeStyles((theme) => ({
// 	color1: {
// 		backgroundColor: '#d1c4e9'
// 	},
// 	color2: {
// 		backgroundColor: '#c5cae9'
// 	},
// 	color3: {
// 		backgroundColor: '#bbdefb'
// 	},
// 	fondo: {
// 		zIndex: 0,
// 		backgroundColor: theme.palette.background.paper,
// 		height: '2000px',
// 		width: '100vw',
// 		position: 'absolute'
// 	},
// 	// fondo2: {
// 	// 	backgroundColor: theme.palette.background.paper
// 	// }
// }));

export default function FrenteScroll() {
	// const classes = useStyles();

	return (
		<div>
			<Container>
			<Hidden mdDown>
				<Grid  xs={12}>
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
									<Segunda/>
								</Box>
							</Parallax>
					</Box>

					<Box
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
					</Box>
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
				<Box
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
				</Box>
			</Hidden>
			</Container>
		</div>
	);
}