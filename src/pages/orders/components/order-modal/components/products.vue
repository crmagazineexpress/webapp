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
		>
			<template v-slot:top-right>
				<add-products-input
					@select="addProduct"
					:exclude="data.map(({ id }) => id)"
				/>
			</template>
			<template v-slot:body-cell-qnt="props">
				<q-td key="qnt" :props="props" style="width: 80px">
					<manage-qnt-input v-model="props.row.qnt" />
				</q-td>
			</template>
			<template v-slot:body-cell-sub_total="props">
				<q-td key="sub_total" :props="props" style="width: 160px">
					{{ money(props.row.qnt * props.row.price) }}
				</q-td>
			</template>
		</q-table>

		<div class="resumo row">
			<div class="col text-right q-pa-md">
				<b>Sub total</b>
			</div>
			<div class="col q-py-md text-center" style="width: 150px">
				<b>{{ money(sub_total) }}</b>
			</div>
		</div>
		<div class="clear"></div>
	</div>
</template>

<script>
	import addProductsInput from './add-products-input'
	import ManageQntInput from './manage-qnt-input'

	export default {
		components: {
			addProductsInput,
			ManageQntInput,
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
				],
				data: [],
				$wooApi: null,
			}
		},
		computed: {
			sub_total() {
				return this.data.reduce(
					(sbTot, { price, qnt }) => sbTot + price * qnt,
					0
				)
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
		},
	}
</script>

<style lang="scss">
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
		td:last-child {
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
