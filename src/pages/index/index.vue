<template>
    <page-title
        title="总览"/>

    <digital-id-info-card
        v-if="
            !authStore.isPersonUser
            && authStore.isVerified
        "/>
</template>

<script lang="ts" setup>

import PageTitle from '~/components/page-title.vue';
import digitalIdInfoCard from '~/prefabs/pages/index/digital-id-info-card.vue';

import {
    useAuthStore
} from '~/store/auth';

const authStore = useAuthStore();

</script>