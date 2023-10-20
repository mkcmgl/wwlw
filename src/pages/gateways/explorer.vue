<template>
    <iframe
        :src="BROWSER_URL"
        width="100%"
        height="100%"
        frameborder="0"
        allowfullscreen
    ></iframe>
</template>

<script lang="ts" setup>

import { useMeta } from	'vue-meta';
import { ExtendImportMeta } from '~/types.d';

useMeta({
    title: '区块链浏览器',
    titleTemplate: false,
});

const BROWSER_URL = (import.meta as ExtendImportMeta).env.VITE_BLOCKCHAIN_BROWSER_URL;

</script>