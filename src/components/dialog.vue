<style lang="scss">

.dialog-enter-active {
	transition: all .1s ease;
	.dialog {
		animation: rebound-dialog .2s
	}
}
.dialog-leave-active {
	transition: all .1s ease;
	.dialog {
		transition: all .1s ease;
	}
}

.dialog-enter,
.dialog-leave-to {
	opacity: 0;
	.dialog {
		transform: scale(0.9);
	}
}

.dialog.shaking {
	animation: shaking-dialog .25s;
}


@keyframes rebound-dialog {
	0%{
		transform: scale(0.9);
	}
	40%{
		transform: scale(1.02);
	}
	80%{
		transform: scale(.98);
	}
	100%{
		transform: scale(1);
	}
}

@keyframes shaking-dialog {
	0%{
		transform: translateX(10px);
		filter: drop-shadow(0px 0px 0px theme('colors.red.400'));
	}
	25%{
		transform: translateX(-8px);
		filter: drop-shadow(0px 0px 15px theme('colors.red.400'));
	}
	50% {
		transform: translateX(6px);
		filter: drop-shadow(0px 0px 12px theme('colors.red.400'));
	}
	75%{
		transform: translateX(-4px);
		filter: drop-shadow(0px 0px 9px theme('colors.red.400'));
	}
	100%{
		transform: translateX(0px);
		filter: drop-shadow(0px 0px 0px theme('colors.red.400'));
	}
}

</style>


<template>

    <teleport
        to="body">

        <transition
            name="dialog">

            <div
                v-if="delayShow"
                class="
                    dialog-wrapper
                    fixed z-50 top-0 bottom-0 left-0 right-0 w-auto overflow-x-hidden overflow-y-scroll bg-slate-900/10 flex items-center
                    backdrop-filter backdrop-blur-sm
                "
                @click.self="
                    prevent
                        ? shakeDialog()
                        : closeDialog()
                ">
                
                <dialog
                    class="
                        dialog
                        bg-white mx-auto shadow rounded max-h-[calc(100vh-theme('spacing.16'))]
                        min-w-[520px]
                        scrollbar-trigger-wrapper
                        transition-all duration-100
                    "
                    :class="{
                        'shaking': shaking
                    }"
                    open
                    v-bind="$attrs">

                    <img
                        class="
                            absolute top-0 left-0 w-full
                        "
                        :src="__DIALOG_MASK__"/>

                    <slot
                        name="all"
                        :close="closeDialog">

                        <header
                            class="
                                mt-1
                                h-14 text-xl font-bold leading-8
                                py-4 pl-4 pr-14 relative
                                ellipsis-1
                            ">

                            <slot
                                name="title" />

                            <button
                                type="button"    
                                class="
                                    absolute top-3 right-3
                                    w-8 h-8 rounded
                                    clickable hoverable
                                "
                                @click="closeDialog()"
                                v-wave>
                                <i
                                    class="
                                        mdi mdi-close text-xl
                                    "></i>
                            </button>

                        </header>
                        
                        <div
                            class="
                                p-4 max-h-[calc(100vh-theme('spacing.32'))] overflow-y-auto
                            ">
                            <slot
                                :close="closeDialog"/>
                        </div>

                    </slot>

                </dialog>

            </div>

        </transition>

    </teleport>

</template>

<script lang="ts" setup>

import __DIALOG_MASK__ from '~/assets/images/dialog-mask.svg';

import {
    ref,
    computed,
    watch,
} from 'vue';

defineOptions({
    name: 'custom-dialog',
    inheritAttrs: false,
});

const props = withDefaults(defineProps<{
    show: boolean,
    prevent?: boolean,
}>(), {
    prevent: false,
});

const emits = defineEmits([
    'update:show',
    'close',
]);

const computedShow = computed({
    get () {
        return props.show;
    },
    set(value) {
        emits('update:show', value);
    }
});

const delayShow = ref(props.show);

watch(
    () => props.show,
    (value) => {
        setTimeout(() => {
            delayShow.value = value;
        }, 0);
    }
);

const closeDialog = () => {
    emits('close');
    computedShow.value = false;
};

const shaking = ref(false);

const shakeDialog = () => {
    shaking.value = true;
    setTimeout(() => {
        shaking.value = false;
    }, 500);
};

</script>