<template>

    <button
        @click="showCreateDialog = true"
        type="button"
        class="
            clickable hoverable
            linear-hover
            text-white
            p-1.5 rounded text-sm
        "
        v-wave
        v-bind="$attrs">
        新增企业成员
    </button>

    <i-dialog
        v-model:show="showCreateDialog">

        <template #title>
            <h1
                class="
                    text-center
                ">
                新增企业成员
            </h1>
        </template>

        <i-form
            ref="formInstance"
            @submit="storeCompanies">

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
                    账号
                </span>

                <i-input
                    class="
                        w-full
                    "
                    type="text"
                    v-model="form.username"
                    v-model:error="error.username"
                    name="username"
                    attr="账号"
                    placeholder="请输入账号"
                    tip="长度为2~24个字符，只能包含英文字母和数字"
                    :rules="[
                        'required',
                        'no-emoji',
                        'string',
                        'max:24',
                        'min:2',
                        (value: string) => {
                            if(!/^[A-Za-z0-9]+$/.test(value)) {
                                return {
                                    isValid: false,
                                    error: '只能包含英文字母和数字'
                                }
                            }
                            else {
                                return {
                                    isValid: true,
                                };
                            }
                        }
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
                    初始密码
                </span>

                <i-input
                    class="
                        w-full
                    "
                    type="password"
                    v-model="form.initialPassword"
                    v-model:error="error.initialPassword"
                    name="initialPassword"
                    attr="初始密码"
                    placeholder="请输入初始密码"
                    tip="长度6~20，必须含大写小写字母、数字、特殊字符中的至少三种"
                    :rules="[
                        'required',
                        'no-emoji',
                        'string',
                        'max:24',
                        'min:2',
                        (value: string) => {
                            if(!/^(?![A-Za-z0-9]+$)(?![a-z0-9\W]+$)(?![A-Za-z\W]+$)(?![A-Z0-9\W]+$)[a-zA-Z0-9\W]{6,20}$/.test(value)) {
                                return {
                                    isValid: false,
                                    error: '长度6~20，必须含大写小写字母、数字、特殊字符中的至少三种'
                                }
                            }
                            else {
                                return {
                                    isValid: true,
                                };
                            }
                        }
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
                    iid
                </span>

                <i-input
                    class="
                        w-full
                    "
                    type="text"
                    v-model="form.iid"
                    v-model:error="error.iid"
                    name="iid"
                    attr="iid"
                    placeholder="请输入iid"
                    :rules="[
                        'required',
                        'no-emoji',
                        'string',
                        (value: string) => {
                            if(!/^did:iid:[\w-]+$/.test(value)) {
                                return {
                                    isValid: false,
                                    error: 'iid格式不正确'
                                }
                            }
                            else {
                                return {
                                    isValid: true,
                                };
                            }
                        }
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
                    手机号
                </span>

                <i-input
                    class="
                        w-full
                    "
                    type="text"
                    v-model="form.mobile"
                    v-model:error="error.mobile"
                    name="mobile"
                    attr="手机号"
                    placeholder="请输入手机号"
                    :rules="[
                        (value: string) => {

                            if(!value) {
                                return {
                                    isValid: true,
                                };
                            }

                            if(!/^1\d{10}$/.test(value)) {
                                return {
                                    isValid: false,
                                    error: '手机号格式不正确'
                                }
                            }
                            else {
                                return {
                                    isValid: true,
                                };
                            }
                        }
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
                    角色名称
                </span>

                <i-input
                    class="
                        w-full
                    "
                    type="text"
                    v-model="form.roleName"
                    v-model:error="error.roleName"
                    name="roleName"
                    attr="角色名称"
                    placeholder="请输入角色名称"
                    :rules="[
                        'string',
                        'no-emoji',
                        'string',
                        'max:64',
                        'min:4',
                        'required',
                    ]"/>

            </div>

            <div
                class="flex items-center px-4 mb-6">


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
                    状态
                </span>

                <span
                    class="-mx-2 w-full">
                    <label
                        class="mx-2">
                        <input
                            type="radio"
                            name="status"
                            value="0"
                            v-model="form.status">
                        正常
                    </label>
                    <label
                        class="mx-2">
                        <input
                            type="radio"
                            name="type"
                            value="1"
                            v-model="form.status">
                        停用
                    </label>
                </span>
            </div>

            <devices-select
                class="mb-6"
                v-model="form.authorize"
                v-model:error="error.authorize"
                name="authorize"
                attr="设备权限"
                placeholder="请选择设备权限"
                :rules="[
                    'required',
                ]"/>


            <div
                class="
                    flex items-start mb-6 px-4
                ">

                <span
                    class="
                        text-slate-600 w-[125px] leading-10
                    ">
                    备注
                </span>

                <i-textarea
                    class="
                        w-full
                    "
                    type="text"
                    v-model="form.remark"
                    v-model:error="error.remark"
                    name="remark"
                    attr="描述"
                    placeholder="请输入描述"
                    :rules="[
                        'string',
                        'max:100'
                    ]"/>

            </div>

            <footer
                class="
                    flex justify-between
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
                    @click="showCreateDialog = false"
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
                    确认
                </button>

            </footer>

        </i-form>

    </i-dialog>

</template>

<script lang="ts" setup>

import {
    ref,
    toRaw,
    watch,
} from 'vue';

import IDialog from '~/components/dialog.vue';
import IForm from '~/components/form.vue';
import IInput from '~/components/input.vue';
import ITextarea from '~/components/textarea.vue';
import DevicesSelect from './devices-select.vue';

const showCreateDialog = ref(false);

const formInstance = ref(null);

watch(
    () => {
        return showCreateDialog.value;
    },
    (value) => {
        if (!value) {
            formInstance.value?.refresh();
        }
    }
);

const form = ref({
    username: '',
    initialPassword: '',
    iid: '',
    mobile: '',
    status: '0',
    roleName: '',
    authorize: '',
    remark: '',
});

const error = ref({
    username: '',
    initialPassword: '',
    iid: '',
    mobile: '',
    status: '',
    roleName: '',
    authorize: '',
    remark: '',
});

const loading = ref(false);

import axios from '~/plugins/axios';
import { notify } from '~/plugins/notify';
import encrypt from '~/utils/encrypt';

const emits = defineEmits([
    'created',
    'require-refresh',
]);

const storeCompanies = () => {
    loading.value = true;

    let formData = {
        ...toRaw(form.value),
        username: encrypt(form.value.username),
        initialPassword: encrypt(form.value.initialPassword),
    };

    if (form.value.mobile) {
        formData.mobile = encrypt(form.value.mobile);
    }
    else {
        delete formData.mobile;
    }

    axios.post(
        `/enterprise/addMember`,
        formData
    )
        .then(() => {
            showCreateDialog.value = false;
            notify({
                title: '新增企业成员成功',
                type: 'success',
            });
            emits('require-refresh');
        })
        .finally(() => {
            loading.value = false;
        });
};


</script>