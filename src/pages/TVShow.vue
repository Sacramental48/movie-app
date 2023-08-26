<script setup>
import { useTVShow } from '../store/getTVShow'
import { ref, onMounted, watch} from 'vue'
import {useRoute} from 'vue-router'

import HomeMovieCards from '../components/HomeMovieCards.vue'
import Spinner from '../components/UI/Spinner.vue'
import PaginationPage from '../components/UI/PaginationPage.vue'
import SortSelect from '../components/SortSelect.vue';

const route = useRoute();

const tvShow = useTVShow();
const totalPages = ref(0);
const currentPageCount = ref(null)

onMounted(async() => {
    await tvShow.getTVShowData();
    currentPageCount.value = tvShow.currentPageSerials;
});
</script>

<template>
    <div class="flex flex-col justify-center">
        <div class="flex justify-between items-center py-4">
            <p class="text-2xl">TVShow</p>
            <div class="flex">
                <SortSelect :data="tvShow"></SortSelect>
            </div>
        </div>
        <div class="flex justify-center">
            <div class="flex flex-col items-center">
                <div class="grid grid-cols-12 gap-4 justify-items-center">
                    <div v-for="item in tvShow.data" :key="item.id" class="xl:col-span-2 md:col-span-4 xs:col-span-6 es:col-span-12 ">
                        <HomeMovieCards :item="item" :media="route.name"/>
                    </div>
                </div>
                <PaginationPage :media="route.name" :data="tvShow"/>
            </div>
        </div>
    </div>
</template>