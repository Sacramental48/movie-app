<script setup>
import { ref, watch, onMounted, computed, onBeforeUnmount } from 'vue';
import { useTVShow } from '@/store/getTVShow';
import { useMovieApp } from '../../store/getMovieApp';

const storeTvShow = useTVShow();
const storeMovieApp = useMovieApp();
const isOpenDropDownMenu = ref(false);
const dropDownMenu = ref(null);
const selectSort = ref('');

const props = defineProps({
    data: {
        type: Object
    }
});

const closeDropDownMenu = (event) => {
    if (isOpenDropDownMenu.value) {
        if (!dropDownMenu.value.contains(event.target)) {
            isOpenDropDownMenu.value = false;
        }
    }
};

const toggleDropDownMenu = (event) => {
    isOpenDropDownMenu.value = !isOpenDropDownMenu.value;
};

const getValueFromSortSection = function(value) {
    selectSort.value = value;
    isOpenDropDownMenu.value = false;
};

const allOptionName = ref([
    {id: 1, value: 'popularity.desc', name: 'Popularity Descending',},
    {id: 2, value: 'popularity.asc', name: 'Popularity Ascending',},
    {id: 3, value: 'vote_count.desc', name: 'Rating Descending',},
    {id: 4, value: 'vote_count.asc', name: 'Rating Ascending',},
    {id: 5, value: 'primary_release_date.desc', name: 'Release Date Descending',},
    {id: 6, value: 'primary_release_date.asc', name: 'Release Date Ascending',},
]);

watch(selectSort, async value => {
    if(props.data.$id === 'movie') {
        sessionStorage.setItem('sortingMovie', value)
        storeMovieApp.$reset();
        await storeMovieApp.getMovieData();
    }
    if (props.data.$id === 'TVShow') {
        sessionStorage.setItem('sortingTVShow', value)
        storeTvShow.$reset();
        await storeTvShow.getTVShowData();
    }
});

onMounted(() => {
    window.addEventListener('click', closeDropDownMenu);
});

onBeforeUnmount(() => {
    window.removeEventListener('click', closeDropDownMenu);
});
</script>

<template>
    <div class="flex flex-col cursor-pointer relative select-none" ref="dropDownMenu">
        <div class="flex items-center gap-10 border px-4 dark:border-dim-semi-dark-gray border-dim-gray py-1 rounded-2xl" @click.stop="toggleDropDownMenu">
            <p class="xs:block hidden text-black dark:text-dim-white">Select your option: </p>
            <font-awesome-icon v-if="isOpenDropDownMenu" :icon="['fas', 'chevron-up']" class="dark:text-dim-white text-dim-dark-gray" />
            <font-awesome-icon v-else :icon="['fas', 'chevron-up']" rotation=180 class="dark:text-dim-white text-dim-dark-gray" />
        </div>
        <ul v-if="isOpenDropDownMenu" class="absolute w-[232px] right-0 top-9 z-10 dark:bg-dim-dark-gray bg-gray-200 border-x border-t dark:border-dim-semi-dark-gray border-dim-gray rounded-xl overflow-hidden">
            <li v-for="item in allOptionName" :key="item.id" :value="item.id" class="border-b dark:border-dim-semi-dark-gray border-dim-gray dark:text-dim-white text-dim-dark-gray px-2 py-1 hover:bg-dim-black-blur/20" @click="getValueFromSortSection(item.value)">{{item.name}}</li>
        </ul>
    </div>
</template>