<script setup>
import { ref, onMounted, computed, onUnmounted } from 'vue';

import { useMovieVideo } from '@/store/getVideoLineForMovie';
import { useMovieDetailsById } from '@/store/getMovieDetailsById';
import { useMovieCredits } from '@/store/getMovieCredits';

import { useTVShowDetailsById } from '../store/getTVShowDetailsById';
import { useTvCredits } from '@/store/getTvCredits';
import { useTvVideo } from '@/store/getVideoLineForTv';

import { useRoute } from 'vue-router';
import { formatDate } from '@/use/formatDate';
import { formatDuration } from '@/use/runtimeFormatted';
import { formattedRating } from '@/use/formattedRating';
import { useIsOpenValue } from '@/store/getBooleanValue';

import ImagePlay from "@/components/Images/ImagePlay.vue";
import Window from "@/components/UI/DialogWindow.vue";
import Slider from '@/components/SliderCarousel/Slider.vue';
import DynamicRating from '@/components/UI/DynamicRatingColor.vue';
import Spinner from '@/components/UI/Spinner.vue';

const route = useRoute();

const storeMovieVideo = useMovieVideo();
const storeMovieDetails = useMovieDetailsById();
const storeMovieCredits = useMovieCredits();

const storeTVShowDetails = useTVShowDetailsById();
const storeTvVideo = useTvVideo();
const storeTvCredits = useTvCredits();

const notFound = new URL('@/assets/img/noPictureAvailable.jpg', import.meta.url);
const storeIsOpenValue = useIsOpenValue();

const getCurrentData = ref([]);
const getCreditsData = ref([]);
const getVideosData = ref([]);

onMounted(async() => {
    if(route.params.contentCardType === 'movie') {
        storeMovieDetails.currentId = route.params.id;
        storeMovieCredits.currentId = route.params.id;
        storeMovieVideo.currentId = route.params.id;
        await storeMovieDetails.getDetailsMovieById();
        await storeMovieCredits.getMovieCredits();
        await storeMovieVideo.getMovieVideo();
        getCurrentData.value = storeMovieDetails.currentData;
        getCreditsData.value = storeMovieCredits.dataCast;
        getVideosData.value = storeMovieVideo.currentData;
    }
    if(route.params.contentCardType === 'tv') {
        storeTVShowDetails.currentId = route.params.id;
        storeTvCredits.currentId = route.params.id;
        storeTvVideo.currentId = route.params.id;
        await storeTVShowDetails.getDetailsTvById();
        await storeTvCredits.getTvCredits();
        await storeTvVideo.getTvVideo();
        getCurrentData.value = storeTVShowDetails.currentData;
        getCreditsData.value = storeTvCredits.dataCast;
        getVideosData.value = storeTvVideo.currentData;
    }
});

onUnmounted(() => {
    storeMovieDetails.$reset();
    storeMovieCredits.$reset();
    storeMovieVideo.$reset();

    storeTVShowDetails.$reset();
    storeTvCredits.$reset();
    storeTvVideo.$reset();
});


const formattedNumber = computed(() => {
    const number = getCurrentData.budget;

    function formatNumberWithSpaces(number) {
        const numberString = String(number);
        const parts = numberString.split('.');
        const dollarBefore = parts[0].replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
        const formattedNumber = parts.length > 1 ? dollars + '.' + parts[1] : dollarBefore;
        return '$' + formattedNumber;
    }
    return formatNumberWithSpaces(number);
});

const openTrailer = () => {
    storeIsOpenValue.isOpenWindow = !storeIsOpenValue.isOpenWindow;
    for(let item of getVideosData.value) {
        if(item.type === 'Trailer') {
            storeIsOpenValue.videoKey = item.key;
        }
    }
    console.log(getVideosData.value);
};

const hasTrailerActive = computed(() => {
    const hasTrailer = ref(null);

    for(let item of getVideosData.value) {
        if(item.type === 'Trailer') {
            hasTrailer.value = item.key;
        }
    }
    return hasTrailer.value;
});
</script>

<template>
    <div class="z-10">
        <div class="w-full h-screen top-0 left-0 overflow-hidden absolute opacity-10 sm:block hidden">
             <img v-lazy="{ 
                src: `https://image.tmdb.org/t/p/original${getCurrentData.backdrop_path}`, delay: 300 }" 
                lazy="loading"
                class="h-full w-full object-cover object-center"
                v-if="getCurrentData.backdrop_path"
            />
            <div class="h-full w-full object-cover object-center dark:bg-dim-dark-gray" v-else></div>
            <div class="w-full h-[200px] bg-gradient-to-t from-dim-white from-10% to-dim-white/10 to-100% dark:bg-gradient-to-t dark:from-dim-dark-gray dark:from-20% dark:to-dim-semi-dark-gray/10 dark:to-100% absolute bottom-0 left-0"></div>
        </div>
        <Spinner v-if="getCurrentData.length === 0"></Spinner>
        <div class="flex flex-col sm:gap-16 gap-10 justify-center items-center container" v-else>
            <div class="flex gap-8 md:flex-row flex-col z-10 w-full">
                <div class="flex justify-center xs:justify-start">
                    <img v-lazy="{ 
                        src: `https://image.tmdb.org/t/p/original${getCurrentData.poster_path}`, delay: 300 }" 
                        lazy="loading"
                        class="md:h-[600px] max-md:w-full md:max-w-md aspect-[1/1.5] max-w-full rounded-lg"
                        v-if="getCurrentData.poster_path"
                    />
                    <img class="w-full rounded-lg" :src="notFound" alt="Not Found" v-else>
                </div>
                <div class="flex flex-col">
                    <div>
                        <h2 class="text-4xl text-dim-dark-gray dark:text-dim-white">{{getCurrentData.original_title || getCurrentData.name}}</h2>
                        <h4 class="text-gray-500 italic" v-if="getCurrentData.tagline">{{getCurrentData.tagline}}</h4>
                        <div class="flex gap-3 text-sm text-gray-400 mt-2 flex-wrap">
                            <span v-for="item in getCurrentData.genres" :key="item.id" class="border px-1 border-dim-gray text-dim-semi-dark-gray dark:text-dim-gray">{{item.name}}</span>
                        </div>
                    </div>
                    <div class="flex items-center my-4 gap-4">
                        <DynamicRating :rating="formattedRating(getCurrentData.vote_average)"></DynamicRating>
                        <div v-if="hasTrailerActive" class="flex gap-2 justify-center items-center dark:text-dim-white text-xl hover: duration-300 cursor-pointer group" @click="openTrailer">
                            <ImagePlay />
                            <p class="group-hover:text-dim-hover-fuchsia duration-300">Trailer</p>
                        </div>
                    </div>
                    <div class="mb-10">
                        <div v-if="getCurrentData.overview">
                            <h2 class="text-lg font-semibold text-dim-dark-gray dark:text-dim-white" >Overview</h2>
                            <p class="text-dim-dark-gray dark:text-dim-white">{{getCurrentData.overview}}</p>
                        </div>
                    </div>
                    <div>
                        <div class="flex sm:gap-6 gap-2 pb-4 border-b text-dim-white border-b-dim-gray border-opacity-20 flex-wrap">
                            <p class="dark:text-dim-gray text-dim-semi-dark-gray" v-if="getCurrentData.status">Status: 
                                <span class="dark:text-gray-400/70 text-gray-500 ml-2 font-light">{{getCurrentData.status}}</span>
                            </p>
                            <p class="dark:text-dim-gray text-dim-semi-dark-gray" v-if="getCurrentData.release_date">Release Date: 
                                <span class="dark:text-gray-400/70 text-gray-500 ml-2 font-light">{{formatDate(getCurrentData.release_date)}}</span>
                            </p>
                            <p class="dark:text-dim-gray text-dim-semi-dark-gray" v-if="getCurrentData.runtime">Runtime: 
                                <span class="dark:text-gray-400/70 text-gray-500 ml-2 font-light">{{formatDuration(getCurrentData.runtime)}}</span>
                            </p>
                            <p class="dark:text-dim-gray text-dim-semi-dark-gray" v-if="getCurrentData.episode_run_time && getCurrentData.episode_run_time.length">Runtime: 
                                <span class="dark:text-gray-400/70 text-gray-500 ml-2 font-light">{{formatDuration(getCurrentData.episode_run_time[0])}}
                                </span>
                            </p>
                            <p class="dark:text-dim-gray text-dim-semi-dark-gray" v-if="getCurrentData.first_air_date">First episode: 
                                <span class="dark:text-gray-400/70 text-gray-500 ml-2 font-light">{{formatDate(getCurrentData.first_air_date)}}</span>
                            </p>
                            <p class="dark:text-dim-gray text-dim-semi-dark-gray" v-if="getCurrentData.last_air_date">Last episode: 
                                <span class="dark:text-gray-400/70 text-gray-500 ml-2 font-light">{{formatDate(getCurrentData.last_air_date)}}</span>
                            </p>
                        </div>
                        <p class="border-b py-4 text-dim-white border-b-dim-gray border-opacity-20" v-if="getCurrentData.budget && getCurrentData.budget.length">Budget: 
                            <span class="dark:text-gray-400/70 text-gray-500 ml-2">{{formattedNumber}}</span>
                        </p>
                        <p class="border-b py-4 text-dim-dark-gray dark:text-dim-white border-b-dim-gray border-opacity-20" v-if="getCurrentData.created_by && getCurrentData.created_by.length">
                            Developed by: 
                            <span class="dark:text-gray-400/70 text-gray-500 ml-2" v-for="director in getCurrentData.created_by" :key="director">
                                {{director.name}}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <Slider :getDataFromStores="getCreditsData" v-if="getCreditsData.length" title="Cast" />
            <Slider :video="getVideosData" v-if="getVideosData.length" title="Video" />
            <Window :show="storeIsOpenValue.isOpenWindow">
                <iframe 
                    class="rounded-lg w-[80%] h-calc24"
                    allowfullscreen
                    :src="`https://www.youtube.com/embed/${storeIsOpenValue.videoKey}?autoplay=1&iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1`">
                </iframe>
            </Window>
        </div>
    </div>
</template>