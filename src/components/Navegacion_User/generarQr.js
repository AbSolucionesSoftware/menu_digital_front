import React, { useState } from 'react'
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { Box, Button, Container, makeStyles, Typography } from '@material-ui/core';
import MessageSnackbar from '../Snackbar/snackbar';
import GetAppIcon from '@material-ui/icons/GetApp';

import Comody from '../../img/Comody.jpeg'

const useStyles = makeStyles((theme) => ({
	root: {
        
	},
    imagen: {
		maxHeight: '100%',
		maxWidth: '100%'
	},
	containerImage:{
		width: 140,
		height: 50
	}
}));

export default function GenerarQr(props) {
    const {empresa} = props;

    const [ snackbar, setSnackbar ] = useState({
		open: false,
		mensaje: '',
		status: ''
	});

    const printDocument = () => {
		const input = document.getElementById('divToPrint');
		html2canvas(input).then((canvas) => {
			const imgData = canvas.toDataURL('image/png');
			const pdf = new jsPDF('l', 'mm', 'a4');
			const imgProps = pdf.getImageProperties(imgData);
			const pdfWidth = pdf.internal.pageSize.getWidth();
			const pdfHeight = imgProps.height * pdfWidth / imgProps.width;
			pdf.addImage(imgData, 'JPEG', -2, 0, pdfWidth, pdfHeight);
			// pdf.output('dataurlnewwindow');
			pdf.save('codigo_QR_comody.pdf');
		});
	};

    return (
		<Box mt={1}>
			<MessageSnackbar
				open={snackbar.open}
				mensaje={snackbar.mensaje}
				status={snackbar.status}
				setSnackbar={setSnackbar}
			/>
			<Box display="flex" justifyContent="center" m={2}>
				<Button variant="outlined" color="primary" onClick={printDocument} startIcon={<GetAppIcon />}>
					Descargar
				</Button>
			</Box>
			<Container>
				<Codigo empresa={empresa} />
			</Container>
		</Box>
	);
}

const Codigo = ({ empresa }) => {
	const classes = useStyles();
	if (!empresa) {
		return null;
	}
	return (
            <div id="divToPrint" >
                <div className={classes.containerImage} p={2}>
                    <img className={classes.imagen} src={Comody} alt="imagen de comody"/>
                    </div>
                    <div >
                        <Typography>
                            Encuestra el menú de {empresa.nameCompany} mas rapido escaneando este codigo QR
                        </Typography>
                    </div>
                    <div>
                </div>
            </div>
    );
};
