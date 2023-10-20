<template>
    <fieldset v-bind="wrapperAttrs" class="
            i-input-wrapper
        " :class="[
            {
                'i-input-wrapper--error': hasError,
            }
        ]" :aria-data-theme="theme">

        <div class="
                relative
            ">

            <input class="
                    code-input
                " :class="[
                    {
                        'has-value': !!computedValue,
                        'has-icon-prefix': hasIcon,
                    }
                ]" v-model="computedValue" v-bind="innerAttrs" :type="computedType" :id="id"
                :aria-describedby="`${id}-error ${id}-tip`" @blur="handleBlur">

            <span class="
                    i-input-icon
                " v-if="hasIcon">
                <slot name="icon" />
            </span>

            <label class="
                    i-input-label
                " :for="id" v-html="placeholder" />

            <button v-if="type !== 'password' && !!computedValue" class="
                    code-input-reset-button
                " type="reset" @click.prevent="clearValue">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                    <path
                        d="M73,64a9,9,0,1,0,9,9A9.006,9.006,0,0,0,73,64Zm4.789,12.889-.916.916L73,73.916l-3.889,3.873-.916-.916L72.1,73l-3.889-3.889.916-.916L73,72.1l3.889-3.889.916.916L73.916,73Z"
                        transform="translate(-64 -64)" />
                </svg>
            </button>



        </div>
        <button @click="sendSms" :disabled="loading || countdown !== 0" v-wave="!loading && countdown === 0" type="button"
            class="absolute cursor-pointer z-20 block w-32 h-[calc(theme('space.10')+2px)] right-0 top-1 rounded overflow-hidden transition text-sm tracking-widest"
            :class="[
                {
                    'bg-blue-500 text-white hover:bg-blue-700 scale-100 active:scale-[99%] hover:scale-[101%]': !loading && countdown === 0,
                    'bg-slate-200 text-slate-400 cursor-not-allowed': loading || countdown > 0
                }
            ]">
            {{ buttonContent }}
        </button>



        <p class="
                i-input-tip
            " v-if="!hasError && hasTip" v-html="tip" :id="`${id}-tip`" />

        <p class="
                i-input-error
            " v-if="hasError" v-html="error" :id="`${id}-error`" />

    </fieldset>
</template>

<script lang="ts" setup>

import {
    type InputProps,
    useInput
} from '~/composables/useInput';

import {
    useWrapper
} from '~/composables/useWrapper';

import {
    ref,
    computed,
    useSlots,
} from 'vue';
import { notify } from '@kyvg/vue3-notification';
import axios from '~/plugins/axios';

defineOptions({
    inheritAttrs: false,
    name: 'IInput',
});

const props = withDefaults(defineProps<
    InputProps & {
        type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search';
        theme?: string;
        modelValue?: string;
        scene?: string;
        uuid?: string;
        mobile?: string;
        imgCode?: string;
        captchaInput?: any;
        phoneInput?: any;
    }
>(), {
    rules: () => [],
    preventRegister: false,
    type: 'text',
    theme: 'default',
});
import encrypt from '~/utils/encrypt';
const emits = defineEmits([
    'update:modelValue',
    'update:error',
]);
const loading = ref(false);
const {
    id,
    refresh,
    computedValue,
    validate,
    hasError,
    hasTip,
    clearValue,
} = useInput(props, emits);

const {
    wrapperAttrs,
    innerAttrs
} = useWrapper(['id', 'class', 'style', 'data-theme']);

const handleBlur = (e: FocusEvent) => {
    validate(e as unknown as {
        target: HTMLInputElement;
    });
};

const showPassword = ref(false);

const computedType = computed(() => {
    if (props.type === 'password' && showPassword.value) {
        return 'text';
    }
    return props.type;
});

const slots = useSlots();
const hasIcon = computed(() => !!slots.icon);

defineExpose({
    refresh,
    validate
});


const countdown = ref(0);
const buttonContent = computed(() => {
    if (countdown.value > 0) {
        return `${countdown.value} 秒后重试`;
    }
    return '获取验证码';
});
const sendSms = () => {

    let [phoneError, captchaError] = [props.phoneInput.manualValidate(), props.captchaInput.manualValidate()];
    if (phoneError && captchaError) {
        loading.value = true;
        axios.post(
            '/auth/send-sms-code', { mobile: encrypt(props.mobile as string), scene: props.scene, uuid: props.uuid, imgCode: props.imgCode }
        ).then(({ data }) => {
            if (data.code == 0) {
                notify({
                    type: 'success',
                    text: '短信发送成功，1 分钟内有效',
                });
                countdown.value = 60;

                let timer = setInterval(() => {
                    countdown.value--;
                    if (countdown.value === 0) {
                        clearInterval(timer);
                    }
                }, 1000);
            } else {
                notify({
                    type: 'error',
                    text: `短信发送失败：${data.msg}`,
                });
                throw new Error(data.msg);
            }

        }).catch(() => {
            props.captchaInput.getCaptcha();
            props.captchaInput.refresh();
        }).finally(() => {
            loading.value = false;
        });
    }

};

</script>