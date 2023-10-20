<template>
    <div
        ref="wrapper"
        class="
            h-[300px]
        ">
    </div>
</template>

<script lang="ts" setup>

import {
    onMounted,
    ref,
} from 'vue';

import * as echarts from 'echarts';

const props = defineProps<{
    commandStats: {
        commandName: string;
        useCount: number;
    }[];
}>();

const wrapper = ref();

const loadPanel = () => {

    const dom = wrapper.value;

    const chart = echarts.init(dom);

    const option = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: '0%',
            left: 'center'
        },
        series: [
            {
                type: 'pie',
                radius: ['40%', '70%'],
                label: {
                    show: false,
                },
                emphasis: {
                    label: {
                        show: false
                    }
                },
                labelLine: {
                    show: false
                },
                data: props.commandStats.map((item) => {
                    return {
                        value: item.useCount,
                        name: item.commandName
                    };
                })
            }
        ]
    };

    option && chart.setOption(option);
};


onMounted(() => {
    loadPanel();
});
</script>