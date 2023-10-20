<template>
    <custom-dialog
        v-model:show="computedShow">
        
        <template #title>
            公告详情
        </template>

        <div>

            <p
                class="
                    flex items-start mb-2.5
                "
                v-for="({key, label}) in [
                    {
                        key: 'id',
                        label: '公告 ID',
                    },
                    {
                        key: 'title',
                        label: '公告标题',
                    },
                    {
                        key: 'content',
                        label: '公告内容',
                    },
                    {
                        key: 'status',
                        label: '状态',
                    },
                    {
                        key: 'createTime',
                        label: '创建时间',
                    },
                ]"
                :key="key">
                
                <span
                    class="
                        font-bold w-[100px]
                    ">
                    {{ label }}
                </span>

                <span
                    class="
                        w-[calc(100%-100px)] break-all
                    ">
                    {{ key !== 'status' ? notification[key] : NotificationStatus[notification[key]] }}
                </span>

            </p>

        </div>

    </custom-dialog>
</template>

<script lang="ts" setup>

import CustomDialog from '~/components/dialog.vue';

import {
    Notification,
    NotificationStatus,
} from '~/types/digital-identities/notification';

import {
    computed,
} from 'vue';

const props = defineProps<{
    show: boolean;
    notification: Notification;
}>();

const emits = defineEmits([
    'update:show'
]);

const computedShow = computed({
    get() {
        return props.show;
    },
    set(val) {
        emits('update:show', val);
    }
});


</script>