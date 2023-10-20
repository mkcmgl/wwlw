<style lang="scss">

    .sidebar-links-group {

        @apply text-sm;

        // hide default arrow
        summary {
            list-style: none;
            &::-webkit-details-marker {
                display: none;
            }
        }

        summary {
            & > .arrow-icon {
                transition: transform 0.2s;
            }
        }

        &[open] {
            summary {
                & > .arrow-icon {
                    transform: rotate(180deg);
                }
            }
        }
    }

</style>

<template>

    <details
        class="
            sidebar-links-group
        ">

        <summary
            class="
                relative hoverable
                w-full
                pl-6 py-3 cursor-pointer select-none
            "
            v-wave>
            <span
                class="
                    flex items-center
                "
                v-html="item.label"/>
            <span
                class="
                    arrow-icon
                    absolute right-4 top-1/2 -translate-y-1/2
                ">
                <img
                    class="
                        w-[8px]
                    "
                    :src="__ARROW_ICON__">
            </span>
        </summary>

        <nav
            class="
                pl-6
            ">
            <router-link
                v-for="(link, index) in item.links"
                :key="index"
                :to="link.route"
                :class="{
                    'enable-hoverable font-bold text-blue-600': isActiveRoute(link.route),
                }"
                class="
                    my-1.5
                    block px-6 py-3
                    rounded-l-lg
                    relative hoverable clickable
                "
                v-wave>
                {{ link.label }}
            </router-link>
        </nav>

    </details>

</template>

<script lang="ts" setup>

import __ARROW_ICON__ from '~/assets/images/sidebar-arrow.svg';

import {
    type RouteLocationNamedRaw,
    useRoute,
} from 'vue-router';

type Item = {
    label: string;
    links: {
        route: RouteLocationNamedRaw;
        label: string;
    }[];
};

defineProps<{
    item: Item;
}>();

const currentRoute = useRoute();

const isActiveRoute = (route: RouteLocationNamedRaw) => {
    return currentRoute.name?.toString().startsWith(route.name as string);
};

</script>