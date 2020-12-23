<template>
	<q-select
		outlined
		bottom-slots
		v-model="model"
		:options="options"
		emit-value
		map-options
		option-value="id"
		option-label="name"
		label="Pesquisar produtos"
		dense
		style="width: 500px"
		class="q-pb-none"
		:use-input="!model"
		:readonly="!!model"
		@filter="filterFn"
	>
		<template v-slot:append>
			<q-icon
				v-if="model"
				name="close"
				@click.stop="model = null"
				class="cursor-pointer"
			/>
		</template>

		<template v-slot:option="scope">
			<q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
				<q-item-section avatar>
					<q-avatar rounded>
						<img :key="scope.opt.id" :src="scope.opt.image" />
					</q-avatar>
				</q-item-section>
				<q-item-section>
					<q-item-label> {{ scope.opt.name }}</q-item-label>
					<q-item-label caption>
						{{ scope.opt.price | money }}
					</q-item-label>
				</q-item-section>
			</q-item>
		</template>

		<template v-slot:after>
			<q-btn
				round
				:disable="!model"
				dense
				flat
				icon="add"
				@click="emitProduct"
			/>
		</template>
	</q-select>
</template>

<script>
	import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api'
	export default {
		props: {
			exclude: {
				type: Array,
				default: () => [],
			},
		},
		data() {
			return {
				model: null,
				$wooApi: null,
				options: [],
				oldSearch: '',
			}
		},
		filters: {
			money(v) {
				return parseFloat(v).toLocaleString('pt-BR', {
					style: 'currency',
					currency: 'BRL',
				})
			},
		},
		methods: {
			emitProduct() {
				const product = this.options.find(({ id }) => id == this.model)
				this.$emit('select', product)
				this.model = null
			},
			async filterFn(search, update, abort) {
				console.log(this.oldSearch, search)
				if (search != this.oldSearch) {
					this.oldSearch = search
					await this.loadWooCommerceProducts({ search })
				}
				update()
			},
			async loadWooCommerceProducts(params = {}) {
				try {
					const { exclude } = this
					const defaultSettings = {
						status: 'publish',
						orderby: 'title',
						per_page: 100,
						exclude,
					}
					const { data } = await this.$wooApi.get('products', {
						...params,
						...defaultSettings,
					})
					const mapped_product = data.map((product) => {
						const {
							id,
							sale_price,
							price,
							regular_price,
							name,
							images,
							permalink,
						} = product

						let image = ''
						if (!!images[0] && images[0].src) {
							image = images[0].src.replace(
								/\.([a-z]{3,4})$/gi,
								'-100x100.$1'
							)
						}
						return {
							id,
							price: sale_price || price || regular_price,
							name,
							image,
							permalink,
						}
					})
					this.options = mapped_product
				} catch (error) {}
			},
		},
		mounted() {
			this.$wooApi = new WooCommerceRestApi({
				url: 'https://crmagazineexpress.com.br',
				consumerKey: 'ck_1649baa224b0fe260cc36e5b81e66980fa675952',
				consumerSecret: 'cs_8198bdb469a6ab972ebab93e7df00bd17ceed1f9',
				version: 'wc/v3',
			})

			this.loadWooCommerceProducts()
		},
	}
</script>

<style lang="scss" scoped></style>
