<template>
    <ol
        class="
            max-h-[300px] overflow-y-auto
        ">
        <li
            class="
                border-b p-4
            "
            v-for="message in messages"
            :key="message.id">

            <h5
                class="
                    mb-2 text-sm
                ">
                {{ MessageTypes[message.templateType] }}
            </h5>

            <p
                class="
                    w-full truncate line-clamp-2 text-sm
                "
                v-html="message.templateContent">
            </p>
            
        </li>
    </ol>
</template>

<script lang="ts" setup>

import axios from '~/plugins/axios';

import {
    ref,
    onMounted,
} from 'vue';

const messages = ref([]);

import {
    type Message,
    MessageTypes,
} from '~/types/digital-identities/message';

import {
    parseTime
} from '~/utils/tool';

const loading = ref(false);

onMounted(() => {
    loading.value = true;
    axios.get(`/notify-message/get-unread-list`)
        .then(({ data }) => {
            messages.value = data.data as Message[];
        })
        .finally(() => {
            loading.value = false;
        });
});

</script>