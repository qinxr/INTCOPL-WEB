import Main from '@/components/main'
import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [{
		path: '/login',
		name: 'login',
		meta: {
			title: 'Login - 登录',
			hideInMenu: true
		},
		component: () =>
			import('@/view/login/login.vue')
	},
	{
		path: '/',
		name: '_home',
		redirect: '/home',
		component: Main,
		meta: {
			hideInMenu: true,
			notCache: true
		},
		children: [{
			path: '/home',
			name: 'home',
			meta: {
				hideInMenu: true,
				title: '首页',
				notCache: true,
				icon: 'md-home'
			},
			component: () =>
				import('@/view/single-page/home')
		}]
	},

	{
		path: '/message',
		name: 'message',
		component: Main,
		meta: {
			hideInBread: true,
			hideInMenu: true
		},
		children: [{
			path: 'message_page',
			name: 'message_page',
			meta: {
				icon: 'md-notifications',
				title: '消息中心'
			},
			component: () =>
				import('@/view/single-page/message/index.vue')
		}]
	},

	{
		path: '/peiliao',
		name: 'peiliao',
		meta: {
			icon: 'md-menu',
			title: '配料记录表',
		},
		component: Main,
		children: [

			{
				path: 'pvc1',
				name: 'pvc1',
				meta: {
					showAlways: true,
					icon: 'md-funnel',
					title: 'PVC一厂'
				},
				component: parentView,
				children: [{
						path: 'plinfo1',
						name: 'plinfo1',
						meta: {
							icon: 'md-funnel',
							title: '一次配料过程记录表'
						},
						component: () =>
							import('@/view/peiliao/pvc1/plinfo.vue')
					},
					{
						path: 'plinfoAdd1',
						name: 'plinfoAdd1',
						meta: {
							icon: 'md-funnel',
							title: '一次配料记录表新增',
						},
						component: () =>
							import('@/view/peiliao/pvc1/plinfoAdd.vue')
					},
					{
						path: 'plinfoEdit1/:id',
						name: 'plinfoEdit1',
						meta: {
							icon: 'md-funnel',
							title: '信息修改',
							hideInMenu: true
						},
						component: () =>
							import('@/view/peiliao/pvc1/plinfoEdit.vue')
					},
					{
						path: 'plinfo12',
						name: 'plinfo12',
						meta: {
							icon: 'md-funnel',
							title: '二次配料过程记录表'
						},
						component: () =>
							import('@/view/peiliao/pvc1/plinfo12.vue')
					},
					{
						path: 'plinfoAdd12/:id',
						name: 'plinfoAdd12',
						meta: {
							icon: 'md-funnel',
							title: '二次配料记录表新增',
						},
						component: () =>
							import('@/view/peiliao/pvc1/plinfoAdd12.vue')
					},
					{
						path: 'plinfoEdit12/:id',
						name: 'plinfoEdit12',
						meta: {
							icon: 'md-funnel',
							title: '信息修改',
							hideInMenu: true
						},
						component: () =>
							import('@/view/peiliao/pvc1/plinfoEdit12.vue')
					},
				]
			},
			{
				path: 'pvc2',
				name: 'pvc2',
				meta: {
					showAlways: true,
					icon: 'md-funnel',
					title: 'PVC二厂'
				},
				component: parentView,
				children: [{
						path: 'plinfo2',
						name: 'plinfo2',
						meta: {
							icon: 'md-funnel',
							title: '一次配料过程记录表'
						},
						component: () =>
							import('@/view/peiliao/pvc2/plinfo.vue')
					},
					{
						path: 'plinfoAdd2',
						name: 'plinfoAdd2',
						meta: {
							icon: 'md-funnel',
							title: '记录表新增',
						},
						component: () =>
							import('@/view/peiliao/pvc2/plinfoAdd.vue')
					},
					{
						path: 'plinfoEdit2/:id',
						name: 'plinfoEdit2',
						meta: {
							icon: 'md-funnel',
							title: '信息修改',
							hideInMenu: true
						},
						component: () =>
							import('@/view/peiliao/pvc2/plinfoEdit.vue')
					},
					{
						path: 'plinfo22',
						name: 'plinfo22',
						meta: {
							icon: 'md-funnel',
							title: '二次配料过程记录表'
						},
						component: () =>
							import('@/view/peiliao/pvc2/plinfo22.vue')
					},
					{
						path: 'plinfoAdd22/:id',
						name: 'plinfoAdd22',
						meta: {
							icon: 'md-funnel',
							title: '二次配料记录表新增',
						},
						component: () =>
							import('@/view/peiliao/pvc2/plinfoAdd22.vue')
					},
					{
						path: 'plinfoEdit22/:id',
						name: 'plinfoEdit22',
						meta: {
							icon: 'md-funnel',
							title: '信息修改',
							hideInMenu: true
						},
						component: () =>
							import('@/view/peiliao/pvc2/plinfoEdit22.vue')
					},
				]
			},
			{
				path: 'pvc3',
				name: 'pvc3',
				meta: {
					showAlways: true,
					icon: 'md-funnel',
					title: 'PVC三厂'
				},
				component: parentView,
				children: [{
						path: 'plinfo3',
						name: 'plinfo3',
						meta: {
							icon: 'md-funnel',
							title: '一次配料过程记录表'
						},
						component: () =>
							import('@/view/peiliao/pvc3/plinfo.vue')
					},
					{
						path: 'plinfoAdd3',
						name: 'plinfoAdd3',
						meta: {
							icon: 'md-funnel',
							title: '记录表新增',
						},
						component: () =>
							import('@/view/peiliao/pvc3/plinfoAdd.vue')
					},
					{
						path: 'plinfoEdit3/:id',
						name: 'plinfoEdit3',
						meta: {
							icon: 'md-funnel',
							title: '信息修改',
							hideInMenu: true
						},
						component: () =>
							import('@/view/peiliao/pvc3/plinfoEdit.vue')
					},
					{
						path: 'plinfo32',
						name: 'plinfo32',
						meta: {
							icon: 'md-funnel',
							title: '二次配料过程记录表'
						},
						component: () =>
							import('@/view/peiliao/pvc3/plinfo32.vue')
					},
					{
						path: 'plinfoAdd32/:id',
						name: 'plinfoAdd32',
						meta: {
							icon: 'md-funnel',
							title: '二次配料记录表新增',
						},
						component: () =>
							import('@/view/peiliao/pvc3/plinfoAdd32.vue')
					},
					{
						path: 'plinfoEdit32/:id',
						name: 'plinfoEdit32',
						meta: {
							icon: 'md-funnel',
							title: '信息修改',
							hideInMenu: true
						},
						component: () =>
							import('@/view/peiliao/pvc3/plinfoEdit32.vue')
					},
				]
			},
		]
	},

	{
		path: '/argu',
		name: 'argu',
		meta: {
			hideInMenu: true
		},
		component: Main,
		children: [{
				path: 'params/:id',
				name: 'params',
				meta: {
					icon: 'md-flower',
					title: route => `{{ params }}-${route.params.id}`,
					notCache: true,
					beforeCloseName: 'before_close_normal'
				},
				component: () =>
					import('@/view/argu-page/params.vue')
			},
			{
				path: 'query',
				name: 'query',
				meta: {
					icon: 'md-flower',
					title: route => `{{ query }}-${route.query.id}`,
					notCache: true
				},
				component: () =>
					import('@/view/argu-page/query.vue')
			}
		]
	},
	{
		path: '/401',
		name: 'error_401',
		meta: {
			hideInMenu: true
		},
		component: () =>
			import('@/view/error-page/401.vue')
	},
	{
		path: '/500',
		name: 'error_500',
		meta: {
			hideInMenu: true
		},
		component: () =>
			import('@/view/error-page/500.vue')
	},
	{
		path: '*',
		name: 'error_404',
		meta: {
			hideInMenu: true
		},
		component: () =>
			import('@/view/error-page/404.vue')
	}
]