<template>
	<div class="row q-col-gutter-md">
		<div class="col-8">
			<filter-promissory-note
				:customer.sync="filter.customer"
				:status.sync="filter.status"
			/>
			<grid-orders :list="filteredOrders" v-model="selected" />
		</div>
		<div class="col">
			<grid-installments
				v-if="!!selected"
				:data="selectedOrder.installments_options"
			/>
		</div>
	</div>
</template>

<script>
	import { kebabCase } from 'lodash'
	import gridOrders from './components/grid-orders'
	import GridInstallments from './components/grid-installments.vue'
	import FilterPromissoryNote from './components/filter-promissory-note.vue'

	export default {
		name: 'PromissoryNote',
		components: {
			gridOrders,
			GridInstallments,
			FilterPromissoryNote,
		},
		data() {
			return {
				list: [],
				selected: null,
				filter: {
					customer: '',
					status: null,
				},
			}
		},
		provide() {
			return {
				getSelectedOrder: () => this.selectedOrder,
				loadData: this.loadDataHandler,
			}
		},
		methods: {
			async loadDataHandler() {
				try {
					const { data } = await this.$api.get(
						'/order/promissory-note'
					)
					this.list = data
				} catch (error) {}
			},
		},
		computed: {
			selectedOrder() {
				if (!this.selected) return null
				return this.list.find(({ _id }) => _id == this.selected)
			},
			filteredOrders() {
				const sanitizedName = kebabCase(this.filter.customer)
				return this.list.filter(
					({
						customer: { nome },
						installments_options: { status },
					}) => {
						const filterByName =
							kebabCase(nome).indexOf(sanitizedName) != -1
						const filterByStatus =
							this.filter.status === null ||
							(this.filter.status === 0 && status == 'late') ||
							(this.filter.status === 1 && status == 'settled') ||
							(this.filter.status === 2 && status == 'ok')

						return filterByName && filterByStatus
					}
				)
			},
		},
		mounted() {
			this.loadDataHandler()
		},
	}
</script>
