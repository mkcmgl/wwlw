import {
    createWebHashHistory,
    createRouter
} from 'vue-router';

const routes = [
    {
        path: '/',
        component: () => import('~/layouts/default.vue'),
        children: [
            {
                path: '',
                component: () => import('~/pages/index.vue'),
                children: [
                    {
                        path: '',
                        component: () => import('~/pages/index/index.vue'),
                        name: 'index',
                    },
                    {
                        path: 'logout',
                        component: () => import('~/pages/index/logout.vue'),
                        name: 'logout',
                    }
                ]
            },

            // 数字身份
            {
                path: 'digital-identities',
                component: () => import('~/pages/digital-identities.vue'),
                children: [
                    {
                        path: '',
                        component: () => import('~/pages/digital-identities/index.vue'),
                        name: 'digital-identities',
                    },
                    // 我的数字身份
                    {
                        path: 'mine',
                        component: () => import('~/pages/digital-identities/mine.vue'),
                        name: 'digital-identities/mine',
                    },
                    //激活数字身份
                    {
                        path: 'activate',
                        component: () => import('~/pages/digital-identities/activate.vue'),
                        name: 'digital-identities/activate',
                    },
                    {
                        path: 'authentication',
                        component: () => import('~/pages/digital-identities/authentication.vue'),
                        name: 'digital-identities/authentication',
                    },
                    // 企业管理
                    {
                        path: 'companies',
                        component: () => import('~/pages/digital-identities/companies.vue'),
                        name: 'digital-identities/companies',
                    },
                    // 消息中心
                    {
                        path: 'messages',
                        component: () => import('~/pages/digital-identities/messages.vue'),
                        name: 'digital-identities/messages',
                    }
                ]
            },

            // 区块链网关
            {
                path: 'blockchain-gateways',
                component: () => import('~/pages/blockchain-gateways.vue'),
                children: [
                    {
                        path: '',
                        component: () => import('~/pages/blockchain-gateways/index.vue'),
                        name: 'blockchain-gateways',
                    },
                    // 设备管理
                    {
                        path: 'devices',
                        component: () => import('~/pages/blockchain-gateways/devices.vue'),
                        name: 'blockchain-gateways/devices',
                    },
                    // 数据存证
                    {
                        path: 'data-certs',
                        component: () => import('~/pages/blockchain-gateways/data-certs.vue'),
                        name: 'blockchain-gateways/data-certs',
                    },
                    // 文件存证
                    {
                        path: 'file-certs',
                        component: () => import('~/pages/blockchain-gateways/file-certs.vue'),
                        name: 'blockchain-gateways/file-certs',
                    },
                    // 缓存监控
                    {
                        path: 'caches',
                        component: () => import('~/pages/blockchain-gateways/caches.vue'),
                        name: 'blockchain-gateways/caches',
                    },
                    // 服务监控
                    {
                        path: 'services',
                        component: () => import('~/pages/blockchain-gateways/services.vue'),
                        name: 'blockchain-gateways/services',
                    },
                    // 区块链浏览器
                    {
                        path: 'explorer',
                        component: () => import('~/pages/blockchain-gateways/explorer.vue'),
                        name: 'blockchain-gateways/explorer',
                    },
                ]
            },

            // 区块链数据归档
            {
                path: 'blockchain-data-archives',
                component: () => import('~/pages/blockchain-data-archives.vue'),
                children: [
                    {
                        path: '',
                        component: () => import('~/pages/blockchain-data-archives/index.vue'),
                        name: 'blockchain-data-archives',
                    },
                    // 数据快照
                    {
                        path: 'snapshots',
                        component: () => import('~/pages/blockchain-data-archives/snapshots.vue'),
                        name: 'blockchain-data-archives/snapshots',
                    },
                    // 数据归档
                    {
                        path: 'archives',
                        component: () => import('~/pages/blockchain-data-archives/archives.vue'),
                        name: 'blockchain-data-archives/archives',
                    },
                    // 数据还原
                    {
                        path: 'restores',
                        component: () => import('~/pages/blockchain-data-archives/restores.vue'),
                        name: 'blockchain-data-archives/restores',
                    },
                    // 文件日志
                    {
                        path: 'logs',
                        component: () => import('~/pages/blockchain-data-archives/logs.vue'),
                        name: 'blockchain-data-archives/logs',
                    },
                ]
            },

            {
                path: 'data-assets',
                component: () => import('~/pages/data-assets.vue'),
                children: [
                    {
                        path: '',
                        component: () => import('~/pages/data-assets/index.vue'),
                        name: 'data-assets',
                    }
                ]
            },
            {
                path: 'data-service',
                component: () => import('~/pages/data-service.vue'),
                children: [
                    {
                        path: '',
                        component: () => import('~/pages/data-service/index.vue'),
                        name: 'data-service',
                    }
                ]
            },
        ],
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('~/pages/login/login.vue'),

    },
    {
        path: '/register',
        name: 'register',
        component: () => import('~/pages/register/register.vue'),

    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
