<script setup>
import { useTVShow } from '@/store/getTVShow'
import { ref, onMounted, watch} from 'vue'
import { useRoute } from 'vue-router'

import HomeMovieCards from '@/components/HomeMovieCards.vue'
import Spinner from '@/components/UI/Spinner.vue'
import PaginationPage from '@/components/UI/PaginationPage.vue'
import SortSelect from '@/components/SortSelect.vue';

const route = useRoute();

const storeTvShow = useTVShow();
const totalPages = ref(0);
const currentPageCount = ref(null)


onMounted(async() => {
    await storeTvShow.getTVShowData();
    currentPageCount.value = storeTvShow.currentPageSerials;
});
</script>

<template>
    <div class="flex flex-col justify-center container">
        <Spinner v-if="storeTvShow.data.length === 0"></Spinner>
        <div v-else>
            
            <div class="flex justify-between items-center py-4">
                <p class="text-2xl dark:text-dim-white text-dim-dark-gray">TvShow</p>
                <div class="flex">
                    <SortSelect :data="storeTvShow"></SortSelect>
                </div>
            </div>
            <div class="flex flex-col justify-center w-full items-center">
                <div class="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    <HomeMovieCards v-for="item in storeTvShow.data" :key="item.id" :item="item" :media="route.name"/>
                </div>
                <PaginationPage :media="route.name" :data="storeTvShow"/>
            </div>
        </div>
    </div>
</template>