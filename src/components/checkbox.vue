<style lang="scss">

    .i-checkbox-wrapper[aria-data-theme=default] {

        @apply cursor-pointer;

        input[type="checkbox"] {
            @apply absolute opacity-0 h-0 w-0;
        }

        input[type="checkbox"] + label .checkbox {
            &::after {
                @apply h-[10px] w-[5px] absolute left-[5px] top-[1px] border-b-2 border-r-2 border-blue-600 block rotate-45 scale-50 opacity-0 transition-[transform,opacity] duration-100;
                content: ' ';
            }
        }

        input[type="checkbox"]:checked + label .checkbox {
            &::after {
                @apply scale-[125%] opacity-100;
            }
        }
    }

</style>

<template>

    <fieldset
        v-bind="wrapperAttrs"
        class="
            i-checkbox-wrapper
        "
        :aria-data-theme="theme">

        <input
            class="
                i-checkbox
            "
            v-model="computedValue"
            v-bind="innerAttrs"
            type="checkbox"
            :id="id">

        <label
            class="
                flex items-center
            "
            :for="id">
            <span
                class="
                    mr-4
                ">
                <span
                    class="
                        checkbox block relative
                        cursor-pointer w-4 h-4 rounded-sm bg-white border-2
                    "/>
            </span>
            <span
                class="
                    select-none cursor-pointer text-[90%] text-slate-700
                "
                v-html="placeholder"/>
        </label>

    </fieldset>

</template>

<script lang="ts" setup>

import {
    generateUuid
} from '~/composables/useInput';

import {
    useWrapper
} from '~/composables/useWrapper';

import {
    computed,
} from 'vue';

defineOptions({
    inheritAttrs: false,
    name: 'ICheckbox',
});

const props = withDefaults(defineProps<{
    modelValue: boolean;
    placeholder: string;
    theme?: string;
}>(), {
    theme: 'default',
});

const emits = defineEmits([
    'update:modelValue',
]);

const id = generateUuid();

const computedValue = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emits('update:modelValue', !!value);
    }
});

const {
    wrapperAttrs,
    innerAttrs
} = useWrapper(['id', 'class', 'style', 'data-theme']);

</script>