<template>
	<modal
		v-model="statusModal"
		title="Parcelamento"
		:desc="method_rules.name"
		:disable-save-btn="installment.length == 0"
		@closed="reject()"
		@save="makeInstallments"
	>
		<div class="q-pb-sm">
			<div class="row q-col-gutter-md">
				<div class="col"></div>
				<div class="col-4">
					<q-input
						label="Primeira parcela"
						type="date"
						dense
						v-model="frist_istallment"
					/>
				</div>
			</div>
		</div>
		<q-table
			title="Opções de parcelamento"
			:columns="columns"
			:data="mount_installment"
			:pagination="{ rowsPerPage: method_rules.max_instalments }"
			dense
			hide-bottom
			row-key="installments"
			binary-state-sort
			selection="single"
			:selected.sync="installment"
		/>
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
				resolve: null,
				reject: null,
				statusModal: false,
				installment: [],
				total_installment: 0,
				frist_istallment: new Date().toISOString().slice(0, 10),
				MoneyFormatForDirective,
				columns: [
					{
						name: 'installment',
						label: 'Nº Parc.',
						field: 'installments',
						format: (v) => `${v}x`,
						align: 'right',
					},
					{
						name: 'value',
						label: 'Valor da parcela',
						field: 'value',
						format: (v) => money(v),
						align: 'left',
					},
					{
						name: 'date',
						label: 'Útima parcela',
						field: 'date',
						format: (v) =>
							new Date(`${v}T00:00`)
								.toLocaleString()
								.slice(0, 10),
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
				const installmentsOptions = []

				for (
					let installments = 1;
					installments <= this.method_rules.max_instalments;
					installments++
				) {
					const value = parseFloat(
						this.total_installment / installments
					).toFixed(2)

					const date = this.calc_date(installments)

					installmentsOptions.push({
						installments,
						value,
						date,
					})
				}
				return installmentsOptions
			},
		},
		methods: {
			calc_date(installments) {
				let date = new Date(`${this.frist_istallment}T00:00`)
				date.setMonth(date.getMonth() + (installments - 1))
				return date.toISOString().slice(0, 10)
			},
			open() {
				return new Promise((resolve, reject) => {
					this.statusModal = true
					const ratedValue =
						this.order_summary.total * this.method_rules.rate

					this.total_installment = parseFloat(
						Math.round(ratedValue + this.order_summary.total)
					).toFixed(2)

					this.resolve = resolve
					this.reject = reject
				})
			},
			makeInstallments(resolve) {
				if (this.installment.length == 0) return resolve()

				const installments = []
				const [selected] = this.installment
				const { value } = selected

				for (
					let installment = 1;
					installment <= selected.installments;
					installment++
				) {
					const date = this.calc_date(installment)
					installments.push({ value, installment, date, paid: false })
				}

				const { total_installment } = this
				this.resolve({
					installments,
					number_instalments: selected.installments,
					installment_value: value,
					total_value_installmented: total_installment,
				})
				this.statusModal = false
				resolve()
			},
		},
	}
</script>

<style lang="scss" scoped></style>
