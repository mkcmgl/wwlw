<template>
    <div
        class="
            px-4 
        ">

        <template
            v-if="loading">
            <p
                class="
                    text-xl tracking-widest text-slate-500 min-h-[600px] flex items-center justify-center
                ">
                <i
                    class="
                        mdi mdi-loading mdi-spin mr-4
                    "></i>
                加载中...
            </p>
        </template>

        <template
            v-else-if="Object.keys(content).length">
            <ul>
                <li
                    :key="key"
                    v-for="({ label, key, value }) in [
                        {
                            label: '交易哈希值',
                            key: 'txHash',
                            value: content.txHash
                        },
                        {
                            label: '区块高度',
                            key: 'blockHeight',
                            value: content.blockHeight
                        },
                        {
                            label: '区块哈希值',
                            key: 'blockHash',
                            value: content.blockHash
                        },
                        {
                            label: '业务 ID',
                            key: 'bizId',
                            value: content.bizId
                        },
                        {
                            label: '签名方',
                            key: 'signer',
                            value: content.signer
                        },
                        {
                            label: '交易时间',
                            key: 'txTime',
                            value: content.txTime
                        },
                        {
                            label: '交易内容',
                            key: 'data',
                            value: content.data
                        },
                        {
                            label: '存证描述',
                            key: 'proofDataDesc',
                            value: content.proofDataDesc
                        },
                        {
                            label: '签名',
                            key: 'signature',
                            value: content.signature
                        }
                    ]"
                    class="flex text-[90%] mb-4">
                    <p
                        class="w-[100px] text-slate-500">
                        {{ label }}
                    </p>
                    
                    <p
                        class="w-[calc(100%-100px)] break-all">

                        <copyer
                            :content="value"
                            class="
                                cursor-pointer text-slate-900 hover:text-blue-600 text-left
                            ">
                            {{ value }}
                        </copyer>

                        <div
                            class="mt-2"
                            v-if="key === 'signature'">
                            <signature-check-dialog
                                :proof-data="content"/>
                        </div>

                        <div
                            class="mt-2"
                            v-if="key === 'data' && content.encryptMode !== 0">
                            <decrypt-content-dialog
                                :proof-data="content"
                                :file-name="content?.fileName"/>
                        </div>
                        
                    </p>

                </li>
            </ul>
        </template>

    </div>
</template>

<script lang="ts" setup>

import axios from '~/plugins/axios';

import Copyer from '~/components/copyer.vue';
import SignatureCheckDialog from '~/components/signature-check-dialog.vue';
import DecryptContentDialog from '~/components/decrypt-content-dialog.vue';

import {
    Ref,
    ref,
    onMounted,
} from 'vue';

const props = defineProps<{
    hash: string;
    type: "1" | "2";
}>();

const loading = ref(false);

type Content = {
    txHash: string;
    blockHeight: number;
    blockHash: string;
    bizId: string;
    signer: string;
    txTime: string;
    data: string;
    proofDataDesc: string;
    signature: string;
    encryptMode: number;
    fileName: string;
};

const content = ref({}) as Ref<Content>;

const loadData = () => {
    loading.value = true;

    axios.get(
        `/gateway/proof/history/getTxHashDetail?hash=${props.hash}&type=${props.type}`
    )
        .then((res) => {
            content.value = res.data.data;
        })
        .finally(() => {
            loading.value = false;
        });
};

onMounted(() => {
    loadData();
});

</script>