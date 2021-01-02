export function money(v) {
	return parseFloat(v).toLocaleString('pt-BR', {
		style: 'currency',
		currency: 'BRL',
	})
}

export const FilterMoney = {
	filters: {
		money,
	},
}

export function DateBrl(v) {
	return new Date(v).toLocaleDateString()
}
