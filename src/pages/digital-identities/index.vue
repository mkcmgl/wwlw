<template>
    <div v-if="user.authenticationStatus == 1">
        <mine-details />
    </div>
    <mine v-else title="数字身份" :use-title-template="false" />
</template>

<script lang="ts" setup>

import Mine from '~/components/mine/index.vue';
import MineDetails from "./mine.vue";


import {
    computed,
} from 'vue';
import {
    useAuthStore
} from '~/store/auth';
const authStore = useAuthStore();
const user = computed(() => authStore.user);
</script>