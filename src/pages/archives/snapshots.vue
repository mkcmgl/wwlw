<template>
    
    <page-title
        title="数据归档">
        <snapshot-create-dialog
            @created="refreshListData"
            class="
                ml-auto
            "/>
    </page-title>

    <paginate-page
        ref="page"
        api="archive/snapshot/page"
        :thead="[
            '快照 ID',
            '快照名称',
            '快照类型',
            '快照节点编号',
            '快照周期',
            '周期开始时间',
            '开始区块',
            '结束区块',
            '保留天数',
            '快照描述',
            '创建时间',
            '详情'
        ]"
        :filters="{
            name: '快照名称',
            type: {
                type: 'single-select',
                label: '快照类型',
                options: [
                    {
                        value: '1',
                        label: '自动'
                    },
                    {
                        value: '2',
                        label: '手动'
                    }
                ]
            },
            retentionDay: {
                type: 'number',
                label: '保留天数',
                attrs: {
                    min: 1,
                    max: 365
                }
            },
            
        }"
        enable-sticky>

        <template
            #tr="{
                singleData
            }">

            <snapshot-tr
                :snapshot="(singleData as Snapshot)"/>
            
        </template>

    </paginate-page>

</template>

<script lang="ts" setup>

import PageTitle from '~/components/page-title.vue';
import PaginatePage from '~/components/paginate-page/index.vue';

import SnapshotTr from '~/prefabs/pages/archives/snapshots/tr.vue';
import SnapshotCreateDialog from '~/prefabs/pages/archives/snapshots/create-dialog.vue';

import {
    Snapshot,
} from '~/types/archive/snapshot';

import {
    ref
} from 'vue';

const page = ref(null);

const refreshListData = () => {
    page.value?.refreshData();
};

</script>