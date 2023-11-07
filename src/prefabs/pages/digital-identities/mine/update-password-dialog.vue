<template>

    <custom-dialog
        v-model:show="computedShow"
        prevent>

        <template #title>
            修改登录密码
        </template>

        <i-form
            ref="formElement"
            @submit="updatePassword">

            <div
                class="
                    flex items-center mb-6
                ">

                <p
                    class="w-[100px]">
                    当前密码
                    <sup
                        class="text-red-600">*</sup>
                </p>

                <i-input
                    class="
                        w-[calc(100%-100px)]
                    "
                    name="current-password"
                    attr="当前密码"
                    placeholder="请输入当前密码"
                    type="password"
                    v-model="form.oldPassword"
                    v-model:error="error.oldPassword"
                    :rules="[
                        'required',
                    ]"/>

            </div>

            <div
                class="
                    flex items-center mb-6
                ">

                <p
                    class="w-[100px]">
                    新密码
                    <sup
                        class="text-red-600">*</sup>
                </p>

                <i-input
                    class="
                        w-[calc(100%-100px)]
                    "
                    name="new-password"
                    attr="新密码"
                    placeholder="请输入登录密码，8-20字符，需包含数字、大小写字母和特殊符号"
                    type="password"
                    v-model="form.newPassword"
                    v-model:error="error.newPassword"
                    :rules="[
                        'password',
                        'required',
                    ]"/>

            </div>

            <div
                class="
                    flex items-center mb-6
                ">

                <p
                    class="w-[100px]">
                    确认密码
                    <sup
                        class="text-red-600">*</sup>
                </p>

                <i-input
                    class="
                        w-[calc(100%-100px)]
                    "
                    name="confirm-password"
                    attr="确认密码"
                    placeholder="请输入确认密码"
                    type="password"
                    v-model="form.confirmPassword"
                    v-model:error="error.confirmPassword"
                    :rules="[
                        'required',
                        `password-confirm:${form.newPassword}`
                    ]"/>

            </div>

            <footer
                class="
                    flex justify-end -mx-2
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
                    @click="computedShow = false"
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
                    确定修改
                </button>

            </footer>

        </i-form>

    </custom-dialog>

</template>

<script lang="ts" setup>

import {
    computed,
    ref,
    watch,
} from 'vue';

import encrypt from '~/utils/encrypt';

import CustomDialog from '~/components/dialog.vue';
import IForm from '~/components/form.vue';
import IInput from '~/components/input.vue';

import axios from '~/plugins/axios';
import { notify } from '~/plugins/notify';

const props = defineProps<{
    show: boolean,
}>();

const emits = defineEmits([
    'update:show',
]);

const computedShow = computed({
    get () {
        return props.show;
    },
    set(value) {
        emits('update:show', value);
    }
});

const form = ref({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
});

const error = ref({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
});

const loading = ref(false);

const formElement = ref<InstanceType<typeof IForm>>();

watch(
    () => computedShow.value,
    (value) => {
        if (!value) {
            formElement.value?.refresh();
        }
    }
);

const updatePassword = () => {
    loading.value = true;

    const formData = {
        oldPassword: encrypt(form.value.oldPassword),
        newPassword: encrypt(form.value.newPassword),
    };

    axios.put(
        '/user/profile/update-password',
        formData
    )
        .then(() => {
            computedShow.value = false;
            notify({
                title: '修改成功',
                type: 'success',
            });
        })
        .finally(() => {
            loading.value = false;
        });
};

</script>