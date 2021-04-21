<template>
	<q-checkbox
		:disable="loading"
		:value="item.paid"
		@input="updateStatus"
		color="teal"
		dense
	/>
</template>

<script>
	export default {
		props: {
			item: Object,
		},
		inject: ['getSelectedOrder', 'loadData'],
		data() {
			return {
				loading: false,
			}
		},
		methods: {
			async updateStatus(paidStatus) {
				try {
					this.loading = true
					const order = this.getSelectedOrder()
					const indexInstallmernt = order.installments_options.installments.findIndex(
						({ installment }) =>
							this.item.installment == installment
					)
					order.installments_options.installments[
						indexInstallmernt
					].paid = paidStatus

					// console.log(order)
					await this.$api.post('/order', order)
					await this.loadData()
					this.loading = false
				} catch (error) {}
			},
		},
	}
</script>

<style lang="scss" scoped></style>
