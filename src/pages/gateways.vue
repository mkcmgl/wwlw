<template>

    <default-layout-sidebar
        :items="[
            {
                label: `
                    <img
                        class='
                            mr-2
                        '
                        src='${__DEVICES_MANAGEMENT_ICON__}'/>
                    认证管理
                `,
                links: [
                    {
                        label: '设备管理',
                        route: {
                            name: 'gateways/devices'
                        }
                    }
                ]
            },
            {
                label: `
                    <img
                        class='
                            mr-2
                        '
                        src='${__CERT_ICON__}'/>
                    存证管理
                `,
                links: [
                    {
                        label: '数据存证',
                        route: {
                            name: 'gateways/data-certs'
                        }
                    },
                    {
                        label: '文件存证',
                        route: {
                            name: 'gateways/file-certs'
                        }
                    }
                ]
            },
            {
                label: `
                    <img
                        class='
                            mr-2
                        '
                        src='${__CACHE_ICON__}'/>
                    缓存监控
                `,
                links: [
                    {
                        label: '缓存监控',
                        route: {
                            name: 'gateways/caches'
                        }
                    }
                ]
            },
            {
                label: `
                    <img
                        class='
                            mr-2
                        '
                        src='${__SERVICES_ICON__}'/>
                    服务监控
                `,
                links: [
                    {
                        label: '服务监控',
                        route: {
                            name: 'gateways/services'
                        }
                    }
                ]
            },
            {
                label: `
                    <img
                        class='
                            mr-2
                        '
                        src='${__EXPLORER_ICON__}'/>
                    区块链浏览器
                `,
                links: [
                    {
                        label: '区块链浏览器',
                        route: {
                            name: 'gateways/explorer'
                        }
                    }
                ]
            }
        ]">
        <template
            #sidebar-title>
            <img
                :src="__LOGO__"
                alt="区块链网关"
                class="
                    mr-2.5
                "/>
            <strong
                class="
                    text-sm
                ">
                区块链网关
            </strong>
        </template>
    </default-layout-sidebar>

    <default-layout-content/>

</template>

<script lang="ts" setup>

import __LOGO__ from '~/assets/images/gateway.svg';

import __DEVICES_MANAGEMENT_ICON__ from '~/assets/images/devices-management-icon.svg';
import __CERT_ICON__ from '~/assets/images/cert-icon.svg';
import __CACHE_ICON__ from '~/assets/images/cache-icon.svg';
import __SERVICES_ICON__ from '~/assets/images/services-icon.svg';
import __EXPLORER_ICON__ from '~/assets/images/explorer-icon.svg';

import { useDefaultLayout } from '~/composables/useDefaultLayout';

const {
    DefaultLayoutSidebar,
    DefaultLayoutContent
} = useDefaultLayout('区块链网关');

</script>