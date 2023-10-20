<template>
    <page-title
        title="数据归档"/>

    <paginate-page
        ref="page"
        api="archive/backup/page"
        :thead="[
            '快照名称',
            '对应快照 ID',
            '归档文件名',
            '归档文件哈希',
            '归档 ID',
            '创建时间',
            '操作',
        ]"
        :filters="{
            name: '快照名称',
            snapshotId: '对应快照 ID',
            filename: '归档文件名',
            hash: '归档文件哈希',
            id: '归档ID',
            status: {
                type: 'single-select',
                label: '归档状态',
                options: [
                    {
                        value: '0',
                        label: '进行中'
                    },
                    {
                        value: '1',
                        label: '成功'
                    },
                    {
                        value: '2',
                        label: '失败'
                    },
                    {
                        value: '9',
                        label: '已失效'
                    }
                ]
            },
        }">

        <template
            #tr="{
                singleData
            }">

            <backup-tr
                @refresh="refreshData"
                :backup="(singleData as Backup)"/>
                
        </template>

    </paginate-page>

</template>

<script lang="ts" setup>

import PageTitle from '~/components/page-title.vue';
import PaginatePage from '~/components/paginate-page/index.vue';

import BackupTr from '~/prefabs/pages/archives/backups/tr.vue';
import { Backup } from '~/types/archive/backup';

import {
    ref
} from 'vue';

const page = ref();

const refreshData = () => {
    page.value?.refreshData();
};

</script>