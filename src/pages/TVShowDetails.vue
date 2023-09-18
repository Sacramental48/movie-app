<script setup>
import { ref, onMounted, computed, onBeforeUnmount } from 'vue'
import { useTVShowDetailsById } from '../store/getTVShowDetailsById'
import { useTvCredits } from '@/store/getTvCredits'
import { useRoute } from 'vue-router'
import { formatDate } from '@/use/formatDate'
import { formatDuration } from '@/use/runtimeFormatted'
import { formattedRating } from '@/use/formattedRating'

import PersonList from '@/components/PersonList.vue'
import DynamicRating from '../components/UI/DynamicRatingColor.vue'
import Spinner from '../components/UI/Spinner.vue'

const route = useRoute();
const storeTVShowDetails = useTVShowDetailsById();
const storeTvCredits = useTvCredits();
const getCurrentData = ref([])
const notFound = new URL('../assets/img/notFound.jpg', import.meta.url);

onMounted(async() => {
    storeTVShowDetails.currentId = route.params.id
    storeTvCredits.currentId = route.params.id
    await storeTVShowDetails.getDetailsTvById();
    await storeTvCredits.getTvCredits();
    console.log(storeTVShowDetails.currentData);
})

const formattedBudget = computed(() => {
    const number = storeTVShowDetails.currentData.budget;

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
            <img class="w-full h-full object-cover object-center" :src="`https://image.tmdb.org/t/p/original${storeTVShowDetails.currentData.backdrop_path}`" alt="backdrop image">
            <div class="w-full h-[200px] dark:bg-gradient-to-t from-dim-dark-gray from-10% to-div-semi-dark-gray to-100% absolute bottom-0 left-0"></div>
        </div>
        <div class="flex flex-col justify-center items-center mt-10 container pt-32">
            <Spinner v-if="storeTVShowDetails.currentData.length === 0"></Spinner>
            <div class="flex gap-8 sm:flex-row flex-col w-full z-10" v-else>
                <div class="flex justify-center xs:justify-start">
                    <img :src="storeTVShowDetails.currentData.poster_path ? `https://image.tmdb.org/t/p/original${storeTVShowDetails.currentData.poster_path}`  : `${notFound}`" alt="image" class="xs:h-[600px] h-[400px] max-w-md rounded-lg">
                </div>
                <div class="flex flex-col">
                    <div>
                        <h2 class="text-4xl text-dim-white">{{storeTVShowDetails.currentData.name}}</h2>
                        <div class="flex gap-3 text-sm text-gray-400 mt-2 flex-wrap">
                            <span v-for="item in storeTVShowDetails.currentData.genres" :key="item.id" class="border px-1">{{item.name}}</span>
                        </div>
                    </div>
                    <div class="flex items-center my-8 gap-4">
                        <DynamicRating :rating="formattedRating(storeTVShowDetails.currentData.vote_average)"></DynamicRating>
                        <span>watch trailer</span>
                    </div>
                    <div class="mb-10">
                        <h2 class="text-lg font-semibold text-dim-white">Overview</h2>
                        <p class="text-dim-white" v-if="storeTVShowDetails.currentData.overview">{{storeTVShowDetails.currentData.overview}}</p>
                        <p v-else class="text-gray-400">Field not completed by author</p>
                    </div>
                    <div>
                        <div class="grid xs:grid-cols-2 grid-cols-1 sm:gap-6 gap-2 pb-4 text-dim-white border-b border-b-dim-gray border-opacity-20 flex-wrap">
                            <p>Status: <span class="text-gray-400 ml-2 font-light">{{storeTVShowDetails.currentData.status}}</span></p>
                            <p>Runtime: <span class="text-gray-400 ml-2 font-light">{{formatDuration(storeTVShowDetails.currentData.episode_run_time[0])}}</span></p>
                            <p>First episode: <span class="text-gray-400 ml-2 font-light">{{formatDate(storeTVShowDetails.currentData.first_air_date)}}</span></p>
                            <p>Last episode: <span class="text-gray-400 ml-2 font-light">{{formatDate(storeTVShowDetails.currentData.last_air_date)}}</span></p>
                        </div>
                        <p class="border-b py-4 text-dim-white border-b-dim-gray border-opacity-20" v-if="storeTVShowDetails.currentData.budget">Budget: 
                            <span class="text-gray-400 ml-2">
                                {{formattedBudget}}
                            </span>
                        </p>
                        <p class="border-b py-4 text-dim-white border-b-dim-gray border-opacity-20" v-if="storeTVShowDetails.currentData.created_by.length !== 0">
                            Developed by: 
                            <span class="text-gray-400 ml-2" v-for="director in storeTVShowDetails.currentData.created_by" :key="director">
                                {{director.name}}
                            </span>
                        </p>
                        <p class="border-b py-4 text-dim-white border-b-dim-gray border-opacity-20" v-if="storeTVShowDetails.currentData.production_companies.length !== 0">Production companies: <span class="text-gray-400 ml-2" v-for="companies in storeTVShowDetails.currentData.production_companies" :key="companies">{{companies.name}}</span></p>
                    </div>
                </div>
            </div>
            <PersonList :cast="storeTvCredits.dataCast"/>
        </div>
    </div>
</template>