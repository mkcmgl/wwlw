<style lang="scss">
#type-select-nav a {

    @apply relative;

    &::after {
        @apply block w-[25px] h-[3px] rounded absolute top-[calc(100%+6px)] left-1/2 -translate-x-1/2;
        content: ' ';
    }

    &[aria-exact="true"] {
        @apply text-blue-600 font-bold;

        &::after {
            @apply bg-blue-600;
        }
    }

    &[aria-exact="false"] {
        @apply text-slate-600/50;
    }
}
</style>

<template>
    <div :style="{
        'background-image': `url(${__LOGIN_BG__})`
    }" class="
            h-screen w-screen
            bg-no-repeat bg-cover
            flex
        ">

        <div class="
                flex-1
            ">

            <h1 class="
                    flex items-center w-full
                    p-10
                ">
                <img src="images/logo-color.svg" :alt="__APP_NAME__"  class="w-8 h-8"/>
                <span class="
                       text-neutral-500 text-lg ml-2
                    ">
                    基于区块链的物联网数据管理和服务平台
                    <!-- {{ __APP_NAME__ }} -->
                </span>
            </h1>

        </div>

        <div class="
                flex-1
                relative
                h-screen
                overflow-y-auto
            ">
            <div class="
                    pt-[max(12vh,120px)]
                ">

                <div class="
                        mb-4
                    ">
                    <img class="
                            w-[85px] h-[85px] mx-auto block
                        " src="images/logo-color-with-frame.svg" :alt="__APP_NAME__">
                    <p class="
                            text-2xl font-bold my-2 text-center
                        ">
                        欢迎登录
                    </p>
                </div>

                <nav id="type-select-nav" class="
                        my-6 w-[300px] mx-auto
                        flex justify-around
                    ">
                    <router-link :aria-exact="type === 'password'" :to="{
                        name: 'login',
                    }">
                        账号登录
                    </router-link>
                    <router-link :aria-exact="type === 'phone'" :to="{
                        name: 'login',
                        query: {
                            type: 'phone'
                        }
                    }">
                        手机登录
                    </router-link>
                </nav>

                <div class="
                        w-[350px] mx-auto my-6
                    ">
                    <template v-if="type === 'password'">
                        <password-form />
                    </template>
                    <template v-else>
                        <phone-form />
                    </template>
                </div>

                <footer class="
                        my-6
                    ">
                    <p class="
                            text-sm text-center
                        ">
                        没有账号？
                        <router-link class="
                                text-blue-600 no-underline hover:underline
                            " :to="{
                                name: 'register'
                            }">
                            立即注册
                        </router-link>
                    </p>
                </footer>

            </div>
        </div>


    </div>
</template>

<script lang="ts" setup>

import { useMeta } from 'vue-meta';
import { useRoute, useRouter } from 'vue-router';
import { computed, defineAsyncComponent } from 'vue';

import __LOGIN_BG__ from '~/assets/images/login-bg.jpg';

import { ExtendImportMeta } from '~/types.d';

const __APP_NAME__ = (import.meta as ExtendImportMeta).env.VITE_APP_NAME;


const PasswordForm = defineAsyncComponent(() => import(
    '~/prefabs/pages/login/password-form.vue'
));
const PhoneForm = defineAsyncComponent(() => import(
    '~/prefabs/pages/login/phone-form.vue'
));

useMeta({
    title: '登录'
});

const route = useRoute();
const router = useRouter();

const type = computed(() => {
    return route.query.type as string === 'phone' ? 'phone' : 'password';
});

if (!['phone', 'password'].includes(route.query.type as string)) {
    router.replace({
        name: 'login',
    });
}

</script>