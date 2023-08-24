<script setup>
import { ref, onMounted, computed } from 'vue'
import { useMovieDetailsById } from '../store/getMovieDetailsById'
import { useRoute } from 'vue-router'
import DynamicRating from '../components/UI/DynamicRatingColor.vue'
import Spinner from '../components/UI/Spinner.vue'

const route = useRoute();
const storeMovieDetails = useMovieDetailsById();
const getCurrentData = ref([])

onMounted(async() => {
    storeMovieDetails.currentId = route.params.id
    await storeMovieDetails.getDetailsMovieById();
    console.log(storeMovieDetails.currentData);
})

const formattedRating = computed(() => {
    const rating = storeMovieDetails.currentData.vote_average;
    return +rating.toFixed(1);
});

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


const runtimeFormatted = computed(() => {
    const duration = storeMovieDetails.currentData.runtime;
    function formatDuration(minutes) {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;

        if (hours > 0 && mins > 0) {
            return `${hours}h ${mins}min`;
        } else if (hours > 0) {
            return `${hours}h`;
        } else {
            return `${mins}min`;
        }
    }
    return formatDuration(duration);
});
</script>

<template>
    <div class="mt-10">
        <Spinner v-if="storeMovieDetails.currentData.length === 0"></Spinner>
        <div class="flex gap-8" v-else>
            <div>
                <img :src="`https://image.tmdb.org/t/p/original/${storeMovieDetails.currentData.poster_path}`" alt="image" class="h-[600px] max-w-lg rounded-lg">
            </div>
            <div class="flex flex-col">
                <div>
                    <h2 class="text-3xl">{{storeMovieDetails.currentData.original_title}}</h2>
                    <div class="flex gap-3 text-sm text-gray-400 mt-2">
                        <span v-for="item in storeMovieDetails.currentData.genres" :key="item.id" class="border px-1">{{item.name}}</span>
                    </div>
                </div>
                <div class="flex items-center my-4 gap-4">
                    <DynamicRating :rating="formattedRating"></DynamicRating>
                    <span>watch trailer</span>
                </div>
                <div>
                    <h2>Overview</h2>
                    <p>{{storeMovieDetails.currentData.overview}}</p>
                </div>
                <div>
                    <div>
                        <p>status: <span>{{storeMovieDetails.currentData.status}}</span></p>
                        <p>released date: <span>{{storeMovieDetails.currentData.release_date}}</span></p>
                        <p>runtime: <span>{{runtimeFormatted}}</span></p>
                        <p>Budget: <span>{{formattedNumber}}</span></p>
                    </div>
                    <p>director <span>asdasds</span></p>
                    <p>writer: <span>some man</span></p>
                </div>
            </div>
        </div>
    </div>
</template>