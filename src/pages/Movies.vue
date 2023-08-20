<script setup>
import { useMovieApp } from '../store/getMovieApp'
import { ref, onMounted } from 'vue'

import HomeMovieCards from '../components/HomeMovieCards.vue'
import Spinner from '../components/UI/Spinner.vue'
import PaginationPage from '../components/UI/PaginationPage.vue'
import TheSearch from '../components/TheSearch.vue'
import DiologWindow from '../components/UI/DialogWindow.vue';
import SortSelect from '../components/SortSelect.vue';



const visibleInput = ref(false);

const movieApp = useMovieApp();
const totalPages = ref(0);
const currentPageCount = ref(null)

onMounted(async() => {
    await movieApp.getMovieData();
    totalPages.value = movieApp.getTotalPage;
    currentPageCount.value = movieApp.currentPage;
});

</script>

<template>
    <div>
        <div class="flex justify-between top-0 sticky bg-white">
            <div class="flex items-center">
                <SortSelect></SortSelect>
            </div>
            <div class="flex justify-end items-center h-20">
                <div class="flex justify-end h-16 items-center">
                    <TheSearch class="xs:flex hidden"></TheSearch>
                    <button class="h-8 xs:hidden flex" @click="visibleInput = true">
                        <img class="w-8 h-8" src="../assets/img/search.svg" alt="">
                    </button>
                    <DiologWindow :show="visibleInput" @update:show="visibleInput = $event">
                        <TheSearch></TheSearch>
                    </DiologWindow>
                </div>
            </div>
        </div>
        <div class="flex justify-center">
            <div class="flex flex-col items-center xs:w-full w-[200px]">
                <div class="grid grid-cols-12 gap-4 justify-items-center">
                    <div v-for="item in movieApp.data" :key="item.id" class="h-full xl:col-span-2 md:col-span-4 xs:col-span-6 es:col-span-12 ">
                        <HomeMovieCards :item="item" />
                    </div>
                </div>
                <PaginationPage :currentPageCount="currentPageCount"/>
            </div>
        </div>
    </div>
</template>