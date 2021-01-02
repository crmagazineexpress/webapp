<template>
	<q-item :to="link" exact active-class="bg-grey-1" class="border-active">
		<q-item-section v-if="icon" avatar>
			<q-icon :name="icon" size="18px" color="black" />
		</q-item-section>

		<q-item-section>
			<q-item-label>{{ title }}</q-item-label>
			<q-item-label v-if="caption" caption>
				{{ caption }}
			</q-item-label>
		</q-item-section>
	</q-item>
</template>

<script>
	export default {
		name: 'EssentialLink',
		props: {
			title: {
				type: String,
				required: true,
			},

			caption: {
				type: String,
				default: '',
			},

			link: {
				type: String,
				default: '#',
			},

			icon: {
				type: String,
				default: '',
			},
		},
	}
</script>
