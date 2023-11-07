<template>

    <page-title
        title="消息中心">

        <div
            class="
                ml-auto w-fit flex items-center -mr-2
            ">

            <button
                class="
                    p-2 text-sm
                    mx-2 rounded text-white tracking-widest clickable relative overflow-hidden
                "
                :class="[
                    (deleteingSelected || selectedIds.length === 0)
                        ? 'bg-slate-300 cursor-not-allowed'
                        : ' bg-red-600',
                ]"
                @click="showDeleteAllConfirmDialog = true"
                type="button"
                :disabled="deleteingSelected || selectedIds.length === 0"
                v-wave="!deleteingSelected && selectedIds.length > 0">
                <i
                    v-if="deleteingSelected"
                    class="mdi mdi-loading mdi-spin mr-2"/>
                删除选中
            </button>

            <button
                class="
                    p-2 text-sm
                    mx-2 rounded text-white tracking-widest clickable relative overflow-hidden
                "
                :class="[
                    (readingSelected || selectedIds.length === 0)
                        ? 'bg-slate-300 ursor-not-allowed'
                        : ' linear-hover',
                ]"
                @click="readSelected"
                type="button"
                :disabled="readingSelected || selectedIds.length === 0"
                v-wave="!readingSelected && selectedIds.length > 0">
                <i
                    v-if="readingSelected"
                    class="mdi mdi-loading mdi-spin mr-2"/>
                标记为已读
            </button>

            <button
                class="
                    p-2 text-sm
                    mx-2 rounded text-white tracking-widest clickable relative overflow-hidden linear-hover
                "
                @click="readAll"
                type="button"
                :disabled="readingAll"
                v-wave>
                <i
                    v-if="readingAll"
                    class="mdi mdi-loading mdi-spin mr-2"/>
                全部标记为已读
            </button>


        </div>

    </page-title>

    <paginate-page
        ref="paginatePage"
        api="/notify-message/my-page"
        :filters="{
            templateContent: '消息内容',
            readStatus: {
                type: 'single-select',
                label: '是否已读',
                options: [
                    {
                        value: 'true',
                        label: '已读'
                    },
                    {
                        value: 'false',
                        label: '未读'
                    },
                ]
            },
            // templateType: {
            //     type: 'single-select',
            //     label: '类型',
            //     options: [
            //         {
            //             value: '1',
            //             label: '通知公告'
            //         },
            //         {
            //             value: '2',
            //             label: '系统消息'
            //         },
            //         {
            //             value: '3',
            //             label: '运维消息'
            //         },
            //         {
            //             value: '4',
            //             label: '平台通知'
            //         },
            //         {
            //             value: '5',
            //             label: '其他类型'
            //         }
            //     ]
            // },
        }">

        <template
            #thead>
            <tr>
                <th>
                    <custom-checkbox
                        :model-value="isSelectAll"
                        @update:model-value="updateIsSelectAll"/>
                </th>
                <th>
                    发送时间
                </th>
                <th>
                    类型
                </th>
                <th>
                    消息内容
                </th>
                <th>
                    是否已读
                </th>
                <th>
                    阅读时间
                </th>
                <th
                    class="
                        listRightSticky bg-[#F6F8FD]
                    ">
                    操作
                </th>
            </tr>
        </template>

        <template
            #tr="{
                singleData,
            }">
            <message-tr
                @updated="refreshData"
                :message="(singleData as Message)"/>
        </template> 

    </paginate-page>

    <custom-dialog
        v-model:show="showDeleteAllConfirmDialog">
        
        <template
            #title>
            确认删除选中的消息？
        </template>
        
        <form
            @submit.prevent="deleteSelected"
            class="
                -mx-2 text-right
            ">

            <button
                class="
                    mx-2
                    p-2.5
                    w-32 rounded
                    border-2
                    clickable relative
                    overflow-hidden
                "
                @click="showDeleteAllConfirmDialog = false"
                type="reset"
                :disabled="deleteingSelected"
                v-wave="!deleteingSelected">
                取消
            </button>

            <button
                class="
                    mx-2
                    p-2.5
                    w-32 rounded
                    text-white
                    clickable relative
                    overflow-hidden
                "
                :class="[
                    deleteingSelected
                        ? 'cursor-not-allowed backdrop-grayscale'
                        : 'bg-red-500'
                ]"
                type="submit"
                :disabled="deleteingSelected"
                v-wave="!deleteingSelected">
                <i
                    v-if="deleteingSelected"
                    class="
                        mdi mdi-loading mdi-spin mr-2
                    "></i>
                确定删除
            </button>
            
        </form>

    </custom-dialog>

</template>

<script lang="ts" setup>

import PageTitle from '~/components/page-title.vue';
import PaginatePage from '~/components/paginate-page/index.vue';
import MessageTr from '~/prefabs/pages/digital-identities/messages/tr.vue';

import CustomCheckbox from '~/components/checkbox.vue';
import CustomDialog from '~/components/dialog.vue';

import {
    type Message,
} from '~/types/digital-identities/messages';

import {
    ref,
    provide,
    computed,
} from 'vue';

const paginatePage = ref<InstanceType<typeof PaginatePage>>();

const refreshData = () => {
    paginatePage.value?.refreshData();
};

const allTrs = ref([]);

provide('registerCheckbox', (tr) => {
    allTrs.value = [
        ...allTrs.value,
        tr,
    ];
});

const isSelectAll = computed(() => {
    return allTrs.value.every((tr) => {
        return tr.isSelected;
    });
});

const updateIsSelectAll = (value) => {
    allTrs.value.forEach((tr) => {
        tr.isSelected = value;
    });
};

import axios from '~/plugins/axios';
import {
    notify
} from '~/plugins/notify';

const readingAll = ref(false);

const readAll = () => {
    readingAll.value = true;
    axios.put(`/notify-message/update-all-read`)
        .then(() => {
            notify({
                title: '已全部标记为已读',
                type: 'success',
            });

            updateIsSelectAll(false);

            refreshData();
        })
        .finally(() => {
            readingAll.value = false;
        });
};

const selectedIds = computed(() => {
    return allTrs.value.filter((tr) => {
        return tr.isSelected;
    })
        .map((tr) => {
            return tr.messageId;
        });
});

const readingSelected = ref(false);

const readSelected = () => {

    readingSelected.value = true;
    axios.put(`/notify-message/update-read?ids=${selectedIds.value.join(',')}`)
        .then(() => {

            notify({
                title: '已标记为已读',
                type: 'success',
            });

            updateIsSelectAll(false);

            refreshData();
        })
        .finally(() => {
            readingSelected.value = false;
        });
};

const showDeleteAllConfirmDialog = ref(false);

const deleteingSelected = ref(false);

const deleteSelected = () => {
    
    deleteingSelected.value = true;

    axios.put(`/notify-message/deleteMessage?ids=${selectedIds.value.join(',')}`)
        .then(() => {

            notify({
                title: '删除成功',
                type: 'success',
            });

            updateIsSelectAll(false);

            refreshData();
        })
        .finally(() => {
            deleteingSelected.value = false;
        });
};

</script>