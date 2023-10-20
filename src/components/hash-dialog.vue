<template>

    <custom-dialog
        class="w-[560px]"
        v-model:show="computedShow">

        <template
            #title>
            <h3
                class="
                    text-center
                ">
                交易详情
            </h3>
        </template>

        <hash-content
            :type="type"
            :hash="hash"/>

    </custom-dialog>

</template>

<script lang="ts" setup>

import CustomDialog from '~/components/dialog.vue';
import HashContent from '~/components/hash-content.vue';

import {
    computed
} from 'vue';

const props = defineProps<{
    show: boolean;
    hash: string;
    type: "1" | "2";
}>();

const emits = defineEmits(['update:show']);

const computedShow = computed({
    get () {
        return props.show;
    },
    set(value: boolean) {
        emits('update:show', value);
    }
});

</script>