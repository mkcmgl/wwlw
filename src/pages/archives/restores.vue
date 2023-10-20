<template>
    <page-title
        title="数据还原"/>

    <paginate-page
        ref="page"
        api="archive/restore/page"
        :thead="[
            '归档 ID',
            '还原节点编号',
            '还原状态',
            '还原 ID',
            '创建时间',
        ]"
        :filters="{
            backupId: '归档 ID',
            nodeId: '还原节点编号',
            id: '还原 ID',
            status: {
                type: 'single-select',
                label: '还原状态',
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
                ]
            },
        }">

        <template
            #tr="{
                singleData
            }">

            <restore-tr
                :restore="(singleData as Restore)"/>
                
        </template>

    </paginate-page>

</template>

<script lang="ts" setup>

import PageTitle from '~/components/page-title.vue';
import PaginatePage from '~/components/paginate-page/index.vue';

import RestoreTr from '~/prefabs/pages/archives/restores/tr.vue';
import { Restore } from '~/types/archive/restore';

</script>