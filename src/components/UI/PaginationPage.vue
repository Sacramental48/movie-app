<script setup>
import { ref, watch } from 'vue';
import { useMovieApp } from '@/store/getMovieApp';
import { useTVShow } from '@/store/getTVShow';
import { useSearchResult } from '@/store/getSearchResult';

import { useRouter, useRoute } from 'vue-router';

import Paginate from "vuejs-paginate-next";

const router = useRouter();
const route = useRoute();

const props = defineProps({
    media: {
        type: String
    },
    data: {
        type: Object
    }
});

const currentPageCount = ref(parseInt(props.data.currentPageMovie || props.data.currentPageSerials || props.data.currentResultPage));

const changePage = (pageNum) => {
    props.data.setCurrentPage(pageNum);
    props.data.$reset();
    router.push({ name: 'contentDetails', params: { contentType: props.media }, query: { page: pageNum } });
};

</script>

<template>
    <Paginate
        v-model="currentPageCount"
        :page-count="props.data.totalPages"
        :click-handler="changePage"
        :container-class="'flex gap-1 flex-wrap justify-center mt-10 mb-10'"
        :page-class="'flex justify-center items-center dark:hover:bg-dim-semi-dark-gray/20 hover:bg-dim-semi-dark-gray/20 dark:text-dim-bright rounded-2xl w-8 text-sm cursor-pointer select-none'"
        :margin-pages="1"
        :page-range="5"
        page-link-class="w-full h-full flex justify-center items-center text-lg"
        break-view-class="dark:text-dim-bright"
        active-class="dark:bg-black/40 bg-black/40 dark:text-dim-dark-bright"
        prev-class="hidden"
        next-class="hidden"
    >
    </Paginate>
</template>