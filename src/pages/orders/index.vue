<template>
	<div>
		<q-btn label="Novo" @click="$refs.orderMd.open()" />

		<order-modal ref="orderMd" />

		<q-table
			class="no-shadow"
			:columns="columns"
			:data="list"
			:pagination="{ rowsPerPage: 50 }"
		>
			<template v-slot:body-cell-payment="props">
				<badgets-status
					:props="props"
					type="payment"
					:value="props.value"
				/>
			</template>
			<template v-slot:body-cell-status="props">
				<badgets-status
					:props="props"
					type="status"
					:value="props.value"
				/>
			</template>
			<template v-slot:body-cell-actions="props">
				<actions-table
					:props="props"
					:row="props.row"
					:openModal="$refs.orderMd.open"
				/>
			</template>
		</q-table>
	</div>
</template>

<script>
	import orderModal from './components/order-modal'
	import { money } from 'src/assets/helpers'
	import ActionsTable from './components/actions-table.vue'
	import BadgetsStatus from './components/badgets-status.vue'

	export default {
		name: 'Orders',
		components: {
			orderModal,
			ActionsTable,
			BadgetsStatus,
		},
		data() {
			return {
				assets: {
					customers: [],
				},
				columns: [
					{
						name: 'customer',
						field: (r) => r.customer.nome,
						label: 'Cliente',
						align: 'left',
					},
					{
						name: 'payment',
						field: (r) => r.payment_method,
						label: 'Pagamento',
						align: 'left',
					},
					{
						name: 'status',
						field: (r) => r.createOrderAt,
						label: 'Status',
						align: 'left',
					},
					{
						name: 'value',
						field: (r) =>
							r.products.reduce(
								(tot, { price, qnt }) => tot + price * qnt,
								0
							),
						label: 'Valor',
						format: money,
						align: 'left',
					},
					{
						name: 'actions',
						align: 'right',
					},
				],

				list: [],
			}
		},
		provide() {
			return {
				getAssets: () => this.assets,
				loadData: this.loadDataHandler,
			}
		},
		methods: {
			async loadAssets() {
				try {
					const customers = await this.$axios.get('/customers')
					this.assets.customers = customers.data
				} catch (error) {}
			},
			async loadDataHandler() {
				try {
					const { data } = await this.$axios.get('/order')
					this.list = data
				} catch (error) {}
			},
		},
		mounted() {
			this.loadAssets()
			this.loadDataHandler()
		},
	}
</script>

<style lang="scss" scoped></style>
