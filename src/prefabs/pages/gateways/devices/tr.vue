<template>
    <tr>
        <td>
            {{ device.id }}
        </td>
        <td>
            {{ device.businessId }}
        </td>
        <td>
            {{ device.deviceName }}
        </td>
        <td>
            {{ device.deviceIid }}
        </td>
        <td>
            {{ device.txHash }}
        </td>
        <td>
            {{ CertificationStatus[device.certificationStatus] }}
        </td>
        <td>
            {{ device.accessTime }}
        </td>
        <td>
            {{ device.certificationTime }}
        </td>
        <td>
            <button
                class="
                    text-red-600
                    no-underline
                    hover:underline
                "
                @click="showDeleteDialog = true"
                type="button">
                删除
            </button>
        </td>
    </tr>

    <custom-dialog
        v-model:show="showDeleteDialog">

        <template
            #title>
            <h3
                class="
                    text-center
                ">
                确认删除？
            </h3>
        </template>

        <p
            class="
                mb-6 font-bold text-lg
            ">
            确认删除该设备？
        </p>


        <form
            class="
                -mx-2 flex justify-between
            "
            @submit.prevent="destroyDevice">

            <button
                class="
                    mx-2
                    p-2.5
                    w-32 rounded
                    border-2
                    clickable relative
                    overflow-hidden
                "
                @click="showDeleteDialog = false"
                type="reset"
                :disabled="loading"
                v-wave="!loading">
                取消
            </button>

            <button
                class="
                    mx-2
                    p-2.5
                    w-32 rounded
                    text-white
                    clickable relative
                    overflow-hidden
                    linear-hover
                "
                :class="[
                    loading
                        ? 'cursor-not-allowed backdrop-grayscale'
                        : ''
                ]"
                type="submit"
                :disabled="loading"
                v-wave="!loading">
                <i
                    v-if="loading"
                    class="
                        mdi mdi-loading mdi-spin mr-2
                    "></i>
                确定删除
            </button>
        
        </form>

    </custom-dialog>


</template>

<script lang="ts" setup>

import CustomDialog from '~/components/dialog.vue';

import {
    Device,
    CertificationStatus,
} from '~/types/gateway/device';

import {
    ref,
} from 'vue';

import axios from '~/plugins/axios';

const props = defineProps<{
    device: Device;
}>();

const showDeleteDialog = ref(false);

const loading = ref(false);

const emits = defineEmits([
    'reload'
]);

const destroyDevice = () => {

    loading.value = true;

    axios.delete(
        `/gateway/device/delete/${props.device.id}`
    )
        .then(() => {
            emits('reload');
            showDeleteDialog.value = false;
        })
        .finally(() => {
            loading.value = false;
        });
};

</script>