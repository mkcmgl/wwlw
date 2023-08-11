<template>

    <default-layout-sidebar
        :items="[
            {
                label: '数字身份',
                links: [
                    {
                        label: '我的数字身份',
                        route: {
                            name: 'digital-identities/mine'
                        }
                    },
                ]
            },
            {
                label: '企业管理',
                links: [
                    {
                        label: '成员管理',
                        route: {
                            name: 'digital-identities/companies'
                        }
                    }
                ]
            },
            {
                label: '消息中心',
                links: [
                    {
                        label: '消息中心',
                        route: {
                            name: 'digital-identities/messages'
                        }
                    }
                ]
            }
        ]">
        <template
            #sidebar-title>
            <img
                :src="__LOGO__"
                alt="数字身份"
                class="
                    mr-2.5
                "/>
            <strong
                class="
                    text-sm
                ">
                数字身份
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
    DefaultLayoutContent
} = useDefaultLayout('数字身份');

</script>