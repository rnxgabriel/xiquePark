export function validateSign(placa: string) {
	// ABC1D23
	const mercosulPlateRegex = /^[A-Z]{3}[0-9][A-Z][0-9]{2}$/;
	// ABC-1234
	const oldPlateWithTraceRegex = /^[A-Z]{3}-[0-9]{4}$/;
	// ABC1234
	const oldPlateWithoutTraceRegex = /^[A-Z]{3}[0-9]{4}$/;

	const formattedPlate = placa.toUpperCase();

	// Verificar se corresponde a qualquer um dos padrões
	if (mercosulPlateRegex.test(formattedPlate)
		||
		oldPlateWithoutTraceRegex.test(formattedPlate)
		||
		oldPlateWithTraceRegex.test(formattedPlate)
	) {
		return true;
	} else {
		return false;
	}
}
