<template>

    <fieldset
        v-bind="wrapperAttrs"
        class="
            i-captcha-input-wrapper
        "
        :class="[
            {
                'i-input-wrapper--error': hasError,
            }
        ]"
        :aria-data-theme="theme">

        <div
            class="
                relative
            ">

            <input
                class="
                    i-input
                "
                :class="[
                    {
                        'has-value': !!computedValue,
                        'has-icon-prefix': hasIcon,
                    }
                ]"
                v-model="computedValue"
                v-bind="innerAttrs"
                type="text"
                :id="id"
                :aria-describedby="`${id}-error ${id}-tip`"
                @blur="handleBlur">

            <span
                class="
                    i-input-icon
                "
                v-if="hasIcon">
                <slot name="icon"/>
            </span>

            <label
                class="
                    i-input-label
                "
                :for="id"
                v-html="placeholder"/>

            <button
                v-if="!!computedValue"
                class="
                    i-input-reset-button
                "
                type="reset"
                @click.prevent="clearValue">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18">
                    <path
                        d="M73,64a9,9,0,1,0,9,9A9.006,9.006,0,0,0,73,64Zm4.789,12.889-.916.916L73,73.916l-3.889,3.873-.916-.916L72.1,73l-3.889-3.889.916-.916L73,72.1l3.889-3.889.916.916L73.916,73Z"
                        transform="translate(-64 -64)"/>
                </svg>
            </button>

        </div>

        <p
            class="
                i-input-tip
            "
            v-if="!hasError && hasTip"
            v-html="tip"
            :id="`${id}-tip`"/>

        <p
            class="
                i-input-error
            "
            v-if="hasError"
            v-html="error"
            :id="`${id}-error`"/>

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
    computed,
    useSlots,
} from 'vue';


defineOptions({
    inheritAttrs: false,
    name: 'IInput',
});

const props = withDefaults(defineProps<
    InputProps & {
        captchaApi: string;
        phone: string;
        phoneError: string;
        theme?: string;
    }
>(), {
    theme: 'default',
});

const emits = defineEmits([
    'update:modelValue',
    'update:error',
    'update:phoneError'
]);

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

const slots = useSlots();
const hasIcon = computed(() => !!slots.icon);

defineExpose({
    refresh
});

</script>