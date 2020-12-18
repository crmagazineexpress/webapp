const routes = [
	{
		path: '/',
		component: () => import('layouts/MainLayout'),
		children: [
			{ path: '', component: () => import('pages/Index.vue') },
			{ path: 'clientes', component: () => import('pages/customers') },
		],
	},

	// Always leave this as last one,
	// but you can also remove it
	{
		path: '*',
		component: () => import('pages/Error404.vue'),
	},
]

export default routes
