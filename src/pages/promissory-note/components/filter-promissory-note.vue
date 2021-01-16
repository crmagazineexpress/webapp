<template>
	<div>
		<!-- <div class="cnt-legend q-pb-lg">
			<q-badge color="warning" label="Atrasado" />
			<q-badge color="positive" label="Concluido" />
			<q-badge color="info" label="Em dia" />
		</div> -->

		<div class="row q-col-gutter-md q-mb-lg">
			<div class="col-8">
				<q-input
					filled
					:value="customer"
					@input="$emit('update:customer', $event)"
					label="Cliente"
				>
					<template v-slot:append>
						<q-icon
							v-if="customer"
							class="cursor-pointer"
							name="clear"
							@click.stop="$emit('update:customer', '')"
						/>
					</template>
				</q-input>
			</div>
			<div class="col">
				<q-select
					filled
					label="Status"
					emit-value
					map-options
					:value="status"
					@input="$emit('update:status', $event)"
					:options="statusOptions"
				>
					<template v-slot:append>
						<q-icon
							v-if="status !== null"
							class="cursor-pointer"
							name="clear"
							@click.stop="$emit('update:status', null)"
						/>
					</template>
				</q-select>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['customer', 'status'],
		data() {
			return {
				statusOptions: [
					'Atrasado',
					'Concluido',
					'Em dia',
				].map((label, value) => ({ label, value })),
			}
		},
	}
</script>
<style lang="scss" scoped>
	.cnt-legend {
		display: flex;
		gap: 8px;
	}
</style>
