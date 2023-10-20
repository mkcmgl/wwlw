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
        创建快照策略
    </button>

    <i-dialog
        v-model:show="showCreateDialog">

        <template #title>
            <h1
                class="
                    text-center
                ">
                创建快照策略
            </h1>
        </template>

        <h3
            class="
                fake-border-l mb-6 text-lg font-semibold ml-4
            ">
            基本信息
        </h3>

        <i-form
            ref="formInstance"
            @submit="storeSnapshot">

            <div
                class="flex items-center px-4 mb-6">


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
                    快照类型
                </span>

                <span
                    class="-mx-2 w-full">
                    <label
                        class="mx-2">
                        <input
                            type="radio"
                            name="type"
                            required
                            value="1"
                            v-model="form.type">
                        自动
                    </label>
                    <label
                        class="mx-2">
                        <input
                            type="radio"
                            name="type"
                            required
                            value="2"
                            v-model="form.type">
                        手动
                    </label>
                </span>
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
                    快照名称
                </span>

                <i-input
                    class="
                        w-full
                    "
                    type="text"
                    v-model="form.name"
                    v-model:error="error.name"
                    name="name"
                    attr="快照名称"
                    placeholder="请输入快照名称"
                    tip="长度为2~128个字符，只能以英文字母开头"
                    :rules="[
                        'required',
                        'no-emoji',
                        'string',
                        'max:128',
                        'min:2',
                        (value: string) => {
                            if (/^[^a-zA-Z]/.test(value) || /^[0-9]/.test(value)) {
                                return {
                                    isValid: false,
                                    error: '只能以英文字母开头'
                                }
                            }
                            return {
                                isValid: true,
                            };
                        }
                    ]"/>

            </div>

            <node-select
                v-model="form.nodeId"
                v-model:error="error.nodeId"/>

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
                    快照周期
                </span>

                <i-single-select
                    class="
                        w-full
                    "
                    attr="快照周期"
                    placeholder="请选择快照周期"
                    v-model="form.periodType"
                    v-model:error="error.periodType"
                    :options="[
                        {
                            label: '每天',
                            value: 1
                        },
                        {
                            label: '每周',
                            value: 2
                        },
                        {
                            label: '每月',
                            value: 3
                        }
                    ]"
                    :rules="[
                        'required'
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
                    开始时间
                </span>

                <i-single-select
                    class="
                        w-full
                    "
                    v-model="form.periodTime"
                    v-model:error="error.periodTime"
                    name="periodTime"
                    placeholder="请选择每天的整点时间如00：00/01：00/02:00"
                    attr="开始时间"
                    :rules="[
                        'required',
                    ]"
                    :options="periodTimeOptions"/>

            </div>

            <div
                class="flex items-start px-4 mb-6">


                <span
                    class="
                        text-slate-600 w-[125px] leading-10
                    ">
                    <sup
                        class="
                            text-red-500
                        ">
                        *
                    </sup>
                    保留时间
                </span>

                <span
                    class="w-full">

                    <div
                        class="
                            flex items-center mb-6
                        ">
                        <label
                            class="
                                block mr-4
                            ">
                            <input
                                type="radio"
                                name="retentionDayType"
                                required
                                value="custom"
                                v-model="retentionDayType">
                            自定义时长
                        </label>

                        <template
                            v-if="retentionDayType === 'custom'">
                            <i-input
                                class="w-[200px]"
                                type="number"
                                min="0"
                                max="65535"
                                v-model.number="form.retentionDay"
                                v-model:error="error.retentionDay"
                                name="retentionDay"
                                attr="保留天数"
                                placeholder="请输入保留天数"
                                tip="1 ~ 65535天"
                                :rules="[
                                    'required',
                                    'number',
                                    'min:1',
                                    'max:65535'
                                ]"/>
                            <span
                                class="
                                    ml-2
                                ">
                                天
                            </span>
                        </template>
                        
                    </div>

                    <label
                        class="
                            block
                        ">
                        <input
                            type="radio"
                            name="retentionDayType"
                            required
                            value="auto"
                            v-model="retentionDayType">
                        持续保留，直至快照数量达到额度上限后被自动删除
                    </label>

                </span>
            </div>

            <div
                class="
                    flex items-start mb-6 px-4
                ">

                <span
                    class="
                        text-slate-600 w-[125px] leading-10
                    ">
                    描述
                </span>

                <i-textarea
                    class="
                        w-full
                    "
                    type="text"
                    v-model="form.content"
                    v-model:error="error.content"
                    name="content"
                    attr="描述"
                    placeholder="请输入描述"
                    :rules="[
                        'string',
                        'max:100'
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
    type Ref,
    ref,
    computed,
    watch,
    toRaw,
} from 'vue';

import IDialog from '~/components/dialog.vue';
import IForm from '~/components/form.vue';
import IInput from '~/components/input.vue';
import ISingleSelect from '~/components/single-select.vue';
import ITextarea from '~/components/textarea.vue';

import NodeSelect from '../commons/node-select.vue';

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
    type: '1',
    name: '',
    nodeId: '',
    periodType: '',
    periodTime: '',
    retentionDay: '',
    content: '',
});

const retentionDayType = ref('custom') as Ref<'custom'|'auto'>;

const error = ref({
    type: '',
    name: '',
    nodeId: '',
    periodType: '',
    periodTime: '',
    retentionDay: '',
    content: '',
});

const loading = ref(false);

import axios from '~/plugins/axios';
import { notify } from '~/plugins/notify';

const emits = defineEmits(['created']);

const storeSnapshot = () => {
    loading.value = true;

    let periodDay: null|number = null;

    const formData = {...toRaw(form.value)};

    if (formData.periodType == '2') {
        // 快照周期为每周，今天的星期
        periodDay = new Date().getDay();
    }
    else if (formData.periodType == '3') {
        // 快照周期为每月，今天的日期
        periodDay = new Date().getDate();
    }

    axios.post(`/archive/snapshot/create`, {
        ...formData,
        periodDay,
    })
        .then(() => {

            notify({
                type: 'success',
                title: '快照创建成功'
            });

            emits('created');

            showCreateDialog.value = false;
        })
        .finally(() => {
            loading.value = false;
        });

};

const periodTimeOptions = computed(() => {
    return Array.from({length: 24}).map((value, i) => {
        let time = '';
        if (i < 10) {
            time = `0${i}:00`;
        }
        else {
            time = `${i}:00`;
        }
        return {
            label: time,
            value: time
        };
    });
});

</script>