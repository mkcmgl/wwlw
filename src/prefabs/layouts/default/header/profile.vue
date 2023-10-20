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

                <span
                    class="
                        max-w-[100px]
                    ">
                    <span
                        class="
                            block text-sm
                        ">
                        {{ decrypt(user?.mobile.toString())?.replace(/^(\d{3})(\d{4})(\d{4})$/, '$1****$3') }}
                    </span>
                    <span
                        class="
                            block text-xs text-left
                            truncate overflow-hidden
                        ">
                        {{ decrypt(user.username) }}
                    </span>
                </span>
                
            </template>

            <template
                v-slot="{ close }">

                <nav
                    class="
                        text-sm
                    ">
                    <button
                        @click="close(), showLogoutDialog = true"
                        type="button"
                        class="
                            relative p-4
                            flex justify-between items-center
                            hoverable
                            w-full
                        "
                        v-wave>
                        <span>
                            退出登录
                        </span>
                        <i
                            class="
                                mdi mdi-logout-variant
                            "></i>
                    </button>
                </nav>

            </template>

        </dropdown>

    </span>

    <logout-dialog
        v-model:show="showLogoutDialog"/>

</template>

<script lang="ts" setup>

import __USER_AVATAR__ from '~/assets/images/avatar.svg';

import {
    defineAsyncComponent,
    ref,
    computed,
} from 'vue';

import {
    useAuthStore
} from '~/store/auth';

import decrypt from '~/utils/decrypt';

const Dropdown = defineAsyncComponent(
    () => import(
        '~/components/dropdown.vue'
    )
);

const LogoutDialog = defineAsyncComponent(
    () => import(
        '~/prefabs/layouts/default/header/logout-dialog.vue'
    )
);

const showLogoutDialog = ref(false);

const authStore = useAuthStore();

const user = computed(
    () => authStore.user
);

</script>