<template>
    <main
        class="
            ml-[200px] mt-[70px] bg-[#F2F5FE]
            h-[calc(100vh-70px)]
            relative z-10 rounded-tl-[20px]
            w-[calc(100%-200px)] overflow-auto
            bg-no-repeat bg-top-left
        "
        :style="{
            'background-image': 'url(' + __PAGE_MASK__ + ')'
        }">
        <router-view/>
    </main>
</template>

<script lang="ts" setup>

import __PAGE_MASK__ from '~/assets/images/page-mask.svg';

</script>