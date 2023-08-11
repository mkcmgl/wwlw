<style lang="scss">

    .dropdown-enter-active,
    .dropdown-leave-active {
        transform-origin: top right;
        transition: all 0.2s;
    }

    .dropdown-enter-from,
    .dropdown-leave-to {
        @apply translate-y-[-10px] scale-75 opacity-0;
    }
    
    .dropdown-enter-to,
    .dropdown-leave-from {
        @apply translate-y-0 scale-100 opacity-100;
    }

</style>

<template>
    
    <button
        type="button"
        ref="button"
        @click="showDropdown"
        @keydown.enter="showDropdown"
        v-bind="$attrs"
        v-wave>
        <slot
            name="button"/>
        <span
            class="
                inline-block
                w-[12px] h-full
                ml-2
            ">
            <img
                class="
                    transition-all duration-300
                "
                :class="{
                    'rotate-180': isShowDropdown
                }"
                :src="__ARROW_ICON__"
                alt="展开下拉框">
        </span>
    </button>

    <teleport to="body">

        <transition
            name="dropdown">

            <div
                v-if="isShowDropdown"
                ref="dropdown"
                :style="computedDropdownPosition"
                class="
                    fixed z-50 dropdown-wrapper
                "
                :class="dropdownClass">

                <!-- triangle -->
                <div
                    class="
                        absolute
                        w-0 h-0
                        left-[calc(100%-40px)]
                        border-x-[10px] border-x-transparent
                        border-b-[10px] border-b-white bottom-full
                    ">
                </div>

                <slot
                    :close="closeDropdown"/>
            </div>

        </transition>

    </teleport>

</template>

<script lang="ts" setup>

import {
    type HTMLAttributes,
    type Ref,
    ref,
    computed,
    onBeforeMount,
} from 'vue';

import {
    onClickOutside
} from '@vueuse/core';

import __ARROW_ICON__ from '~/assets/images/arrow.svg';

defineOptions({
    inheritAttrs: false,
});

const props = withDefaults(defineProps<{
    offsetTop?: number;
    dropdownClass?: HTMLAttributes['class'];
}>(), {
    offsetTop: 0,
    dropdownClass: 'rounded shadow bg-white w-[260px]',
});

const button: Ref<HTMLButtonElement|null> = ref(null);
const dropdown: Ref<HTMLDivElement|null> = ref(null);

const isShowDropdown = ref(false);

const buttonOffsetTop = ref(0);
const buttonOffsetRight = ref(0);
const buttonOffsetHeight = ref(0);
const buttonOffsetWidth = ref(0);

const refreshButtonPositionData = () => {
    const {
        top,
        right,
        height,
        width,
    } = button.value?.getBoundingClientRect() ?? {
        top: 0,
        right: 0,
        height: 0,
        width: 0,
    };

    buttonOffsetTop.value = top;
    buttonOffsetRight.value = right;
    buttonOffsetHeight.value = height;
    buttonOffsetWidth.value = width;
};

const computedDropdownPosition = computed(() => {

    return {
        top: `${buttonOffsetTop.value + buttonOffsetHeight.value + props.offsetTop}px`,
        right: `calc(100vw - ${buttonOffsetRight.value}px)`,
    };
});

// let resizeObserver: ResizeObserver;
let clickoutsideObserver: ReturnType<typeof onClickOutside>;

const showDropdown = () => {

    refreshButtonPositionData();

    clickoutsideObserver = onClickOutside(
        dropdown,
        () => {
            isShowDropdown.value = false;
        },
        {
            ignore: [
                button,
            ]
        }
    );

    isShowDropdown.value = true;
};

const closeDropdown = () => {
    isShowDropdown.value = false;
};

onBeforeMount(() => {
    clickoutsideObserver? clickoutsideObserver() : null;
});

</script>