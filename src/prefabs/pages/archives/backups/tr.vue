<template>

    <tr>
        <td>
            {{ backup.name }}
        </td>
        <td>
            {{ backup.snapshotId }}
        </td>
        <td>
            {{ backup.filename }}
        </td>
        <td>
            {{ backup.hash }}
        </td>
        <td>
            {{ backup.id }}
        </td>
        <td>
            {{ backup.createTime }}
        </td>
        <td>
            <!-- <template
                v-if="
                    backup.status === 1
                "> -->
                <button
                    type="button"
                    @click="showRestoreDialog = true">
                    还原
                </button>
            <!-- </template> -->
        </td>
    </tr>

    <i-dialog
        v-model:show="showRestoreDialog">

        <template #title>
            <h1
                class="
                    text-center
                ">
                还原
            </h1>
        </template>

        <h3
            class="
                fake-border-l mb-6 text-lg font-semibold ml-4
            ">
            归档数据基本信息
        </h3>

        <div
            class="
                flex items-start mb-2 px-4
            "
            v-for="(label, key) in {
                name: '快照名称',
                snapshotId: '对应快照 ID',
                filename: '归档文件名',
                hash: '归档文件哈希',
                id: '归档 ID',
                createTime: '创建时间',
                status: '归档状态',
            }"
            :key="key">

            <span
                class="
                    text-slate-500 w-[125px]
                ">
                {{ label }}
            </span>

            <span
                class="
                    break-all
                ">
                {{ key === 'status' ? BackupStatus[backup.status] : backup[key] }}
            </span>

        </div>

        <h3
            class="
                fake-border-l my-6 text-lg font-semibold ml-4
            ">
            还原设置
        </h3>

        <i-form
            @submit="storeBackup">

            <node-select
                v-model="form.nodeId"
                v-model:error="error.nodeId"
                label="还原节点"/>

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
                    flex justify-end
                ">

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

import IDialog from "~/components/dialog.vue";
import IForm from '~/components/form.vue';
import ITextarea from '~/components/textarea.vue';
import NodeSelect from '../commons/node-select.vue';

import axios from "~/plugins/axios";
import { notify } from '~/plugins/notify';

import {
    Backup,
    BackupStatus,
} from '~/types/archive/backup';

import {
    ref,
    watch,
    toRaw,
} from 'vue';

const props = defineProps<{
    backup: Backup;
}>();

const emits = defineEmits([
    'refresh',
]);

const showRestoreDialog = ref(false);

const form = ref({
    nodeId: '',
    content: '',
});

const error = ref({
    nodeId: '',
    content: '',
});

watch(
    () => showRestoreDialog.value,
    (value) => {
        if (!value) {
            form.value = {
                nodeId: '',
                content: '',
            };
            error.value = {
                nodeId: '',
                content: '',
            };
        }
    }
);

const loading = ref(false);

const storeBackup = () => {
    loading.value = true;

    axios.post(`/archive/restore/create`, {
        ...toRaw(form.value),
        backupId: props.backup.id,
    })
        .then(() => {

            notify({
                title: '还原成功',
                type: 'success',
            });

            emits('refresh');

            showRestoreDialog.value = false;
        })
        .finally(() => {
            loading.value = false;
        });
};

</script>