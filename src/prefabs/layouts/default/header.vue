<template>
    <header
        class="
            fixed top-0 left-0 z-10
            h-[125px] w-full
            bg-[linear-gradient(267deg,#04D8FD_0%,#0477FD_100%)]
            rounded-bl-[30px]
            shadow-[0px_4px_8px_1px_#C4C8FF]
            flex
        ">
        
        <nav
            class="
                w-[200px] h-full
                flex items-center justify-center
            ">
            <router-link
                :to="{
                    name: 'index'
                }">
                <img
                    class="
                        h-[85px] w-[85px]
                    "
                    :src="__LOGO_MONOCHROME__"
                    :alt="__APP_NAME__">
            </router-link>
        </nav>

        <div
            class="
                w-[calc(100%-200px)] h-[70px]
                flex items-center justify-between
            ">

            <h1
                class="
                    text-lg text-white tracking-wider
                ">
                {{ __APP_NAME__ }}
            </h1>

            <div
                class="
                    flex items-center
                ">

                <header-nav/>

                <span
                    class="
                        block h-[24px] w-[1px] bg-slate-50/75
                    "/>

                <header-notification/>

                <span
                    class="
                        block h-[24px] w-[1px] bg-slate-50/75
                    "/>

                <header-profile/>

            </div>

        </div>

    </header>
</template>

<script lang="ts" setup>

import HeaderNav from '~/prefabs/layouts/default/header/nav.vue';
import HeaderNotification from '~/prefabs/layouts/default/header/notification.vue';
import HeaderProfile from '~/prefabs/layouts/default/header/profile.vue';

import { ExtendImportMeta } from '~/types.d';

import __LOGO_MONOCHROME__ from '~/assets/images/logo-monochrome.svg';

const __APP_NAME__ = (import.meta as ExtendImportMeta).env.VITE_APP_NAME;

</script>