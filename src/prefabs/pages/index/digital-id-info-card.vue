<template>
    <div
        class="
            mx-4 mb-4 p-6 bg-white rounded
        ">

        <div
            class="
                flex items-center mb-4
            ">
            <h3
                class="
                    flex items-center
                    fake-border-l text-lg font-semibold
                    mr-4
                ">
                分布式数字身份
            </h3>

            <p
                class="
                    text-slate-600
                    text-sm
                ">
                提供分布式自主数字身份，建立可信身份体系
            </p>
        </div>

        <div
            class="flex -mx-8 p-4"
            v-if="Object.keys(info).length > 0">

            <div
                v-for="{
                    image,
                    label,
                    key
                } in [
                    {
                        image: __OVERVIEW_COMPANY_COUNT__,
                        label: '平台企业数',
                        key: 'enterpriseNum'
                    },
                    {
                        image: __OVERVEIW_PLATFORM_USER_COUNT__,
                        label: '平台用户数',
                        key: 'userNum'
                    }
                ]"
                :key="key"
                class="
                    flex mx-8
                ">
                <img
                    class="
                        inline-block w-[50px] h-[50px] mr-4
                    "
                    :src="image"/>

                <div>
                    <h5
                        class="
                            text-sm text-slate-600
                        ">
                        {{label}}
                    </h5>
                    <span
                        class="
                            text-2xl text-slate-900 font-semibold
                        ">
                        {{info[key]}}
                    </span>
                </div>
                
            </div>

        </div>

    </div>
</template>

<script lang="ts" setup>

import __OVERVIEW_COMPANY_COUNT__ from '~/assets/images/overview-company-count.svg';
import __OVERVEIW_PLATFORM_USER_COUNT__ from '~/assets/images/overview-platform-user-count.svg';

import axios from '~/plugins/axios';

import {
    ref,
    onMounted,
} from 'vue';

const info = ref({});

onMounted(async () => {
    const {
        data
    } = await axios.get('/overview/getNum');

    info.value = data.data;
});

</script>