<style lang="scss">

    .toggler-wrapper {

        input {
            @apply w-0 h-0 opacity-0;
        }

        input:checked + label .lever {
            @apply bg-green-400;
            &::before {
                @apply transform translate-x-[20px];
            }
        }

        .lever {
            @apply inline-block w-[36px] h-[16px] rounded-full relative cursor-pointer bg-slate-200;
            &::before {
                @apply absolute top-0 left-0 w-[16px] h-[16px] rounded-full border-2 bg-white;
                content: ' ';
                transition: all 0.3s ease;
            }
        }

    }
    
</style>

<template>
    <div
        class="
            toggler-wrapper
        ">
        <input
            :id="id"
            type="checkbox"
            :checked="modelValue"/>
        <label
            :for="id"
            @click.prevent="changeValue"
            class="
                inline-flex items-center
            ">
            <span
                class="
                    lever
                "></span>
            <span
                class="
                    ml-2
                ">
                <slot/>
            </span>
        </label>
    </div>
</template>

<script lang="ts" setup>

import {
    generateUuid
} from '~/composables/useInput';

const id = generateUuid();

defineProps<{
    modelValue: boolean;
}>();

const emits = defineEmits([
    'update:modelValue',
    'change',
]);

const changeValue = () => {
    emits('change');
};

</script>