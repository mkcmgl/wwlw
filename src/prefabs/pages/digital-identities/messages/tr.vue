<template>
    <tr
        :class="{
            'bg-purple-50/50': isSelected,
        }">
        <td>
            <custom-checkbox
                v-model="isSelected"/>
        </td>
        <td>
            {{ parseTime(message.createTime) }}
        </td>
        <td>
            {{ MessageTypes[message.templateType] }}
        </td>
        <td>
            <span
                class="
                    max-w-[200px]
                    line-clamp-1
                "
                v-html="message.templateContent"
                />
        </td>
        <td>
            <span
                class="
                    font-bold
                    inline-block
                    py-0.5 px-2 text-xs border
                    rounded
                "
                :class="[
                    message.readStatus
                        ? 'text-green-600 bg-green-50 border-green-600'
                        : 'text-red-600 bg-red-50 border-red-600',
                ]">
                {{ message.readStatus ? '是' : '否' }}
            </span>
        </td>
        <td>
            {{ parseTime(message.readTime) }}
        </td>
        <td
            class="listRightSticky bg-white">
            <button
                type="button"
                @click="showMessageDialog"
                class="
                    text-blue-600
                    no-underline
                    hover:underline
                    mr-2
                ">
                查看
            </button>

            <button
                type="button"
                @click="isShowDeleteConfirmDialog = true"
                class="
                    text-red-600
                    no-underline
                    hover:underline
                ">
                删除
            </button>
        </td>
    </tr>

    <custom-dialog
        class="w-[500px]"
        v-model:show="show">

        <template #title>
            {{ MessageTypes[message.templateType] }}
        </template>

        <div
            class="
                p-4
            ">
            <div
                class="
                    flex items-start mb-4
                ">
                <span
                    class="
                        text-slate-600
                        w-[6rem]
                    ">
                    发送时间
                </span>
                <span
                    class="
                        ml-2 w-[calc(100%-6rem)]
                    ">
                    {{ parseTime(message.createTime) }}
                </span>
            </div>
            <div
                class="
                    flex items-start mb-4
                ">
                <span
                    class="
                        text-slate-600
                        w-[6rem]
                    ">
                    消息内容
                </span>
                <span
                    class="
                        ml-2 w-[calc(100%-6rem)]
                    "
                    v-html="message.templateContent">
                </span>
            </div>
            <div
                class="
                    flex items-start mb-4
                ">
                <span
                    class="
                        text-slate-600
                        w-[6rem]
                    ">
                    是否已读
                </span>
                <span
                    class="
                        ml-2 w-[calc(100%-6rem)]
                    ">
                    <span
                        class="
                            font-bold
                            inline-block
                            py-0.5 px-2 text-sm border
                            rounded
                        "
                        :class="[
                            message.readStatus
                                ? 'text-green-600 bg-green-50 border-green-600'
                                : 'text-red-600 bg-red-50 border-red-600',
                        ]">
                        {{ message.readStatus ? '是' : '否' }}
                    </span>
                </span>
            </div>

            <div
                class="
                    flex items-start mb-4
                ">
                <span
                    class="
                        text-slate-600
                        w-[6rem]
                    ">
                    阅读时间
                </span>
                <span
                    class="
                        ml-2 w-[calc(100%-6rem)]
                    ">
                    {{ parseTime(message.readTime) }}
                </span>
            </div>

        </div>

    </custom-dialog>


    <custom-dialog
        class="w-[500px]"
        v-model:show="isShowDeleteConfirmDialog"
        :prevent="loading">

        <template #title>
            确认删除
        </template>

        <p>
            您确定要删除该消息吗？
        </p>
        <p
            class="
                p-2 rounded bg-slate-100 border my-4
            "
            v-html="message.templateContent"></p>

        <form
            class="
                -mx-2 text-right
            "
            @submit.prevent="deleteMessage">

            <button
                class="
                    mx-2
                    p-2.5
                    w-32 rounded
                    border-2
                    clickable relative
                    overflow-hidden
                "
                @click="isShowDeleteConfirmDialog = false"
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

import {
    type NotifyMessage as Message,
    MessageTypes,
} from '~/types/digital-identities/message';

import CustomCheckbox from '~/components/checkbox.vue';
import CustomDialog from '~/components/dialog.vue';

import axios from '~/plugins/axios';
import { notify } from '~/plugins/notify';

import {
    type Ref,
    ref,
    inject,
} from 'vue';

import {
    parseTime
} from '~/utils/tool';

const props = defineProps<{
    message: Message;
}>();

const emits = defineEmits([
    'updated',
]);

const isSelected = ref(false);

const registerCheckbox = inject('registerCheckbox') as (params: {
    isSelected: Ref<boolean>;
    messageId: number;
}) => void;

registerCheckbox({
    isSelected,
    messageId: props.message.id,
});

const show = ref(false);

const showMessageDialog = () => {
    show.value = true;

    if (!props.message.readStatus) {
        axios.put(`/notify-message/update-read?ids=${props.message.id}`)
            .then(() => {
                emits('updated');
            });
    }
};


const isShowDeleteConfirmDialog = ref(false);
const loading = ref(false);

const deleteMessage = () => {
    loading.value = true;

    axios.put(`/notify-message/deleteMessage?ids=${props.message.id}`)
        .then(() => {
            emits('updated');
            isShowDeleteConfirmDialog.value = false;

            notify({
                type: 'success',
                title: '删除成功',
            });
        })
        .finally(() => {
            loading.value = false;
        });
};

</script>