<template>
	<div>
		<q-table
			class="no-shadow"
			:data="data.installments"
			:columns="columns"
			:pagination="{ rowsPerPage: 24 }"
			hide-bottom
		>
			<template v-slot:body-cell-select="props">
				<q-td :props="props">
					<installment-checkbox :item="props.row" />
				</q-td>
			</template>
		</q-table>
	</div>
</template>

<script>
	import { DateBrl, money } from 'src/assets/helpers'
	import installmentCheckbox from './installment-checkbox.vue'
	export default {
		components: { installmentCheckbox },
		props: {
			data: Object,
		},
		data() {
			return {
				columns: [
					{
						name: 'select',
					},
					{
						name: 'installment',
						field: 'installment',
					},
					{
						name: 'date',
						label: 'Data',
						field: 'date',
						format: DateBrl,
						align: 'left',
					},
					{
						name: 'value',
						label: 'Valor',
						field: 'value',
						format: money,
						align: 'left',
					},
				],
			}
		},
	}
</script>

<style lang="scss" scoped></style>
