<template>
    <page-title
        title="文件日志"/>

    <paginate-page
        ref="page"
        api="archive/log/page"
        :thead="[
            '操作者',
            '操作类型',
            '操作内容',
            '日志 ID',
            '创建时间',
        ]"
        :filters="{
            operator: '操作者',
            status: {
                type: 'single-select',
                label: '操作状态',
                options: [
                    {
                        value: '1',
                        label: '成功'
                    },
                    {
                        value: '2',
                        label: '失败'
                    },
                ]
            },
        }">

        <template
            #tr="{
                singleData
            }">

            <tr>
                <td>
                    {{ singleData.operator }}
                </td>
                <td>
                    {{ singleData.type }}
                </td>
                <td>
                    {{ singleData.content }}
                </td>
                <td>
                    {{ singleData.id }}
                </td>
                <td>
                    {{ singleData.createTime }}
                </td>
            </tr>
                    
        </template>

    </paginate-page>

</template>

<script lang="ts" setup>

import PageTitle from '~/components/page-title.vue';
import PaginatePage from '~/components/paginate-page/index.vue';

</script>