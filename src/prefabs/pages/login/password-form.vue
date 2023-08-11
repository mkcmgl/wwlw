<template>
    <i-form
        @submit="storeToken">

        <i-input
            v-model="form.phone"
            v-model:error="error.phone"
            name="username"
            type="text"
            placeholder="请输入账号"
            attr="账号"
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
            "
            :class="[
                loading
                    ? 'bg-slate-300 cursor-not-allowed'
                    : 'bg-[linear-gradient(90deg,#04D8FD_0%,#0477FD_100%)]'
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

import IForm from '~/components/form.vue';
import IInput from '~/components/input.vue';
import ICheckbox from '~/components/checkbox.vue';

import { notify } from '~/plugins/notify';

const form = ref({
    phone: '',
    password: '',
    remember: false,
});

const error = ref({
    phone: '',
    password: '',
});

const loading = ref(false);

const storeToken = () => {
    loading.value = true;
    setTimeout(() => {
        loading.value = false;
    }, 2000);
};


</script>