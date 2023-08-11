<template>
    <default-layout-sidebar
        without-split>

    </default-layout-sidebar>

    <default-layout-content/>
</template>

<script lang="ts" setup>

import { useDefaultLayout } from '~/composables/useDefaultLayout';

const {
    DefaultLayoutSidebar,
    DefaultLayoutContent
} = useDefaultLayout();

</script>