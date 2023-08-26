<script setup>
import { ref, onMounted, computed, onBeforeUnmount } from 'vue'
import { useTVShowDetailsById } from '../store/getTVShowDetailsById'
import { useRoute } from 'vue-router'
import DynamicRating from '../components/UI/DynamicRatingColor.vue'
import Spinner from '../components/UI/Spinner.vue'

const route = useRoute();
const storeTVShowDetails = useTVShowDetailsById();
const getCurrentData = ref([])
const notFound = new URL('../assets/img/notFound.jpg', import.meta.url);
const scrollTop = ref(0);

onMounted(async() => {
    storeTVShowDetails.currentId = route.params.id
    await storeTVShowDetails.getDetailsMovieById();
    console.log(storeTVShowDetails.currentData);
})

const formattedRating = computed(() => {
    const rating = storeTVShowDetails.currentData.vote_average;
    return +rating.toFixed(1);
});

const formattedBudget = computed(() => {
    const number = storeTVShowDetails.currentData.budget;
    if(number === 0 || number === undefined) {
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
    const duration = storeTVShowDetails.currentData.episode_run_time[0];
    if(duration === 0 || duration === undefined) {
        return 'Unknown Runtime'
    }
    console.log(duration);
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

const formatDate = (inputDate) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const date = new Date(inputDate);
    return date.toLocaleDateString(undefined, options);
};
</script>

<template>
    <div class="flex justify-center items-center mt-10">
        <Spinner v-if="storeTVShowDetails.currentData.length === 0"></Spinner>
        <div class="flex gap-8 sm:flex-row flex-col w-full" v-else>
            <div class="flex justify-center sm:justify-start">
                <img :src="storeTVShowDetails.currentData.poster_path ? `https://image.tmdb.org/t/p/original/${storeTVShowDetails.currentData.poster_path}`  : `${notFound}`" alt="image" class="xs:h-[600px] h-[400px] min-w-lg rounded-lg">
            </div>
            <div class="flex flex-col">
                <div>
                    <h2 class="text-3xl">{{storeTVShowDetails.currentData.name}}</h2>
                    <div class="flex gap-3 text-sm text-gray-400 mt-2 flex-wrap">
                        <span v-for="item in storeTVShowDetails.currentData.genres" :key="item.id" class="border px-1">{{item.name}}</span>
                    </div>
                </div>
                <div class="flex items-center my-4 gap-4">
                    <DynamicRating :rating="formattedRating"></DynamicRating>
                    <span>watch trailer</span>
                </div>
                <div class="mb-10">
                    <h2 class="text-lg font-semibold">Overview</h2>
                    <p v-if="storeTVShowDetails.currentData.overview">{{storeTVShowDetails.currentData.overview}}</p>
                    <p v-else class="text-gray-400">Field not completed by author</p>
                </div>
                <div>
                    <div class="grid xs:grid-cols-2 grid-cols-1 sm:gap-6 gap-2 pb-4 border-b flex-wrap">
                        <p>Status: <span class="text-gray-400 ml-2 font-light">{{storeTVShowDetails.currentData.status}}</span></p>
                        <p>Runtime: <span class="text-gray-400 ml-2 font-light">{{runtimeFormatted}}</span></p>
                        <p>First episode: <span class="text-gray-400 ml-2 font-light">{{formatDate(storeTVShowDetails.currentData.first_air_date)}}</span></p>
                        <p>Last episode: <span class="text-gray-400 ml-2 font-light">{{formatDate(storeTVShowDetails.currentData.last_air_date)}}</span></p>
                    </div>
                    <p class="border-b py-4">Budget: <span class="text-gray-400 ml-2">{{formattedBudget}}</span></p>
                    <p class="border-b py-4">Director <span class="text-gray-400 ml-2">asdasds</span></p>
                    <p class="border-b py-4">Writer: <span class="text-gray-400 ml-2">some man</span></p>
                </div>
            </div>
        </div>
    </div>
</template>