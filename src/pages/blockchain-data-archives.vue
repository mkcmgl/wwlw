<template>

    <default-layout-sidebar
        :items="[
            {
                label: '数据归档',
                links: [
                    {
                        label: '数据快照',
                        route: {
                            name: 'blockchain-data-archives/snapshots'
                        }
                    },
                    {
                        label: '数据归档',
                        route: {
                            name: 'blockchain-data-archives/archives'
                        }
                    },
                    {
                        label: '数据还原',
                        route: {
                            name: 'blockchain-data-archives/restores'
                        }
                    }
                ]
            },
            {
                label: '文件日志',
                links: [
                    {
                        label: '文件日志',
                        route: {
                            name: 'blockchain-data-archives/logs'
                        }
                    }
                ]
            },
        ]">
        <template
            #sidebar-title>
            <img
                :src="__LOGO__"
                alt="区块链数据归档"
                class="
                    mr-2.5
                "/>
            <strong
                class="
                    text-sm
                ">
                区块链数据归档
            </strong>
        </template>
    </default-layout-sidebar>

    <default-layout-content/>

</template>

<script lang="ts" setup>

import __LOGO__ from '~/assets/images/blockchain-gateway.svg';

import { useDefaultLayout } from '~/composables/useDefaultLayout';

const {
    DefaultLayoutSidebar,
    DefaultLayoutContent,
} = useDefaultLayout();

</script>