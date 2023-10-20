
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
                v-bind="innerAttrs"
                type="file"
                :id="id"
                :aria-describedby="`${id}-error ${id}-tip`"
                ref="input"
                @change="inputChanged">

            <span
                class="
                    i-input-icon
                "
                v-if="hasIcon">
                <slot name="icon"/>
            </span>

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
    ref,
    nextTick,
} from 'vue';

defineOptions({
    inheritAttrs: false,
    name: 'IInput',
});

const props = withDefaults(defineProps<
    InputProps & {
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
    'blur',
]);

const {
    id,
    refresh,
    computedValue,
    hasError,
    hasTip,
    clearValue,
    clearError,
    manualValidate
} = useInput(props, emits);

const {
    wrapperAttrs,
    innerAttrs
} = useWrapper(['id', 'class', 'style', 'data-theme']);


const slots = useSlots();
const hasIcon = computed(() => !!slots.icon);

defineExpose({
    refresh,
    manualValidate
});

const input = ref();

const inputChanged = () => {


    if (input.value.files === undefined) {
        input.value.value = '';
        return false;
    }

    let files = input.value.files;

    if (files.length === 0) {
        input.value.value = '';
        return false;
    }

    computedValue.value = files[0];
    emits('blur');

    nextTick(() => {
        const isValid = manualValidate();
        if (!isValid) {
            clearError();
        }
    });
};

</script>