<template>

    <button
        @click="show = true"
        type="button"
        class="
            clickable hoverable
            linear-hover
            text-white
            p-1.5 rounded text-sm
        "
        v-wave
        v-bind="$attrs">
        新增公告
    </button>


    <i-dialog
        v-model:show="show"
        prevent
        :loading="loading">

        <template
            #title>
            新增公告
        </template>

        
        <i-form
            @submit="storeFile"
            ref="formInstance">

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
                    公告状态
                </span>
                <i-select
                    class="w-[calc(100%-8rem)]"
                    v-model="form.status"
                    v-model:error="error.status"
                    placeholder="请选择公告状态"
                    attr="公告状态"
                    name="status"
                    :rules="[
                        'required',
                    ]"
                    :options="[
                        {
                            label: '开启',
                            value: '0',
                        },
                        {
                            label: '关闭',
                            value: '1',
                        }
                    ]">
                </i-select>
            </div>

            <div
                class="
                    flex items-start mb-6 px-4
                ">
                <span
                    class="
                        text-slate-600 w-[125px]
                        leading-[2.5rem]
                    ">
                    <sup
                        class="
                            text-red-500
                        ">
                        *
                    </sup>
                    公告标题
                </span>
                <i-input
                    class="w-[calc(100%-8rem)]"
                    v-model="form.title"
                    v-model:error="error.title"
                    placeholder="请输入公告标题"
                    attr="公告标题"
                    name="title"
                    :max="100"
                    :rules="[
                        'required',
                        'no-emoji',
                    ]"/>
            </div>

            <div
                class="
                    flex items-start mb-6 px-4
                ">
                <span
                    class="
                        text-slate-600 w-[125px]
                        leading-[2.5rem]
                    ">
                    <sup
                        class="
                            text-red-500
                        ">
                        *
                    </sup>
                    公告内容
                </span>
                <i-textarea
                    class="w-[calc(100%-8rem)]"
                    v-model="form.content"
                    v-model:error="error.content"
                    placeholder="请输入公告内容"
                    attr="公告内容"
                    name="content"
                    :max="100"
                    :rules="[
                        'required',
                        'no-emoji',
                        'string',
                        'max:100'
                    ]"/>
            </div>

            <footer
                class="flex items-center justify-between">

                <button
                    class="
                        mx-2
                        p-2.5
                        w-32 rounded
                        border-2
                        clickable relative
                        overflow-hidden
                    "
                    @click="show = false"
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
                    创建
                </button>
            
            </footer>

        </i-form>


    </i-dialog>

</template>

<script lang="ts" setup>
import IDialog from '~/components/dialog.vue';
import IForm from '~/components/form.vue';
import IInput from '~/components/input.vue';
import ITextarea from '~/components/textarea.vue';
import ISelect from '~/components/single-select.vue';

import axios from '~/plugins/axios';
import { notify } from '~/plugins/notify';

import {
    ref,
    watch,
    toRaw,
} from 'vue';

const emits = defineEmits([
    'update:modelValue',
    'stored',
]);

const form = ref({
    title: '',
    content: '',
    status: '',
});

const error = ref({
    title: '',
    content: '',
    status: ''
});

const formInstance = ref();

const show = ref(false);

watch(
    () => show.value,
    (value) => {
        if (!value) {
            formInstance.value?.refresh();
        }
    }
);

const loading = ref(false);



const storeFile = () => {
    loading.value = true;

    axios.post(
        '/notice/create',
        {
            ...toRaw(form.value),
            type: '1',
        }
    )
        .then(() => {
            notify({
                title: '公告创建成功',
                type: 'success',
            });
            emits('stored');
            show.value = false;
        })
        .finally(() => {
            loading.value = false;
        });
};

</script>
