<template>

    <tr>
        <td>
            {{ snapshot.id }}
        </td>
        <td>
            {{ snapshot.name }}
        </td>
        <td>
            {{ SnapshotType[snapshot.type] }}
        </td>
        <td>
            {{ snapshot.nodeId }}
        </td>
        <td>
            {{ SnapshotPeriodType[snapshot.periodType] }}
        </td>
        <td>
            {{ snapshot.periodTime }}
        </td>
        <td>
            {{ snapshot.startBlock }}
        </td>
        <td>
            {{ snapshot.endBlock }}
        </td>
        <td>
            {{ snapshot.retentionDay }}
        </td>
        <td>
            {{ snapshot.content }}
        </td>
        <td>
            {{ snapshot.createTime }}
        </td>
        <td>
            <button
                class="
                    text-blue-600
                "
                type="button"
                @click="showDetailDialog = true">
                详情
            </button>
        </td>
    </tr>


    <i-dialog
        v-model:show="showDetailDialog">

        <template
            #title>
            <h1
                class="
                    text-center
                ">
                详情
            </h1>
        </template>

        <h3
            class="
                fake-border-l mb-6 text-lg font-semibold ml-4
            ">
            基本信息
        </h3>

        <div
            class="
                flex items-start mb-2 px-4
            "
            v-for="(label, key) in {
                id: '快照 ID',
                name: '快照名称',
                nodeId: '快照节点编号',
                periodTime: '快照周期',
                startBlock: '开始区块',
                endBlock: '结束区块',
                retentionDay: '保留天数',
                content: '快照内容',
                createTime: '创建时间',
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
                {{ snapshot[key] }}
            </span>

        </div>

        <div
            class="
                flex items-start mb-2 px-4
            ">

            <span
                class="
                    text-slate-600 w-[125px]
                ">
                快照类型
            </span>

            <span
                class="
                    break-all
                ">
                {{ SnapshotType[snapshot.type] }}
            </span>

        </div>

        <div
            class="
                flex items-start mb-2 px-4
            ">

            <span
                class="
                    text-slate-600 w-[125px]
                ">
                快照周期
            </span>

            <span
                class="
                    break-all
                ">
                {{ SnapshotPeriodType[snapshot.periodType] }}
            </span>

        </div>

    </i-dialog>


</template>

<script lang="ts" setup>

import { 
    ref
} from 'vue';

import {
    SnapshotType,
    SnapshotPeriodType,
    Snapshot,
} from '~/types/archive/snapshot';

import IDialog from '~/components/dialog.vue';

const showDetailDialog = ref(false);

defineProps<{
    snapshot: Snapshot;
}>();


</script>