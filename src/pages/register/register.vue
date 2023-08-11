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
        <div class=" register-left">
            <header class="flex items-center p-10">
                <img src="/images/login-white.svg" alt="区块链服务平台" class="w-8 h-8">
                <h1 class="text-neutral-500 text-lg ml-2">
                    基于区块链的物联网数据管理和服务平台
                </h1>
            </header>
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
import { defineAsyncComponent, onMounted, reactive, computed } from 'vue';
import __LOGIN_BG__ from '~/assets/images/register-bg.jpg';
// const Account = defineAsyncComponent(() => import('./components/account.vue'));
// const Mobile = defineAsyncComponent(() => import('./components/mobile.vue'));
const PasswordForm = defineAsyncComponent(() => import(
    '~/prefabs/pages/register/password-form.vue'
));



const form = reactive({
    username: '',
    password: '',
    passwordConfirm: '',
    phone: '',
    captcha: '',
    sms: '',
});
const error = reactive({
    username: '',
    password: '',
    passwordConfirm: '',
    phone: '',
    captcha: '',
    sms: '',
});
const register = async () => { }
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
