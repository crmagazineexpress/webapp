<template>
	<modal title="Pedido" v-model="openedModal" size="80%">
		<order-modal-header :order.sync="order" />
		<table-products
			class="q-mt-lg"
			:order.sync="order"
			:order_summary="order_summary"
		/>
		<installment-modal
			ref="installmentMd"
			:order.sync="order"
			:order_summary="order_summary"
		/>
		<!-- <pre>{{ order }}</pre> -->
		<template v-slot:actions>
			<actions
				:openInstMd="(ev) => $refs.installmentMd.open(ev)"
				:order.sync="order"
				@close="openedModal = false"
			/>
		</template>
	</modal>
</template>
<script>
	import Modal from 'src/components/modal'
	import orderModalHeader from './components/header'
	import TableProducts from './components/table-products'
	import order from './order'
	import { clone } from 'lodash'
	import InstallmentModal from './components/installment-modal'
	import Actions from './components/actions'

	export default {
		components: {
			Modal,
			orderModalHeader,
			TableProducts,
			InstallmentModal,
			Actions,
		},
		data() {
			return {
				openedModal: false,
				order: clone(order),
			}
		},
		computed: {
			order_summary() {
				const total_products = parseFloat(
					this.order.products.reduce(
						(sbTot, { price, qnt }) => sbTot + price * qnt,
						0
					)
				)

				const shipping = !this.order.shipping
					? 0
					: parseFloat(this.order.shipping)

				return {
					total_products,
					shipping,
					total: total_products + shipping,
				}
			},
		},
		methods: {
			open(data = null) {
				if (!data) this.order = clone(order)
				else this.order = clone(data)
				this.openedModal = true
			},
			filterFn(val, update) {
				if (val === '') {
					update(() => {
						this.customersOptions = this.getAssets().customers
					})
					return
				}
				update(() => {
					const needle = val.toLowerCase()
					this.customersOptions = this.getAssets().customers.filter(
						(v) => v.nome.toLowerCase().indexOf(needle) > -1
					)
				})
			},
		},
	}
</script>

<style lang="scss" scoped></style>
