<script setup>
import { ref, watch, onMounted, computed } from 'vue';
import { useTVShow } from '@/store/getTVShow';
import { useMovieApp } from '../../store/getMovieApp';

const storeTvShow = useTVShow();
const storeMovieApp = useMovieApp();
const isOpen = ref(false);
const props = defineProps({
    data: {
        type: Object
    }
});

const selectSort = ref('');

const getValueFromSortSection = function(value) {
    selectSort.value = value;
    isOpen.value = false;
};

const allOptionName = ref([
    {id: 1, value: 'popularity.desc', name: 'Popularity Descending',},
    {id: 2, value: 'popularity.asc', name: 'Popularity Ascending',},
    {id: 3, value: 'vote_count.desc', name: 'Rating Descending',},
    {id: 4, value: 'vote_count.asc', name: 'Rating Ascending',},
    {id: 5, value: 'primary_release_date.desc', name: 'Release Date Descending',},
    {id: 6, value: 'primary_release_date.asc', name: 'Release Date Ascending',},
]);

watch(selectSort, value => {
    if(props.data.$id === 'movie') {
        storeMovieApp.$reset();
        props.data.sortBy = value;
        storeMovieApp.getMovieData();
    }
    if (props.data.$id === 'TVShow') {
        storeTvShow.$reset();
        props.data.sortBy = value;
        storeTvShow.getTVShowData();
    }
});
</script>

<template>
    <div class="flex flex-col cursor-pointer relative select-none">
        <div class="flex gap-10 border px-4 dark:border-dim-semi-dark-gray py-1 rounded-2xl text-dim-white" @click="isOpen = !isOpen">
            <p class="xs:block hidden">Select your option: </p>
            <span v-if="isOpen"> <font-awesome-icon :icon="['fas', 'chevron-up']" class="dark:text-dim-white text-dim-dark-gray" /></span>
            <span v-else><font-awesome-icon :icon="['fas', 'chevron-up']" rotation=180 class="dark:text-dim-white text-dim-dark-gray" /></span>
        </div>
        <ul v-if="isOpen === true" class="absolute left-0 right-0 top-9 z-10 dark:bg-dim-dark-gray border-x border-t dark:border-dim-semi-dark-gray rounded-xl overflow-hidden">
            <li v-for="item in allOptionName" :key="item.id" :value="item.id" class="border-b dark:border-dim-semi-dark-gray text-dim-white px-2 py-1 hover:bg-dim-black-blur/20" @click="getValueFromSortSection(item.value)">{{item.name}}</li>
        </ul>
    </div>
</template>