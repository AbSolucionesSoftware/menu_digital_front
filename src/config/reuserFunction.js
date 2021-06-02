export const formatoMexico = (number) => {
	if (!number) {
		return null;
	} else {
		let nueva;
		if (number % 1 === 0) {
			nueva = number;
		} else {
			nueva = parseFloat(number).toFixed(2);
		}
		const exp = /(\d)(?=(\d{3})+(?!\d))/g;
		const rep = '$1,';
		return  nueva.toString().replace(exp, rep);
	}
};

export const formatoFecha = (fecha) => {
	if (!fecha) {
		return null;
	} else {
		var newdate = new Date(fecha);
		return newdate.toLocaleDateString('es-MX', { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' });
	}
};