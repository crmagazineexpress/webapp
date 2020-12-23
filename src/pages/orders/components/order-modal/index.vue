<template>
	<modal title="Pedido" v-model="openedModal" size="80%">
		<order-modal-header :order.sync="order" />
		<table-products :order.sync="order" class="q-mt-lg" />
	</modal>
</template>
<script>
	import Modal from 'src/components/modal'
	import orderModalHeader from './components/header'
	import TableProducts from './components/table-products'
	import order from './order'
	import { clone } from 'lodash'

	export default {
		components: { Modal, orderModalHeader, TableProducts },
		data() {
			return {
				openedModal: false,
				order: clone(order),
			}
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
