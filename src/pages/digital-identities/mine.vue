<template>

    <page-title
        title="我的数字身份"/>

    <div
        class="
            mx-4 mb-4 p-6 bg-white rounded
        ">

        <h3
            class="
                fake-border-l mb-4 text-lg font-semibold
            ">
            数字身份信息
        </h3>

        <div
            class="
                grid grid-cols-2 gap-4
            ">

            <div
                class="
                    flex items-start
                ">

                <span
                    class="
                        text-slate-600 w-[125px]
                    ">
                    数字身份标识
                </span>

                <span
                    class="
                        break-all
                    ">
                    {{ iid?.iid }}
                </span>

            </div>

            <div
                class="
                    flex items-start
                ">

                <span
                    class="
                        text-slate-600 w-[125px]
                    ">
                    数字身份公钥
                </span>

                <span
                    class="
                        break-all
                    ">
                    {{ iid?.publicKey }}
                </span>

            </div>

        </div>

    </div>

    <div
        class="
            mx-4 mb-4 p-6 bg-white rounded
        ">

        <h3
            class="
                fake-border-l mb-4 text-lg font-semibold
            ">
            认证信息
        </h3>

        <div
            class="
                flex items-start
            ">

            <span
                class="
                    text-slate-600 w-[125px]
                ">
                实名认证
            </span>

            <span
                class="
                    break-all
                ">
                {{ verificationStatusString }}
            </span>

        </div>

    </div>

    <div
        class="
            mx-4 mb-4 p-6 bg-white rounded
        ">

        <h3
            class="
                fake-border-l mb-4 text-lg font-semibold
            ">
            基本信息
        </h3>

        <div
            class="
                grid grid-cols-2 gap-4
            ">

            <div
                class="
                    flex items-start
                ">

                <span
                    class="
                        text-slate-600 w-[125px]
                    ">
                    账号
                </span>

                <span
                    class="
                        break-all
                    ">
                    {{ decrypt(user.username) }}
                </span>

            </div>

            <div
                class="
                    flex items-start
                ">

                <span
                    class="
                        text-slate-600 w-[125px]
                    ">
                    手机号码
                </span>

                <span
                    class="
                        break-all
                    ">
                    {{ decrypt(user.mobile).toString().replace(/^(\d{3})(\d{4})(\d{4})$/, '$1****$3') }}
                </span>

            </div>

            <div
                class="
                    flex items-start
                ">

                <span
                    class="
                        text-slate-600 w-[125px]
                    ">
                    密码
                </span>

                <span
                    class="
                        break-all flex items-center
                    ">
                    
                    <span
                        class="
                            relative top-[2px]
                        ">
                        {{ iid?.password.replace(/./g, '*').slice(0, 8) }}
                    </span>

                    <button
                        class="
                            ml-2 text-blue-600 hover:underline
                        "
                        type="button"
                        @click="showUpdatePasswordDialog = true">
                        修改密码
                    </button>

                </span>

            </div>

            <div
                class="
                    flex items-start
                ">

                <span
                    class="
                        text-slate-600 w-[125px]
                    ">
                    注册时间
                </span>

                <span
                    class="
                        break-all
                    ">
                    {{ parseTime(user.createTime) }}
                </span>

            </div>

        </div>

    </div>

    <update-password-dialog
        v-model:show="showUpdatePasswordDialog"/>

</template>

<script lang="ts" setup>

import PageTitle from '~/components/page-title.vue';
import {parseTime } from "~/utils/tool";
import axios from '~/plugins/axios';
import { decrypt } from "~/utils/encrypt";

import {
    type Ref,
    ref,
    onBeforeMount,
    computed,
    defineAsyncComponent,
} from 'vue';

import {
    type Iid,
    AuthenticationStatus,
} from '~/types/auth.d';

import {
    useAuthStore
} from '~/store/auth';

const UpdatePasswordDialog = defineAsyncComponent(() => import('~/prefabs/pages/digital-identities/mine/update-password-dialog.vue'));

defineOptions({
    inheritAttrs: false,
});

const iid: Ref<Iid|null> = ref(null);

onBeforeMount(async () => {
    const { data } = await axios.get('/iid/getInfo');
    iid.value = data.data;
});

const verificationStatusString = computed(() => {
    return iid.value?.authenticationStatus
        ? AuthenticationStatus[iid.value?.authenticationStatus]
        : '';
});

const authStore = useAuthStore();

const showUpdatePasswordDialog = ref(false);

const user = computed(() => authStore.user);

</script>