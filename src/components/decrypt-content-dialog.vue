<template>

    <button
        class="p-2 ml-auto text-sm rounded linear-hover text-white hoverable clickable"
        @click="decrypt"
        :disabled="downloading"
        v-wave>
        <i
            v-if="downloading"
            class="mdi mdi-loading mdi-spin mr-2"></i>
        解密
    </button>

    <i-dialog
        class="w-[560px]"
        v-model:show="show"
        prevent
        :loading="loading">

        <template #title>
            <h3
                class="
                    text-center
                ">
                数据存证解密结果
            </h3>
        </template>

        <div
            class="p-8 flex mb-2"
            v-if="Object.keys(result).length">
            <h5
                class="text-slate-500 whitespace-nowrap w-[6rem]">
                解密数据
            </h5>
            <p
                class="w-[calc(100%-6rem)] break-all">
                <i-copyer
                    class="cursor-pointer text-slate-900 hover:text-blue-600 text-left"
                    :content="result">
                    {{ result }}
                </i-copyer>
            </p>       
        </div>

        <div
            v-else>
            <p
                class="text-center text-slate-500 p-16">
                加载中...
            </p>
        </div>
        
    </i-dialog>

</template>

<script setup>
import ICopyer from '~/components/copyer.vue';
import IDialog from '~/components/dialog.vue';
</script>

<script>
import axios from '~/plugins/axios';
import HashFile from '~/mixins/file.js';

export default {

    mixins: [
        HashFile
    ],

    inheritAttrs: false,

    props: {
        proofData: {
            required: true
        },
        fileName: {
            type: String,
            required: false
        }
    },

    data() {
        return {
            show: false,
            loading: false,

            result: {}
        };
    },

    computed: {
        isFile() {
            return !!this.fileName;
        },
        file() {
            return this.proofData;
        },
    },

    watch: {
        show (val) {
            if (val && Object.keys(this.result).length === 0) {
                this.decryptData();
            }
        }
    },

    methods: {
        decrypt() {
            if (this.isFile) {

                let params = {
                    txHash: this.proofData.txHash,
                    fileName: this.fileName,
                };

                if (this.proofData.encryptMode === 2) {
                    params.channelId = this.proofData.channelId;
                }

                this.downloadFile(params);
            }
            else {
                this.show = true;
            }
        },
        decryptData() {
            this.loading = true;

            let params = {
                bizId: this.proofData.bizId,
                encryptMode: this.proofData.encryptMode,
                encryptData: this.proofData.data,
            };

            if (this.proofData.encryptMode === 2) {
                params.channelId = this.proofData.channelId;
            }

            axios.post('/gateway/proof/data/decrypt', params)
                .then(({ data }) => {
                    this.result = data.data;
                })
                .finally(() => {
                    this.loading = false;
                });
        }
    }
}
</script>