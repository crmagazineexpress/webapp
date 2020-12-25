<template>
	<modal v-model="statusModal" title="Parcelamento" :desc="method_rules.name">
		<div class="q-pb-sm">
			<div class="row q-col-gutter-md">
				<div class="col-8">
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
						label="Primeira parcela"
						type="date"
						dense
						v-model="frist_istallment"
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
					filled
					mask="#.##"
					reverse-fill-mask
					label="Total parcelado (R$)"
					v-model="total_installment"
				>
					<template
						v-slot:control="{ id, floatingLabel, value, emitValue }"
					>
						<input
							:id="id"
							class="q-field__input text-right"
							:value="value"
							@change="(e) => emitValue(e.target.value)"
							v-money="MoneyFormatForDirective"
							v-show="floatingLabel"
						/>
					</template>
				</q-input>
			</div>
		</div>
	</modal>
</template>

<script>
	import modal from 'src/components/modal'
	import defaultOrder from '../order'
	import paymentMethods from 'src/assets/payment-methods'
	import { FilterMoney, money } from 'src/assets/helpers'
	import MoneyFormatForDirective from 'src/assets/money-format-for-directive'

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
				total_installment: 0,
				frist_istallment: new Date().toISOString().slice(0, 10),
				MoneyFormatForDirective,
				columns: [
					{
						name: 'installment',
						label: 'Nº',
						field: 'n',
						align: 'right',
					},
					{
						name: 'date',
						label: 'Data',
						field: 'date',
						format: (v) =>
							new Date(`${v}T00:00`)
								.toLocaleString()
								.slice(0, 10),
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
				const value = this.total_installment / this.installment

				for (let n = 1; n <= this.installment; n++) {
					let date = new Date(`${this.frist_istallment}T00:00`)
					date.setMonth(date.getMonth() + (n - 1))
					date = date.toISOString().slice(0, 10)
					installments.push({ n, date, value, paid: false })
				}
				return installments
			},
		},
		methods: {
			open() {
				this.statusModal = true
				const ratedValue =
					this.order_summary.total * this.method_rules.rate

				this.total_installment = parseFloat(
					Math.round(ratedValue + this.order_summary.total)
				).toFixed(2)
			},
		},
	}
</script>

<style lang="scss" scoped></style>
