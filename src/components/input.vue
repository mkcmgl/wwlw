<style lang="scss">

    .i-input-wrapper {

        .i-input-label {
            @apply truncate w-[calc(100%-theme('spacing.12'))];
        }
    }

    .i-input-wrapper[aria-data-theme=auth-page] {

        @apply relative pb-5 h-fit;

        .i-input-icon {

            @apply absolute left-5 top-1/2 -translate-y-1/2;

            svg {
                @apply w-4 h-4 fill-slate-500/50;
            }
        }

        .i-input-label {

            @apply absolute left-12 top-1/2 -translate-y-1/2 text-slate-500/75;
        }

        .i-input-reset-button,
        .i-input-show-password-button {
                
            @apply absolute right-5 top-1/2 -translate-y-1/2;

            svg {
                @apply w-4 h-4 fill-slate-500/50;
            }
        }

        .i-input {

            @apply w-full py-2.5 rounded-3xl pr-12 border-[2px] border-slate-200/75 outline-none;

            &.has-icon-prefix {
                @apply pl-12;
            }

            &:not(.has-icon-prefix) {
                @apply pl-4;
            }
        }

        .i-input:focus {

            @apply border-blue-600/50;

            & + .i-input-icon svg {
                @apply fill-blue-600/75;
            }

            & + .i-input-icon + .i-input-label,
            & + .i-input-label {
                @apply hidden;
            }
        }

        .i-input.has-value {
            & + .i-input-icon + .i-input-label,
            & + .i-input-label {
                @apply hidden;
            }
        }


        &.i-input-wrapper--error {

            .i-input {
                @apply border-red-600/50 text-red-600;
            }

            & > div svg {
                opacity: 75%;
                fill: theme('colors.red.600') !important;
            }
        }

        .i-input-error {
            @apply absolute bottom-0 h-5 leading-5 text-xs text-red-600 left-0;
        }
    }

    .i-input-wrapper[aria-data-theme=default] {

        @apply relative;

        .i-input-icon {

            @apply absolute left-5 top-1/2 -translate-y-1/2;

            svg {
                @apply w-4 h-4 fill-slate-500/50;
            }
        }

        .i-input-label {

            @apply absolute top-1/2 -translate-y-1/2 text-slate-500/75 left-2 cursor-text;
        }

        .i-input-reset-button,
        .i-input-show-password-button {
                
            @apply absolute right-4 top-1/2 -translate-y-1/2;

            svg {
                @apply w-4 h-4 fill-slate-500/50;
            }
        }

        .i-input {

            @apply w-full py-2 rounded pr-12 border-[2px] border-slate-200/75 outline-none;

            &.has-icon-prefix {
                @apply pl-12;
            }

            &:not(.has-icon-prefix) {
                @apply pl-2;
            }
        }

        .i-input:focus {

            @apply border-blue-600/50;

            & + .i-input-icon svg {
                @apply fill-blue-600/75;
            }

            & + .i-input-icon + .i-input-label,
            & + .i-input-label {
                @apply hidden;
            }
        }

        .i-input.has-value {
            & + .i-input-icon + .i-input-label,
            & + .i-input-label {
                @apply hidden;
            }
        }


        &.i-input-wrapper--error {

            .i-input {
                @apply border-red-600/50 text-red-600;
            }

            & > div svg {
                opacity: 75%;
                fill: theme('colors.red.600') !important;
            }
        }

        .i-input-error {
            @apply absolute top-full h-5 leading-5 text-xs text-red-600 left-0;
        }

        .i-input-tip {
            @apply absolute top-full h-5 leading-5 text-xs text-slate-600 left-0;
        }
    }

</style>


<template>

    <fieldset
        v-bind="wrapperAttrs"
        class="
            i-input-wrapper
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
                :type="computedType"
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
                v-if="type !== 'password' && !!computedValue"
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

            <button
                v-if="type === 'password' && !!computedValue"
                class="
                    i-input-show-password-button
                "
                type="button"
                @click.prevent="showPassword = !showPassword">
                <svg
                    v-if="showPassword"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24">
                    <g transform="translate(-1743 -553)">
                        <path
                            d="M789.788,497.632c-7.074,0-11.724,7.1-11.724,7.1s3.439,8.533,11.724,8.533,11.724-8.533,11.724-8.533S796.862,497.632,789.788,497.632Zm0,12.779A4.969,4.969,0,1,1,795,505.448,5.093,5.093,0,0,1,789.788,510.411Zm0-7.569a2.605,2.605,0,1,0,2.605,2.605,2.606,2.606,0,0,0-2.605-2.605Z"
                            transform="translate(965.211 59.162)"/>
                    </g>
                </svg>
                <svg
                    v-else
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24">
                    <g transform="translate(-1706 -553)">
                        <g transform="translate(1706.275 556.345)">
                            <path
                                d="M831.87,596.868l-3.44,3.572a5.177,5.177,0,0,1,.055.623,5.093,5.093,0,0,1-5.211,4.963c-.075,0-.149,0-.224,0l-2.442,2.536a11.3,11.3,0,0,0,2.666.317c8.285,0,11.725-8.532,11.725-8.532A19.247,19.247,0,0,0,831.87,596.868Z"
                                transform="translate(-811.551 -592.865)"/>
                            <path
                                d="M799.446,579.022l-1.846,1.917a11.679,11.679,0,0,0-5.65-1.536c-7.074,0-11.724,7.1-11.724,7.1a16.09,16.09,0,0,0,5.564,6.7l-1.7,1.767,1.412,1.359,2.09-2.171,2.281-2.369,1.9-1.975,2.768-2.874,1.984-2.061,2.761-2.867,1.562-1.622Zm-5.908,6.135a2.6,2.6,0,0,0-3.59,3.729l-1.728,1.795a5.092,5.092,0,0,1,7.035-7.305Z"
                                transform="translate(-780.225 -579.022)"/>
                        </g>
                    </g>
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
    ref,
    computed,
    useSlots,
} from 'vue';

defineOptions({
    inheritAttrs: false,
    name: 'IInput',
});

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

const emits = defineEmits([
    'update:modelValue',
    'update:error',
]);

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
    manualValidate
});

</script>