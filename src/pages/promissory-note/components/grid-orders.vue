<template>
	<q-table
		:data="list"
		:columns="columns"
		class="no-shadow"
		:pagination="{ rowsPerPage: 50 }"
	>
		<template v-slot:body-cell-actions="props">
			<q-td :props="props">
				<q-btn
					v-if="props.row._id != value"
					icon="edit"
					flat
					dense
					@click="$emit('input', props.row._id)"
				/>
				<q-btn
					v-else
					icon="close"
					flat
					dense
					@click="$emit('input', null)"
				/>
			</q-td>
		</template>
	</q-table>
</template>

<script>
	import { money } from 'src/assets/helpers'
	export default {
		props: {
			value: [String, null],
			list: Array,
		},
		data() {
			return {
				columns: [
					{
						name: 'customer',
						label: 'Cliente',
						field: (v) => v.customer.nome,
						align: 'left',
					},
					{
						name: 'valuation',
						label: 'Parcelamento',
						field: this.xValueInstallmented,
						align: 'left',
					},
					{
						name: 'instalments',
						label: 'Parcelas',
						field: this.xInstalmentStatus,
					},
					{
						name: 'actions',
					},
				],
			}
		},
		methods: {
			xValueInstallmented({
				installments_options: {
					total_value_installmented,
					number_instalments,
					installment_value,
				},
			}) {
				return `${money(
					total_value_installmented
				)} em ${number_instalments}x ${money(installment_value)}`
			},
			xInstalmentStatus({
				installments_options: { number_instalments, installments },
			}) {
				const paids = installments.reduce(
					(acc, { paid }) => (paid ? acc + 1 : acc),
					0
				)
				return `${paids}/${number_instalments}`
			},
		},
	}
</script>

<style lang="scss" scoped></style>
