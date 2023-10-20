<template>

    <i-form
        ref="formElement"
        @submit="updateFilter"
        class="
            mx-4 mb-4 p-6 bg-white rounded
            flex items-start justify-between
        ">

        <div
            class="
                w-[calc(100%-240px)]
                grid grid-cols-3 gap-2 -mb-3
            ">

            <div
                v-for="(filter, key) in filters"
                :key="key"
                class="
                    flex items-center mb-3
                "
                :class="{
                    'col-span-2': filter?.type === 'datetime-period',
                }">

                <p
                    class="w-[100px] text-center"
                    v-html="filter.label ?? filter"/>

                <i-input
                    class="
                        w-[calc(100%-100px)]
                    "
                    v-if="typeof filter === 'string'"
                    :name="key"
                    :attr="filter"
                    :placeholder="`请输入${filter}`"
                    v-model="form[key]"
                    v-model:error="error[key]"
                    :rules="[
                        'no-emoji'
                    ]"/>

                <i-single-select
                    class="
                        w-[calc(100%-100px)]
                    "
                    v-else-if="filter?.type === 'single-select'"
                    :name="key"
                    :attr="filter.label"
                    :placeholder="`请选择${filter.label}`"
                    v-model="form[key]"
                    v-model:error="error[key]"
                    :options="filter.options"/>

                <i-datetime-period-input
                    class="
                        w-[calc(100%-100px)]
                    "
                    v-else-if="filter?.type === 'datetime-period'"
                    :name="key"
                    v-model="form[key]"
                    v-model:error="error[key]"
                    :start-placeholder="`${filter.label.toString().replace('时间', '开始时间')}`"
                    :end-placeholder="`${filter.label.toString().replace('时间', '结束时间')}`"/>

            </div>

        </div>

        <div
            class="
                w-[240px] -mx-2 flex justify-end
            ">

            <button
                type="submit"
                class="
                    flex items-center justify-center
                    py-2 w-[100px] mx-2
                    rounded
                    text-white fill-white
                    tracking-widest
                    clickable relative
                    overflow-hidden
                    linear-hover
                "
                v-wave>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20">
                    <g
                        transform="translate(-1623 -197)">
                        <path
                            d="M15.818,15.8c-.282.284-.97.17-.97.17l-3.081-3.084a7.24,7.24,0,1,1,1.123-1.123l3.081,3.081s.126.677-.153.956ZM12.96,7.248a5.7,5.7,0,1,0-5.7,5.7,5.7,5.7,0,0,0,5.7-5.7Z"
                            transform="translate(1625.698 199.006)"/>
                    </g>
                </svg>
                <span
                    class="
                        ml-2
                    ">
                    搜索
                </span>
            </button>

            <button
                type="reset"
                @click.prevent="refreshFilter"
                class="
                    flex items-center justify-center
                    py-2 w-[100px] mx-2
                    rounded
                    text-blue-500 fill-blue-500
                    tracking-widest
                    clickable relative
                    overflow-hidden
                    border-2 border-blue-500
                "
                v-wave>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20">
                    <g
                        transform="translate(-1756 -198)">
                        <path
                            d="M9.823,85.631a7.675,7.675,0,0,1-7.667-7.667.784.784,0,1,1,1.567,0A6.1,6.1,0,1,0,6.392,72.92a.783.783,0,1,1-.882-1.293,7.667,7.667,0,1,1,4.313,14ZM1.076,79.358a.575.575,0,0,1-.334-.1.587.587,0,0,1-.148-.817l1.526-2.2a.587.587,0,1,1,.965.669l-1.526,2.2A.587.587,0,0,1,1.076,79.358ZM4.8,78.684a.575.575,0,0,1-.334-.1l-2.2-1.526a.587.587,0,0,1,.669-.965l2.2,1.526A.587.587,0,0,1,4.8,78.684Z"
                            transform="translate(1756.616 129.7)"/>
                    </g>
                </svg>
                <span
                    class="
                        ml-2
                    ">
                    重置
                </span>
            </button>

        </div>
        
    </i-form>

</template>

<script lang="ts" setup>

import {
    type Ref,
    ref,
    computed,
    watch,
} from 'vue';

import {
    type LocationQueryValue,
    useRoute,
    useRouter,
} from 'vue-router';

import { omit, isEqual } from 'lodash-es';

import IForm from '~/components/form.vue';
import IInput from '~/components/input.vue';
import ISingleSelect from '~/components/single-select.vue';
import IDatetimePeriodInput from '~/components/datetime-period-input.vue';

import type {
    Filters,
} from '~/types/paginate.d';

type Query = {
    [x: string]: LocationQueryValue | LocationQueryValue[];
};

const route = useRoute();

const props = defineProps<{
    filters: Filters;
}>();

let initialForm: Query = {};
let initialError: Record<string,string> = {};

Object.keys(props.filters).forEach(key => {
    initialForm[key] = route.query[key] ?? '';
    initialError[key] = '';
});

const form: Ref<Query> = ref(initialForm);
const error: Ref<Record<string,string>> = ref(initialError);

const objectEmptyAttrFilter = (obj: Record<string,unknown>) => {
	
    let result = {} as Record<string,unknown>;

    Object.keys(obj).forEach(attr => {
        if (obj[attr]) {
            result[attr] = obj[attr];
        }
    });

    return result;
};


const queryInUrl = computed(() => {
    return {
        ...initialForm,
        ...omit(route.query, ['pageSize', 'pageNum']),
    };
});

const isFormEqualToQueryInUrl = computed(() => {
    return isEqual(queryInUrl.value, form.value);
});


watch(queryInUrl, (query) => {
    if (!isEqual(form.value, query)) {
        form.value = query;
    }
});

const router = useRouter();

const updateFilter = (focus = false) => {
    if (
        !isFormEqualToQueryInUrl.value
        || focus
    ) {
        const query = objectEmptyAttrFilter(form.value) as Query;
        router.push({
            query
        });
    }
};

const formElement = ref<typeof IForm>();

const refreshFilter = () => {
    formElement.value?.refresh();
    updateFilter(true);
};

</script>