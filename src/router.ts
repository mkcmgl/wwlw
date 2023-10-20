import {
    createWebHashHistory,
    createRouter
} from 'vue-router';

import { auth } from '~/middlewares/auth';
import { guest } from '~/middlewares/guest';

const routes = [

    {
        path: '/login',
        component: () => import('~/pages/login.vue'),
        name: 'login',
        beforeEnter: guest,
    },

    {
        path: '/register',
        component: () => import('~/pages/register.vue'),
        name: 'register',
        beforeEnter: guest,
    },

    {
        path: '/',
        component: () => import('~/layouts/default.vue'),
        beforeEnter: auth,

        children: [

            {
                path: '',
                component: () => import('~/pages/index.vue'),
                children: [
                    {
                        path: '',
                        component: () => import('~/pages/index/index.vue'),
                        name: 'index',
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

                        redirect: () => {
                            return {
                                name: 'digital-identities/mine'
                            };
                        },
                        name: 'digital-identities',
                    },
                    // 我的数字身份
                    {
                        path: 'mine',
                        component: () => import('~/pages/digital-identities/index.vue'),
                        name: 'digital-identities/mine',
                    },
                    //激活数字身份
                    {
                        path: 'activate',
                        component: () => import('~/pages/digital-identities/activate.vue'),
                        name: 'digital-identities/activate',
                    },
                    //提交实名认证
                    {
                        path: 'authentication',
                        component: () => import('~/pages/digital-identities/authentication.vue'),
                        name: 'digital-identities/authentication',
                    },
                    //实名认证审核
                    {
                        path: 'audit',
                        component: () => import('~/pages/digital-identities/audit/index.vue'),
                        name: 'digital-identities/audit',
                    },
                    {
                        path: 'audit/detail',
                        component: () => import('~/pages/digital-identities/audit/detail.vue'),
                        name: 'digital-identities/audit/detail',
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
                    },
                    {
                        path: 'notifications',
                        component: () => import('~/pages/digital-identities/notifications.vue'),
                        name: 'digital-identities/notifications',
                    },
                    {
                        path: 'templates',
                        component: () => import('~/pages/digital-identities/templates.vue'),
                        name: 'digital-identities/templates',
                    }
                ]
            },

            // 区块链网关
            {
                path: 'gateways',
                component: () => import('~/pages/gateways.vue'),
                children: [
                    {
                        path: '',
                        name: 'gateways',
                        redirect: () => {
                            return {
                                name: 'gateways/devices'
                            };
                        }
                    },
                    // 设备管理
                    {
                        path: 'devices',
                        component: () => import('~/pages/gateways/devices.vue'),
                        name: 'gateways/devices',
                    },
                    // 数据存证
                    {
                        path: 'data-certs',
                        component: () => import('~/pages/gateways/data-certs.vue'),
                        name: 'gateways/data-certs',
                    },
                    // 文件存证
                    {
                        path: 'file-certs',
                        component: () => import('~/pages/gateways/file-certs.vue'),
                        name: 'gateways/file-certs',
                    },
                    // 缓存监控
                    {
                        path: 'caches',
                        component: () => import('~/pages/gateways/caches.vue'),
                        name: 'gateways/caches',
                    },
                    // 服务监控
                    {
                        path: 'services',
                        component: () => import('~/pages/gateways/services.vue'),
                        name: 'gateways/services',
                    },
                    // 区块链浏览器
                    {
                        path: 'explorer',
                        component: () => import('~/pages/gateways/explorer.vue'),
                        name: 'gateways/explorer',
                    },
                ]
            },

            // 区块链数据归档
            {
                path: 'archives',
                component: () => import('~/pages/archives.vue'),
                children: [
                    {
                        path: '',
                        name: 'archives',
                        redirect: () => {
                            return {
                                name: 'archives/snapshots'
                            };
                        }
                    },

                    // 数据快照
                    {
                        path: 'snapshots',
                        component: () => import('~/pages/archives/snapshots.vue'),
                        name: 'archives/snapshots',
                    },
                    
                    // 数据归档
                    {
                        path: 'backups',
                        component: () => import('~/pages/archives/backups.vue'),
                        name: 'archives/backups',
                    },

                    // 数据还原
                    {
                        path: 'restores',
                        component: () => import('~/pages/archives/restores.vue'),
                        name: 'archives/restores',
                    },
                    
                    // 文件日志
                    {
                        path: 'logs',
                        component: () => import('~/pages/archives/logs.vue'),
                        name: 'archives/logs',
                    },
                ]
            },
        ],
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
