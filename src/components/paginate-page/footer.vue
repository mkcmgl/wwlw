<style lang="scss">
    .paginate-page-footer {
        a {
            @apply border mx-1 w-9 h-9 flex items-center justify-center rounded text-sm; 
        }
    }
</style>

<template>

    <footer
        class="
            mt-4 flex items-center justify-end -mx-2 paginate-page-footer
        ">
        
        <span
			class="text-sm mx-2">
			共 {{ total }} 条
		</span>


        <nav
			class="mx-2 flex items-center">

			<a
                class="
                    clickable hoverable relative
                "
				@click.prevent="
					pageNum === 1 ? false : changePage(pageNum === 1 ? 1 : pageNum - 1)
				"
				:href="router.resolve(getRouteFromPage(pageNum === 1 ? 1 : pageNum - 1)).href"
				title="上一页"
				v-wave="pageNum !== 1">
				<i
					class="mdi mdi-arrow-left"></i>
			</a>

			<template
				v-for="index in pageIndexArray"
                :key="index">
				
                <span
					class="select-none px-2"
					v-if="
						index === (length - 2) &&
						pageNum < (length - 4)
					">
					...
				</span>

				<a
                    class="
                        clickable relative
                    "
					:href="router.resolve(getRouteFromPage(index)).href"
					@click.prevent="changePage(index)"
					:class="{
						'linear-hover text-white': index === pageNum,
						'hoverable': index !== pageNum
					}"
					:style="{
						'font-size': `${Math.pow(1.2, (-1 * index.toString().length) + 1) * 100}%`
					}"
					v-wave>
					{{ index }}
				</a>

				<span
					class="select-none px-2"
					v-if="
						index === 3 &&
						pageNum > 5
					">
					...
				</span>

			</template>

			<a
                class="
                    clickable hoverable relative
                "
				@click.prevent="
					pageNum === length ? false : changePage(pageNum === length ? length : pageNum + 1)
				"
				:href="router.resolve(getRouteFromPage(pageNum === length ? length : pageNum + 1)).href"
				title="下一页"
				v-wave="pageNum !== length">
				<i
					class="mdi mdi-arrow-right"></i>
			</a>

		</nav>

        <form
			@submit.prevent="changePageByInputting"
			class="flex items-center mx-2 text-sm">
			前往
			<input
				class="w-24 mx-2 p-2 border-2 rounded text-sm bg-transparent"
				type="number"
				step="1"
				:min="1"
				:max="length"
				ref="pageNumInput"
				:value="pageNum"
				@keydown.enter="changePageByInputting"/>
			页
		</form>


	</footer>
    
</template>

<script lang="ts" setup>

import {
    computed,
    ref,
} from 'vue';

import {
    type RouteLocationRaw,
    useRoute,
    useRouter,
} from 'vue-router';

const props = defineProps<{
    total: number;
}>();

const route = useRoute();
const router = useRouter();


const pageNum = computed(() => {
    return Math.ceil(parseInt(route.query?.pageNum as string) || 1); 
});

const pageSize = computed(() => {
    return parseInt(route.query?.pageSize as string) || 10; 
});

const length = computed(() => {
    return Math.ceil(props.total / pageSize.value) || 1;
});

const pageIndexArray = computed(() => {
    return Array
        .apply(null, Array(length.value))
        .map((x, i) => i + 1)
        .filter(v => {
            return v < 4 ||
                (length.value - v) < 3 ||
                Math.abs(v - pageNum.value) < 2;
        });	
});

const pageNumInput = ref<HTMLInputElement|null>();

const changePageByInputting = () => {
    const target = parseInt((pageNumInput.value as HTMLInputElement).value.trim());
    changePage(target as number);
};

const getRouteFromPage = (pageNum: number) => {
    
    let query = {
        ...route.query
    } as {
        pageNum?: number;
    };

    if (pageNum === 1) {
        delete query.pageNum;
    }
    else {
        query.pageNum = pageNum;
    }

    return {
        name: route.name,
        params: route.params,
        query: query
    } as RouteLocationRaw;
};



const changePage = (pageNum: number) => {
    
    if (
        pageNumInput.value?.value.trim().length === 0
    ) {
        return false;
    }

    pageNum = pageNum || 1;

    if (isNaN(pageNum)) {
        pageNum = 1;
    }
    if (pageNum <= 0) {
        pageNum = 1;
    }
    if (pageNum > length.value) {
        pageNum = length.value;
    }

    // pageNumInput.value?.value = pageNum;

    let query = {
        ...route.query,
        pageNum: pageNum
    } as {
        pageNum?: number;
    };

    if (pageNum === 1) {
        delete query.pageNum;
    }

    router.push({
        query: query
    });
};


</script>