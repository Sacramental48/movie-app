<script setup>
import { useSearchMovie } from '../store/getSearchMovie'
import { ref, onMounted, watch } from 'vue'

import DiologWindow from './UI/DialogWindow.vue';

import TheSearch from './UI/TheSearch.vue'

const searchMovie = useSearchMovie();
const movieItem = ref('')
const visibleInput = ref(false);

function searchMovieFunc() {
    movieApp.setSearchMovie(movieItem.value);
}

const navigationLinks = ref([
    {name: 'Movies', path: '/movies'}, 
    {name: 'TV-Show', path: '/tv-show'},
]);
</script>

<template>
    <div class="flex justify-between top-0 sticky bg-white z-10 gap-6">
        <div class="flex justify-between items-center w-full">
            <div class="flex items-center gap-2">
                <img src="../assets/img/logo/logo.png" alt="logo" class="w-9">
                <p class="text-xl">MovieApp</p>
            </div>
            <div class="flex gap-4">
                <div v-for="item in navigationLinks" :key="item" >
                    <router-link :to="item.path">
                        <div class="flex items-center gap-2 li-style">
                            <component class="flex items-center justify-center h-6 w-6" :is="item.icon" />
                            <p class="xs:text-xl text-sm">{{item.name}}</p>
                        </div>
                    </router-link>
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