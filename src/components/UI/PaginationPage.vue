<script setup>
import {ref, watch} from 'vue';
import { useMovieApp } from '../../store/getMovieApp';
import Paginate from "vuejs-paginate-next";
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const props = defineProps({
    media: {
        type: String
    },
    data: {
        type: Object
    }
});

const changePage = async (pageNum) => {
    console.log('pagenum', pageNum);
    console.log('media', props.media);
    console.log('data', props.data);
    try {
        props.data.setCurrentPage(pageNum);
        await router.push({ path: `/${props.media}/${pageNum}` });
    } catch(e) {
        console.log(e);
    } finally {
        location.reload();
    }
};

const currentPageCount = ref(parseInt(props.data.currentPageMovie || props.data.currentPageSerials));

</script>

<template>
    <Paginate
        v-model="currentPageCount"
        :page-count="props.data.totalPages"
        :click-handler="changePage"
        :container-class="'flex gap-2 flex-wrap justify-center mt-10 mb-10'"
        :page-class="'flex justify-center items-center border dark:border-dim-gray dark:hover:bg-dim-semi-dark-gray/20 dark:text-dim-bright rounded-2xl h-10 w-10 text-sm cursor-pointer select-none'"
        :margin-pages="1"
        :page-range="5"
        page-link-class="w-full h-full flex justify-center items-center text-lg"
        break-view-class="dark:text-dim-bright"
        active-class="dark:bg-black/40 asddark:text-dim-dark-bright"
        prev-class="hidden"
        next-class="hidden"
    >
    </Paginate>
</template>