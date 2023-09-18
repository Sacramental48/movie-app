<script setup>
import { useAllTrending } from '@/store/getAllTrending'
import { onMounted, onUnmounted, ref, watch, nextTick } from 'vue'
import { useTopRatedMovie } from '@/store/getTopRatedMovie'
import { useTopRatedSerials } from '@/store/getTopRatedSerials'
import { useSearchResult } from '@/store/getSearchResult';

import Slider from '@/components/SliderCarousel/Slider.vue'
import Spinner from '@/components/UI/Spinner.vue'
import SearchResult from '@/components/UI/SearchResult.vue';

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
                <div class="w-full max-w-screen-sm relative">
                    <input type="text" class="w-full text-lg rounded-full py-2 pl-4" placeholder="Find films or TV shows!" v-model="searchContent" ref="isInput"/>
                        <SearchResult :data="storeSearchResult.dataSearchResult" :searchContent="searchContent" v-if="isVisibleInput" />
                </div>
            </div>
            <div class="flex flex-col gap-14">
                <div>
                    <h3 class="text-2xl text-dim-white mb-4">Weekly Trends</h3>
                    <Slider :getDataFromStores="storeTrending.data"></Slider>
                </div>
                <div>
                    <h3 class="text-2xl text-dim-white mb-4">Top Rated of Movie</h3>
                    <Slider :getDataFromStores="storeTopMovie.data" :media="'movie'"></Slider>
                </div>
                <div>
                    <h3 class="text-2xl text-dim-white mb-4">Top Rated of Serials</h3>
                    <Slider :getDataFromStores="storeTopSerials.data" :media="'tv'"></Slider>
                </div>
            </div>
        </div>
    </div>
</template>