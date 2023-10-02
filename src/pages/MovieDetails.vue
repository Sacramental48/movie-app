<script setup>
import { ref, onMounted, computed, onUnmounted, defineAsyncComponent  } from 'vue'
import { useMovieVideo } from '@/store/getVideoLineForMovie'
import { useMovieDetailsById } from '@/store/getMovieDetailsById'
import { useMovieCredits } from '@/store/getMovieCredits'
import { useRoute } from 'vue-router'
import { formatDate } from '@/use/formatDate'
import { formatDuration } from '@/use/runtimeFormatted'
import { formattedRating } from '@/use/formattedRating'

import Slider from '@/components/SliderCarousel/Slider.vue'
import DynamicRating from '@/components/UI/DynamicRatingColor.vue'
import Spinner from '@/components/UI/Spinner.vue'

const route = useRoute();

const storeMovieVideo = useMovieVideo();
const storeMovieDetails = useMovieDetailsById();
const storeMovieCredits = useMovieCredits();
const notFound = new URL('@/assets/img/noPictureAvailable.jpg', import.meta.url);

onMounted(async() => {
    storeMovieDetails.currentId = route.params.id;
    storeMovieCredits.currentId = route.params.id;
    storeMovieVideo.currentId = route.params.id;
    await storeMovieDetails.getDetailsMovieById();
    await storeMovieCredits.getMovieCredits();
    await storeMovieVideo.getMovieVideo();
});

onUnmounted(() => {
    // storeMovieDetails.currentData = [];
    // storeMovieDetails.currentId = '';
    storeMovieDetails.$reset();
    storeMovieCredits.$reset();
    storeMovieVideo.$reset();
});

const formattedNumber = computed(() => {
    const number = storeMovieDetails.currentData.budget;

    function formatNumberWithSpaces(number) {
        const numberString = String(number);
        const parts = numberString.split('.');
        const dollarBefore = parts[0].replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
        const formattedNumber = parts.length > 1 ? dollars + '.' + parts[1] : dollarBefore;
        return '$' + formattedNumber;
    }
    return formatNumberWithSpaces(number);
});
</script>

<template>
    <div class="relative z-10">
        <div class="w-full h-screen top-0 left-0 overflow-hidden absolute opacity-10 sm:block hidden">
             <img v-lazy="{ 
                src: `https://image.tmdb.org/t/p/original${storeMovieDetails.currentData.backdrop_path}`, delay: 300 }" 
                lazy="loading"
                class="h-full w-full object-cover object-center"
                v-if="storeMovieDetails.currentData.backdrop_path"
            />
            <div class="h-full w-full object-cover object-center dark:bg-dim-dark-gray" v-else></div>
            <div class="w-full h-[200px] dark:bg-gradient-to-t from-dim-dark-gray from-10% to-div-semi-dark-gray to-100% absolute bottom-0 left-0"></div>
        </div>
        <div class="flex flex-col sm:gap-16 gap-10 justify-center items-center container pt-32">
            <Spinner v-if="storeMovieDetails.currentData.length === 0"></Spinner>
            <div class="flex gap-8 sm:flex-row flex-col z-10" v-else>
                <div class="flex w-full xs:h-[600px] h-[400px] xs:justify-center justify-start">
                    <img v-lazy="{ 
                        src: `https://image.tmdb.org/t/p/original${storeMovieDetails.currentData.poster_path}`, delay: 300 }" 
                        lazy="loading"
                        class="h-full aspect-[1/1.5] max-w-md rounded-lg"
                        v-if="storeMovieDetails.currentData.poster_path"
                    />
                    <img class="h-full aspect-[1/1.5] max-w-md rounded-lg" :src="notFound" alt="Not Found" v-else>
                </div>
                <div class="flex flex-col">
                    <div>
                        <h2 class="text-4xl text-dim-white">{{storeMovieDetails.currentData.original_title}}</h2>
                        <h4 class="text-gray-500 italic">{{storeMovieDetails.currentData.tagline}}</h4>
                        <div class="flex gap-3 text-sm text-gray-400 mt-2 flex-wrap">
                            <span v-for="item in storeMovieDetails.currentData.genres" :key="item.id" class="border px-1">{{item.name}}</span>
                        </div>
                    </div>
                    <div class="flex items-center my-4 gap-4">
                        <DynamicRating :rating="formattedRating(storeMovieDetails.currentData.vote_average)"></DynamicRating>
                        <span>watch trailer</span>
                    </div>
                    <div class="mb-10">
                        <h2 class="text-lg font-semibold text-dim-white">Overview</h2>
                        <p class="text-dim-white">{{storeMovieDetails.currentData.overview}}</p>
                    </div>
                    <div>
                        <div class="flex sm:gap-6 gap-2 pb-4 border-b text-dim-white border-b-dim-gray border-opacity-20 flex-wrap">
                            <p>Status: <span class="text-gray-400 ml-2 font-light">{{storeMovieDetails.currentData.status}}</span></p>
                            <p>Release Date: <span class="text-gray-400 ml-2 font-light">{{formatDate(storeMovieDetails.currentData.release_date)}}</span></p>
                            <p>Runtime: <span class="text-gray-400 ml-2 font-light">{{formatDuration(storeMovieDetails.currentData.runtime)}}</span></p>
                        </div>
                        <p class="border-b py-4 text-dim-white border-b-dim-gray border-opacity-20" v-if="storeMovieDetails.currentData.budget">Budget: <span class="text-gray-400 ml-2">{{formattedNumber}}</span></p>
                    </div>
                </div>
            </div>
            <Slider :getDataFromStores="storeMovieCredits.dataCast" v-if="storeMovieCredits.dataCast !== 0" title="Cast" />
            <!-- <Slider :video="storeMovieVideo.currentData" v-if="storeMovieVideo.currentData.length !== 0" title="Video" /> -->
        </div>
    </div>
</template>