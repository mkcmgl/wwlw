<template>
    <page-title
        title="文件存证">
        <store-dialog
            @reload="refresh"
            class="ml-auto"/>
    </page-title>

    <paginate-page
        ref="page"
        api="gateway/proof/proofFile/list"
        :thead="[
            '交易哈希',
            '业务 ID',
            '业务类型',
            '加密方式',
            '签名用户',
            '交易发起者',
            '区块高度',
            '交易时间',
        ]"
        :filters="{
            bizId: '业务 ID',
            bizType: {
                type: 'single-select',
                label: '业务类型',
                options: [
                    {
                        label: 'JWT',
                        value: '1',
                    },
                    {
                        label: '公共存证服务',
                        value: '2',
                    },
                ],
            },
            encryptionType: {
                type: 'single-select',
                label: '加密方式',
                options: [
                    {
                        label: '不加密',
                        value: '0',
                    },
                    {
                        label: '授权加密',
                        value: '1',
                    },
                ],
            },
            tx: {
                type: 'datetime-period',
                label: '交易时间',
                start: 'startTxTime',
                end: 'endTxTime',
            },
            
        }">

        <template
            #tr="{
                singleData
            }">

            <file-cert-tr
                @reload="refresh"
                :file-cert="(singleData as FileCert)"/>
                    
        </template>

    </paginate-page>
</template>

<script lang="ts" setup>

import PageTitle from '~/components/page-title.vue';
import PaginatePage from '~/components/paginate-page/index.vue';

import StoreDialog from '~/prefabs/pages/gateways/file-certs/store-dialog.vue';
import FileCertTr from '~/prefabs/pages/gateways/file-certs/tr.vue';

import {
    FileCert
} from '~/types/gateway/file-cert';

import {
    ref
} from 'vue';

const page = ref();

const refresh = () => {
    page.value?.refreshData();
};

</script>