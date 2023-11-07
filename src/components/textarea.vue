<style lang="scss">

.i-textarea {

    textarea,
    input,
    select {

        @apply border-[2px] border-slate-200;

        &:focus {
            @apply border-blue-500;
        }

        &:not(.invalid):focus {
            @apply border-blue-500;

            & ~ .icon-wrapper {
                @apply text-blue-500;
            }
        }

        & ~ .icon-wrapper {
            @apply text-slate-400;
        }

        &.invalid {
            @apply border-red-300;
            
            & ~ .icon-wrapper {
                @apply text-red-500;
            }
        }
    }
}

</style>

<template>

	<fieldset
		class="i-textarea relative mb-6"
		v-bind="wrapperAttrs"
		:key="`i-textarea-${id}`">
		<label
			class="relative w-full">
			<textarea
				class="min-h-[150px] p-2 w-full rounded outline-none bg-transparent py-2 block"
				:class="{
					'invalid': hasError,
				}"
				v-model.trim="computedValue"
				v-bind="innerAttrs"
                :placeholder="placeholder"
				@blur="handleBlur"/>
		</label>
		<p
			class="text-sm absolute leading-6 top-full left-0 w-full flex justify-between">
			<small
				class="text-red-500">
				{{ error }}
			</small>
			<small
				v-if="max > 0"
				:class="{
					'text-red-500': ((String(computedValue || '').length > max) || hasError)
				}">
				{{ String(computedValue || '').length }} / {{ max }}
			</small>
		</p>
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


defineOptions({
    inheritAttrs: false,
    name: 'IInput',
});

const props = withDefaults(defineProps<
    InputProps & {
        type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search';
        theme?: string,
        max?: number,
    }
>(), {
    rules: () => [],
    preventRegister: false,
    type: 'text',
    theme: 'default',
    max: 100,
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
    manualValidate,
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

defineExpose({
    refresh,
    manualValidate
});

</script>