<template>
    
    <page-title
        title="站内公告">
        <store-dialog
            class="
                ml-auto
            "
            @stored="refreshData"/>
    </page-title>

    <paginate-page
        ref="paginatePage"
        api="/notice/page"
        :thead="[
            '公告 ID',
            '公告标题',
            '公告内容',
            '状态',
            '创建时间',
            '操作'
        ]"
        :filters="{
            title: '公告标题',
            status: {
                label: '状态',
                type: 'single-select',
                options: [
                    {
                        label: '开启',
                        value: '0',
                    },
                    {
                        label: '关闭',
                        value: '1',
                    },
                ],
            },
        }">

        <template
            #tr="{
                singleData,
            }">

            <notification-tr
                @deleted="refreshData"
                :notification="(singleData as Notification)"/>

        </template> 

    </paginate-page>

</template>

<script lang="ts" setup>

import PageTitle from '~/components/page-title.vue';
import PaginatePage from '~/components/paginate-page/index.vue';

import NotificationTr from '~/prefabs/pages/digital-identities/notifications/tr.vue';
import StoreDialog from '~/prefabs/pages/digital-identities/notifications/store-dialog.vue';

import {
    type Notification
} from '~/types/digital-identities/notification';

import {
    ref
} from 'vue';

const paginatePage = ref<InstanceType<typeof PaginatePage>>();

const refreshData = () => {
    paginatePage.value?.refreshData();
};

</script>