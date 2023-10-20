<style lang="scss">

    .notification-count-enter-active,
    .notification-count-leave-active {
        transition: all 0.2s;
    }

    .notification-count-enter-from,
    .notification-count-leave-to {
        opacity: 0;
        transform: scale(0.75);
    }

</style>


<template>

    <span
        class="
            px-6
            flex items-center
            text-sm
            text-white
            cursor-pointer
            select-none
        ">
        <dropdown
            ref="dropdown"
            class="
                flex items-center
                p-2
                rounded hoverable clickable text-white
            "
            :offset-top="25">

            <template
                #button>

                <span
                    class="
                        mr-2.5 w-fit h-fit relative
                    ">
                    
                    <transition
                        name="notification-count">
                        <span
                            v-if="notificationCount > 0"
                            class="
                                absolute bottom-[calc(100%-10px)] right-[-6px]
                                w-[16px] h-[16px] rounded-full block
                                bg-red-500 text-white text-xs leading-[16px] text-center
                            ">
                            {{ notificationCount > 9 ? '‥' : notificationCount }}
                        </span>
                    </transition>

                    <img
                        class="
                            w-[22px] h-[22px]
                        "
                        :src="__BELL_LOGO__"
                        alt="通知"/>
                </span>

                通知

            </template>

            <template
                v-slot="{
                    close
                }">
                <notification-list/>

                <footer
                    class="
                        p-4 flex justify-end
                    ">
                    <router-link
                        @click="close"
                        class="
                            text-xs bg-blue-500 p-2 rounded text-white
                        "
                        :to="{
                            name: 'digital-identities/messages'
                        }">
                        查看全部
                    </router-link>
                </footer>
            </template>

        </dropdown>

        
    </span>

    

</template>

<script lang="ts" setup>

import __BELL_LOGO__ from '~/assets/images/bell.svg';

import NotificationList from './notification-list.vue';

import {
    defineAsyncComponent,
    ref,
    onMounted,
    onUnmounted,
} from 'vue';

const Dropdown = defineAsyncComponent(
    () => import(
        '~/components/dropdown.vue'
    )
);

const notificationCount = ref(0);


import axios from '~/plugins/axios';

const getUnreadNotificationCount = () => {
    axios.get(`/notify-message/get-unread-count`)
        .then(({ data }) => {
            notificationCount.value = data.data as number;
        });
};

let getUnreadNotificationCountInterval;

onMounted(() => {
    getUnreadNotificationCountInterval = setInterval(
        getUnreadNotificationCount,
        1000 * 30 // 30s
    );

    getUnreadNotificationCount();
});

onUnmounted(() => {
    getUnreadNotificationCountInterval && clearInterval(getUnreadNotificationCountInterval);
});


</script>