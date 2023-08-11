<template>
    <metainfo>
        <template v-slot:title="{ content, metainfo }">
            {{
                metainfo.titleTemplate
                ? metainfo.titleTemplate.replace('%s', content)
                : content
            }}
            -
            {{ __APP_NAME__ }}
        </template>
    </metainfo>

    <router-view />

    <notifications />
</template>

<script lang="ts" setup>

import { ExtendImportMeta } from '~/types.d';
import {
    defineAsyncComponent,
} from 'vue';

const __APP_NAME__ = (import.meta as ExtendImportMeta).env.VITE_APP_NAME;

const Notifications = defineAsyncComponent(() => import(
    '~/prefabs/notifications.vue'
));

</script>