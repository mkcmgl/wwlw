<template>

    <default-layout-sidebar>
        <template
            #sidebar-title>
            <img
                :src="__LOGO__"
                alt="数字资产"
                class="
                    mr-2.5
                "/>
            <strong
                class="
                    text-sm
                ">
                数字资产
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
} = useDefaultLayout();

</script>