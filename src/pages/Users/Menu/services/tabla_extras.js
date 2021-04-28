import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';

const headCells = [ { id: 'name', label: 'nombre' }, { id: 'price', label: 'precio' } ];

function EnhancedTableHead(props) {
	const { onSelectAllClick, numSelected, rowCount, openExtra } = props;

	return (
		<TableHead>
			<TableRow>
				<TableCell padding="checkbox">
					<Checkbox
						indeterminate={numSelected > 0 && numSelected < rowCount}
						checked={rowCount > 0 && numSelected === rowCount}
						onChange={onSelectAllClick}
						inputProps={{ 'aria-label': 'select all desserts' }}
						disabled={!openExtra}
					/>
				</TableCell>
				{headCells.map((headCell) => <TableCell key={headCell.id}>{headCell.label}</TableCell>)}
			</TableRow>
		</TableHead>
	);
}

EnhancedTableHead.propTypes = {
	numSelected: PropTypes.number.isRequired,
	onSelectAllClick: PropTypes.func.isRequired,
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
		maxWidth: '100%'
	}
}));

export default function EnhancedTable({ openExtra, types, extras, setExtras, control, producto, select, setSelect, selected, setSelected }) {
	const classes = useStyles();
	/* const [ selected, setSelected ] = useState([]);
	const [ select, setSelect ] = useState([]); */

	const handleSelectAllClick = (event) => {
		if (event.target.checked) {
			const newSelecteds = types.map((n) => n.name);

			/* agregar classification al array */
			const classification_types = [];
			types.forEach((row) => {
				classification_types.push({ name: row.name, price: row.price, _idType: row._id });
			});
			setExtras({ ...extras, types: classification_types });
			/* fin de agregar classification al array  */

			setSelected(newSelecteds);
			return;
		}
		setExtras({ ...extras, types: [] });
		setSelected([]);
	};

	const handleClick = (event, row) => {
		const selectedIndex = selected.indexOf(row.name);
		let newSelected = [];
		let newSelectedToBD = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, row.name);
			newSelectedToBD = newSelectedToBD.concat(select, { name: row.name, price: row.price, _idType: row._id });
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
			newSelectedToBD = newSelectedToBD.concat(select.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
			newSelectedToBD = newSelectedToBD.concat(select.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
			newSelectedToBD = newSelectedToBD.concat(select.slice(0, selectedIndex), select.slice(selectedIndex + 1));
		}

		/* agregar classification al array */
		setSelect(newSelectedToBD);
		setExtras({ ...extras, types: newSelectedToBD });
		/* fin de agregar classification al array  */

		setSelected(newSelected);
	};

	const checkUpdated = () => {
		const bd_selected = [];
		const bd_select = [];
		producto.classifications.forEach((bd_classification) => {
			bd_classification.types.map((bd_types) => {
				types.forEach((type) => {
					if (type._id === bd_types._idType) {
						bd_selected.push(bd_types.name);
						bd_select.push({ name: bd_types.name, price: bd_types.price, _idType: bd_types._id });
					}
				});
			});
		});
		setSelected(bd_selected);
		setSelect(bd_select);
	};

	useEffect(
		() => {
			if (control) {
				checkUpdated();
			}
		},
		[ control ]
	);

	const isSelected = (name) => selected.indexOf(name) !== -1;

	return (
		<div className={classes.root}>
			<Paper className={classes.paper}>
				<TableContainer>
					<Table
						className={classes.table}
						aria-labelledby="tableTitle"
						size="small"
						aria-label="enhanced table"
					>
						<EnhancedTableHead
							classes={classes}
							numSelected={selected.length}
							onSelectAllClick={handleSelectAllClick}
							rowCount={types.length}
							openExtra={openExtra}
						/>
						<TableBody>
							{types.map((row, index) => {
								const isItemSelected = isSelected(row.name);
								const labelId = `enhanced-table-checkbox-${index}`;

								return (
									<TableRow
										hover={openExtra}
										role="checkbox"
										aria-checked={isItemSelected}
										tabIndex={-1}
										key={row._id}
										selected={isItemSelected}
									>
										<TableCell padding="checkbox">
											<Checkbox
												disabled={!openExtra}
												checked={isItemSelected}
												inputProps={{ 'aria-labelledby': labelId }}
												onClick={(event) => handleClick(event, row)}
											/>
										</TableCell>
										<TableCell component="th" id={labelId} scope="row" padding="none">
											{row.name}
										</TableCell>
										<TableCell>{row.price}</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>
		</div>
	);
}
