<template>
	<header>
		<div class="row q-col-gutter-md">
			<div class="col-5">
				<q-select
					label="Cliente"
					:options="customersOptions"
					emit-value
					map-options
					option-value="_id"
					option-label="nome"
					:use-input="!_order.customer"
					@filter="filterFn"
					v-model="_order.customer"
				>
					<template v-slot:append>
						<q-icon
							v-if="_order.customer !== null"
							class="cursor-pointer"
							name="clear"
							@click.stop="_order.customer = null"
						/>
					</template>
				</q-select>
			</div>
			<div class="col">
				<q-select
					label="Forma de pagamento"
					:options="PaymentMethods"
					emit-value
					map-options
					option-value="id"
					option-label="name"
					v-model="_order.payment_method"
				/>
			</div>
			<div class="col">
				<q-input
					label="Data da compra"
					type="date"
					v-model="_order.date"
				/>
			</div>
			<div class="co-2">
				<q-input
					label="Frete"
					mask="#.##"
					reverse-fill-mask
					v-model="_order.shipping"
				>
					<template v-slot:prepend>
						<q-icon name="local_shipping" />
					</template>
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
	</header>
</template>

<script>
	import PaymentMethods from 'src/assets/payment-methods'
	import MoneyFormatForDirective from 'src/assets/money-format-for-directive'
	import defaultOrder from '../order'

	export default {
		inject: ['getAssets'],
		props: {
			order: {
				type: Object,
				default: () => defaultOrder,
			},
		},
		data() {
			return {
				PaymentMethods,
				MoneyFormatForDirective,
				customersOptions: [],
			}
		},
		computed: {
			_order: {
				get() {
					return this.order
				},
				set(v) {
					this.$emit('update:order', v)
				},
			},
		},
		methods: {
			getShippingValue() {
				if (!this.order.shipping) return 0
				return this.order.shipping
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
