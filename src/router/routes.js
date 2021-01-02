const routes = [
	{
		path: '/login',
		component: () => import('pages/login'),
	},
	{
		path: '/',
		component: () => import('layouts/MainLayout'),
		children: [
			// {
			// 	path: '',
			// 	component: () => import('pages/Index.vue'),
			// 	meta: {
			// 		pageName: 'Dashboard',
			// 	},
			// },
			{
				path: 'clientes',
				component: () => import('pages/customers'),
				meta: {
					pageName: 'Clientes',
				},
			},
			{
				path: '',
				component: () => import('pages/orders'),
				meta: {
					pageName: 'Pedidos',
				},
			},
			{
				path: 'carnes',
				component: () => import('pages/promissory-note'),
				meta: {
					pageName: 'Carnês',
				},
			},
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
