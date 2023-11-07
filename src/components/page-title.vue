<template>
        <div v-if="back" class="flex h-[55px] items-center px-4">
             <div class=" flex  items-center"  @click="handlerBack">
                <svg xmlns="http://www.w3.org/2000/svg" class="cursor-pointer" width="6.28" height="10.499"
                    viewBox="0 0 6.28 10.499">
                    <path class="a"
                        d="M133.053,555.55l3.606-3.559a1.021,1.021,0,0,0,.009-1.418,1,1,0,0,0-.713-.3,1.07,1.07,0,0,0-.705.289l-4.29,4.233a1.019,1.019,0,0,0,0,1.423l4.26,4.26a1,1,0,0,0,1.418,0,1.019,1.019,0,0,0,0-1.417Z"
                        transform="translate(-130.669 -550.275)"
                            />
                </svg>
                <h1 class="font-bold text-xl ml-3 leading-relaxed cursor-pointer" v-html="title" />
            </div>
            <slot />
       
        </div>
        <div v-else
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
    computed,
    watch,
} from 'vue';
import {
    useRouter
} from 'vue-router';
const props = withDefaults(defineProps<{
    title: string;
    useTitleTemplate?: boolean;
    back?: boolean;
}>(), {
    title: '',
    useTitleTemplate: true,
    back: false,
});

type Meta = {
    title: string;
    titleTemplate?: boolean;
};
const router = useRouter();
const handlerBack = () => {
    router.back();
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

const metaInstance = useMeta(computedMeta.value);

watch(() => props.title, () => {
    metaInstance.meta.title = props.title.html2text();
});

</script>