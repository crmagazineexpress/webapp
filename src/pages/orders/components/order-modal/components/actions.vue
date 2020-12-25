<template>
	<div class="row q-col-gutter-sm cnt-actions">
		<div class="col"></div>

		<div class="col-3">
			<q-btn
				flat
				label="Salvar"
				color="primary"
				icon="done"
				class="full-width"
				:disable="!is_valid"
				@click="save"
			/>
		</div>
		<div class="col-4">
			<q-btn
				flat
				label="Gerar pedido"
				color="positive"
				icon="done_all"
				class="full-width"
				:disable="!is_valid"
				@click="makeOrder"
			/>
		</div>
	</div>
</template>

<script>
	import defaultOrder from '../order'
	import PaymentMethods from 'src/assets/payment-methods'
	export default {
		props: {
			order: {
				type: Object,
				default: () => defaultOrder,
			},
			openInstMd: {
				type: Function,
				default: () => {},
			},
		},
		computed: {
			is_valid() {
				const has_customer = !!this.order.customer
				const has_products = this.order.products.length > 0
				return has_customer && has_products
			},
		},
		methods: {
			saveHanddle() {
				console.log(this.order)
			},
			async makeOrder() {
				const { open_installment_modal } = PaymentMethods.find(
					({ id }) => id == this.order.payment_method
				)
				if (open_installment_modal) {
					await this.openInstMd()
				}
				await this.saveHanddle()
			},
			async save() {
				try {
					await this.saveHanddle()
				} catch (error) {}
			},
		},
	}
</script>

<style lang="scss" scoped>
	.cnt-actions {
		width: 550px;
	}
</style>
