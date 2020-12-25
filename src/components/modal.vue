<template>
	<q-dialog :value="value" @input="$emit('input', $event)" persistent>
		<q-card :style="{ maxWidth: size, width: size }">
			<q-card-section class="row items-center">
				<div class="text-h6 title">
					{{ title }}
					<small v-if="desc">{{ desc }}</small>
				</div>
				<q-space />
				<q-btn icon="close" flat round dense @click="closeModal" />
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
								@click="closeModal"
							/>
						</div>
						<div class="col-6">
							<q-btn
								icon="save"
								class="full-width"
								:disable="loading || disableSaveBtn"
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
			desc: {
				type: [String, null],
				default: null,
			},
			size: {
				type: String,
				default: '600px',
			},
			disableSaveBtn: {
				type: Boolean,
				default: false,
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
				if (closeModal) this.closeModal()
			},
			closeModal() {
				this.$emit('input', false)
				this.$emit('closed')
			},
		},
	}
</script>

<style lang="scss" scoped>
	.title {
		small {
			display: block;
			margin-top: -2px;
			font-size: 12px;
			line-height: 12px;
			color: #828282;
		}
	}
	.cnt-actions-modal {
		width: 318px;
	}
</style>
