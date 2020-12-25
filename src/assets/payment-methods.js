export default [
	{
		id: 'money',
		name: 'Dinheiro',
		open_installment_modal: false,
	},
	{
		id: 'debit-card',
		name: 'Cartão de Débito',
		open_installment_modal: false,
	},
	{
		id: 'credit-card',
		name: 'Cartão de Credito',
		open_installment_modal: true,
		max_instalments: 10,
		rate: 0.2367,
	},
	{
		id: 'ticket',
		name: 'Carnê',
		open_installment_modal: true,
		max_instalments: 10,
		rate: 0.2367,
	},
]
