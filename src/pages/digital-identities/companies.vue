<template>
    
    <page-title
        title="成员管理">
        <create-dialog
            class="ml-auto"
            @require-refresh="refreshData"/>
    </page-title>

    <paginate-page
        ref="paginatePage"
        api="enterprise/memberList"
        api-method="POST"
        :thead="[
            '成员编号', '用户编号', 'iid数字身份', '状态', '角色名称', '创建时间', '操作'
        ]"
        :filters="{
            roleName: '角色名称',
            authenticationType: {
                type: 'single-select',
                label: '认证类型',
                options: [
                    {
                        value: '101',
                        label: '个人认证'
                    },
                    {
                        value: '102',
                        label: '企业认证'
                    }
                ]
            },
            orgName: '机构名称',
            authenticationStatus: {
                type: 'single-select',
                label: '认证状态',
                options: [
                    {
                        value: '0',
                        label: '未认证'
                    },
                    {
                        value: '1',
                        label: '已认证'
                    },
                    {
                        value: '2',
                        label: '认证未通过'
                    },
                    {
                        value: '3',
                        label: '认证中'
                    }
                ]
            },
            review: {
                type: 'datetime-period',
                label: '审核时间',
                start: 'reviewStartTime',
                end: 'reviewEndTime',
            }
        }">

        <template
            #tr="{
                singleData,
            }">
            <company-tr
                :company="(singleData as Company)"
                @require-refresh="refreshData"/>
        </template> 

    </paginate-page>

</template>

<script lang="ts" setup>

import PageTitle from '~/components/page-title.vue';
import PaginatePage from '~/components/paginate-page/index.vue';
import CompanyTr from '~/prefabs/pages/digital-identities/companies/tr.vue';
import CreateDialog from '~/prefabs/pages/digital-identities/companies/create-dialog.vue';

import {
    Company,
} from '~/types/digital-identities/company';

import {
    ref,
} from 'vue';

const paginatePage = ref<InstanceType<typeof PaginatePage>>();

const refreshData = () => {
    paginatePage.value?.refreshData();
};

</script>