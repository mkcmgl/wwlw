<template>

    <button
        @click="show = true"
        type="button"
        class="
            clickable hoverable
            linear-hover
            text-white
            p-1.5 rounded text-sm
        "
        v-wave
        v-bind="$attrs">
        新增文件存证
    </button>


    <i-dialog
        v-model:show="show"
        prevent
        :loading="loading">

        <template
            #title>
            新增文件存证
        </template>

        
        <i-form
            @submit="storeFile"
            ref="form">

            <div
                class="
                    flex items-center mb-6 px-4
                ">
                <span
                    class="
                        text-slate-600 w-[125px]
                    ">
                    <sup
                        class="
                            text-red-500
                        ">
                        *
                    </sup>
                    业务类型
                </span>
                <i-select
                    class="w-[calc(100%-8rem)]"
                    v-model="form.bizType"
                    v-model:error="error.bizType"
                    placeholder="请选择业务类型"
                    attr="业务类型"
                    name="bizType"
                    :rules="[
                        'required',
                    ]"
                    :options="Object.keys(enums['bizType']).map(key => {
                        return {
                            label: enums['bizType'][key],
                            value: key,
                        };
                    })">
                </i-select>
            </div>

            <div
                class="
                    flex items-center mb-6 px-4
                ">
                <span
                    class="
                        text-slate-600 w-[125px]
                    ">
                    <sup
                        class="
                            text-red-500
                        ">
                        *
                    </sup>
                    业务 ID
                </span>
                <i-input
                    class="w-[calc(100%-8rem)]"
                    v-model="form.bizId"
                    v-model:error="error.bizId"
                    placeholder="请输入业务 ID"
                    attr="业务 ID"
                    name="bizId"
                    :rules="[
                        'required',
                        'number-chars-line-only',
                        'string',
                        'max:64',
                    ]"/>
            </div>

            <div
                class="
                    flex items-center mb-6 px-4
                ">
                <span
                    class="
                        text-slate-600 w-[125px]
                    ">
                    <sup
                        class="
                            text-red-500
                        ">
                        *
                    </sup>
                    加密选项
                </span>
                <section
                    class="flex items-center">

                    <label
                        v-for="(label, value) in enums['encryptMode']"
                        :key="value"
                        class="mx-2">
                        <input
                            type="radio"
                            name="encryptMode"
                            required
                            :value="value"
                            v-model="form.encryptMode">
                        {{ label }}
                    </label>

                </section>
            </div>

            <!-- <channel-input
                v-model="form.channelId"
                v-model:error="error.channelId"
                v-if="form.encryptMode == 2"/> -->

            <div
                class="
                    flex items-center mb-6 px-4
                ">
                <span
                    class="
                        text-slate-600 w-[125px]
                    ">
                    <sup
                        class="
                            text-red-500
                        ">
                        *
                    </sup>
                    存证文件
                </span>
                <i-file-input
                    class="w-[calc(100%-8rem)]"
                    v-model="form.file"
                    v-model:error="error.file"
                    placeholder="请输入存证文件"
                    attr="存证文件"
                    name="file"
                    :rules="[
                        'required',
                        'file',
                        'mimetypes:bmp,gif,jpg,jpeg,png,doc,docx,xls,xlsx,ppt,pptx,html,htm,txt,rar,zip,gz,bz2,mp4,avi,rmvb,pdf'
                    ]"/>
            </div>

            <div
                class="
                    flex items-start mb-6 px-4
                ">
                <span
                    class="
                        text-slate-600 w-[125px]
                        leading-[2.5rem]
                    ">
                    <sup
                        class="
                            text-red-500
                        ">
                        *
                    </sup>
                    存证文件描述
                </span>
                <i-textarea
                    class="w-[calc(100%-8rem)]"
                    v-model="form.proofDataDesc"
                    v-model:error="error.proofDataDesc"
                    placeholder="请输入存证文件描述"
                    attr="存证文件描述"
                    name="proofDataDesc"
                    :max="100"
                    :rules="[
                        'required',
                        'no-emoji',
                        'max:100'
                    ]"/>
            </div>

            <footer
                class="flex items-center justify-between">

                <button
                    class="
                        mx-2
                        p-2.5
                        w-32 rounded
                        border-2
                        clickable relative
                        overflow-hidden
                    "
                    @click="show = false"
                    type="reset"
                    :disabled="loading"
                    v-wave="!loading">
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
                        linear-hover
                    "
                    :class="[
                        loading
                            ? 'cursor-not-allowed backdrop-grayscale'
                            : ''
                    ]"
                    type="submit"
                    :disabled="loading"
                    v-wave="!loading">
                    <i
                        v-if="loading"
                        class="
                            mdi mdi-loading mdi-spin mr-2
                        "></i>
                    创建
                </button>
            
            </footer>

        </i-form>


    </i-dialog>

</template>

<script setup>
import IDialog from '~/components/dialog.vue';
import IForm from '~/components/form.vue';
import IInput from '~/components/input.vue';
import ISelect from '~/components/single-select.vue';

import IFileInput from '~/components/file-input.vue';

import ChannelInput from '~/prefabs/pages/gateways/channel-input.vue';
import ITextarea from '~/components/textarea.vue';

const enums = {
    "bizType": {
        "1": "JWT 生成",
        "2": "公共存证服务"
    },
    "encryptMode": {
        "0": "不加密",
        "1": "授权加密",
        // "2": "虚拟通道"
    },
    "shareType": {
        "0": "不共享",
        "1": "无条件共享",
        "2": "有条件共享"
    },
    "dataResourceStatus": {
        "0": "待审核",
        "1": "审核通过",
        "2": "审核不通过"
    }
};
</script>

<script>

import axios from '~/plugins/axios';
import { notify } from '~/plugins/notify';

export default {

    emits: [
        'update:modelValue',
    ],

    data() {
        return {
            form: {
                bizId: '',
                bizType: '',
                encryptMode: '0',
                desc: '',
                file: null,
                channelId: '',
                proofDataDesc: '',
            },
            error: {
                bizId: '',
                bizType: '',
                encryptMode: '',
                desc: '',
                file: '',
                channelId: '',
                proofDataDesc: '',
            },

            loading: false,
            show: false,
        };
    }, 

    watch: {
        show(value) {
            if (!value) {
                this.form.encryptMode = '0';
                this.$refs.form.refresh();
            }
        }
    },

    methods: {
        storeFile() {
            this.loading = true;

            let formData = new FormData();

            for (let key in this.form) {
                formData.append(key, this.form[key]);
            }

            axios.post('/gateway/proof/file/upload', formData)
                .then(() => {
                    notify({
                        title: '文件存证成功',
                        type: 'success',
                    });
                    this.$emit('reload');
                    this.show = false;
                })
                .finally(() => {
                    this.loading = false;
                });
        }
    }
};
</script>