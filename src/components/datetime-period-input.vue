<style lang="scss">

    .el-input__wrapper {
        --el-input-height: 43px;
    }

    .el-date-table-cell__text {
        @apply text-center;
    }

    .el-input__wrapper {
        border-width: 2px;
        box-shadow: none !important;
        --el-datepicker-inrange-bg-color: theme('colors.blue.500/10') !important;
    }

</style>

<template>
    <el-date-picker
        class="
            custom-el-date-picker
        "
        v-model="computedValue"
        value-format="YYYY-MM-DDTHH:mm:ss[Z]"
        type="datetimerange"
        range-separator="至"
        :start-placeholder="startPlaceholder"
        :end-placeholder="endPlaceholder"/>
</template>

<script lang="ts" setup>

import {
    generateUuid
} from '~/composables/useInput';

import {
    computed,
    inject,
    onMounted,
    onUnmounted,
} from 'vue';

const id = generateUuid();

const props = defineProps<{
    modelValue: string;
    startPlaceholder: string;
    endPlaceholder: string;
}>();

const emits = defineEmits([
    'update:modelValue',
]);

const computedValue = computed({
    get() {
        return props.modelValue.split(',');
    },
    set(val) {
        emits('update:modelValue', val.join(','));
    }
});

const clearValue = () => {
    computedValue.value = [];
};

const refresh = () => {
    clearValue();
};

const registerColumn = inject(
    'registerColumn',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (_: string, __: () => boolean, ___: () => void) => () => {}
);

onMounted(() => {
    registerColumn(id, () => true, refresh);
});

const destroyColumn = inject(
    'destroyColumn',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (_: string) => () => {}
);

onUnmounted(() => {
    destroyColumn(id);
});

</script>