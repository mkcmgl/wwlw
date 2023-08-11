<template>
    <div class="
            h-[55px] flex items-center px-4
        ">
        <h1 class="
                font-bold text-xl
            " v-html="title" />
        <slot />
    </div>
    <div class="h-[calc(100vh-150px)] bg-[#fff] mx-4 flex  items-center justify-center overflow-y-scroll">
        <div class=" flex-col flex h-[300px]  items-center justify-center">
            <img src="/src/assets/images/id-mine.svg" class="w-[300px]" />
            <span  class="text-2xl relative top-[-120px]  text-[#333]">抱歉！您无权访问</span>
            <span class="text-base relative  top-[-120px] text-[#333]">请先
                 <router-link class="
                                text-blue-600 no-underline hover:underline
                            " :to="{
                                name: 'digital-identities/activate'
                            }">
                                激活数字身份
                            </router-link>
                ，并完成实名认证</span>
        </div>
    </div>
</template>

<script lang="ts" setup>

import { useMeta } from 'vue-meta';
import {
    type ComputedRef,
    computed
} from 'vue';

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