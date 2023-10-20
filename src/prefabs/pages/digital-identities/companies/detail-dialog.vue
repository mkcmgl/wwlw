<template>
    <custom-dialog
        class="
            w-[600px]
        "
        v-model:show="computedShow">
        
        <template #title>
            企业详情
        </template>

        <div
            v-if="isLoadDetail">

            <p
                class="
                    flex items-start mb-2.5
                "
                v-for="({key, label}) in [
                    {
                        key: 'username',
                        label: '账号',
                    },
                    {
                        key: 'initialPassword',
                        label: '初始密码',
                    },
                    {
                        key: 'iid',
                        label: 'iid数字身份',
                    },
                    {
                        key: 'mobile',
                        label: '手机号',
                    },
                    {
                        key: 'status',
                        label: '状态',
                    },
                    {
                        key: 'roleName',
                        label: '角色名称',
                    },
                    {
                        key: 'authorize',
                        label: '设备权限',
                    },
                    {
                        key: 'remark',
                        label: '备注',
                    }
                ]"
                :key="key">
                
                <span
                    class="
                        font-bold w-[100px]
                    ">
                    {{ label }}
                </span>

                <span
                    class="
                        w-[calc(100%-100px)] break-all
                    ">
                    {{ detail[key] }}
                </span>

            </p>

        </div>

        <div
            v-else>

            <h3
                class="
                    my-12 text-center text-xl text-slate-400
                ">
                <i
                    class="mdi mdi-loading mdi-spin mr-2"></i>
                加载中...
            </h3>

        </div>

    </custom-dialog>
</template>

<script lang="ts" setup>

import CustomDialog from '~/components/dialog.vue';
import axios from '~/plugins/axios';

import {
    type Ref,
    ref,
    computed,
    watch,
} from 'vue';

const props = defineProps<{
    show: boolean;
    company: {
        id: string;
    };
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

const isLoadDetail = computed(() => {
    return Object.keys(detail.value).length > 0;
});

watch(
    () => computedShow.value,
    async (val) => {
        if (val && !isLoadDetail.value) {
            const { data } = await axios.post(`/enterprise/memberDetail`, {
                id: parseInt(props.company.id),
            });
            detail.value = data.data;
        }
    }
);

</script>