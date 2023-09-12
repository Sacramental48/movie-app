<script setup>
import { ref, onMounted, computed } from 'vue'
import { useMovieDetailsById } from '../store/getMovieDetailsById'
import { useRoute } from 'vue-router'
import { formatDate } from '@/use/formatDate'
import { formatDuration } from '@/use/runtimeFormatted'
import { formattedRating } from '@/use/formattedRating'
import DynamicRating from '@/components/UI/DynamicRatingColor.vue'
import Spinner from '@/components/UI/Spinner.vue'

const route = useRoute();
const storeMovieDetails = useMovieDetailsById();
const getCurrentData = ref([])
const notFound = new URL('../assets/img/notFound.jpg', import.meta.url);

onMounted(async() => {
    storeMovieDetails.currentId = route.params.id
    await storeMovieDetails.getDetailsMovieById();
    console.log(storeMovieDetails.currentData.runtime);
    console.log(storeMovieDetails.currentData);
})

const formattedNumber = computed(() => {
    const number = storeMovieDetails.currentData.budget;
    if(number === 0) {
        return 'Unknown Budget'
    }
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
    <div class="flex justify-center items-center mt-10 container">
        <Spinner v-if="storeMovieDetails.currentData.length === 0"></Spinner>
        <div class="flex gap-8 sm:flex-row flex-col" v-else>
            <div class="flex justify-center xs:justify-start">
                <img :src="storeMovieDetails.currentData.poster_path ? `https://image.tmdb.org/t/p/original${storeMovieDetails.currentData.poster_path}`  : `${notFound}`" alt="image" class="xs:h-[600px] h-[400px] max-w-md rounded-lg">
            </div>
            <div class="flex flex-col">
                <div>
                    <h2 class="text-3xl text-dim-white">{{storeMovieDetails.currentData.original_title}}</h2>
                    <h4 class="text-gray-500">{{storeMovieDetails.currentData.tagline}}</h4>
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
                    <p class="border-b py-4 text-dim-white border-b-dim-gray border-opacity-20">Budget: <span class="text-gray-400 ml-2">{{formattedNumber}}</span></p>
                    <p class="border-b py-4 text-dim-white border-b-dim-gray border-opacity-20">Production companies: <span class="text-gray-400 ml-2" v-for="companies in storeMovieDetails.currentData.production_companies" :key="companies">{{companies.name}}</span></p>
                </div>
            </div>
        </div>
    </div>
</template>