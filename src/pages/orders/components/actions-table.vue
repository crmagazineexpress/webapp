<template>
	<q-td :props="props">
		<q-btn
			@click="openModal(row)"
			icon="edit"
			color="primary"
			flat
			round
			size="sm"
		/>
		<q-btn flat icon="far fa-trash-alt" round color="negative" size="sm" />
	</q-td>
</template>

<script>
	export default {
		props: {
			props: Object,
			row: Object,
			openModal: Function,
		},
	}
</script>

<style lang="scss" scoped></style>
