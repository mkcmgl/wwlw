<template>

    <paginate-page-filter
        v-if="Object.keys(filters ?? {}).length > 0"
        :filters="filters"/>

    <div
        class="
            mx-4 mb-6 p-6 bg-white rounded
        ">

        <paginate-page-list
            :thead="thead"
            :list-data="listData"
            :enable-sticky="enableSticky">

            <template
                #thead>

                <slot
                    name="thead"/>

            </template>
            
            <template
                #tr="{ singleData }">

                <slot
                    name="tr"
                    :single-data="singleData"/>

            </template>

        </paginate-page-list>

        <paginate-page-footer
            :total="total"/>

    </div>

</template>

<script lang="ts" setup>

import {
    ref,
    onBeforeMount,
    computed,
    watch,
} from 'vue';

import {
    useRoute
} from 'vue-router';

import {
    omit
} from 'lodash-es';

import type {
    Filters
} from '~/types/paginate.d';

import axios from '~/plugins/axios';

import PaginatePageFilter from './filter.vue';
import PaginatePageList from './list.vue';
import PaginatePageFooter from './footer.vue';
import  encrypt  from "~/utils/encrypt";

defineOptions({
    inheritAttrs: false,
    name: 'PaginatePage',
});

const props = withDefaults(
    defineProps<{
        api: string;
        apiMethod?: 'GET' | 'POST';
        thead?: string[];
        filters?: Filters;
        enableSticky?: boolean;
    }>(),
    {
        apiMethod: 'GET',
        filters: () => {},
        enableSticky: false,
    },
);

const listData = ref([]);
const total = ref(0);

const route = useRoute();

const computedApiParams = computed(() => {

    let otherParams = omit(route.query, ['pageSize', 'pageNum']) as Record<string, string>;

    Object.keys(props.filters).map((key) => {
        if (props.filters[key]?.type === 'datetime-period') {
            otherParams[props.filters[key].start] = otherParams[key]?.split(',')[0];
            otherParams[props.filters[key].end] = otherParams[key]?.split(',')[1];
            delete otherParams[key];
        }
    });
    if(otherParams.username){
        otherParams.username= encrypt(otherParams.username);
    }
    if(otherParams.orgName){
        otherParams.orgName= encrypt(otherParams.orgName);
    }    
    if(otherParams.realName){
        otherParams.realName= encrypt(otherParams.realName);
    }
    return {
        pageSize: parseInt(route.query.pageSize as string) || 10,
        pageNum: parseInt(route.query.pageNum as string) || 1,
        ...otherParams,
    };
});

const refreshData = async () => {

    // const { data } = await axios({
    //     url: props.api,
    //     method: props.apiMethod,
    //     data: computedApiParams.value,
    // });

    let response;

    if (props.apiMethod === 'GET') {
        response = await axios.get(
            props.api,
            {
                params: computedApiParams.value,
            },
        );
    }
    else {
        response = await axios.post(
            props.api,
            computedApiParams.value,
        );
    }

    listData.value = response.data.data.list;
    total.value = response.data.data.total;
};

onBeforeMount(async () => {
    await refreshData();
});

watch(
    () => route.query,
    async () => {
        await refreshData();
    },
);

defineExpose({
    refreshData,
});


</script>