<script setup>
import { useMovieApp } from '../store/getMovieApp'
import { ref, onMounted, watch} from 'vue'
import {useRoute} from 'vue-router'

import HomeMovieCards from '../components/HomeMovieCards.vue'
import Spinner from '../components/UI/Spinner.vue'
import PaginationPage from '../components/UI/PaginationPage.vue'
import SortSelect from '../components/SortSelect.vue';

const route = useRoute();
const movieApp = useMovieApp();
const currentPageCount = ref(null)
console.log(route);
onMounted(async() => {
    await movieApp.getMovieData();
    currentPageCount.value = movieApp.currentPage;
});

console.log(movieApp.data);

</script>

<template>
    <div class="flex flex-col justify-center">
        <div class="flex justify-between py-4">
            <p class="text-2xl">Movies</p>
            <div class="flex">
                <SortSelect></SortSelect>
            </div>
        </div>
        <div class="flex justify-center">
            <div class="flex flex-col items-center xs:w-full w-[260px]">
                <div class="grid grid-cols-12 gap-4 justify-items-center">
                        <div v-for="item in movieApp.data" :key="item.id" class="xl:col-span-2 md:col-span-4 xs:col-span-6 es:col-span-12 ">
                            <HomeMovieCards :item="item" :media="route.name"/>
                        </div>
                </div>
                <PaginationPage :currentPageCount="currentPageCount"/>
            </div>
        </div>
    </div>
</template>