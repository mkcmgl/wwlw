<template>
    <tr>
        <td>
            <button
                class="text-blue-600 hover:text-blue-400 w-[max(6rem,300px)] truncate"
                type="button"
                :title="dataCert.txHash"
                @click="showHashDialog = true">
                {{ dataCert.txHash }}
            </button>
        </td>
        <td>
            {{ dataCert.bizId }}
        </td>
        <td>
            {{ BizType[dataCert.bizType] }}
        </td>
        <td>
            {{ EncryptMode[dataCert.encryptMode] }}
        </td>
        <td>
            {{ dataCert.signUser }}
        </td>
        
        <td>
            {{ dataCert.fromAddr }}
        </td>
        <!-- <td>
            {{ dataCert.channelId }}
        </td> -->
        <td>
            {{ dataCert.blockHeight }}
        </td>
        <td>
            {{ dataCert.txTime }}
        </td>
    </tr>

    <hash-dialog
        type="1"
        v-model:show="showHashDialog"
        :hash="dataCert.txHash"/>

</template>

<script lang="ts" setup>

import HashDialog from '~/components/hash-dialog.vue';

defineOptions({
    inheritAttrs: false,
});

import {
    DataCert,
    BizType,
    EncryptMode,
} from '~/types/gateway/data-cert';

import {
    ref
} from 'vue';

defineProps<{
    dataCert: DataCert;
}>();

const showHashDialog = ref(false);
</script>