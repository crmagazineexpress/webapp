import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api'

export default () => {
	const $api = new WooCommerceRestApi({
		url: 'https://crmagazineexpress.com.br',
		consumerKey: 'ck_1649baa224b0fe260cc36e5b81e66980fa675952',
		consumerSecret: 'cs_8198bdb469a6ab972ebab93e7df00bd17ceed1f9',
		version: 'wc/v3',
	})

	return {
		async products(params) {
			const { data } = await $api.get('products', params)
			return data
		},
	}
}
