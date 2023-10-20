<template>
    <tr>
        <td>
            {{ company.id }}
        </td>
        <td>
            {{ company.userId }}
        </td>
        <td>
            {{ company.iid }}
        </td>
        <td>
            <toggler
                :model-value="company.status === 0"
                @change="changeStatus">
                <i
                    v-if="loading"
                    class="mdi mdi-loading mdi-spin mr-1"></i>
                {{ CompanyStatus[company.status] }}
            </toggler>
        </td>
        <td>
            {{ company.roleName }}
        </td>
        <td>
            {{ company.createTime }}
        </td>
        <td>
            <span
                class="
                    -mx-2
                ">
                <button
                    class="
                        mx-2
                        text-blue-500
                        no-underline hover:underline
                    "
                    type="button"
                    @click="showDetailDialog = true">
                    详情
                </button>
                <button
                    class="
                        mx-2
                        text-blue-500
                        no-underline hover:underline
                    "
                    type="button"
                    @click="showDeleteDialog = true">
                    删除
                </button>
            </span>
        </td>

        <detail-dialog
            :company="company"
            v-model:show="showDetailDialog"/>

        <delete-dialog
            @deleted="deleteCompany"
            :company="company"
            v-model:show="showDeleteDialog"/>
    </tr>
</template>

<script lang="ts" setup>

import DetailDialog from './detail-dialog.vue';
import DeleteDialog from './delete-dialog.vue';
import Toggler from '~/components/toggler.vue';
import axios from '~/plugins/axios';

import {
    ref,
} from 'vue';

import {
    Company,
    CompanyStatus,
} from '~/types/digital-identities/company';

const props = defineProps<{
    company: Company;
}>();

const showDetailDialog = ref(false);
const showDeleteDialog = ref(false);

const emits = defineEmits([
    'require-refresh'
]);


const deleteCompany = () => {
    emits('require-refresh');
};

const loading = ref(false);

const changeStatus = () => {
    loading.value = true;
    axios.post('/enterprise/changeMemberStatus', {
        userId: props.company.userId,
        status: props.company.status === 0 ? 1 : 0,
    })
        .then(() => {
            emits('require-refresh')
        })
        .finally(() => {
            loading.value = false;
        });
};

</script>