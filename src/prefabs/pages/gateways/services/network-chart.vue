<template>
    <div ref="wrapper" class="
            h-[240px]
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
    networkInfo: {
        rxPercent: number;
        txPercent: number;
    }[];
}>();

const wrapper = ref();

const loadPanel = () => {

    const dom = wrapper.value;

    const chart = echarts.init(dom);

    const option = {
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: Array.from({ length: props.networkInfo.length }, (_, i) => `${(i + 1) * 10}分钟前`),
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        grid: {
            left: '20px',
            right: '40px',
            bottom: '0px',
            top: '20px',
            containLabel: true
        },
        series: [
            {
                name: '上行网络',
                type: 'line',
                stack: 'Total',
                smooth: true,
                lineStyle: {
                    width: 1,
                    color: 'rgba(31, 217, 215, 1)'
                },
                showSymbol: false,
                areaStyle: {
                    opacity: 1,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: 'rgba(31, 217, 215, 1)'
                        },
                        {
                            offset: 0.9,
                            color: 'rgba(31, 217, 215, 0)'
                        }
                    ])
                },
                emphasis: {
                    focus: 'series'
                },
                data: props.networkInfo.map(item => item.txPercent)
            },
            {
                name: '下行网络',
                type: 'line',
                stack: 'Total',
                smooth: true,
                lineStyle: {
                    width: 1,
                    color: 'rgba(102, 146, 242, 1)'
                },
                showSymbol: false,
                areaStyle: {
                    opacity: 1,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: 'rgba(102, 146, 242, 1)'
                        },
                        {
                            offset: 0.9,
                            color: 'rgba(102, 146, 242, 0)'
                        }
                    ])
                },
                emphasis: {
                    focus: 'series'
                },
                data: props.networkInfo.map(item => item.rxPercent)
            }
        ]
    };

    option && chart.setOption(option);
};


onMounted(() => {
    loadPanel();
});

</script>