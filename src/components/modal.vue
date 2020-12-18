<template>
	<q-dialog :value="value" @input="$emit('input', $event)" persistent>
		<q-card :style="{ maxWidth: `${size}px`, width: `${size}px` }">
			<q-card-section class="row items-center">
				<div class="text-h6">{{ title }}</div>
				<q-space />
				<q-btn icon="close" flat round dense v-close-popup />
			</q-card-section>
			<q-card-section style="background: rgb(248 248 248)">
				<slot />
			</q-card-section>
			<q-card-actions align="right" class="q-pa-md">
				<q-btn
					icon="close"
					:disable="loading"
					flat
					label="Cancelar"
					color="grey"
					class="q-pr-sm"
					v-close-popup
				/>
				<q-btn
					icon="save"
					class="q-pr-sm"
					:disable="loading"
					:loading="loading"
					label="Salvar"
					color="primary"
					@click="save"
				/>
			</q-card-actions>
		</q-card>
	</q-dialog>
</template>

<script>
	export default {
		data() {
			return {
				loading: false,
			}
		},
		props: {
			value: {
				type: Boolean,
				default: false,
			},
			title: {
				type: String,
			},
			size: {
				type: Number,
				default: 600,
			},
		},
		methods: {
			async save() {
				this.loading = true
				const loading = new Promise((res) => {
					this.$emit('save', res)
				})

				const closeModal = await loading
				this.loading = false
				if (closeModal) this.$emit('input', false)
			},
		},
	}
</script>

<style lang="scss" scoped></style>
