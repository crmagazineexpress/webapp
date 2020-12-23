<template>
	<header>
		<div class="row q-col-gutter-md">
			<div class="col-7">
				<q-select
					label="Cliente"
					:options="customersOptions"
					emit-value
					map-options
					option-value="_id"
					option-label="nome"
					:use-input="!order.customer"
					@filter="filterFn"
					v-model="order.customer"
				>
					<template v-slot:append>
						<q-icon
							v-if="order.customer !== null"
							class="cursor-pointer"
							name="clear"
							@click.stop="order.customer = null"
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
					v-model="order.payment_method"
				/>
			</div>
			<div class="col">
				<q-input
					label="Data da compra"
					type="date"
					v-model="order.date"
				/>
			</div>
		</div>
	</header>
</template>

<script>
	import PaymentMethods from 'src/assets/payment-methods'
	export default {
		inject: ['getAssets'],
		data() {
			return {
				PaymentMethods,
				customersOptions: [],

				order: {
					customer: null,
					payment_method: 'debit-card',
					date: new Date(),
				},
			}
		},
		methods: {
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
