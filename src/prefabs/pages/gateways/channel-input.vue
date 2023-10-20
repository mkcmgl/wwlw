<template>
    <div
        class="flex">
        <p
            class="w-32 leading-[3rem] text-right mr-4">
            虚拟通道
        </p>
        <i-select
            class="w-[calc(100%-8rem)]"
            v-model="channelId"
            v-model:error="error"
            placeholder="请选择虚拟通道"
            attr="虚拟通道"
            name="channelId"
            :rules="[
                'required',
            ]"
            :options="channels.map(i => {
                return {
                    label: i,
                    value: i,
                };
            })">
        </i-select>
    </div>
</template>

<script setup>

import ISelect from '~/components/single-select.vue';

import { computed, onBeforeMount, ref } from 'vue';
import axios from '~/plugins/axios';

const props = defineProps({
    modelValue: {
        type: String,
        default: '',
    },
    error: {
        type: String,
        default: '',
    },
});

const emits = defineEmits([
    'update:modelValue',
    'update:error',
]);

const channelId = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emits('update:modelValue', value);
    },
});

const error = computed({
    get() {
        return props.error;
    },
    set(value) {
        emits('update:error', value);
    },
});

const channels = ref([]);

onBeforeMount(async () => {
    const { data } = await axios.get('/gateway/channel/list/user');
    channels.value = data.data;
});

</script>