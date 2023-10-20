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
            class="listRightSticky">
            <button
                type="button"
                @click="show = true"
                class="
                    text-blue-600
                    no-underline
                    hover:underline
                ">
                查看
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
</template>

<script lang="ts" setup>

import {
    type Message,
    MessageTypes,
} from '~/types/digital-identities/message';

import CustomCheckbox from '~/components/checkbox.vue';
import CustomDialog from '~/components/dialog.vue';

import {
    ref,
    inject,
} from 'vue';

import {
    parseTime
} from '~/utils/tool';

const props = defineProps<{
    message: Message;
}>();

defineEmits([
    'updated',
]);

const isSelected = ref(false);

const registerCheckbox = inject('registerCheckbox');


registerCheckbox({
    isSelected,
    messageId: props.message.id,
});

const show = ref(false);




</script>