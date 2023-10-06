<script setup>
import { useMovieApp } from '../store/getMovieApp'
import { ref, onMounted, onUnmounted} from 'vue'
import {useRoute} from 'vue-router'

import Slider from '@/components/SliderCarousel/Slider.vue'
import CardForImages from '@/components/CardForImages.vue'
import Spinner from '@/components/UI/Spinner.vue'
import PaginationPage from '@/components/UI/PaginationPage.vue'
import SortSelect from '@/components/UI/SortSelect.vue';

const route = useRoute();
const storeMovieApp = useMovieApp();
const currentPageCount = ref(null)


onMounted(async() => {
    await storeMovieApp.getMovieData();
    currentPageCount.value = storeMovieApp.currentPageMovie;
});

onUnmounted(() => {
    storeMovieApp.$reset();
});
</script>

<template>
    <div class="flex flex-col justify-center container pt-32">
        <Spinner v-if="storeMovieApp.data.length === 0"></Spinner>

        <div v-else>
            <div class="flex justify-between items-center py-4">
                <p class="text-2xl text-dim-dark-gray dark:text-dim-bright">Movies</p>
                <SortSelect :data="storeMovieApp"></SortSelect>
            </div>
            <div class="flex flex-col justify-center w-full items-center">
                <div class="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    <CardForImages v-for="item in storeMovieApp.data" :key="item.id" :item="item" :media="route.name" />
                </div>
                <PaginationPage :currentPageCount="currentPageCount" :media="route.name" :data="storeMovieApp"/>
            </div>
        </div>
    </div>
</template>