<template>
    <default-layout-sidebar>
        <template #sidebar-title>
            <img :src="__OVERVIEW_LOGO__" alt="数字身份" class="
                    mr-2.5
                " />
            <strong class="
                    text-sm
                ">
                总览
            </strong>
        </template>
    </default-layout-sidebar>

    <default-layout-content/>
</template>

<script lang="ts" setup>

import { useDefaultLayout } from '~/composables/useDefaultLayout';

import __OVERVIEW_LOGO__ from '~/assets/images/overview.svg';

const {
    DefaultLayoutSidebar,
    DefaultLayoutContent
} = useDefaultLayout();

</script>