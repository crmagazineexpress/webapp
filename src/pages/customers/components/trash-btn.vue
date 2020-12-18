<template>
	<q-btn
		:loading="sending"
		:disable="sending"
		@click="send"
		flat
		icon="far fa-trash-alt"
		round
		color="negative"
		size="md"
	/>
</template>

<script>
	export default {
		props: {
			id: {
				type: String,
				required: true,
			},
		},
		inject: ['loaddata'],
		data() {
			return {
				sending: false,
			}
		},
		methods: {
			async send() {
				try {
					this.sending = true
					await this.$axios.delete(`/customers/${this.id}`)
					await this.loaddata()
					this.sending = false
				} catch (error) {}
			},
		},
	}
</script>

<style lang="scss" scoped></style>
