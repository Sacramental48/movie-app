<script setup>
import { useAllTrending } from '@/store/getAllTrending';
import { onMounted, onBeforeUnmount, ref, watch, nextTick } from 'vue';
import { useTopRatedMovie } from '@/store/getTopRatedMovie';
import { useTopRatedSerials } from '@/store/getTopRatedSerials';
import { useSearchResult } from '@/store/getSearchResult';
import { useRouter } from 'vue-router';

import Slider from '@/components/SliderCarousel/Slider.vue'
import Spinner from '@/components/UI/Spinner.vue'
import SearchResult from '@/components/UI/SearchResult.vue';
import ImageSearch from '@/components/Images/ImageSearch.vue';

const router = useRouter();
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
    storeSearchResult.setCurrentRequest(val);
    await storeSearchResult.getSearchResult();

    if (val.length !== 0) {
        await nextTick();
        isVisibleInput.value = true;
    } else {
        isVisibleInput.value = false;
    }
});

const closeMenu = (event) => {
    if(isVisibleInput.value && event.target.tagName !== 'INPUT') {
        isVisibleInput.value = false;
    } else if(!isVisibleInput.value && event.target.tagName === 'INPUT' && storeSearchResult.data.length !== 0) {
        isVisibleInput.value = true;
    } else {
        return;
    }
};

const findSearchResults = (contentId) => {
    router.push({name: 'contentDetails', params: { contentType: 'search_result', contentId: '1' }});
};

onBeforeUnmount(() => {
    window.removeEventListener('click', closeMenu);
});
</script>

<template>
    <div class="flex flex-col container pt-32">
        <Spinner v-if="storeTrending.data.length === 0 && storeTopMovie.data.length === 0 && storeTopSerials.data.length === 0"/>
        <div class="flex flex-col" v-else>
            <div class=" flex flex-col items-center justify-center mb-24">
                <h1 class="xs:text-7xl text-4xl dark:text-dim-white mb-2">Welcome</h1>
                <p class="xs:text-xl text-base mb-10 dark:text-dim-gray text-center">Millions of movies and TV shows. Сhoose your favourite right now.</p>
                <div class="flex w-full justify-center relative">
                    <input type="text" class="outline-none w-full max-w-[700px] text-lg dark:placeholder:text-dim-semi-dark-gray rounded-l-full py-2 pl-4" placeholder="Find films or TV shows!" v-model="searchContent" ref="isInput" @click.stop="closeMenu" @keyup.enter="findSearchResults(storeSearchResult.currentRequest)"/>
                    <button class="flex items-center justify-center bg-dim-semi-dark-gray/70 dark:bg-dim-semi-dark-gray rounded-r-full w-20" @click="findSearchResults(storeSearchResult.currentRequest)">
                        <ImageSearch stroke="stroke-dim-bright"></ImageSearch>
                    </button>
                    <SearchResult :data="storeSearchResult.data" :searchContent="searchContent" v-if="isVisibleInput" />
                </div>
            </div>
            <div class="flex flex-col xs:gap-14 gap-8">
                <Slider :getDataFromStores="storeTrending.data" title="Weekly Trends"></Slider>
                <Slider :getDataFromStores="storeTopMovie.data" :media="'movie'" title="Top Rated of Movie"></Slider>
                <Slider :getDataFromStores="storeTopSerials.data" :media="'tv'" title="Top Rated of Serials"></Slider>
            </div>
        </div>
    </div>
</template>