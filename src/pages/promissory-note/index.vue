<template>
	<div>promissory note</div>
</template>

<script>
	export default {
		name: 'PromissoryNote',
		methods: {
			async loadDataHandler() {
				try {
					const { data } = this.$axios.get('/order/promissory-note')
					console.log(data)
				} catch (error) {}
			},
		},
		mounted() {
			this.loadDataHandler()
		},
	}
</script>

<style lang="scss" scoped></style>
