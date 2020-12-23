<template>
	<q-dialog :value="value" @input="$emit('input', $event)" persistent>
		<q-card :style="{ maxWidth: size, width: size }">
			<q-card-section class="row items-center">
				<div class="text-h6">{{ title }}</div>
				<q-space />
				<q-btn icon="close" flat round dense v-close-popup />
			</q-card-section>
			<q-card-section style="background: rgb(248 248 248)">
				<slot />
			</q-card-section>
			<q-card-actions align="right">
				<slot name="actions">
					<div class="row q-col-gutter-md q-pa-sm cnt-actions-modal">
						<div class="col-6">
							<q-btn
								icon="close"
								:disable="loading"
								flat
								label="Cancelar"
								color="grey"
								class="full-width"
								v-close-popup
							/>
						</div>
						<div class="col-6">
							<q-btn
								icon="save"
								class="full-width"
								:disable="loading"
								:loading="loading"
								label="Salvar"
								color="primary"
								@click="save"
							/>
						</div>
					</div>
				</slot>
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
				type: String,
				default: '600px',
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

<style lang="scss" scoped>
	.cnt-actions-modal {
		width: 318px;
	}
</style>
