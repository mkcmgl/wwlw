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
            class="m-auto h-[calc(100vh-450px)] max-h-[calc((100vw-750px)/3)] relative min-h-[600px] w-[calc(100vw-750px)] min-w-[900px] bg-[#fff] rounded-[10px] shadow-lg">
            <div class="w-[65%] max-w-[1000px] m-auto h-full pt-12  flex flex-col justify-around">
                <div class="absolute top-5 left-5">
                    <i
                        class="align-middle inline-block border-[#2F88FF] border-solid border-[3px] h-4 rounded-[10px] c"></i>
                    <span class=" text-[#333] text-base ml-4">基本信息</span>
                </div>

                <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px"
                    class="demo-ruleForm text-sm flex-1 max-w-[750px] m-auto" :size="formSize" status-icon>


                    <el-form-item label="实名认证类型" prop="resource">
                        <el-radio-group v-model="ruleForm.resource">
                            <el-radio label="1">企业</el-radio>
                            <el-radio label="2">个人</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="机构名称" prop="name">
                        <el-input v-model="ruleForm.name" placeholder="请输入机构名称"/>
                    </el-form-item>
                    <el-form-item label="营业执照" prop="desc">

                        <el-upload class="upload-demo w-[210px] mr-4" drag multiple>
                            <div>

                                <img class="
                            w-[38px] h-[28px] mx-auto block
                        " src="/src/assets/images/update-img.svg" />
                            </div>
                            <div class="el-upload__text">
                                上传图片
                            </div>

                        </el-upload>

                        <div class="el-upload__tip flex-1">
                            <span class="block">1. 支持的图片格式包括 JPG、JPEG 和 PNG</span>
                            <span class="block">2. 图片不得超过5M </span>
                            <span class="block">3. 上传的图片需清晰完整</span>
                        </div>
                    </el-form-item>
                    <el-form-item label="地址" prop="date2">
                        <div class="flex-nowrap flex">
                            <el-select v-model="value" class="mr-2" placeholder="请选择">
                                <el-option v-for="item in addressData" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                            <el-select v-model="value" class="mr-2" placeholder="请选择">
                                <el-option v-for="item in addressData" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                            <el-select v-model="value" placeholder="请选择">
                                <el-option v-for="item in addressData" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                        </div>
                    </el-form-item>
                    <el-form-item label="详细地址" prop="region">
                        <el-input v-model="ruleForm.region"  placeholder="请输入详细地址"/>
                    </el-form-item>
                    <div class="absolute left-5">
                        <i
                            class="align-middle inline-block border-[#2F88FF] border-solid border-[3px] h-4 rounded-[10px] c"></i>
                        <span class=" text-[#333] text-base ml-4">联系人信息</span>
                    </div>
                    <el-form-item label="联系人姓名" prop="count" class="mt-[60px]">
                        <el-input v-model="ruleForm.count" placeholder="请输入联系人姓名"/>
                    </el-form-item>
                    <el-form-item label="联系人姓名" prop="date1">
                        <el-input v-model="ruleForm.date1" placeholder="请输入联系人手机号"/>
                    </el-form-item>
                </el-form>

            </div>
        </div>

        <button @click="submitForm(ruleFormRef)"
            class="m-auto mt-4 block w-72 p-2.5 rounded-[5px] text-white tracking-widest clickable relative" :class="[
                loading
                    ? 'bg-slate-300 cursor-not-allowed'
                    : 'bg-[linear-gradient(90deg,#0477FD_0%,#04D8FD_100%)]',
            ]" type="submit" :disabled="loading" v-wave="!loading">
            <i v-if="loading" class="mdi mdi-loading mdi-spin mr-2"></i>
            提交
        </button>
    </div>
</template>

<script lang="ts" setup>

import { useMeta } from 'vue-meta';
import {
    type ComputedRef,
    computed,
    reactive,
    ref
} from 'vue';
import type { FormInstance, FormRules } from 'element-plus'
const loading = ref(false);
const radio1 = ref('1');
const props = withDefaults(defineProps<{
    title: string;
    useTitleTemplate?: boolean;
}>(), {
    title: '',
    useTitleTemplate: true,
});

const value = ref('');

const addressData = [
    {
        value: 'Option1',
        label: 'Option1',
    },
    {
        value: 'Option2',
        label: 'Option2',
    },
    {
        value: 'Option3',
        label: 'Option3',
    },
    {
        value: 'Option4',
        label: 'Option4',
    },
    {
        value: 'Option5',
        label: 'Option5',
    },
];

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



interface RuleForm {
    type: string[]
    name: string
    region: string
    count: string
    date1: string
    date2: string
    delivery: boolean
    resource: string
    desc: string
}

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
    name: '',
    region: '',
    count: '',
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    resource: '1',
    desc: '',
})

const rules = reactive<FormRules<RuleForm>>({
    name: [
        { required: true, message: 'Please input Activity name', trigger: 'blur' },
        { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
    ],
    region: [
        {
            required: true,
            message: 'Please select Activity zone',
            trigger: 'change',
        },
    ],
    count: [
        {
            required: true,
            message: 'Please select Activity count',
            trigger: 'change',
        },
    ],
    date1: [
        {
            type: 'date',
            required: true,
            message: 'Please pick a date',
            trigger: 'change',
        },
    ],
    date2: [
        {
            type: 'date',
            required: true,
            message: 'Please pick a time',
            trigger: 'change',
        },
    ],
    type: [
        {
            type: 'array',
            required: true,
            message: 'Please select at least one activity type',
            trigger: 'change',
        },
    ],
    resource: [
        {
            required: true,
            message: 'Please select activity resource',
            trigger: 'change',
        },
    ],
    desc: [
        { required: true, message: 'Please input activity form', trigger: 'blur' },
    ],
})

const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            console.log('submit!')
        } else {
            console.log('error submit!', fields)
        }
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}

const options = Array.from({ length: 10000 }).map((_, idx) => ({
    value: `${idx + 1}`,
    label: `${idx + 1}`,
}))
</script>
