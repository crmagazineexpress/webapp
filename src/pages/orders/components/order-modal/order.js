export default {
	customer: null,
	payment_method: 'debit-card',
	shipping: null,
	date: new Date().toISOString().slice(0, 10),
	obs: '',
	products: [],
	installments: [],
}
