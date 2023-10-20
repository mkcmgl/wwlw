<template>
    <custom-dialog v-model:show="computedShow">

        <template #title>
            审核意见
        </template>
        <template v-slot="{ close }">
            <el-form-item label="审核意见" prop="radio">
                <el-radio-group v-model="reviewForm.radio" class="ml-4">
                    <el-radio label="1" size="large">通过</el-radio>
                    <el-radio label="2" size="large">驳回</el-radio>
                </el-radio-group>
            </el-form-item>
            
            <el-form :model="reviewForm" :rules="reviewRules">
                <div v-show="reviewForm.radio == '2'">
                    <el-form-item label="驳回原因" prop="reason">
                        <el-input v-model="reviewForm.reason" type="textarea" />
                    </el-form-item>
                </div>
            </el-form>

            <!-- 


            <div v-else>

                <h3 class="
                    my-12 text-center text-xl text-slate-400
                ">
                    <i class="mdi mdi-loading mdi-spin mr-2"></i>
                    加载中...
                </h3>

            </div> -->


            <form class="
                    -mx-2 text-right
                " @submit.prevent="submitReview">

                <button class="
                        mx-2
                        p-2.5
                        w-32 rounded
                        border-2
                        clickable relative
                        overflow-hidden
                    " @click="close()" type="reset" :disabled="loading" v-wave="!loading">
                    取消
                </button>

                <button class="
                        mx-2
                        p-2.5
                        w-32 rounded
                        text-white
                        clickable relative
                        overflow-hidden
                        linear-hover
                    " :class="[
                        loading
                            ? 'cursor-not-allowed backdrop-grayscale'
                            : 'bg-[linear-gradient(90deg,#0477FD_0%,#04D8FD_100%)]'
                    ]" type="submit" :disabled="loading" v-wave="!loading">
                    <i v-if="loading" class="
                            mdi mdi-loading mdi-spin mr-2
                        "></i>
                    确定
                </button>

            </form>

        </template>




    </custom-dialog>
</template>

<script lang="ts" setup>

import CustomDialog from '~/components/dialog.vue';
import axios from '~/plugins/axios';
import { reactive } from 'vue';
import type { FormRules } from 'element-plus';
import {
    useRouter
} from 'vue-router';
import {
    type Ref,
    ref,
    computed,
} from 'vue';
import { notify } from "@kyvg/vue3-notification";

const props = defineProps<{
    show: boolean;
    companyId: string;
}>();

const emits = defineEmits([
    'update:show'
]);

const computedShow = computed({
    get() {
        return props.show;
    },
    set(val) {
        emits('update:show', val);
    }
});

type CompanyDetail = {
    username: string;
    initialPassword: string;
    iid: string;
    mobile: string;
    status: 0 | 1;
    roleName: string;
    authorize: string;
    remark: string;
};

const detail = ref({}) as Ref<CompanyDetail>;

interface ReviewForm {
    radio: string;
    reason: string;
}
const reviewForm = reactive<ReviewForm>({
    radio: '1',
    reason: '',

});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const equalToEmpty = (rule: any, value: any, callback: any) => {
    if (/^\s+$/gi
        .test(value)) {
        callback(new Error('不能全输入空格'));
    } else {

        callback();
    }
};
const reviewRules = reactive<FormRules<ReviewForm>>({
    reason: [
        { required: true, message: '请输入驳回原因', trigger: 'blur' },
        { min: 2, max: 100, message: "机构名称长度必须介于 2 和 100 之间", trigger: "blur" },
        { required: true, validator: equalToEmpty, trigger: "blur" },
    ]

});

// const isLoadDetail = computed(() => {
//     return Object.keys(detail.value).length > 0;
// });

const loading = ref(false);
const router = useRouter();

const submitReview = () => {
    loading.value = true;
    axios.post('/iid/review', {
        authenticationId: props.companyId,
        reviewStatus: reviewForm.radio,
        reviewOpinion: reviewForm.radio == '2' ? reviewForm.reason : ''
    }).then(({data}) => {
        if (data.code == 0) {
            notify({
                type: "success",
                text: "审核成功！",
            });
        }
    }).catch((e) => { 
        notify({ type: "error", text: e });
    }).finally(() => { 
        loading.value = false;
        router.back();
    });


};
</script>
<style  scoped type="text/scss" >
::v-deep(.el-textarea__inner) {
    max-height: calc(100vh - 20rem);
}
</style>