<template>
    <div class="h-[55px] w-50 flex items-center px-4" @click="back">
        <svg xmlns="http://www.w3.org/2000/svg" class="cursor-pointer" width="6.28" height="10.499"
            viewBox="0 0 6.28 10.499">
            <path class="a"
                d="M133.053,555.55l3.606-3.559a1.021,1.021,0,0,0,.009-1.418,1,1,0,0,0-.713-.3,1.07,1.07,0,0,0-.705.289l-4.29,4.233a1.019,1.019,0,0,0,0,1.423l4.26,4.26a1,1,0,0,0,1.418,0,1.019,1.019,0,0,0,0-1.417Z"
                transform="translate(-130.669 -550.275)" />
        </svg>
        <h1 class="font-bold text-xl ml-3 leading-relaxed cursor-pointer" v-html="title" />
        <slot />
    </div>
    <div class="h-[calc(100vh-150px)] mx-4 overflow-auto">
        <div class="flex items-center justify-center mb-4">
            <img src="/src/assets/images/authentication-1.svg" class="" alt="1" />
            <div class="text-[#333] text-base ml-3">激活数字身份</div>
            <i class="border-spacing-3 w-[200px] border-[#BBD2F1] border-solid border-[1px] mx-[50px]"></i>
            <img src="/src/assets/images/authentication-2.svg" alt="2" />
            <div class="text-[#333] text-base ml-3">实名认证申请</div>
        </div>
        <div
            class="m-auto h-[calc(2*(100vw-1050px)/5)] max-h-[calc(2*(100vw-1050px)/5)] min-h-[350px] w-[calc(100vw-750px)] min-w-[900px] bg-[#fff] rounded-[10px] shadow-lg">
            <div class="w-[62%] max-w-[1000px] m-auto h-full pt-4 relative flex flex-col justify-center">
                <div class="flex justify-center">
                    <img src="/src/assets/images/activate-title.svg" class="w-[61`px] inline-block mx-4" />
                    <div class="inline-block">
                        <span class="text-[#333] text-[26px] block font-bold">请确认并激活您的数字身份标识</span>
                        <span class="text-[16px] text-[#999] mt-1 block">认证通过后，该标识将写入身份凭证文件中并永久留存</span>
                    </div>
                </div>
                <div class="mt-10 h-[60%] pl-8">
                    <el-form ref="iidFromRef" label-width="85px" label-position="left" class="text-[#333] did-from"
                        :model="submitiidFrom" :rules="iidFromRules">
                        <el-form-item label="did:id" prop="iid" style="margin-bottom:30px">
                            <el-input class="did-input" v-model="submitiidFrom.iid" placeholder="请输入did:id"></el-input>
                        </el-form-item>
                        <el-form-item label="did公钥" prop="publicKey">
                            <el-input class="did-input" v-model="submitiidFrom.publicKey" placeholder="请输入did公钥"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="absolute bottom-4 w-full text-center ext-[13px] text-[#999]">
                    点击“下一步”按钮，即代表您已知晓并同意将该数字身份标识写入凭证文件中
                </div>
            </div>
        </div>
        <!-- <router-link :to="{
            name: 'digital-identities/authentication'
        }"> -->
        <button class="m-auto mt-8 block w-72 p-2.5 rounded-[5px] text-white tracking-widest clickable relative" :class="[
            loading
                ? 'bg-slate-300 cursor-not-allowed'
                : 'bg-[linear-gradient(90deg,#0477FD_0%,#04D8FD_100%)]',
        ]" type="submit" :disabled="loading" v-wave="!loading" @click="subDidForm(iidFromRef)">
            <i v-if="loading" class="mdi mdi-loading mdi-spin mr-2"></i>
            下一步
        </button>
    </div>
</template>

<script lang="ts" setup>

import { useMeta } from 'vue-meta';
import {
    type ComputedRef,
    computed,
    ref,
    onBeforeMount,
    reactive
} from 'vue';
import {
    useRouter
} from 'vue-router';
import type { FormInstance, FormRules } from 'element-plus';

import {
    useAuthStore
} from '~/store/auth';
import { IidDidForm } from '~/types/iid';
const authStore = useAuthStore();

const iidFrom = computed(() => authStore.iidFrom);
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


onBeforeMount(() => {
    getIidFrom();
});
const submitiidFrom = ref<IidDidForm>({
    iid: '',
    publicKey: '',
});

const iidFromRef = ref<FormInstance>();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// const validateEmoji = (rule: any, value: any, callback: any) => {
//     if (value.match(/(\p{Emoji_Presentation}|\p{Extended_Ideographic})/gu)) {
//         callback(new Error('不能包含表情符号'));
//     } else {
//         callback();
//     }
// };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const equalToEmpty = (rule: any, value: any, callback: any) => {
    if (/^\s+$/gi
        .test(value)) {
        callback(new Error('不能全输入空格'));
    } else {
        callback();
    }
};
const iidFromRules = reactive<FormRules<IidDidForm>>({
    iid: [
        { required: true, message: '请输入did:id', trigger: 'blur' },
        { required: true, validator: equalToEmpty, trigger: "blur" },
        // { required: true, validator: validateEmoji, trigger: "blur" },
    ],
    publicKey: [
        { required: true, message: '请输入publicKey', trigger: 'blur' },
        { required: true, validator: equalToEmpty, trigger: "blur" },
        // { required: true, validator: validateEmoji, trigger: "blur" },
    ],
});

const router = useRouter();
useMeta(computedMeta.value);
const back = () => {
    router.back();
};
const subDidForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.validate((valid) => {
        if (valid) {
            loading.value = true;
            iidFrom.value.iidDidForm = submitiidFrom.value;
            router.push({
                name: 'digital-identities/authentication'
            });
        } else {
            return false;
        }
    });
    loading.value = false;
};
const getIidFrom = () => {
    submitiidFrom.value =iidFrom.value.iidDidForm;
};
</script>

<style lang="scss" scoped>
.did-from {
    ::v-deep(.el-form-item__label) {
        font-size: 20px;
        line-height: 50px;
    }

    ::v-deep(.el-form-item__label)::before {
        display: none;
    }
    ::v-deep(.el-form-item__label){
        color:#333;
    }
    ::v-deep(.el-input__wrapper) {
        border-radius: 5px;
        height: 50px;
        line-height: 50px;
        background-color: #f4f5fc;

        .el-input__inner {
            color: #2f88ff;
            font-size: 18px;
        }
    }
}
</style>
