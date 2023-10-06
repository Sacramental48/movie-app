<script setup>
import { useSearchResult } from '@/store/getSearchResult';
import { ref, onMounted, watch, onBeforeUnmount, onUnmounted } from 'vue';
import { useMovieApp } from '@/store/getMovieApp';
import { useTVShow } from '@/store/getTVShow';
import { useRouter } from 'vue-router';

import ImageSearch from '@/components/Images/ImageSearch.vue';
import ImageLogo from '@/components/Images/ImageLogo.vue';
import Hamburger from './UI/HamburderMenu.vue';
import TheSearch from './UI/TheSearch.vue';

const storeMovieApp = useMovieApp();
const storeTvShow = useTVShow();
const storeSearchResult = useSearchResult();
const movieItem = ref('');
const isVisibleInput = ref(false);
const router = useRouter();
const headerRef = ref(null);
const activeTham = ref(null);

onMounted(() => {
    window.addEventListener('scroll', onScroll);
    window.addEventListener('wheel', handleMouseWheel);
    window.addEventListener('click', closeMenu);
});

function searchMovieFunc() {
    movieApp.setSearchMovie(movieItem.value);
};

function changeVisibleValue() {
    isVisibleInput.value = !isVisibleInput.value;
    console.log(isVisibleInput.value);
};

function getCurrentValueFromHamburgerTham(value) {
    activeTham.value = value;
};

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
};

const onScroll = () => {
        const pageYOffset = window.pageYOffset;
        const headerClassList = headerRef.value.classList;

        if (pageYOffset > 200 && hasValue(headerClassList, 'animate-header-down') === false && !activeTham.value && !isVisibleInput.value) {
            headerClassList.add('animate-header-up');
        } else if(pageYOffset < 200 && hasValue(headerClassList, 'animate-header-up')) {
            headerClassList.remove('animate-header-up');
            headerClassList.add('animate-header-down');
        } else {
            return;
        }
};

const handleMouseWheel = (event) => {
    let delta = event.deltaY;
    const pageYOffset = window.pageYOffset;
    const headerClassList = headerRef.value.classList;

    if (delta < 0 && hasValue(headerClassList, 'animate-header-up')) {
        headerClassList.remove('animate-header-up');
        headerClassList.add('animate-header-down');
    } else if(delta > 0 && hasValue(headerClassList, 'animate-header-down') && pageYOffset > 200 && !activeTham.value && !isVisibleInput.value) {
        headerClassList.remove('animate-header-down');
        headerClassList.add('animate-header-up');
    } else { 
        return;
    }
};

const closeMenu = (event) => {
    if(isVisibleInput.value && event.target.tagName !== 'INPUT' && event.target.tagName !== 'svg') {
        isVisibleInput.value = false;
        movieItem.value = '';
    }
};

onBeforeUnmount(() => {
    window.removeEventListener('click', closeMenu);
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('wheel', handleMouseWheel);
});
</script>

<template>
    <div class="flex justify-center h-[44px] dark:bg-dim-black-blur bg-white backdrop-blur-sm fixed z-30 w-full" ref="headerRef" :class="{'backdrop-blur-none': !activeTham, 'dark:bg-dim-dark-gray': activeTham}">
        <div class="flex gap-4 w-full container items-center">
            <div class="flex w-full justify-between">
                <div class="flex items-center gap-2 cursor-pointer" @click="switchToHome">
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
                <div class="flex relative justify-end h-full max-sm:mr-4">
                    <ImageSearch class="cursor-pointer" @click="changeVisibleValue" :isVisibleInput="isVisibleInput"></ImageSearch>
                </div>
                <TheSearch v-if="isVisibleInput" v-model="movieItem"></TheSearch>
                <Hamburger :links="navigationLinks" @isActiv-handle="getCurrentValueFromHamburgerTham"/>
            </div>
        </div>
    </div>
</template>