<style lang="scss">

    .i-select-wrapper {
        
        .i-select {

            -webkit-appearance: none;

            // select arrow style
            &:not(.has-value) {
                background: transparent;
                background-image: url("data:image/svg+xml;utf8,<svg viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg'><path d='M904.533333 311.466667c-17.066667-17.066667-42.666667-17.066667-59.733333 0L512 644.266667 179.2 311.466667c-17.066667-17.066667-42.666667-17.066667-59.733333 0-17.066667 17.066667-17.066667 42.666667 0 59.733333l362.666666 362.666667c8.533333 8.533333 19.2 12.8 29.866667 12.8s21.333333-4.266667 29.866667-12.8l362.666666-362.666667c17.066667-17.066667 17.066667-42.666667 0-59.733333z'></path></svg>");
                background-repeat: no-repeat;
                background-position-x: calc(100% - 12px);
                background-position-y: 50%;
                background-size: 12px 12px;
            }



            &::-ms-expand {
                display: none;
            }

            &[disabled] {
                @apply cursor-not-allowed opacity-75;
            }

            &:focus {
                @apply border-blue-600/50;
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
            i-select-wrapper
            relative
        ">

        <div
            class="
                relative
            ">
            <select
                class="
                    i-select p-2 block
                    border-2 rounded outline-none w-full text-base bg-transparent select-none py-2 cursor-pointer
                "
                :class="{
                    'border-red-400': hasError,
                    'border-slate-200': !hasError,
                    'text-slate-400': !computedValue,
                    'has-value': !!computedValue,
                }"
                :disabled="disabled"
                v-bind="innerAttrs"
                v-model="computedValue"
                @change="handleChange">

                <option
                    class="
                        text-slate-300
                        cursor-not-allowed
                    "
                    value=""
                    disabled
                    selected
                    hidden>
                    {{ placeholder }}
                </option>

                <option
                    class="
                        text-black
                    "
                    v-for="(option, index) in options"
                    :key="index"
                    :value="option.value">
                    {{ option.label }}
                </option>
            
            </select>

            <span
                class="absolute w-10 h-10 right-1 top-1/2 -translate-y-1/2 flex items-center justify-center icon-wrapper fill-slate-400"
                v-if="!!computedValue">
                
                <button
                    class="w-5 h-5"
                    aria-label="清空选择框"
                    
                    type="button"
                    @click="computedValue = ''"
                    :disabled="disabled">
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

            </span>

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
    type Rule,
} from '~/utils/validate';

defineOptions({
    inheritAttrs: false,
    name: 'ISingleSelect',
});

const props = withDefaults(defineProps<
    InputProps & {
        disabled?: boolean;
        rules?: Rule[];
        options: {
            label: string;
            value: string;
        }[];
    }
>(), {
    rules: () => [],
    preventRegister: false,
    disabled: false,
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
} = useInput(props, emits);

const {
    wrapperAttrs,
    innerAttrs
} = useWrapper(['id', 'class', 'style']);

const handleChange = (e: Event) => {
    validate(e as unknown as {
        target: HTMLSelectElement;
    });
};

defineExpose({
    refresh
});

</script>