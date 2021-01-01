<template>
	<q-td :props="props">
		<template v-if="type == 'payment'">
			<q-badge v-if="value == 'money'" color="green" outline>
				<q-icon class="q-mr-sm" name="far fa-money-bill-alt" />
				Dinheiro
			</q-badge>
			<q-badge
				v-else-if="value == 'debit-card'"
				color="blue-grey"
				outline
			>
				<q-icon class="q-mr-sm" name="fas fa-money-check-alt" />
				Cartão de Débito
			</q-badge>
			<q-badge v-else-if="value == 'credit-card'" color="teal-14" outline>
				<q-icon class="q-mr-sm" name="far fa-credit-card" />
				Cartão de Credito
			</q-badge>
			<q-badge v-else-if="value == 'ticket'" color="blue-6" outline>
				<q-icon class="q-mr-sm" name="fas fa-ticket-alt" />
				Carnê
			</q-badge>
		</template>
		<template v-else>
			<q-badge v-if="!value" color="primary" outline>
				<q-icon class="q-mr-sm" name="done" />
				Proposta
			</q-badge>
			<q-badge v-else color="positive" outline>
				<q-icon class="q-mr-sm" name="done_all" />
				Pedido
			</q-badge>
		</template>
	</q-td>
</template>

<script>
	export default {
		props: {
			type: String,
			value: [String, null],
			props: Object,
		},
	}
</script>

<style lang="scss" scoped></style>
