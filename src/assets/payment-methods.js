export default [
	{
		id: 'debit-card',
		name: 'Cartão de Débito',
		open_installment_modal: false,
		rate: 0,
	},
	{
		id: 'credit-card',
		name: 'Cartão de Credito',
		open_installment_modal: true,
		rate: 0.25,
		max_instalments: 6,
	},
	{
		id: 'money',
		name: 'Dinheiro',
		open_installment_modal: false,
		rate: 0,
	},
	{
		id: 'ticket',
		name: 'Carnê',
		open_installment_modal: true,
		rate: 0.5,
		max_instalments: 24,
	},
]
