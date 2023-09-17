<script setup>
import { useSearchMovie } from '../store/getSearchMovie';
import { ref, onMounted, watch, onBeforeUnmount } from 'vue';
import ImageLogo from '@/components/Images/ImageLogo.vue';
import ImageSearch from '@/components/Images/ImageSearch.vue';

import DiologWindow from './UI/DialogWindow.vue';
import Hamburger from './UI/HamburderMenu.vue';
import TheSearch from './UI/TheSearch.vue';
import { useMovieApp } from '../store/getMovieApp';
import { useTVShow } from '../store/getTVShow';
import { useRouter } from 'vue-router';

const storeMovieApp = useMovieApp();
const storeTvShow = useTVShow();
const searchMovie = useSearchMovie();
const movieItem = ref('')
const isvisibleInput = ref(false);
const router = useRouter()
const headerRef = ref(null);
const activeTham = ref(null)

function searchMovieFunc() {
    movieApp.setSearchMovie(movieItem.value);
}

function getCurrentValueFromHamburgerTham(value) {
    activeTham.value = value;
}

const navigationLinks = ref([
    {name: 'Movie', path: `/movie/${storeMovieApp.currentPageMovie}`}, 
    {name: 'TV-Show', path: `/tv/${storeTvShow.currentPageSerials}`},
]);

const switchContent = async (path) => {
    sessionStorage.setItem('currentPageMovie', 1);
    sessionStorage.setItem('currentPageSerials', 1);
    await router.push({ path: `${path}` });
};

const switchToHome = async () => {
    sessionStorage.setItem('currentPageMovie', 1);
    sessionStorage.setItem('currentPageSerials', 1);
    await router.push({ path: '/' });
};

function hasValue(obj, value) {
    for (const key in obj) {
        if (obj.hasOwnProperty(key) && obj[key] === value) {
            return true;
        }
    }
    return false;
}


const onScroll = () => {
    if (window.pageYOffset > 200 && hasValue(headerRef.value.classList, 'animate-header-down') === false) {
        headerRef.value.classList.add('animate-header-up');
    } else if(window.pageYOffset < 200 && hasValue(headerRef.value.classList, 'animate-header-up')) {
        headerRef.value.classList.remove('animate-header-up');
        headerRef.value.classList.add('animate-header-down');
    } else {
        return;
    }
};

const handleMouseWheel = (event) => {
    let delta = event.deltaY;
    if (delta < 0 && hasValue(headerRef.value.classList, 'animate-header-up')) {
        headerRef.value.classList.remove('animate-header-up');
        headerRef.value.classList.add('animate-header-down');
    } else if(delta > 0 && hasValue(headerRef.value.classList, 'animate-header-down') && window.pageYOffset > 200 && !activeTham.value) {
        headerRef.value.classList.remove('animate-header-down');
        headerRef.value.classList.add('animate-header-up');
    } else { 
        return;
    }
}

onMounted(() => {
    window.addEventListener('scroll', onScroll);
    window.addEventListener('wheel', handleMouseWheel);
});

onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('wheel', handleMouseWheel);
});
</script>

<template>
    <div class="flex justify-center h-[44px] dark:bg-dim-black-blur bg-white fixed z-20 w-full" ref="headerRef">
        <div class="flex gap-4 w-full container items-center">
                <div class="flex w-full justify-between">
                    <div class="flex items-center gap-2 cursor-pointer" @click="switchToHome">
                        <!-- <img src="../assets/img/logo/logo.png" alt="logo" class="w-9"> -->
                        <ImageLogo></ImageLogo>
                        <p class="text-xl dark:text-dim-white text-black">MovieApp</p>
                    </div>
                    <div class="sm:flex hidden gap-4">
                        <div v-for="item in navigationLinks" :key="item" >
                            <div class="flex items-center gap-2 li-style" @click="switchContent(item.path)">
                                <p class="xs:text-xl text-sm dark:text-dim-white text-black">{{item.name}}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex h-full items-center">
                    <div class="flex justify-end h-full max-sm:mr-4">
                        <ImageSearch></ImageSearch>
                        <button class="h-8 xs:hidden flex" @click="isvisibleInput = true">
                            <!-- <img class="w-8 h-8" src="../assets/img/search.svg" alt=""> -->
                        </button>
                        <DiologWindow :show="isvisibleInput" @update:show="isvisibleInput = $event">
                            <TheSearch v-model="movieItem"></TheSearch>
                        </DiologWindow>
                    </div>
                <Hamburger :links="navigationLinks" @isActiv-handle="getCurrentValueFromHamburgerTham"/>
            </div>
        </div>
    </div>
</template>