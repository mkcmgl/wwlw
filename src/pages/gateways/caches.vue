<style lang="scss">

    .disk-status-table {
        th {
            @apply text-slate-500;
        }
    }

</style>

<template>
    <page-title
        title="缓存监控"/>

    <div
        v-if="Object.keys(cache).length"
        class="
            mx-4 mb-4 p-6 bg-white rounded
        ">

        <h3
            class="
                flex items-center
                fake-border-l mb-4 text-lg font-semibold
            ">
            磁盘状态
        </h3>

        <div
            class="
                overflow-x-auto
                w-full
            ">
            <table
                class="
                    disk-status-table
                ">
                <tbody>
                    <tr
                        class="
                            border-t
                        ">
                        <th>
                            Redis版本
                        </th>
                        <td>
                            {{ cache.version }}
                        </td>
                        <th>
                            运行模式
                        </th>
                        <td>
                            {{ cache.runMode }}
                        </td>
                        <th>
                            端口
                        </th>
                        <td>
                            {{ cache.port }}
                        </td>
                        <th>
                            客户端数
                        </th>
                        <td>
                            {{ cache.clientCount }}
                        </td>
                    </tr>
                    <tr>
                        <th>
                            运行时间
                        </th>
                        <td>
                            {{ cache.runningDays }}
                        </td>
                        <th>
                            使用内存
                        </th>
                        <td>
                            {{ cache.useMemory }}
                        </td>
                        <th>
                            使用CPU
                        </th>
                        <td>
                            {{ cache.useCpu }}
                        </td>
                        <th>
                            内存配置
                        </th>
                        <td>
                            {{ cache.maxMemory.toFixed(2) }} MB
                        </td>
                    </tr>
                    <tr>
                        <th>
                            AOF是否开启
                        </th>
                        <td>
                            {{ cache.openAOF }}
                        </td>
                        <th>
                            RDB是否成功
                        </th>
                        <td>
                            {{ cache.rdbsuccess }}
                        </td>
                        <th>
                            Key 数量
                        </th>
                        <td>
                            {{ cache.keyCount }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

    </div>

    <div
        v-if="Object.keys(cache).length"
        class="
            flex mx-2
        ">

        <div
            class="
                w-1/2
                mx-2 mb-4 p-6 bg-white rounded
            ">
            <h3
                class="
                    flex items-center
                    fake-border-l mb-4 text-lg font-semibold
                ">
                CPU
            </h3>

            <cpu-info
                :command-stats="cache.commandStats"/>
        </div>

        <div
            class="
                w-1/2
                mx-2 mb-4 p-6 bg-white rounded
            ">
            <h3
                class="
                    flex items-center
                    fake-border-l mb-4 text-lg font-semibold
                ">
                内存
            </h3>

            <memory-info
                :value="cache.useMemory"
                :max="cache.maxMemory"/>
        </div>

    </div>
</template>

<script lang="ts" setup>

import PageTitle from '~/components/page-title.vue';

import CpuInfo from '~/prefabs/pages/gateways/caches/cpu-info.vue';
import MemoryInfo from '~/prefabs/pages/gateways/caches/memory-info.vue';

import axios from '~/plugins/axios';

import {
    type Ref,
    onBeforeMount,
    ref,
} from 'vue';

type Cache = {
    version: string;
    runMode: string;
    port: string;
    clientCount: string;
    runningDays: string;
    useMemory: number;
    useCpu: string;
    maxMemory: number;
    openAOF: string;
    keyCount: string;
    commandStats: {
        commandName: string;
        useCount: number;
    }[];
    rdbsuccess: string;
}

const cache = ref({}) as Ref<Cache>;

onBeforeMount(async () => {
    const { data } = await axios.get('/gateway/cache/getCacheInfo');
    cache.value = data.data;
});

</script>