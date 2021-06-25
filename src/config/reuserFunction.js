
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

export const fechaActual = () => {
	var fecha = new Date();
    const añoActual = fecha.getFullYear();
    const hoy = fecha.getDate();
    const mesActual = fecha.getMonth() + 1;

    const fechaActual = añoActual + "-" + mesActual + "-" +  hoy;
	return fechaActual;
}

export const fechaCaducidad = (fecha) => {
	if (!fecha) {
		return null;
	} else {
		var newdate = new Date(fecha);
		const añoActual = newdate.getFullYear();
		const mesActual = newdate.getMonth() + 1;
		const hoy = newdate.getDate();
		const fechaCaducidad = añoActual + "-" + mesActual + "-" +  hoy;
		return fechaCaducidad;
	}
};


export const formatoFecha = (fecha) => {
	if (!fecha) {
		return null;
	} else {
		var newdate = new Date(fecha);
		return newdate.toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' });
	}
};

export const formatoFechaDiagonales = (fecha) => {
	if (!fecha) {
		return null;
	} else {
		var newdate = new Date(fecha.replace('-', '/'));
		return newdate.toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' });
	}
};


export const verificarDiasLaborales = (datosContx) => {
	const numero_dia = new Date().getDay();

	if (datosContx?.horariosActive) {
		if(datosContx !== undefined){
			const dia_no_laboral = datosContx.horario?.filter(hora => hora.close === false && hora.key === (numero_dia -1));

			if(dia_no_laboral){
				if (dia_no_laboral.length > 0) {
					return true;
				}
			}else{
				return false;
			}

		}else{
			return false;
		}
	}else{
		return false;
	}

}

