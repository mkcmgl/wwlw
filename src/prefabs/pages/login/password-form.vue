<template>
    <i-form
        @submit="storeToken">

        <i-input
            v-model="form.username"
            v-model:error="error.username"
            name="username"
            type="text"
            placeholder="请输入账号"
            attr="注册账号"
            :rules="[
                'required',
            ]"
            theme="auth-page">

            <template #icon>
                <svg xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18">
                    <g
                        transform="translate(-1302 -468)">
                        <path
                            d="M80.232,25.9a4.694,4.694,0,1,0-4.625-4.693A4.664,4.664,0,0,0,80.232,25.9Zm1.906.452H78.673a5.887,5.887,0,0,0-5.84,5.922v.351c0,1.707,2.577,1.707,5.84,1.707h3.465c3.134,0,5.84,0,5.84-1.707v-.351A5.888,5.888,0,0,0,82.138,26.356Z"
                            transform="translate(1230.594 451.573)"/>
                    </g>
                </svg>
            </template>

        </i-input>

        <i-input
            v-model="form.password"
            v-model:error="error.password"
            name="password"
            type="password"
            placeholder="请输入密码"
            attr="密码"
            :rules="[
                'required',
            ]"
            theme="auth-page">

            <template #icon>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18">
                    <g
                        transform="translate(-1302 -468)">
                        <path
                            d="M133.445,7.1H130.9V4.333a3.779,3.779,0,0,1,.383-1.686,4.388,4.388,0,0,1,1.059-1.375,5.026,5.026,0,0,1,1.593-.933A5.746,5.746,0,0,1,135.946,0a5.234,5.234,0,0,1,1.865.339,5.342,5.342,0,0,1,1.593.933,4.659,4.659,0,0,1,1.109,1.375,3.553,3.553,0,0,1,.413,1.686V7.1h-2.44V4.86a2.372,2.372,0,0,0-.706-1.837,2.718,2.718,0,0,0-1.916-.65,2.4,2.4,0,0,0-1.754.65,2.45,2.45,0,0,0-.665,1.837V7.1Zm8.692,1.13a1.326,1.326,0,0,1,.938.367,1.158,1.158,0,0,1,.393.876v5.84a2.37,2.37,0,0,1-.192.951,2.408,2.408,0,0,1-1.311,1.29,2.578,2.578,0,0,1-1,.188H130.783a2.5,2.5,0,0,1-.988-.188,2.375,2.375,0,0,1-.756-.5,2.2,2.2,0,0,1-.484-.725,2.294,2.294,0,0,1-.171-.885V9.476a1.172,1.172,0,0,1,.383-.876,1.291,1.291,0,0,1,.928-.367h12.443Z"
                            transform="translate(1175.074 468.127)"/>
                        </g>
                    </svg>
            </template>
            
        </i-input>

        <code-input
            ref="captchaInput"
            v-model="form.captcha"
            v-model:error="error.captcha"
            v-model:uuid="form.uuid"
            name="captcha"
            type="text"
            placeholder="请输入验证码"
            attr="验证码"
            :rules="[
                'required'
            ]"
            theme="auth-page">
            <template #icon>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                    <g transform="translate(-1302 -468)">
                        <path class="b"
                            d="M118.17,53.833a1.262,1.262,0,0,0-1-1.152,23.6,23.6,0,0,1-3.229-.74,12.007,12.007,0,0,1-2.883-1.649,1.326,1.326,0,0,0-1.548.046,7.577,7.577,0,0,1-2.909,1.622,10.851,10.851,0,0,1-3.148.775,1.173,1.173,0,0,0-.992,1.1s-.071,2.8.019,5.257c.034,4.4,5.238,8.742,7.868,8.742,2.589,0,7.062-3.028,7.766-8.678C118.286,55.8,118.17,53.833,118.17,53.833Zm-4.038,3.857-4.475,4.529a.557.557,0,0,1-.733.041L106.587,60.4a.885.885,0,0,1-.094-1.332,1.108,1.108,0,0,1,1.463-.1l1.085.849,3.728-3.512a1.015,1.015,0,0,1,1.385.006c-.005-.006-.007-.013-.013-.019l.032.032c-.006-.006-.013-.007-.019-.013A.991.991,0,0,1,114.132,57.689Z"
                            transform="translate(1200.68 418.051)" />
                    </g>
                </svg>
            </template>
        </code-input>

        <i-checkbox
            class="
                mb-4 ml-5
            "
            v-model="form.remember"
            placeholder="保持登录状态"/>

        <button
            class="
                block w-full p-2.5
                rounded-full
                text-white
                tracking-widest
                clickable relative
                overflow-hidden
                linear-hover
            "
            :class="[
                loading
                    ? 'cursor-not-allowed backdrop-grayscale'
                    : ''
            ]"
            type="submit"
            :disabled="loading"
            v-wave="!loading">
            <i
                v-if="loading"
                class="
                    mdi mdi-loading mdi-spin mr-2
                "></i>
            登录
        </button>

    </i-form>

</template>

<script lang="ts" setup>

import {
    ref
} from 'vue';

import {
    useAuthStore
} from '~/store/auth';

import {
    useRouter
} from 'vue-router';

import encrypt from '~/utils/encrypt';

import IForm from '~/components/form.vue';
import IInput from '~/components/input.vue';
import ICheckbox from '~/components/checkbox.vue';
import CodeInput from "~/components/code-input.vue";

import axios from '~/plugins/axios';

const form = ref({
    username: '',
    password: '',
    remember: false,
    captcha: '',
    uuid: '',
});

const error = ref({
    username: '',
    password: '',
    captcha: '',
});

const loading = ref(false);

const authStore = useAuthStore();

const router = useRouter();

const captchaInput = ref();

const storeToken = () => {

    loading.value = true;

    const formData = {
        password: encrypt(form.value.password),
        username: encrypt(form.value.username),
        uuid: form.value.uuid,
        imgCode: form.value.captcha,
    };
    
    axios.post(
        '/auth/login',
        formData
    )
        .then(({ data }) => {
            
            const { data:authorization } = data as {
                data: {
                    accessToken: string;
                    expiresTime: string;
                    refreshToken: string;
                    userId: number;
                }
            };

            authStore.setToken(authorization.accessToken);
            authStore
                .refreshUser()
                .then(() => {
                    router.push({
                        name: 'index'
                    });
                });
        })
        .catch(() => {
            captchaInput.value.getCaptcha();
            captchaInput.value.refresh();
        })
        .finally(() => {
            loading.value = false;
        });
};

</script>