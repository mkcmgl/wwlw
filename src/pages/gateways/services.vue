<template>
    <page-title
        title="服务监控"
        :use-title-template="false">

        <div
            class="
                flex items-center ml-4
            ">
            <router-link
                class="
                    mx-2 py-1 px-2.5 text-sm
                    rounded-full clickable hoverable relative overflow-hidden
                "
                :class="{
                    'linear-hover text-white': activeNode == node.toString(),
                }"
                v-for="node in 4"
                :key="node"
                :to="{
                    query: {
                        node,
                    }
                }"
                v-wave>
                节点{{ node }}
            </router-link>
        </div>

    </page-title>

    <div
        :key="activeNode"
        v-if="
            Object.keys(nodeData).length
            && Object.keys(networkInfo).length
        ">

        <div
            class="
                mx-4 mb-4 p-6 bg-white rounded
            ">

            <h3
                class="
                    fake-border-l mb-4 text-lg font-semibold
                ">
                节点运行监控
            </h3>


            <div
                class="
                    flex items-center
                    justify-around
                    -mb-5
                ">

                <panel
                    class="
                        w-1/4
                    "
                    label="CPU占用"
                    :value="nodeData.cpuUsage.used"/>

                <panel
                    class="
                        w-1/4
                    "
                    label="内存占用"
                    :value="nodeData.memoryUsage.usage"/>

                <panel
                    class="
                        w-1/4
                    "
                    label="JVM占用"
                    :value="nodeData.jvmInfo.usage"/>

                <panel
                    class="
                        w-1/4
                    "
                    label="平均上行网络"
                    :max="1"
                    :value="networkInfo.avgRxPercent"/>

            </div>
            
        </div>

        <div
            class="
                mx-2
                mb-4 flex
            ">

            <div
                class="
                    w-1/2
                    mx-2 p-6 bg-white rounded
                    block
                ">

                <h3
                    class="
                        fake-border-l mb-4 text-lg font-semibold
                    ">
                    CPU
                </h3>

                <table>
                    <thead>
                        <tr>
                            <th>
                                属性
                            </th>
                            <th>
                                值
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                核心数
                            </td>
                            <td>
                                {{ nodeData.cpuUsage.cpuNum }}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                用户使用率
                            </td>
                            <td>
                                {{ nodeData.cpuUsage.used.toFixed(2) }}%
                            </td>
                        </tr>
                        <tr>
                            <td>
                                系统使用率
                            </td>
                            <td>
                                {{ nodeData.cpuUsage.sys.toFixed(2) }}%
                            </td>
                        </tr>
                        <tr>
                            <td>
                                空闲率
                            </td>
                            <td>
                                {{ nodeData.cpuUsage.free.toFixed(2) }}%
                            </td>
                        </tr>
                    </tbody>
                </table>
                
            </div>

            <div
                class="
                    w-1/2
                    mx-2 p-6 bg-white rounded
                    block
                ">

                <h3
                    class="
                        fake-border-l mb-4 text-lg font-semibold
                    ">
                    内存
                </h3>

                <table>
                    <thead>
                        <tr>
                            <th>
                                属性
                            </th>
                            <th>
                                内存
                            </th>
                            <th>
                                JVM
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                总内存
                            </td>
                            <td>
                                {{ nodeData.memoryUsage.total }}
                            </td>
                            <td>
                                {{ nodeData.jvmInfo.total }}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                已用内存
                            </td>
                            <td>
                                {{ nodeData.memoryUsage.used }}
                            </td>
                            <td>
                                {{ nodeData.jvmInfo.used }}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                剩余内存
                            </td>
                            <td>
                                {{ nodeData.memoryUsage.free }}
                            </td>
                            <td>
                                {{ nodeData.jvmInfo.free }}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                使用率
                            </td>
                            <td>
                                {{ nodeData.memoryUsage.usage.toFixed(2) }}%
                            </td>
                            <td>
                                {{ nodeData.jvmInfo.usage.toFixed(2) }}%
                            </td>
                        </tr>
                    </tbody>
                </table>
                
            </div>

        </div>

        <div
            class="
                mx-4 mb-4 p-6 bg-white rounded
            ">

            <h3
                class="
                    fake-border-l mb-4 text-lg font-semibold
                ">
                磁盘状态
            </h3>

            <div
                class="
                    overflow-x-auto
                ">
                <table>
                    <thead>
                        <tr>
                            <th>
                                盘符路径
                            </th>
                            <th>
                                文件系统
                            </th>
                            <th>    
                                类型
                            </th>
                            <th>
                                总大小
                            </th>
                            <th>
                                可用大小
                            </th>
                            <th>
                                已用大小
                            </th>
                            <th>
                                已用百分比
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="(disk, index) in nodeData.diskUsages"
                            :key="index">

                            <td>
                                {{ disk.dirName }}
                            </td>
                            <td>
                                {{ disk.sysTypeName }}
                            </td>
                            <td>
                                {{ disk.typeName }}
                            </td>
                            <td>
                                {{ disk.total }}
                            </td>
                            <td>
                                {{ disk.free }}
                            </td>
                            <td>
                                {{ disk.used }}
                            </td>
                            <td>
                                {{ disk.usage }}%
                            </td>

                        </tr>
                    </tbody>
                </table>
            </div>

            

        </div>


        <div
            v-if="
                Object.keys(networkInfo).length
            "
            class="
                mx-4 mb-4 p-6 bg-white rounded
            ">

            <h3
                class="
                    flex items-center
                    fake-border-l mb-4 text-lg font-semibold
                ">
                网络上下行流量

                <span
                    class="font-normal text-slate-600 text-sm ml-6">
                    单位：mb/s
                </span>
            </h3>

            <network-chart
                :network-info="networkInfo.networkInfos"/>

        </div>

    </div>

</template>

<script lang="ts" setup>

import PageTitle from '~/components/page-title.vue';

import Panel from '~/prefabs/pages/gateways/services/panel.vue';
import NetworkChart from '~/prefabs/pages/gateways/services/network-chart.vue';

import axios from '~/plugins/axios';

import {
    onMounted,
    ref,
    computed,
    watch,
} from 'vue';

import {
    useRoute
} from 'vue-router';

type NodeData = {
    cpuUsage: {
        cpuNum: number;
        used: number;
        sys: number;
        free: number;
    },
    jvmInfo: {
        total: number;
        used: number;
        free: number;
        usage: number;
    },
    memoryUsage: {
        total: number;
        used: number;
        free: number;
        usage: number;
    },
    diskUsages: {
        dirName: string;
        sysTypeName: string;
        typeName: string;
        total: number;
        free: number;
        used: number;
        usage: number;
    }[]
};

type NetworkInfo = {
    avgRxPercent: number;
    avgTxPercent: number;
    networkInfos: {
        rxPercent: number;
        txPercent: number;
    }[];
};

const route = useRoute();

const activeNode = computed(() => {
    return (route.query?.node ?? 1) as string;
});

const nodeData = ref({} as NodeData);
const networkInfo = ref({} as NetworkInfo);

const loadData = async () => {
    const { data: _nodeData } = await axios.get(`/gateway/node/getNodeInfo/${activeNode.value}`);
    nodeData.value = _nodeData.data as NodeData;

    const { data: _networkInfo } = await axios.get(`/gateway/node/getNetWorkInfo/${activeNode.value}`);
    networkInfo.value = _networkInfo.data as NetworkInfo;
};

onMounted(async () => {
    await loadData();
});

watch(activeNode, async () => {
    await loadData();
});



</script>