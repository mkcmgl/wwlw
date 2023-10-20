<template>

    <button
        @click="showCreateDialog = true"
        type="button"
        class="
            clickable hoverable
            linear-hover
            text-white
            p-1.5 rounded text-sm
        "
        v-wave
        v-bind="$attrs">
        新增设备信息
    </button>

    <i-dialog
        v-model:show="showCreateDialog">

        <template #title>
            <h1
                class="
                    text-center
                ">
                新增设备信息
            </h1>
        </template>

        <i-form
            ref="formInstance"
            @submit="storeDevice">


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
                    企业 ID
                </span>

                <i-input
                    class="
                        w-full
                    "
                    type="text"
                    v-model="form.businessId"
                    v-model:error="error.businessId"
                    name="businessId"
                    attr="企业ID"
                    placeholder="请输入企业ID"
                    :rules="[
                        'required',
                        'no-emoji',
                        'string',
                    ]"/>

            </div>

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
                    设备名称
                </span>

                <i-input
                    class="
                        w-full
                    "
                    type="text"
                    v-model="form.deviceName"
                    v-model:error="error.deviceName"
                    name="deviceName"
                    attr="设备名称"
                    placeholder="请输入设备名称"
                    :rules="[
                        'required',
                        'no-emoji',
                        'string',
                    ]"/>

            </div>

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
                    设备 IID
                </span>

                <i-input
                    class="
                        w-full
                    "
                    type="text"
                    v-model="form.deviceIid"
                    v-model:error="error.deviceIid"
                    name="deviceIid"
                    attr="设备 IID"
                    placeholder="请输入设备 IID"
                    :rules="[
                        'required',
                        'no-emoji',
                        'string',
                    ]"/>

            </div>

            

            <footer
                class="
                    flex justify-between
                ">

                <button
                    class="
                        mx-2
                        p-2.5
                        w-32 rounded
                        border-2
                        clickable relative
                        overflow-hidden
                    "
                    @click="showCreateDialog = false"
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
                    确认
                </button>

            </footer>

        </i-form>

    </i-dialog>

</template>

<script lang="ts" setup>

import {
    ref,
    watch,
    toRaw,
} from 'vue';

import IDialog from '~/components/dialog.vue';
import IForm from '~/components/form.vue';
import IInput from '~/components/input.vue';

const showCreateDialog = ref(false);

const formInstance = ref(null);

watch(
    () => {
        return showCreateDialog.value;
    },
    (value) => {
        if (!value) {
            formInstance.value?.refresh();
        }
    }
);

const form = ref({
    businessId: '',
    deviceName: '',
    deviceIid: ''
});


const error = ref({
    businessId: '',
    deviceName: '',
    deviceIid: ''
});

const loading = ref(false);

import axios from '~/plugins/axios';
import { notify } from '~/plugins/notify';

const emits = defineEmits(['created']);

const storeDevice = () => {

    loading.value = true;

    axios.post(`/gateway/device/create`, {
        ...toRaw(form.value),
    })
        .then(() => {

            notify({
                type: 'success',
                title: '设备信息创建成功'
            });

            emits('created');

            showCreateDialog.value = false;
        })
        .finally(() => {
            loading.value = false;
        });

};


</script>