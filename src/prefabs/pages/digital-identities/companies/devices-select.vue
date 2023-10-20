<template>
    <div
        class="
            flex items-center mb-6 px-4
        ">

        <span
            class="
                text-slate-600 w-[125px]
            ">
            <sup
                class="
                    text-red-500
                ">
                *
            </sup>
            {{ label }}
        </span>

        <i-single-select
            class="
                w-full
            "
            :attr="label"
            :placeholder="`请选择${label}`"
            v-model="value"
            v-model:error="computedError"
            :options="options"
            :rules="[
                'required'
            ]"/>

    </div>
</template>


<script lang="ts" setup>

import ISingleSelect from '~/components/single-select.vue';
import axios from '~/plugins/axios';

import {
    computed,
    ref,
    onMounted,
} from 'vue';

const props = withDefaults(defineProps<{
    modelValue: string;
    error: string;
    label?: string;
}>(), {
    label: '设备权限'
});

const emits = defineEmits([
    'update:modelValue',
    'update:error',
]);

const value = computed({
    get() {
        return props.modelValue;
    },
    set(value: string) {
        emits('update:modelValue', value);
    }
});

const computedError = computed({
    get() {
        return props.error;
    },
    set(value: string) {
        emits('update:error', value);
    }
});

const options = ref([]);

onMounted(async () => {
    const { data } = await axios.get(`/enterprise/deviceList`);

    options.value = (data.data as {
        deviceName: string,
        deviceId: number,
    }[]).map(({deviceName, deviceId}) => {
        return {
            value: deviceId.toString(),
            label: deviceName,
        };
    });
});

</script>