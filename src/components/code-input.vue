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
        <button @click="getCaptcha" class="
                    code-input-button
                " type="button" title="看不清，换一张" :disabled="loading">
            <img :src="captcha" class="w-32 h-12" alt="图形验证码">
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
import axios from '~/plugins/axios';
import {
    useWrapper
} from '~/composables/useWrapper';

import {
    ref,
    computed,
    useSlots,
    onBeforeMount,
} from 'vue';

defineOptions({
    inheritAttrs: false,
    name: 'IInput',
});

let captcha = ref('');
onBeforeMount(() => {
    getCaptcha();

});
let loading = ref(false);
const emits = defineEmits([
    'update:modelValue',
    'update:error',
    'update:uuid'
]);
const getCaptcha = () => {
    loading.value = true;
    axios.get(`captchaImg`).then(({ data }) => {
        emits('update:uuid', data.data.uuid);
        captcha.value = `data:image/gif;base64,${data.data.img}`;
    }).finally(() => {
        loading.value = false;
    });


};
const props = withDefaults(defineProps<
    InputProps & {
        type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search';
        theme?: string
    }
>(), {
    rules: () => [],
    preventRegister: false,
    type: 'text',
    theme: 'default',
});



const {
    id,
    refresh,
    computedValue,
    validate,
    hasError,
    hasTip,
    clearValue,
    manualValidate
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
    getCaptcha,
    manualValidate

});

</script>