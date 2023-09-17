<script setup>
import { ref, onMounted, computed } from 'vue'
import { useMovieDetailsById } from '@/store/getMovieDetailsById'
import { useMovieCredits } from '@/store/getMovieCredits'
import { useRoute } from 'vue-router'
import { formatDate } from '@/use/formatDate'
import { formatDuration } from '@/use/runtimeFormatted'
import { formattedRating } from '@/use/formattedRating'

import PersonList from '@/components/PersonList.vue'
import DynamicRating from '@/components/UI/DynamicRatingColor.vue'
import Spinner from '@/components/UI/Spinner.vue'

const route = useRoute();
const storeMovieDetails = useMovieDetailsById();
const storeMovieCredits = useMovieCredits();
const notFound = new URL('../assets/img/notFound.jpg', import.meta.url);

onMounted(async() => {
    storeMovieDetails.currentId = route.params.id;
    storeMovieCredits.currentId = route.params.id;
    await storeMovieDetails.getDetailsMovieById();
    await storeMovieCredits.getMovieCredits();
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
    <div class="relative">
        <div class="w-full h-screen top-0 left-0 overflow-hidden absolute opacity-10 sm:block hidden">
            <img class="h-full w-full object-cover object-center" :src="`https://image.tmdb.org/t/p/original${storeMovieDetails.currentData.backdrop_path}`" alt="backdrop image">
            <div class="w-full h-[200px] dark:bg-gradient-to-t from-dim-dark-gray from-10% to-div-semi-dark-gray to-100% absolute bottom-0 left-0"></div>
        </div>
        <div class="flex flex-col justify-center items-center container pt-32">
            <Spinner v-if="storeMovieDetails.currentData.length === 0"></Spinner>
            <div class="flex gap-8 sm:flex-row flex-col z-10" v-else>
                <div class="flex xs:justify-center justify-start">
                    <img :src="storeMovieDetails.currentData.poster_path ? `https://image.tmdb.org/t/p/original${storeMovieDetails.currentData.poster_path}`  : `${notFound}`" alt="image" class="xs:h-[600px] h-[400px] max-w-md rounded-lg">
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
            <PersonList :cast="storeMovieCredits.dataCast"/>
        </div>
    </div>
</template>