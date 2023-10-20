<template>
    <custom-dialog
        v-model:show="computedShow">
        
        <template #title>
            确定删除该公告吗？
        </template>

        <form
            @submit.prevent="deleteNotification"
            class="
                flex justify-end -mx-2
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
                @click="computedShow = false"
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
import axios from '~/plugins/axios';
import { notify } from '~/plugins/notify';

import type {
    Notification,
} from '~/types/digital-identities/notification';

import {
    ref,
    computed,
} from 'vue';

const props = defineProps<{
    show: boolean;
    notification: Notification;
}>();

const emits = defineEmits([
    'update:show',
    'deleted'
]);

const computedShow = computed({
    get() {
        return props.show;
    },
    set(val) {
        emits('update:show', val);
    }
});

const loading = ref(false);

const deleteNotification = () => {
    
    loading.value = true;

    axios.delete(`/notice/delete`, {
        params: {
            id: props.notification.id,
        }
    })
        .then(() => {
            computedShow.value = false;
            emits('deleted');
            notify({
                title: '删除成功',
                type: 'success',
            });
        })
        .catch(() => {
            notify({
                title: '删除失败',
                type: 'error',
            });
        })
        .finally(() => {
            loading.value = false;
        });
};

</script>