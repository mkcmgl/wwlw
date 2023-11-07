<template>
    <default-layout-sidebar :items="sidebarItems">
        <template #sidebar-title>
            <img :src="__LOGO__" alt="数字身份" class="
                    mr-2.5
                " />
            <strong class="
                    text-sm
                ">
                数字身份
            </strong>
        </template>
    </default-layout-sidebar>

    <default-layout-content/>

</template>

<script lang="ts" setup>

import __LOGO__ from '~/assets/images/digital-identities.svg';

import __DIGITAL_IDENTITIES_ICON__ from '~/assets/images/digital-identities-icon.svg';
import __COMPANIES_ICON__ from '~/assets/images/companies-icon.svg';
import __MESSAGES_ICON__ from '~/assets/images/messages-icon.svg';

import { useDefaultLayout } from '~/composables/useDefaultLayout';

import {
    useAuthStore
} from '~/store/auth';

import {
    computed,
} from 'vue';

const {
    DefaultLayoutSidebar,
    DefaultLayoutContent
} = useDefaultLayout('数字身份');

const authStore = useAuthStore();

const sidebarItems = computed(() => {
    let identity= {
        label: `
                <img
                    class='
                        mr-2
                    '
                    src='${__DIGITAL_IDENTITIES_ICON__}'/>
                数字身份
            `,
        links: [
            {
                label: '我的数字身份',
                route: {
                    name: 'digital-identities/mine'
                }
            },

        ]
    };
    
    if (authStore.user?.roles.map(role => role.code).includes('super_admin')) {
        identity.links=[
            ...identity.links,
            {
                label: '实名认证审核',
                route: {
                    name: 'digital-identities/audit'
                }
            },
        ];
    }

    let items = [
        identity
    ];

    if (
        authStore.isVerified
        && !authStore.isPersonUser
    ) {
        items = [
            ...items,
            {
                label: `
                        <img
                            class='
                                mr-2
                            '
                            src='${__COMPANIES_ICON__}'/>
                        企业管理
                    `,
                links: [
                    {
                        label: '成员管理',
                        route: {
                            name: 'digital-identities/companies'
                        }
                    }
                ]
            }
        ];
    }

    let messageItem = {
        label: `
            <img
                    class='
                        mr-2
                    '
                    src='${__MESSAGES_ICON__}'/>
                消息中心
            `,
        links: [
            {
                label: '消息中心',
                route: {
                    name: 'digital-identities/messages'
                }
            }
        ]
    };


    if (authStore.user?.roles.map(role => role.code).includes('super_admin')) {
        messageItem.links = [
            ...messageItem.links,
            {
                label: '站内公告',
                route: {
                    name: 'digital-identities/notifications'
                }
            }
        ];
    }

    return [
        ...items,
        messageItem
    ];

});





</script>