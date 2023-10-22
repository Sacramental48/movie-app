<script setup>
import { ref, onMounted, onUnmounted, watch, computed} from 'vue';
import { useMovieApp } from '@/store/getMovieApp';
import { useTVShow } from '@/store/getTVShow';
import { useSearchResult } from '@/store/getSearchResult';
import { useRoute } from 'vue-router';

import Slider from '@/components/SliderCarousel/Slider.vue';
import CardForImages from '@/components/CardForImages.vue';
import Spinner from '@/components/UI/Spinner.vue';
import PaginationPage from '@/components/UI/PaginationPage.vue';
import SortSelect from '@/components/UI/SortSelect.vue';

const route = useRoute();

const storeMovieApp = useMovieApp();
const storeTvShow = useTVShow();
const storeSearchResult = useSearchResult();

const currentPageCount = ref(null);
const currentContentType = ref('');

watch(route, async value => {
    if(value.params.contentType === 'movie') {
        storeTvShow.$reset();
        await storeMovieApp.getMovieData();
    }
    if(value.params.contentType === 'tv') {
        storeMovieApp.$reset();
        await storeTvShow.getTVShowData();
    }
    if(value.params.contentType === 'search_result') {
        storeSearchResult.getSearchResult();
    }
});

onMounted(async() => {
    if(route.params.contentType === 'movie') {
        await storeMovieApp.getMovieData();
        currentPageCount.value = storeMovieApp.currentPageMovie;
    }
    if(route.params.contentType === 'tv') {
        await storeTvShow.getTVShowData();
        currentPageCount.value = storeTvShow.currentPageSerials;
    }
    if(route.params.contentType === 'search_result') {
        storeSearchResult.getSearchResult();
        currentPageCount.value = storeSearchResult.currentResultPage;
    }
});

const pageName = computed(() => {
    return route.params.contentType === 'movie' ? 'Movie' :
    route.params.contentType === 'tv' ? 'TvShow' :
    route.params.contentType === 'search_result' ? 'Search Result' :
    '';
});

const displayData = computed(() => {
    let data = [];
    let media = ''
    if (route.params.contentType === 'movie') {
        data = storeMovieApp.data;
        media = 'movie';
    } else if (route.params.contentType === 'tv') {
        data = storeTvShow.data;
        media = 'tv';
    } else if (route.params.contentType === 'search_result') {
        data = storeSearchResult.data;
        for(let item of storeSearchResult.data) {
            media = item.media_type;
        }
    }

    return {data, media};
});

onUnmounted(() => {
    storeMovieApp.$reset();
    storeTvShow.$reset();
    storeSearchResult.$reset();
});
</script>

<template>
    <div class="flex flex-col justify-center container pt-32">
        <Spinner v-if="storeMovieApp.data.length === 0 && storeTvShow.data.length === 0 && storeSearchResult.data.length === 0"></Spinner>
        <div v-else>
            <div class="flex justify-between items-center py-4">
                <p class="text-2xl text-dim-dark-gray dark:text-dim-bright">{{pageName}}</p>
                <div v-for="media in [storeMovieApp, storeTvShow]" :key="media.id" v-show="media.data.length">
                    <SortSelect :data="media" />
                </div>
            </div>
            <div class="flex flex-col justify-center w-full items-center">
                 <div class="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4" v-if="displayData.length !== 0">
                    <CardForImages v-for="item in displayData.data" :key="item.id" :item="item" :media="displayData.media"/>
                </div>
                <div v-for="media in [storeMovieApp, storeTvShow, storeSearchResult]" :key="media.id" v-show="media.data.length">
                    <PaginationPage
                        :currentPageCount="currentPageCount"
                        :media="route.params.contentType"
                        :data="media"
                    />
                </div>
            </div>
        </div>
    </div>
</template>