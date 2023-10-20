<template>
    <page-title
        title="设备管理">
        <store-dialog
            @created="refresh"
            class="
                ml-auto
            "/>
    </page-title>

    <paginate-page
        ref="page"
        api="gateway/device/page"
        :thead="[
            '设备 ID',
            '企业 ID',
            '设备名称',
            '设备 IID',
            '设备哈希',
            '认证状态',
            '接入时间',
            '认证时间',
            '操作'
        ]"
        :filters="{
            id: '设备 ID',
            businessId: '企业 ID',
            deviceName: '设备名称',
            deviceIid: '设备 IID',
            txHash: '设备哈希',
            certificationStatus: {
                type: 'single-select',
                label: '认证状态',
                options: [
                    {
                        label: '待认证',
                        value: '0',
                    },
                    {
                        label: '通过',
                        value: '1',
                    },
                    {
                        label: '拒绝',
                        value: '2',
                    },
                ],
            }
        }">

        <template
            #tr="{
                singleData
            }">

            <device-tr
                @reload="refresh"
                :device="(singleData as Device)"/>
                    
        </template>

    </paginate-page>
</template>

<script lang="ts" setup>

import PageTitle from '~/components/page-title.vue';
import PaginatePage from '~/components/paginate-page/index.vue';

import DeviceTr from '~/prefabs/pages/gateways/devices/tr.vue';
import StoreDialog from '~/prefabs/pages/gateways/devices/store-dialog.vue';

import {
    Device,
} from '~/types/gateway/device';

import {
    ref
} from 'vue';

const page = ref();

const refresh = () => {
    page.value?.refreshData();
};

</script>