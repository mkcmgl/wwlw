<template>
    <tr>
        <td>
            <button
                class="text-blue-600 hover:text-blue-400 w-[max(6rem,300px)] truncate"
                type="button"
                :title="fileCert.txHash"
                @click="showHashDialog = true">
                {{ fileCert.txHash }}
            </button>
        </td>
        <td>
            {{ fileCert.bizId }}
        </td>
        <td>
            {{ BizType[fileCert.bizType] }}
        </td>
        <td>
            {{ EncryptMode[fileCert.encryptMode] }}
        </td>
        <td>
            {{ fileCert.signUser }}
        </td>
        
        <td>
            {{ fileCert.fromAddr }}
        </td>
        <!-- <td>
            {{ fileCert.channelId }}
        </td> -->
        <td>
            {{ fileCert.blockHeight }}
        </td>
        <td>
            {{ fileCert.txTime }}
        </td>
    </tr>

    <hash-dialog
        type="2"
        v-model:show="showHashDialog"
        :hash="fileCert.txHash"/>

</template>

<script lang="ts" setup>

import HashDialog from '~/components/hash-dialog.vue';

defineOptions({
    inheritAttrs: false,
});

import {
    FileCert,
    BizType,
    EncryptMode,
} from '~/types/gateway/file-cert';

import {
    ref
} from 'vue';

defineProps<{
    fileCert: FileCert;
}>();

const showHashDialog = ref(false);
</script>