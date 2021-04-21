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
		<q-btn
			:disable="loading"
			:loading="loading"
			flat
			icon="far fa-trash-alt"
			round
			color="negative"
			size="sm"
			@click="deleteOrder"
		/>
	</q-td>
</template>

<script>
	export default {
		props: {
			props: Object,
			row: Object,
			openModal: Function,
		},
		inject: ['loadData'],
		data() {
			return {
				loading: false,
			}
		},
		methods: {
			async deleteOrder() {
				try {
					this.loading = true
					const { status } = await this.$api.delete(
						`/order/${this.row._id}`
					)
					await this.loadData()
					this.loading = false
				} catch (error) {}
			},
		},
	}
</script>

<style lang="scss" scoped></style>
