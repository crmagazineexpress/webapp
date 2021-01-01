<template>
	<div>
		<q-table
			title="Produtos"
			:data="data"
			:columns="columns"
			row-key="name"
			class="my-sticky-column-table"
			hide-bottom
			:pagination="{ rowsPerPage: 1000 }"
			:visible-columns="visibleColumns"
		>
			<template v-if="!disabled" v-slot:top-right>
				<add-products-input
					@select="addProduct"
					:exclude="data.map(({ id }) => id)"
				/>
			</template>
			<template v-slot:body-cell-qnt="props">
				<q-td key="qnt" :props="props" style="width: 80px">
					<manage-qnt-input
						v-if="!disabled"
						v-model="props.row.qnt"
					/>
					<span v-else>{{ props.row.qnt }}</span>
				</q-td>
			</template>
			<template v-slot:body-cell-sub_total="props">
				<q-td key="sub_total" :props="props" style="width: 160px">
					{{ money(props.row.qnt * props.row.price) }}
				</q-td>
			</template>
			<template v-if="!disabled" v-slot:body-cell-trash="props">
				<q-td key="trash" :props="props">
					<q-btn
						flat
						icon="far fa-trash-alt"
						round
						color="negative"
						size="sm"
						@click="removeProduct(props.row.id)"
					/>
				</q-td>
			</template>
		</q-table>

		<div class="resumo row q-pt-sm">
			<div class="col text-right q-pa-sm">
				<b>Sub total</b>
			</div>
			<div class="col q-py-sm text-center" style="width: 150px">
				<b>{{ money(order_summary.total_products) }}</b>
			</div>
		</div>
		<div class="clear"></div>
		<template v-if="order_summary.shipping > 0">
			<div class="resumo row">
				<div class="col text-right q-pa-sm">
					<b>Frete</b>
				</div>
				<div class="col q-py-sm text-center" style="width: 150px">
					<b>{{ money(order_summary.shipping) }}</b>
				</div>
			</div>
			<div class="clear"></div>
		</template>
		<div class="resumo lined row">
			<div class="col text-right q-pa-sm">
				<b>Total</b>
			</div>
			<div class="col q-py-sm text-center" style="width: 150px">
				<b>{{ money(order_summary.total) }}</b>
			</div>
		</div>
		<div class="clear"></div>
	</div>
</template>

<script>
	import addProductsInput from './components/add-products-input'
	import ManageQntInput from './components/manage-qnt-input'
	import defaultOrder from '../../order'

	export default {
		components: {
			addProductsInput,
			ManageQntInput,
		},
		props: {
			order: {
				type: Object,
				default: () => defaultOrder,
			},
			order_summary: {
				type: Object,
				default: () => {},
			},
			disabled: {
				type: Boolean,
				default: false,
			},
		},
		data() {
			return {
				columns: [
					{
						name: 'name',
						required: true,
						label: 'Produto',
						align: 'left',
						field: (row) => row.name,
						format: (val) => `${val}`,
						sortable: true,
					},
					{
						name: 'unitary_value',
						align: 'center',
						label: 'Valor Unitário',
						field: 'price',
						format: (val) => this.money(val),
						sortable: true,
					},
					{
						name: 'qnt',
						label: 'Quantidade',
						align: 'center',
						field: 'qnt',
					},
					{
						name: 'sub_total',
						label: 'Sub. Total',
						align: 'center',
					},
					{
						name: 'trash',
						align: 'center',
					},
				],
				$wooApi: null,
			}
		},
		computed: {
			data: {
				get() {
					return this.order.products
				},
				set(products) {
					this.$emit('update:order', { ...this.order, products })
				},
			},
			visibleColumns() {
				const colums = this.columns.map(({ name }) => name)
				if (this.disabled) colums.splice(-1, 1)
				return colums
			},
		},
		methods: {
			money(v) {
				return parseFloat(v).toLocaleString('pt-BR', {
					style: 'currency',
					currency: 'BRL',
				})
			},
			addProduct(product) {
				this.data.push({
					qnt: 1,
					...product,
				})
			},
			removeProduct(pid) {
				const pIndex = this.data.findIndex(({ id }) => pid == id)
				this.data.splice(pIndex, 1)
			},
		},
	}
</script>

<style lang="scss">
	.lined {
		border-top: 1px solid #cecece;
	}
	.clear {
		clear: both;
	}
	.resumo {
		width: 350px;
		float: right;
	}
	.my-sticky-column-table {
		thead tr:first-child th:first-child {
			background-color: #fff;
		}
		td:nth-child(4) {
			background-color: #f5f5dc;
		}

		th:last-child,
		td:last-child {
			position: sticky;
			left: 0;
			z-index: 1;
		}
	}
</style>
