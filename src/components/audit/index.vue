<template>
    <div class="
            h-[55px] flex items-center px-4
        ">
        <h1 class="
                font-bold text-xl
            " v-html="title" />
        <slot />
    </div>
    <!-- <div class="h-[calc(100vh-140px)]  mx-4  overflow-y-scroll">
        <div class="bg-[#fff] w-full h-[100px]  rounded-md">
            
        </div >
        <div class="bg-[#fff] w-full h-[calc(100vh-260px)] mt-5 rounded-md overflow-y-scroll">
            
        </div>
    </div> -->
</template>

<script lang="ts" setup>

import { useMeta } from 'vue-meta';
import {
    type ComputedRef,
    computed
} from 'vue';
import axios from '~/plugins/axios';
const props = withDefaults(defineProps<{
    title: string;
    useTitleTemplate?: boolean;
}>(), {
    title: '',
    useTitleTemplate: true,
});

type Meta = {
    title: string;
    titleTemplate?: boolean;
};

const computedMeta: ComputedRef<Meta> = computed(() => {

    let meta = {
        title: props.title.html2text(),
    } as Meta;

    if (!props.useTitleTemplate) {
        meta.titleTemplate = false;
    }

    return meta as Meta;
});

useMeta(computedMeta.value);

</script>