<style lang="scss">
.register-container {
    display: flex;

    .register-left {
        width: 34%;
    }

    .register-right {
        width: 66%;

        .register-right-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            min-height: 36rem;

            .register-right-title {
                .register-right-title-name {
                    font-size: 34px;
                    font-weight: bold;
                    color: #333333;
                    position: relative;
                }

            }
        }

    }
}
</style>

<template>
    <div :style="{
        'background-image': `url(${__LOGIN_BG__})`
    }" class="
            h-screen w-screen
            bg-no-repeat bg-cover
            register-container
        ">
        <div class="
                flex-1
            ">

            <h1 class="
                    flex items-center w-full
                    pt-4 pl-8
                ">
                <img :src="__LOGO_COLOR__" :alt="__APP_NAME__" />
                <span class="
                        ml-2 font-bold text-lg
                    ">
                    {{ __APP_NAME__ }}
                </span>
            </h1>

        </div>
        <div class="register-right overflow-y-auto">
            <div class="register-right-content">
                <div class="register-right-title">

                    <span class="register-right-title-name">欢迎注册</span>
                </div>
                <div id="form-wrapper" class="
                w-[600px]
                py-4 px-8 rounded-sm
                
            ">


                    <password-form />



                    <footer class="
                        my-6
                    ">
                        <p class="
                            text-sm text-center
                        ">
                            已有账号？
                            <router-link class="
                                text-blue-600 no-underline hover:underline
                            " :to="{
                                name: 'login'
                            }">
                                立即登录
                            </router-link>
                        </p>
                    </footer>

                </div>
            </div>
        </div>

    </div>
</template>
<script lang="ts" setup name="registerIndex">
import { defineAsyncComponent, } from 'vue';

import __LOGIN_BG__ from '~/assets/images/register-bg.jpg';

import __LOGO_COLOR__ from '~/assets/images/logo-color.svg';

// const Account = defineAsyncComponent(() => import('./components/account.vue'));
// const Mobile = defineAsyncComponent(() => import('./components/mobile.vue'));
const PasswordForm = defineAsyncComponent(() => import(
    '~/prefabs/pages/register/password-form.vue'
));
import { ExtendImportMeta } from '~/types.d';
const __APP_NAME__ = (import.meta as ExtendImportMeta).env.VITE_APP_NAME;


</script>
<style type="scss">
.el-tabs__item {
    padding: 0 50px;
}

.el-tabs__nav {
    float: none;
    justify-content: center;
}

.el-tabs__active-bar {
    left: 14px;
    width: 28px !important;
}

.el-tabs__nav-wrap::after {
    width: 0;
}
</style>
