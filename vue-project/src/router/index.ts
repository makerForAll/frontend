import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
			path: '/',
			name: 'home',
			components: {
				default: () => import('@/layoutComponents/HearderBar.vue'),
				SiderBar: () => import('@/layoutComponents/SiderBar.vue'),
				MainContainer: () => import('@/layoutComponents/Dashboard.vue')
			},
			// props:true,
			meta: { requiredLogin: true },
		},
		// {
		// 	path: '/party',
		// 	name: 'party',
		// 	components: {
		// 		default: () => import('@/layoutComponents/HearderBar.vue'),
		// 		SiderBar: () => import('@/layoutComponents/SiderBar.vue'),
		// 		MainContainer: () => import('@/components/Management/party/Home.vue')
		// 	},
		// 	// props:true,
		// 	meta: { requiredLogin: true },
		// },
		{
			path: '/client',
			name: 'client',
			components: {
				default: () => import('@/layoutComponents/HearderBar.vue'),
				SiderBar: () => import('@/layoutComponents/SiderBar.vue'),
				MainContainer: () => import('@/components/BusinessDepartment/client/Home.vue')
			},
			// props:true,
			meta: { requiredLogin: true },
		},
		// {
		// 	path: '/unitiesSystemHome',
		// 	name: 'unitiesSystemHome', // 工程部-不动产单元
		// 	components: {
		// 		default: () => import('@/layoutComponents/HearderBar.vue'),
		// 		SiderBar: () => import('@/layoutComponents/SiderBar.vue'),
		// 		MainContainer: () => import('@/components/EngineeringDepartment/')
		// 	},
		// 	meta: { requiredLogin: true },
		// },
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
