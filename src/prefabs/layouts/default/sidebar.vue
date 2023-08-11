<template>
    <aside
        class="
            w-[200px] h-screen overflow-hidden
            pt-[125px]
            fixed left-0 top-0 bg-white
        ">
        
        <div
            v-if="!withoutSplit"
            class="
                px-5 h-16 flex items-center
            ">
            <slot name="sidebar-title"/>
        </div>

        <hr
            class="
                border
            "
            v-if="!withoutSplit">

        <div
            class="
                hideable-scrollbar-wrapper
            ">
            <div
                :class="[
                    withoutSplit
                        ? 'h-[calc(100vh-125px)]'
                        : 'h-[calc(100vh-125px-theme(space.16))]'  
                ]"
                class="
                    overflow-y-auto overflow-x-hidden
                ">
                <links-group
                    v-for="(item, index) in items"
                    :key="index"
                    :item="item"/>
            </div>
        </div>

    </aside>
</template>

<script lang="ts" setup>

import {
    type RouteLocationNamedRaw
} from 'vue-router';

import LinksGroup from '~/prefabs/layouts/default/sidebar/links-group.vue';

type Item = {
    label: string;
    links: {
        route: RouteLocationNamedRaw;
        label: string;
    }[];
};

withDefaults(defineProps<{
    withoutSplit?: boolean;
    items?: Item[];
}>(), {
    withoutSplit: false,
    links: () => []
});

</script>