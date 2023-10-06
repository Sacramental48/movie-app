<script setup>
import { ref, onMounted, computed, onUnmounted } from 'vue';
import { useTVShowDetailsById } from '../store/getTVShowDetailsById';
import { useTvCredits } from '@/store/getTvCredits';
import { useTvVideo } from '@/store/getVideoLineForTv';
import { useRoute } from 'vue-router';
import { formatDate } from '@/use/formatDate';
import { formatDuration } from '@/use/runtimeFormatted';
import { formattedRating } from '@/use/formattedRating';
import { useIsOpenValue } from '@/store/getBooleanValue';

import Window from "@/components/UI/DialogWindow.vue";
import Slider from '@/components/SliderCarousel/Slider.vue';
import DynamicRating from '../components/UI/DynamicRatingColor.vue';
import Spinner from '../components/UI/Spinner.vue';

const route = useRoute();
const storeTVShowDetails = useTVShowDetailsById();
const storeTvVideo = useTvVideo();
const storeTvCredits = useTvCredits();
const getCurrentData = ref([]);
const notFound = new URL('../assets/img/noPictureAvailable.jpg', import.meta.url);
const storeIsOpenValue = useIsOpenValue();

onMounted(async() => {
    storeTVShowDetails.currentId = route.params.id;
    storeTvCredits.currentId = route.params.id;
    storeTvVideo.currentId = route.params.id;
    await storeTVShowDetails.getDetailsTvById();
    await storeTvCredits.getTvCredits();
    await storeTvVideo.getTvVideo();
    console.log(storeTVShowDetails.currentData);
});

onUnmounted(() => {
    storeTVShowDetails.$reset();
    storeTvCredits.$reset();
    storeTvVideo.$reset();
});

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
    <div class="relative z-10">
        <div class="w-full h-screen top-0 left-0 overflow-hidden absolute opacity-10 sm:block hidden">
            <img v-lazy="{ 
                src: `https://image.tmdb.org/t/p/original${storeTVShowDetails.currentData.backdrop_path}`, delay: 300 }" 
                lazy="loading"
                class="h-full w-full object-cover object-center"
                v-if="storeTVShowDetails.currentData.backdrop_path"
            />
            <div class="h-full w-full object-cover object-center dark:bg-dim-dark-gray" v-else></div>
            <div class="w-full h-[200px] dark:bg-gradient-to-t from-dim-dark-gray from-10% to-div-semi-dark-gray to-100% absolute bottom-0 left-0"></div>
        </div>
        <Spinner v-if="storeTVShowDetails.currentData.length === 0"></Spinner>
        <div class="flex flex-col sm:gap-16 gap-10 justify-center items-center container pt-32" v-else>
            <div class="flex gap-8 md:flex-row flex-col z-10">
                <div class="flex justify-center xs:justify-start">
                    <img v-lazy="{ 
                        src: `https://image.tmdb.org/t/p/original${storeTVShowDetails.currentData.poster_path}`, delay: 300 }" 
                        lazy="loading"
                        class="md:h-[600px] max-md:w-full md:max-w-md aspect-[1/1.5] max-w-full rounded-lg"
                        v-if="storeTVShowDetails.currentData.poster_path"
                    />
                    <img class="w-full rounded-lg" :src="notFound" alt="Not Found" v-else>
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
                        <div class="grid sm:grid-cols-2 grid-cols-1 sm:gap-6 gap-2 pb-4 text-dim-white border-b border-b-dim-gray border-opacity-20 flex-wrap">
                            <p>Status: <span class="text-gray-400 ml-2 font-light">{{storeTVShowDetails.currentData.status}}</span></p>
                            <p v-if="storeTVShowDetails.currentData.episode_run_time[0]">Runtime: <span class="text-gray-400 ml-2 font-light">{{formatDuration(storeTVShowDetails.currentData.episode_run_time[0])}}</span></p>
                            <p v-if="storeTVShowDetails.currentData.first_air_date">First episode: <span class="text-gray-400 ml-2 font-light">{{formatDate(storeTVShowDetails.currentData.first_air_date)}}</span></p>
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
                    </div>
                </div>
            </div>
            <Slider :getDataFromStores="storeTvCredits.dataCast" title="Cast" v-if="storeTvCredits.dataCast.length !== 0" />
            <Slider :video="storeTvVideo.currentData" title="Cast" v-if="storeTvCredits.dataCast.length !== 0" />
            <Window :show="storeIsOpenValue.isOpen">
                <iframe 
                    class="rounded-lg w-full h-full" 
                    allowfullscreen
                    :autoplay="true"
                    :src="`https://www.youtube.com/embed/${storeIsOpenValue.videoKey}?amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1`">
                </iframe>
            </Window>
        </div>
    </div>
</template>