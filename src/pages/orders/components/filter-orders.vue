<template>
	<div class="row q-mb-lg q-col-gutter-md">
		<div class="col-6">
			<q-input
				:value="customer"
				@input="$emit('update:customer', $event)"
				filled
				label="Cliente"
			>
				<template v-slot:append>
					<q-icon
						v-if="customer"
						class="cursor-pointer"
						name="clear"
						@click.stop="$emit('update:customer', '')"
					/>
				</template>
			</q-input>
		</div>
		<div class="col">
			<q-select
				filled
				emit-value
				map-options
				:value="paymentMethods"
				@input="$emit('update:paymentMethods', $event)"
				label="Forma de pagamento"
				:options="paymentMethodsOptions"
			>
				<template v-slot:append>
					<q-icon
						v-if="paymentMethods !== null"
						class="cursor-pointer"
						name="clear"
						@click.stop="$emit('update:paymentMethods', null)"
					/>
				</template>
			</q-select>
		</div>
		<div class="col">
			<q-select
				filled
				emit-value
				map-options
				:value="status"
				@input="$emit('update:status', $event)"
				label="Status"
				:options="statusOptions"
			>
				<template v-slot:append>
					<q-icon
						v-if="status !== null"
						class="cursor-pointer"
						name="clear"
						@click.stop="$emit('update:status', null)"
					/>
				</template>
			</q-select>
		</div>
	</div>
</template>

<script>
	import PaymentMethos from 'src/assets/payment-methods'
	export default {
		props: ['customer', 'paymentMethods', 'status'],
		data() {
			return {
				statusOptions: ['Pedido', 'Proposta'].map((label, value) => ({
					label,
					value,
				})),
				paymentMethodsOptions: PaymentMethos.map(({ id, name }) => ({
					label: name,
					value: id,
				})),
			}
		},
		watch: {
			filter: function (val) {
				console.log(val)
			},
		},
	}
</script>

<style lang="scss" scoped></style>
