<script setup>
import { useAllTrending } from '@/store/getAllTrending'
import { onMounted, onUnmounted, ref, watch, nextTick } from 'vue'
import { useTopRatedMovie } from '@/store/getTopRatedMovie'
import { useTopRatedSerials } from '@/store/getTopRatedSerials'
import { useSearchResult } from '@/store/getSearchResult';

import SliderWithLabel from '@/components/SliderWithLabel.vue'
import Slider from '@/components/SliderCarousel/Slider.vue'
import Spinner from '@/components/UI/Spinner.vue'
import SearchResult from '@/components/UI/SearchResult.vue';
import ImageSearch from '@/components/Images/ImageSearch.vue'

const isVisibleInput = ref(false);
const storeTrending = useAllTrending();
const storeTopMovie = useTopRatedMovie();
const storeTopSerials = useTopRatedSerials();
const storeSearchResult = useSearchResult();
const searchContent = ref('')
const isInput = ref(null);

onMounted( async() => {
    await storeTrending.getAllTrendingList();
    await storeTopMovie.getTopRated();
    await storeTopSerials.getTopRated();
    document.title = 'MovieApp'
    window.addEventListener('click', closeMenu);
});

watch(searchContent, async val => {
    storeSearchResult.currentRequest = val;
    await storeSearchResult.getSearchResult();

    if (val.length !== 0) {
        await nextTick();
        isVisibleInput.value = true;
    } else {
        isVisibleInput.value = false;
    }
});

const closeMenu = (event) => {
    if(isVisibleInput.value && event.srcElement.tagName !== 'INPUT') {
        isVisibleInput.value = false;
    } else if(!isVisibleInput.value && event.srcElement.tagName === 'INPUT' && storeSearchResult.dataSearchResult.length !== 0) {
        isVisibleInput.value = true;
    } else {
        return;
    }
};

onUnmounted(() => {
    window.removeEventListener('click', closeMenu);
});
</script>

<template>
    <div class="flex flex-col container pt-32">
        <Spinner v-if="storeTrending.data.length === 0 && storeTopMovie.data.length === 0 && storeTopSerials.data.length === 0"/>
        <div class="flex flex-col" v-else>
            <div class=" flex flex-col items-center mb-24">
                <h1 class="xs:text-7xl text-4xl text-dim-white mb-2">Welcome</h1>
                <p class="xs:text-xl text-base mb-10 text-dim-gray text-center">Millions of movies and TV shows. Сhoose your favourite right now.</p>
                <div class="flex w-full max-w-screen-sm relative">
                    <input type="text" class="outline-none w-full text-lg rounded-l-full py-2 pl-4" placeholder="Find films or TV shows!" v-model="searchContent" ref="isInput"/>
                    <button class="flex items-center justify-center dark:bg-dim-semi-dark-gray rounded-r-full w-20"><ImageSearch></ImageSearch></button>
                    <SearchResult :data="storeSearchResult.dataSearchResult" :searchContent="searchContent" v-if="isVisibleInput" />
                </div>
            </div>
            <div class="flex flex-col gap-14">
                <SliderWithLabel title="Weekly Trends">
                    <Slider :getDataFromStores="storeTrending.data"></Slider>
                </SliderWithLabel>
                <SliderWithLabel title="Top Rated of Movie">
                    <Slider :getDataFromStores="storeTopMovie.data" :media="'movie'"></Slider>
                </SliderWithLabel>
                <SliderWithLabel title="Top Rated of Serials">
                    <Slider :getDataFromStores="storeTopSerials.data" :media="'tv'"></Slider>
                </SliderWithLabel>
            </div>
        </div>
    </div>
</template>