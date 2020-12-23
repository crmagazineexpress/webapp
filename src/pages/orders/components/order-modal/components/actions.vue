<template>
	<div class="row q-col-gutter-sm cnt-actions">
		<div class="col"></div>

		<div class="col-3">
			<q-btn
				flat
				label="Salvar"
				color="primary"
				icon="done"
				class="full-width"
			/>
		</div>
		<div class="col-4">
			<q-btn
				flat
				label="Gerar pedido"
				color="positive"
				icon="done_all"
				class="full-width"
				@click="$emit('openInstMd')"
			/>
		</div>
	</div>
</template>

<script>
	export default {}
</script>

<style lang="scss" scoped>
	.cnt-actions {
		width: 550px;
	}
</style>
