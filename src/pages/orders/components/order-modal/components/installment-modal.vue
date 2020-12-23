<template>
	<modal v-model="statusModal" title="Parcelamento" :desc="method_rules.name">
		<div class="q-pb-sm">
			<div class="row q-col-gutter-md">
				<div class="col-9">
					<span>Quantidade de parcelas ({{ installment }})</span>
					<q-slider
						v-model="installment"
						markers
						:min="1"
						:max="method_rules.max_instalments"
					/>
				</div>
				<div class="col">
					<q-input
						label="Taxa (%)"
						dense
						:value="method_rules.rate * 100"
						@input="method_rules.rate = $event / 100"
						type="number"
					/>
				</div>
			</div>
		</div>
		<span>Configuração das parcelas</span>
		<q-table
			:columns="columns"
			:data="mount_installment"
			:pagination="{ rowsPerPage: method_rules.max_instalments }"
			dense
			hide-bottom
			row-key="n"
			binary-state-sort
		/>
		<!-- <pre>{{ mount_installment }}</pre> -->
		<div class="row q-col-gutter-md q-pt-lg">
			<div class="col">
				<q-input
					:value="order_summary.total | money"
					standout
					readonly
					label="Total a vista"
				/>
			</div>
			<div class="col">
				<q-input
					:value="total_installment | money"
					standout
					readonly
					label="Total parcelado"
					@change="setRate"
				/>
			</div>
			<div class="col">
				<q-input
					:value="(total_installment - order_summary.total) | money"
					standout
					readonly
					label="Juros"
				/>
			</div>
		</div>
	</modal>
</template>

<script>
	import modal from 'src/components/modal'
	import defaultOrder from '../order'
	import paymentMethods from 'src/assets/payment-methods'
	import { FilterMoney, money } from 'src/assets/helpers'

	export default {
		components: { modal },
		mixins: [FilterMoney],
		props: {
			order: {
				type: Object,
				default: () => defaultOrder,
			},
			order_summary: {
				type: Object,
				default: () => {},
			},
		},
		data() {
			return {
				statusModal: false,
				installment: 1,
				columns: [
					{
						name: 'installment',
						label: 'Nº',
						field: 'n',
						align: 'right',
					},
					{
						name: 'rated',
						label: 'Juros no mês',
						field: 'rated',
						format: (v) => money(v),
						align: 'center',
					},
					{
						name: 'value',
						label: 'Valor da parcela',
						field: 'value',
						format: (v) => money(v),
						align: 'left',
					},
				],
			}
		},
		computed: {
			method_rules() {
				return paymentMethods.find(
					({ id }) => this.order.payment_method == id
				)
			},
			mount_installment() {
				const installments = []
				const { rate } = this.method_rules
				const { total } = this.order_summary
				const rated = total * rate
				for (let n = 1; n <= this.installment; n++) {
					const value = total / this.installment + rated
					installments.push({ n, rate, rated, value, paid: false })
				}
				return installments
			},
			total_installment() {
				return this.mount_installment.reduce(
					(total, { value }) => total + value,
					0
				)
			},
		},
		methods: {
			setRate(ev) {
				console.log(ev.target.value)
			},
			open() {
				this.statusModal = true
			},
		},
	}
</script>

<style lang="scss" scoped></style>
