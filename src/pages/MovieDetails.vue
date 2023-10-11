<script setup>
import { ref, onMounted, computed, onUnmounted } from 'vue'
import { useMovieVideo } from '@/store/getVideoLineForMovie'
import { useMovieDetailsById } from '@/store/getMovieDetailsById'
import { useMovieCredits } from '@/store/getMovieCredits'
import { useRoute } from 'vue-router'
import { formatDate } from '@/use/formatDate'
import { formatDuration } from '@/use/runtimeFormatted'
import { formattedRating } from '@/use/formattedRating'
import { useIsOpenValue } from '@/store/getBooleanValue'

import ImagePlay from "@/components/Images/ImagePlay.vue";
import Window from "@/components/UI/DialogWindow.vue";
import Slider from '@/components/SliderCarousel/Slider.vue'
import DynamicRating from '@/components/UI/DynamicRatingColor.vue'
import Spinner from '@/components/UI/Spinner.vue'

const route = useRoute();
const storeMovieVideo = useMovieVideo();
const storeMovieDetails = useMovieDetailsById();
const storeMovieCredits = useMovieCredits();
const notFound = new URL('@/assets/img/noPictureAvailable.jpg', import.meta.url);
const storeIsOpenValue = useIsOpenValue();

onMounted(async() => {
    storeMovieDetails.currentId = route.params.id;
    storeMovieCredits.currentId = route.params.id;
    storeMovieVideo.currentId = route.params.id;
    await storeMovieDetails.getDetailsMovieById();
    await storeMovieCredits.getMovieCredits();
    await storeMovieVideo.getMovieVideo();
});

onUnmounted(() => {
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

const openTrailer = () => {
    storeIsOpenValue.isOpen = !storeIsOpenValue.isOpen;
    for(let item of storeMovieVideo.currentData) {
        if(item.type === 'Trailer') {
            storeIsOpenValue.videoKey = item.key;
        }
    }
};
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
        <Spinner v-if="storeMovieDetails.currentData.length === 0"></Spinner>
        <div class="flex flex-col sm:gap-16 gap-10 justify-center items-center container pt-32" v-else>
            <div class="flex gap-8 md:flex-row flex-col z-10">
                <div class="flex justify-center xs:justify-start">
                    <img v-lazy="{ 
                        src: `https://image.tmdb.org/t/p/original${storeMovieDetails.currentData.poster_path}`, delay: 300 }" 
                        lazy="loading"
                        class="md:h-[600px] max-md:w-full md:max-w-md aspect-[1/1.5] max-w-full rounded-lg"
                        v-if="storeMovieDetails.currentData.poster_path"
                    />
                    <img class="w-full rounded-lg" :src="notFound" alt="Not Found" v-else>
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
                        <div class="flex gap-2 justify-center items-center dark:text-dim-white text-xl hover: duration-300 cursor-pointer group" @click="openTrailer">
                            <ImagePlay />
                            <p class="group-hover:text-dim-hover-fuchsia duration-300">Trailer</p>
                        </div>
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
            <Slider :getDataFromStores="storeMovieCredits.dataCast" v-if="storeMovieCredits.dataCast.length !== 0" title="Cast" />
            <Slider :video="storeMovieVideo.currentData" v-if="storeMovieVideo.currentData.length !== 0" title="Video" />
            <Window :show="storeIsOpenValue.isOpen" maxHeight="70%" maxWidth="80%">
                <iframe 
                    class="rounded-lg w-full h-full" 
                    allowfullscreen
                    :src="`https://www.youtube.com/embed/${storeIsOpenValue.videoKey}?autoplay=1&iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1`">
                </iframe>
            </Window>
        </div>
    </div>
</template>