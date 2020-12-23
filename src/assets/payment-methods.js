export default [
	{
		id: 'debit-card',
		name: 'Cartão de Débito',
		type: 1,
		rate: 0,
	},
	{
		id: 'credit-card',
		name: 'Cartão de Credito',
		type: 2,
		rate: 0.25,
		max_instalments: 6,
	},
	{
		id: 'money',
		name: 'Dinheiro',
		type: 1,
		rate: 0,
	},
	{
		id: 'ticket',
		name: 'Carnê',
		type: 1,
		rate: 0.5,
		max_instalments: 24,
	},
]
