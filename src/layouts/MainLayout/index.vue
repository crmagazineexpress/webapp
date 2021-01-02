<template>
	<q-layout view="hHh Lpr lFf primary-layout">
		<!-- <q-header elevated class="bg-white">
			<q-toolbar>
				<q-btn
					flat
					dense
					round
					icon="menu"
					aria-label="Menu"
					color="primary"
					@click="leftDrawerOpen = !leftDrawerOpen"
				/>
			</q-toolbar>
		</q-header> -->

		<q-drawer
			v-model="leftDrawerOpen"
			show-if-above
			content-class="bg-layout q-pt-xl"
		>
			<q-list>
				<EssentialLink
					v-for="link in MappedMenu"
					:key="link.title"
					v-bind="link"
				/>
			</q-list>
		</q-drawer>

		<q-page-container class="bg-layout q-pt-xl">
			<h4 class="text-grey-7 q-my-none q-px-lg">{{ pageName }}</h4>
			<div class="q-ma-lg">
				<div class="cnt-page">
					<router-view />
				</div>
			</div>
		</q-page-container>
	</q-layout>
</template>

<script>
	import EssentialLink from './components/EssentialLink'
	import MappedMenu from './mapped-menu'

	export default {
		name: 'MainLayout',
		components: { EssentialLink },
		data() {
			return {
				leftDrawerOpen: false,
				MappedMenu,
			}
		},
		computed: {
			pageName() {
				return this.$route.meta.pageName
			},
		},
	}
</script>
<style lang="scss" scoped>
	.cnt-page {
		display: block;
		box-sizing: border-box;
	}
</style>
