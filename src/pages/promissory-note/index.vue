<template>
	<div class="row q-col-gutter-md">
		<div class="col-8">
			<div class="cnt-legend q-pb-lg">
				<q-badge color="warning" label="Atrasado" />
				<q-badge color="positive" label="Concluido" />
				<q-badge color="info" label="Em dia" />
			</div>

			<!-- <q-card class="q-mb-lg">
				</q-card-section>
			</q-card> -->
			<div class="row q-col-gutter-md q-mb-lg">
				<div class="col-8">
					<q-input filled label="Cliente" />
				</div>
				<div class="col">
					<q-select filled label="Status" />
				</div>
			</div>
			<grid-orders :list="list" v-model="selected" />
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
	import gridOrders from './components/grid-orders'
	import GridInstallments from './components/grid-installments.vue'
	export default {
		name: 'PromissoryNote',
		components: {
			gridOrders,
			GridInstallments,
		},
		data() {
			return {
				list: [],
				selected: null,
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
					const { data } = await this.$axios.get(
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
		},
		mounted() {
			this.loadDataHandler()
		},
	}
</script>

<style lang="scss" scoped>
	.cnt-legend {
		display: flex;
		gap: 8px;
	}
</style>
