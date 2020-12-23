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
