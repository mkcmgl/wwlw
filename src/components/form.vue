<template>
    <form
        @submit.prevent="handleSubmit">
        
        <slot/>

    </form>
</template>

<script lang="ts" setup>

import {
    type Ref,
    provide,
    ref,
    nextTick,
} from 'vue';

defineOptions({
    name: 'IForm',
});

type ColumnInstance = {
    id: string;
    refresh: () => void;
    manualValidate: () => boolean;
};

const emits = defineEmits([
    'submit'
]);

const columns: Ref<{
    [key: string]: ColumnInstance
}> = ref({});

const registerColumn = (
    id: string,
    manualValidate: ColumnInstance['manualValidate'],
    refresh: ColumnInstance['refresh']
) => {
    columns.value[id] = {
        id,
        manualValidate,
        refresh,
    };
};

provide('registerColumn', registerColumn);

const destroyColumn = (id: string) => {
    delete columns.value[id];
};

provide('destroyColumn', destroyColumn);

const refresh = () => {
    Object.values(columns.value).forEach((column) => {
        column?.refresh();
    });
};

const validate = () => {
    let isValid = true;

    Object.values(columns.value).forEach((column) => {
        // 不 break 是为了让所有的 column 都执行一次 manualValidate
        isValid = column?.manualValidate() && isValid;
    });

    return isValid;
};

const handleSubmit = (e: Event) => {
    nextTick(() => {
        if (validate()) {
            emits('submit', e);
        }
    });
};

defineExpose({
    refresh,
});

</script>