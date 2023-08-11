<template>
    <span
        class="
            px-4 flex items-center
        ">

        <dropdown
            class="
                flex items-center
                px-2 py-0.5
                rounded hoverable clickable text-white
            "
            :offset-top="25">

            <template
                #button>

                <img
                    class="
                        w-[24px] h-[24px] mr-2
                    "
                    :src="__USER_AVATAR__"
                    alt="avatar">

                <span>
                    <span
                        class="
                            block text-sm
                        ">
                        150****6942
                    </span>
                    <span
                        class="
                            block text-xs text-left
                        ">
                        admin
                    </span>
                </span>
                
            </template>

            <template
                v-slot="{ close }">

                <nav
                    class="
                        text-sm
                    ">
                    <router-link
                        @click="close"
                        class="
                            relative p-4
                            flex justify-between items-center
                            hoverable
                        "
                        :to="{
                            name: 'logout'
                        }"
                        v-wave>
                        <span>
                            退出登录
                        </span>
                        <i
                            class="
                                mdi mdi-logout-variant
                            "></i>
                    </router-link>
                </nav>

            </template>

        </dropdown>

    </span>
</template>

<script lang="ts" setup>

import __USER_AVATAR__ from '~/assets/images/avatar.svg';

import {
    defineAsyncComponent,
} from 'vue';

const Dropdown = defineAsyncComponent(
    () => import(
        '~/components/dropdown.vue'
    )
);

</script>