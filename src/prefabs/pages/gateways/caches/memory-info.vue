<template>
    <div
        ref="wrapper"
        class="
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
    value: number;
    max: number;
}>();

const wrapper = ref();

const loadPanel = () => {

    const dom = wrapper.value;

    const chart = echarts.init(dom);

    const option = {
        series: [
            {
                type: 'gauge',
                max: props.max,
                radius: '120px',
                progress: {
                    roundCap: true,
                    show: true,
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 1, 1, 0, [
                            {offset: 0, color: 'rgba(82, 255, 243, 0.15)'},
                            {offset: 1, color: 'rgba(7, 101, 246, 1)'}
                        ]),
                    },
                    width: 12,
                },
                axisLine: {
                    roundCap: true,
                    show: true,
                    lineStyle: {
                        color: [
                            [1, '#f5f5f5']
                        ],
                        width: 12
                    }
                },
                detail: {
                    formatter: `{a|${(props.value * 100 / props.max).toFixed(2)}MB}`,
                    rich: {
                        a: {
                            fontWeight: '600',
                            fontSize: '14px',
                            color: '#333333',
                        }
                    }
                },
                data: [
                    {
                        // 保留 2 位小数
                        value: props.value.toFixed(0),
                        name: '内存消耗'
                    }
                ],
                pointer: {
                    show: true
                },
                splitLine: {
                    show: false,
                },
                axisTick: {
                    length: 5,
                    lineStyle: {
                        color: 'rgba(0,0,0,0.25)',
                    }
                },
                axisLabel: {
                    formatter: function(value) {
                        return Math.round(value);
                    }
                }
            }
        ]
    };

    option && chart.setOption(option);
};


onMounted(() => {
    loadPanel();
});

</script>