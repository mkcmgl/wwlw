<template>

    <div
        class="
            rounded
            w-full overflow-x-auto
        ">
        <table>

            <thead>
                <tr
                    v-if="hasTheadSlot">
                    <th
                        v-for="
                            (item, index) in thead
                        "
                        :class="{
                            'listRightSticky': enableSticky && index === thead.length - 1,
                        }"
                        :key="index">
                        {{ item }}
                    </th>
                </tr>
                <slot
                    name="thead"/>
            </thead>

            <tbody
                v-if="listData.length > 0">
                <template
                    v-for="
                        (data, index) in listData
                    "
                    :key="index">
                    <slot
                        
                        name="tr"
                        :single-data="data"/>
                </template>
            </tbody>
        </table>

        <div
            v-if="listData.length === 0"
            class="
                flex justify-center items-center
                w-full h-[200px]
                text-[#BDBDBD]
                tracking-widest
                border-b
            ">
              <div class="flex flex-col items-center">
                  <img src="/src/assets/images/noData.svg" class="w-[100px] "/>
                  <span class="relative top-[-40px] text-[#333] text-sm">暂无数据~</span>
              </div>
        </div>
    </div>

</template>

<script lang="ts" setup>



withDefaults(defineProps<{
    thead?: string[];
    listData: Record<string, unknown>[];
    enableSticky?: boolean;
}>(), {
    enableSticky: false,
});

import {
    useSlots,
    computed,
} from 'vue';

const theadSolt = useSlots({
    name: 'thead',
});

const hasTheadSlot = computed(() => {
    return theadSolt;
});

</script>