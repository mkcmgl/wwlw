<template>
    <i-form @submit="storeToken">

        <i-input v-model="form.phone" v-model:error="error.phone" name="username" type="text" placeholder="请输入手机号"
            attr="手机号" :rules="[
                'required',
            ]" theme="auth-page">

            <template #icon>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                    <g transform="translate(-1302 -468)">
                        <path
                            d="M80.232,25.9a4.694,4.694,0,1,0-4.625-4.693A4.664,4.664,0,0,0,80.232,25.9Zm1.906.452H78.673a5.887,5.887,0,0,0-5.84,5.922v.351c0,1.707,2.577,1.707,5.84,1.707h3.465c3.134,0,5.84,0,5.84-1.707v-.351A5.888,5.888,0,0,0,82.138,26.356Z"
                            transform="translate(1230.594 451.573)" />
                    </g>
                </svg>
            </template>

        </i-input>

        <sms-input v-model="form.sms" v-model:error="error.sms" name="sms" type="text" placeholder="请输入验证码"
            attr="验证码" :rules="[
                'required',
            ]" theme="auth-page">

            <template #icon>
                 <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                        <g transform="translate(-1302 -468)">
                            <path class="b"
                                d="M118.17,53.833a1.262,1.262,0,0,0-1-1.152,23.6,23.6,0,0,1-3.229-.74,12.007,12.007,0,0,1-2.883-1.649,1.326,1.326,0,0,0-1.548.046,7.577,7.577,0,0,1-2.909,1.622,10.851,10.851,0,0,1-3.148.775,1.173,1.173,0,0,0-.992,1.1s-.071,2.8.019,5.257c.034,4.4,5.238,8.742,7.868,8.742,2.589,0,7.062-3.028,7.766-8.678C118.286,55.8,118.17,53.833,118.17,53.833Zm-4.038,3.857-4.475,4.529a.557.557,0,0,1-.733.041L106.587,60.4a.885.885,0,0,1-.094-1.332,1.108,1.108,0,0,1,1.463-.1l1.085.849,3.728-3.512a1.015,1.015,0,0,1,1.385.006c-.005-.006-.007-.013-.013-.019l.032.032c-.006-.006-.013-.007-.019-.013A.991.991,0,0,1,114.132,57.689Z"
                                transform="translate(1200.68 418.051)" />
                        </g>
                    </svg>
            </template>

        </sms-input>

        <i-checkbox class="
                mb-4 ml-5
            " v-model="form.remember" placeholder="保持登录状态" />

        <button class="
                block w-full p-2.5
                rounded-full
                text-white
                tracking-widest
                clickable relative
            " :class="[
                loading
                    ? 'bg-slate-300 cursor-not-allowed'
                    : 'bg-[linear-gradient(90deg,#04D8FD_0%,#0477FD_100%)]'
            ]" type="submit" :disabled="loading" v-wave="!loading">
            <i v-if="loading" class="
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
import SmsInput from "~/components/sms-input.vue";
import { notify } from '~/plugins/notify';

const form = ref({
    phone: '',
    sms: '',
    remember: false,
});

const error = ref({
    phone: '',
    sms: '',
});

const loading = ref(false);

const storeToken = () => {
    loading.value = true;
    setTimeout(() => {
        loading.value = false;
    }, 2000);
};


</script>