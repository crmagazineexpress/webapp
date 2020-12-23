<template>
	<div class="qnt-control">
		<q-btn
			class="hide-not-hover"
			icon="remove"
			dense
			flat
			round
			size="8px"
			@click="value > 0 && $emit('input', value - 1)"
		/>
		<div class="qnt">{{ value }}</div>
		<q-btn
			class="hide-not-hover"
			icon="add"
			dense
			flat
			round
			size="8px"
			@click="$emit('input', value + 1)"
		/>
	</div>
</template>

<script>
	export default {
		props: {
			value: {
				type: Number,
			},
		},
	}
</script>

<style lang="scss" scoped>
	.qnt-control {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-direction: row;
		gap: 5px;
		padding: 8px;

		&:hover {
			.hide-not-hover {
				opacity: 1;
			}
		}

		.hide-not-hover {
			opacity: 0;
		}
	}
</style>
