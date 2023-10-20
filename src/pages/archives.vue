<template>

    <default-layout-sidebar
        :items="[
            {
                label: `
                    <img
                        class='
                            mr-2
                        '
                        src='${__BLOCKCHAIN_DATA_ARCHIVES_ICON__}'/>
                    数据归档
                `,
                links: [
                    {
                        label: '数据快照',
                        route: {
                            name: 'archives/snapshots'
                        }
                    },
                    {
                        label: '数据归档',
                        route: {
                            name: 'archives/backups'
                        }
                    },
                    {
                        label: '数据还原',
                        route: {
                            name: 'archives/restores'
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
                        src='${__LOG_ICON__}'/>
                    日志管理
                `,
                links: [
                    {
                        label: '文件日志',
                        route: {
                            name: 'archives/logs'
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

import __LOGO__ from '~/assets/images/archives.svg';

import __BLOCKCHAIN_DATA_ARCHIVES_ICON__ from '~/assets/images/archives-icon.svg';
import __LOG_ICON__ from '~/assets/images/log-icon.svg';

import { useDefaultLayout } from '~/composables/useDefaultLayout';

const {
    DefaultLayoutSidebar,
    DefaultLayoutContent,
} = useDefaultLayout();

</script>