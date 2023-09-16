<script setup>
import { useAllTrending } from '@/store/getAllTrending'
import { onMounted, ref } from 'vue'
import { useTopRatedMovie } from '@/store/getTopRatedMovie'
import { useTopRatedSerials } from '@/store/getTopRatedSerials'

import Slider from '@/components/SliderCarousel/Slider.vue'
import Spinner from '@/components/UI/Spinner.vue'

const storeTrending = useAllTrending();
const storeTopMovie = useTopRatedMovie();
const storeTopSerials = useTopRatedSerials();

onMounted( async() => {
    await storeTrending.getAllTrendingList();
    await storeTopMovie.getTopRated();
    await storeTopSerials.getTopRated();

    console.log(storeTrending.data);
    console.log(storeTopMovie.data);
    console.log(storeTopSerials.data);
})

</script>

<template>
    <div class="flex flex-col container">
        <Spinner v-if="storeTrending.data.length === 0 && storeTopMovie.data.length === 0 && storeTopSerials.data.length === 0"/>
        <div class="flex flex-col" v-else>
            <div class="flex flex-col items-center mb-24">
                <h1 class="xs:text-7xl text-4xl text-dim-white mb-2">Welcome</h1>
                <p class="xs:text-xl text-base mb-10 text-dim-gray text-center">Millions of movies and TV shows. Сhoose your favourite right now.</p>
                <input type="text" class="w-full max-w-screen-sm text-lg rounded-full py-2 pl-4" placeholder="enter">
            </div>
            <div class="flex flex-col gap-14">
                <div>
                    <h3 class="text-2xl text-dim-white mb-4">Weekly Trends</h3>
                    <Slider :getDataFromStores="storeTrending.data"></Slider>
                </div>
                <div>
                    <h3 class="text-2xl text-dim-white mb-4">Top Rated of Movie</h3>
                    <Slider :getDataFromStores="storeTopMovie.data" :media="'movie'"></Slider>
                </div>
                <div>
                    <h3 class="text-2xl text-dim-white mb-4">Top Rated of Serials</h3>
                    <Slider :getDataFromStores="storeTopSerials.data" :media="'tv'"></Slider>
                </div>
            </div>
        </div>
    </div>
</template>