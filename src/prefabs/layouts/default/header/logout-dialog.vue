<template>

    <custom-dialog
        v-model:show="computedShow">

        <template
            #title>
            <i
                class="
                    mdi mdi-logout-variant mr-2
                "></i>
            确定当前退出登录？
        </template>

        <template
            v-slot="{ close }">
            
            <form
                class="
                    -mx-2 text-right
                "
                @submit.prevent="logout">

                <button
                    class="
                        mx-2
                        p-2.5
                        w-32 rounded
                        border-2
                        clickable relative
                        overflow-hidden
                    "
                    @click="close()"
                    type="reset"
                    :disabled="loading"
                    v-wave="!loading">
                    取消
                </button>

                <button
                    class="
                        mx-2
                        p-2.5
                        w-32 rounded
                        text-white
                        clickable relative
                        overflow-hidden
                        linear-hover
                    "
                    :class="[
                        loading
                            ? 'cursor-not-allowed backdrop-grayscale'
                            : ''
                    ]"
                    type="submit"
                    :disabled="loading"
                    v-wave="!loading">
                    <i
                        v-if="loading"
                        class="
                            mdi mdi-loading mdi-spin mr-2
                        "></i>
                    确定退出
                </button>
            
            </form>

        </template>

    </custom-dialog>

</template>

<script lang="ts" setup>

import {
    ref,
    computed,
    defineAsyncComponent,
} from 'vue';

import {
    useRouter
} from 'vue-router';

import {
    useAuthStore
} from '~/store/auth';

const props = defineProps<{
    show: boolean,
}>();

const emits = defineEmits([
    'update:show',
]);

const computedShow = computed({
    get() {
        return props.show;
    },
    set(value) {
        emits('update:show', value);
    }
});

const CustomDialog = defineAsyncComponent(() => import('~/components/dialog.vue'));

const loading = ref(false);

const authStore = useAuthStore();

const router = useRouter();

const logout = () => {

    loading.value = true;

    authStore.clearAuth();

    loading.value = false;

    router.push({
        name: 'login',
    });
};
</script>