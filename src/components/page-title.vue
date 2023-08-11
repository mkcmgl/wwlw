<template>
    <div
        class="
            h-[55px] flex items-center px-4
        ">
        <h1
            class="
                font-bold text-xl
            "
            v-html="title"/>
        <slot/>
    </div>
</template>

<script lang="ts" setup>

import { useMeta } from	'vue-meta';
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