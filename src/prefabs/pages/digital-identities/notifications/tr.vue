<template>
    <tr>
        <td>
            {{ notification.id }}
        </td>
        <td>
            {{ notification.title }}
        </td>
        <td>
            <p
                class="
                    max-w-[300px]
                    truncate
                ">
                {{ notification.content }}
            </p>
        </td>
        <td>
            <span
                class="
                    px-2
                    py-1
                    rounded-full
                    text-xs
                    font-medium
                    bg-green-100
                    text-green-800
                "
                v-if="notification.status == 0">
                开启
            </span>
            <span
                class="
                    px-2
                    py-1
                    rounded-full
                    text-xs
                    font-medium
                    bg-red-100
                    text-red-800
                "
                v-else>
                关闭
            </span>
        </td>
        <td>
            {{ notification.createTime }}
        </td>
        <td>
            <span
                class="
                    -mx-2
                ">
                <button
                    class="
                        mx-2
                        text-blue-600
                        hover:underline no-underline
                    "
                    @click="showDetailDialog = true"
                    type="button">
                    详情
                </button>
                <button
                    class="
                        mx-2
                        text-red-600
                        hover:underline no-underline
                    "
                    @click="showDeleteDialog = true"
                    type="button">
                    删除
                </button>
            </span>
            
        </td>
    </tr>

    <delete-dialog
        @deleted="deleteNotification"
        :notification="notification"
        v-model:show="showDeleteDialog"/>

    <detail-dialog
        :notification="notification"
        v-model:show="showDetailDialog"/>

</template>

<script lang="ts" setup>

import DeleteDialog from './delete-dialog.vue';
import DetailDialog from './detail-dialog.vue';

import type {
    Notification,
} from '~/types/digital-identities/notification';

import {
    ref,
} from 'vue';


defineProps<{
    notification: Notification;
}>();

const showDetailDialog = ref(false);

const showDeleteDialog = ref(false);

const emits = defineEmits([
    'deleted'
]);

const deleteNotification = () => {
    emits('deleted');
};

</script>