import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { MenuContext } from '../../../../context/menuContext';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import { Avatar, Chip } from '@material-ui/core';

const headCells = [
	{ id: '_id', label: 'Nombre' },
	{ id: 'imagen', label: 'Imagen' },
];

function EnhancedTableHead(props) {
	const { onSelectAllClick, numSelected, rowCount } = props;

	return (
		<TableHead>
			<TableRow>
				<TableCell padding="checkbox">
					<Checkbox
						indeterminate={numSelected > 0 && numSelected < rowCount}
						checked={rowCount > 0 && numSelected === rowCount}
						onChange={onSelectAllClick}
						inputProps={{ 'aria-label': 'select all desserts' }}
					/>
				</TableCell>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						align={headCell.numeric ? 'right' : 'left'}
						padding={headCell.disablePadding ? 'none' : 'default'}
					>
						{headCell.label}
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

EnhancedTableHead.propTypes = {
	classes: PropTypes.object.isRequired,
	numSelected: PropTypes.number.isRequired,
	// onRequestSort: PropTypes.func.isRequired,
	onSelectAllClick: PropTypes.func.isRequired,
	// order: PropTypes.oneOf([ 'asc', 'desc' ]).isRequired,
	// orderBy: PropTypes.string.isRequired,
	rowCount: PropTypes.number.isRequired
};

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%'
	},
	paper: {
		width: '100%',
		marginBottom: theme.spacing(2)
	},
	table: {
		minWidth: 300,
        height: 400
	},
	visuallyHidden: {
		border: 0,
		clip: 'rect(0 0 0 0)',
		height: 1,
		margin: -1,
		overflow: 'hidden',
		padding: 0,
		position: 'absolute',
		top: 20,
		width: 1
	}
}));

export default function TablaProductosDescuentos({productosCate, setProductosCate, setSelected, selected, control, setControl, setProductoGuardados, productoGuardados, cupon }) {
	const classes = useStyles();

	const [ page, setPage ] = useState(0);
	const [ rowsPerPage, setRowsPerPage ] = useState(5);

	const handleSelectAllClick = (event) => {
		if (event.target.checked) {
			const newSelecteds = productosCate.map((n) => n._id);
			setSelected(newSelecteds);

			const productos_id = [];
			newSelecteds.forEach((_id) => {
				productos_id.push({ _id: _id});
			});
			setProductoGuardados({ ...productoGuardados, productos: productos_id });
			
			return;
		}
		// setSelected([]);
	};

	const handleClick = (event, _id) => {
		const selectedIndex = selected.indexOf(_id);
		let newSelected = [];
		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, _id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
		}

		const productos_id = [];
        newSelected.forEach((_id) => {
            productos_id.push({ _id: _id});
        });
        setProductoGuardados({ ...productoGuardados, productos: productos_id });
		
		setSelected(newSelected);
	};

	const checkUpdated = () => {
		const bd_selected = [];
		const bd_select = [];
		cupon?.productosId.forEach((bd_productosGuardado) => {
			bd_select.push({_id: bd_productosGuardado._id});
			bd_selected.push(bd_productosGuardado._id);
		});
		setProductoGuardados({ ...productoGuardados, productos: bd_select });
		setSelected(bd_selected);
	};

	
	useEffect(
		() => {
			if (control === true) {
				checkUpdated();
			}
		},
		[ control ]
	);

	const isSelected = (_id) => selected.indexOf(_id) !== -1;

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};
	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};
	const emptyRows = rowsPerPage - Math.min(rowsPerPage, productosCate.length - page * rowsPerPage);

	return (
		<div className={classes.root}>
			<Paper className={classes.paper}>
				<TableContainer>
					<Table
						className={classes.table}
						aria-labelledby="tableTitle"
						size="medium"
						aria-label="enhanced table"
					>
						<EnhancedTableHead
							classes={classes}
							numSelected={selected.length}
							onSelectAllClick={handleSelectAllClick}
							rowCount={productosCate.length}
						/>
						<TableBody>
							{productosCate.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((producto, index) => {
								const isItemSelected = isSelected(producto._id);
								const labelId = `enhanced-table-checkbox-${index}`;
									return (
										<TableRow
											hover
											role="checkbox"
											aria-checked={isItemSelected}
											tabIndex={-1}
											key={producto._id}
											selected={isItemSelected}
										>
											<TableCell padding="checkbox">
												<Checkbox
													checked={isItemSelected}
													inputProps={{ 'aria-labelledby': labelId }}
													onClick={(event) => handleClick(event, producto._id)}
												/>
											</TableCell>
											<TableCell component="th" id={labelId} scope="row" padding="none">
												{producto.name}
											</TableCell>
											<TableCell align="right">
												<Avatar alt="Remy Sharp" src={producto.imagenProductUrl} />
											</TableCell>
											{/* <TableCell align="right">
												{producto.couponName ? (<Chip label="Promo Activa" style={{color: 'green'}} variant="outlined" />) : (
													null
												)}
											</TableCell> */}
										</TableRow>
									);
							})}
							{emptyRows > 0 && (
								<TableRow style={{ height: 53 * emptyRows }}>
									<TableCell colSpan={6} />
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
                    rowsPerPageOptions={[]}
					component="div"
					count={productosCate.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onChangePage={handleChangePage}
					onChangeRowsPerPage={handleChangeRowsPerPage}
				/>
			</Paper>
		</div>
	);
}
