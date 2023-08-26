<script setup>
import { useSearchMovie } from '../store/getSearchMovie'
import { ref, onMounted, watch } from 'vue'

import DiologWindow from './UI/DialogWindow.vue';
import Hamburger from './UI/HamburderMenu.vue'
import TheSearch from './UI/TheSearch.vue'
import { useMovieApp } from '../store/getMovieApp'
import { useTVShow } from '../store/getTVShow'
import { useRouter } from 'vue-router'

const movieStore = useMovieApp();
const tvShow = useTVShow();
const searchMovie = useSearchMovie();
const movieItem = ref('')
const visibleInput = ref(false);
const router = useRouter()
function searchMovieFunc() {
    movieApp.setSearchMovie(movieItem.value);
}

const navigationLinks = ref([
    {name: 'Movies', path: `/movies/${movieStore.currentPageMovie}`}, 
    {name: 'TV-Show', path: `/tv-show/${tvShow.currentPageSerials}`},
]);

const switchContent = async (path) => {
    sessionStorage.setItem('currentPageMovie', 1);
    sessionStorage.setItem('currentPageSerials', 1);
    await router.push({ path: `${path}` });
    location.reload()
};

const switchToHome = async () => {
    sessionStorage.setItem('currentPageMovie', 1);
    sessionStorage.setItem('currentPageSerials', 1);
    await router.push({ path: '/home' });
    location.reload()
}
</script>

<template>
    <div class="flex justify-between top-0 sticky bg-white z-10 gap-6">
        <div class="flex w-full items-center">
            <Hamburger :links="navigationLinks" />
            <div class="w-full sm:flex hidden justify-between">
                <div class="flex items-center gap-2 cursor-pointer" @click="switchToHome">
                    <img src="../assets/img/logo/logo.png" alt="logo" class="w-9">
                    <p class="text-xl">MovieApp</p>
                </div>
                <div class="flex gap-4">
                    <div v-for="item in navigationLinks" :key="item" >
                        <div class="flex items-center gap-2 li-style" @click="switchContent(item.path)">
                            <p class="xs:text-xl text-sm">{{item.name}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex justify-end items-center h-20">
            <div class="flex justify-end h-16 items-center">
                <TheSearch :someFunction="searchMovieFunc" v-model="movieItem" class="xs:flex hidden"></TheSearch>

                <button class="h-8 xs:hidden flex" @click="visibleInput = true">
                    <img class="w-8 h-8" src="../assets/img/search.svg" alt="">
                </button>

                <DiologWindow :show="visibleInput" @update:show="visibleInput = $event">
                    <TheSearch v-model="movieItem"></TheSearch>
                </DiologWindow>
            </div>
        </div>
    </div>
</template>