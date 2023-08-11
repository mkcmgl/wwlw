<template>
    <div class="h-[55px] flex items-center px-4 ">
        <svg xmlns="http://www.w3.org/2000/svg" class="cursor-pointer" width="6.28" height="10.499"
            viewBox="0 0 6.28 10.499">
            <path class="a"
                d="M133.053,555.55l3.606-3.559a1.021,1.021,0,0,0,.009-1.418,1,1,0,0,0-.713-.3,1.07,1.07,0,0,0-.705.289l-4.29,4.233a1.019,1.019,0,0,0,0,1.423l4.26,4.26a1,1,0,0,0,1.418,0,1.019,1.019,0,0,0,0-1.417Z"
                transform="translate(-130.669 -550.275)" />
        </svg>
        <h1 class="font-bold text-xl ml-3 leading-relaxed" v-html="title" />
        <slot />
    </div>
    <div class="h-[calc(100vh-150px)] mx-4 overflow-auto">
            <div class="flex items-center justify-center mb-8">
                <img src="/src/assets/images/authentication-1.svg" class="" alt="1" />
                <div class="text-[#333] text-base ml-3">激活数字身份</div>
                <i class="border-spacing-3 w-[200px] border-[#BBD2F1] border-solid border-[1px] mx-[50px]"></i>
                <img src="/src/assets/images/authentication-2.svg" alt="2" />
                <div class="text-[#333] text-base ml-3">实名认证申请</div>
            </div>
    <div
        class="m-auto h-[calc(100vh-450px)] max-h-[calc(2*(100vw-750px)/3)] min-h-[500px] w-[calc(100vw-750px)] min-w-[900px] bg-[#fff] rounded-[10px] shadow-lg">
        <div class="w-[65%] max-w-[1000px] m-auto h-full pt-16 relative flex flex-col justify-around">
            <div class="flex justify-center">
                <img src="/src/assets/images/activate-title.svg" class="w-[61`px] inline-block mx-4" />
                <div class="inline-block">
                    <span class="text-[#333] text-[26px] block font-bold">请确认并激活您的数字身份标识</span>
                    <span class="text-[16px] text-[#999] mt-1 block">认证通过后，该标识将写入身份凭证文件中并永久留存</span>
                </div>
            </div>
            <div class="mt-14 h-[60%]">
                <div class="flex mb-4 leading-[50px]">
                    <span class="text-[20px] text-[#333] w-[15%]">did:id</span>
                    <input type="text"
                        class="flex-1 bg-[#F4F5FC] text-[18px] text-[#2F88FF] font-bold rounded-[5px] focus:outline-none" />
                </div>
                <div class="flex mb-4 leading-[50px]">
                    <span class="text-[20px] text-[#333] w-[15%]">did公钥</span>
                    <span class="flex-1 bg-[#F4F5FC] text-[18px] text-[#2F88FF] font-bold rounded-[5px]">
                        5A4A1CC2535E18E8416D884ECC5A794377C27A2FB48A</span>
                </div>
            </div>
            <div class="absolute bottom-4 w-full text-center ext-[13px] text-[#999]">
                点击“下一步”按钮，即代表您已知晓并同意将该数字身份标识写入凭证文件中
            </div>
        </div>
    </div>
    <router-link :to="{
        name: 'digital-identities/authentication'
    }">
        <button class="m-auto mt-4 block w-72 p-2.5 rounded-[5px] text-white tracking-widest clickable relative" :class="[
            loading
                ? 'bg-slate-300 cursor-not-allowed'
                : 'bg-[linear-gradient(90deg,#0477FD_0%,#04D8FD_100%)]',
        ]" type="submit" :disabled="loading" v-wave="!loading">
            <i v-if="loading" class="mdi mdi-loading mdi-spin mr-2"></i>
            下一步
        </button>
    </router-link>
</div></template>

<script lang="ts" setup>

import { useMeta } from 'vue-meta';
import {
    type ComputedRef,
    computed,
    ref
} from 'vue';
const loading = ref(false);
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
