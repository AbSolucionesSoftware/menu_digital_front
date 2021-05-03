import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Divider, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import ModalRegistroCategorias from './modal_registro';
import ModalEditarCategorias from './modal_update';

const useStyles = makeStyles((theme) => ({
	summary: {
		'& .Mui-expanded': {
			margin: '0px 0px!important'
		}
	},
	flex_grow: {
        flexGrow: 1,
    }
}));

export default function ListaCategorias({ categoria, update, setUpdate, company }) {
	const classes = useStyles();

	return (
		<Accordion className={classes.summary}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />} className="summary-acordion">
				<Box
                    width="100%"
					display="flex"
					onClick={(event) => event.stopPropagation()}
					onFocus={(event) => event.stopPropagation()}
				>
					<Typography variant="h4">{categoria.category}</Typography>
                    <div className={classes.flex_grow} />
					<ModalEditarCategorias
						tipo="category"
						update={update}
						setUpdate={setUpdate}
						categoria={categoria}
					/>
				</Box>
			</AccordionSummary>
			<AccordionDetails>
				<Box width="100%">
					<ModalRegistroCategorias
						tipo="subcategory"
						categoria={categoria}
						update={update}
						setUpdate={setUpdate}
						company={company}
					/>
					<Box px={2} width="100%">
						{categoria.subCategories.length > 0 ? (
							categoria.subCategories.map((subcategory, index) => {
								return (
									<Fragment>
										<Box
											my={1}
											display="flex"
											key={index}
											width="100%"
											onClick={(event) => event.stopPropagation()}
											onFocus={(event) => event.stopPropagation()}
										>
											<Typography variant="h6">{subcategory.subCategory}</Typography>
                                            <div className={classes.flex_grow} />
											<ModalEditarCategorias
												tipo="subcategory"
												categoria={categoria}
												update={update}
												setUpdate={setUpdate}
												subCategory={subcategory}
											/>
										</Box>
										<Divider />
									</Fragment>
								);
							})
						) : null}
					</Box>
				</Box>
			</AccordionDetails>
		</Accordion>
	);
}
