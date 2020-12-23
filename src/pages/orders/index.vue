<template>
	<div>
		<q-btn label="Novo" @click="$refs.orderMd.open()" />
		<order-modal ref="orderMd" />
	</div>
</template>

<script>
	import orderModal from './components/order-modal'
	export default {
		name: 'Orders',
		components: { orderModal },
		data() {
			return {
				assets: {
					customers: [],
				},
			}
		},
		provide() {
			return {
				getAssets: () => this.assets,
			}
		},
		methods: {
			async loadAssets() {
				try {
					const customers = await this.$axios.get('/customers')
					this.assets.customers = customers.data
				} catch (error) {}
			},
		},
		mounted() {
			this.loadAssets()
		},
	}
</script>

<style lang="scss" scoped></style>
