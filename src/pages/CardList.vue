<script setup>
import { useMovieApp } from '../store/getMovieApp'
import { useTVShow } from '@/store/getTVShow'
import { ref, onMounted, onUnmounted, watch} from 'vue'
import {useRoute} from 'vue-router'

import Slider from '@/components/SliderCarousel/Slider.vue'
import CardForImages from '@/components/CardForImages.vue'
import Spinner from '@/components/UI/Spinner.vue'
import PaginationPage from '@/components/UI/PaginationPage.vue'
import SortSelect from '@/components/UI/SortSelect.vue';

const route = useRoute();
const storeMovieApp = useMovieApp();
const storeTvShow = useTVShow();
const currentPageCount = ref(null)
const currentContentType = ref('')
console.log(route);

watch(route, async value => {
    if(value.params.contentType === 'movie') {
        storeTvShow.$reset();
        await storeMovieApp.getMovieData();
    }
    if(value.params.contentType === 'tv') {
        storeMovieApp.$reset();
        await storeTvShow.getTVShowData();
    }
})

onMounted(async() => {
    if(route.params.contentType === 'movie') {
        await storeMovieApp.getMovieData();
        currentPageCount.value = storeMovieApp.currentPageMovie;
    }
    if(route.params.contentType === 'tv') {
        await storeTvShow.getTVShowData();
        currentPageCount.value = storeTvShow.currentPageSerials;
    }
});

onUnmounted(() => {
    storeMovieApp.$reset();
});
</script>

<template>
    <div class="flex flex-col justify-center container pt-32">
        <Spinner v-if="storeMovieApp.data.length === 0 && storeTvShow.data.length === 0"></Spinner>

        <div v-else>
            <div class="flex justify-between items-center py-4">
                <p class="text-2xl text-dim-dark-gray dark:text-dim-bright">Movies</p>
                <SortSelect :data="storeTvShow" v-if="storeTvShow.data.length !== 0"></SortSelect>
                <SortSelect :data="storeMovieApp" v-if="storeMovieApp.data.length !== 0"></SortSelect>
            </div>
            <div class="flex flex-col justify-center w-full items-center">
                <div class="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4" v-if="storeMovieApp.data.length !== 0">
                    <CardForImages v-for="item in storeMovieApp.data" :key="item.id" :item="item" :media="route.params.contentType"/>
                </div>
                <div class="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4" v-if="storeTvShow.data.length !== 0">
                    <CardForImages v-for="item in storeTvShow.data" :key="item.id" :item="item" :media="route.params.contentType"/>
                </div>
                <PaginationPage :currentPageCount="currentPageCount" :media="route.params.contentType" :data="storeMovieApp" v-if="storeMovieApp.data.length !== 0"/>
                <PaginationPage :currentPageCount="currentPageCount" :media="route.params.contentType" :data="storeTvShow" v-if="storeTvShow.data.length !== 0"/>
            </div>
        </div>
    </div>
</template>