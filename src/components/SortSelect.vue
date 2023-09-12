<script setup>
import { ref, watch, onMounted, computed } from 'vue'
import { useTVShow } from '@/store/getTVShow'
import { useMovieApp } from '../store/getMovieApp'

const storeTvShow = useTVShow();
const storeMovieApp = useMovieApp();

const props = defineProps({
    data: {
        type: Object
    }
})

const selectSort = ref('');

const allOptionName = ref([
    {id: 1, value: 'popularity.desc', name: 'Popularity Desc',},
    {id: 2, value: 'popularity.asc', name: 'Popularity Asc',},
    {id: 3, value: 'revenue.desc', name: 'Revenue Desc',},
    {id: 4, value: 'revenue.asc', name: 'Revenue Asc',},
    {id: 5, value: 'primary_release_date.desc', name: 'Release Date Desc',},
    {id: 6, value: 'primary_release_date.asc', name: 'Release Date Asc',},
    {id: 7, value: 'vote_average.desc', name: 'Vote average Desc',},
    {id: 8, value: 'vote_average.asc', name: 'Vote average Asc',},
    {id: 9, value: 'vote_count.desc', name: 'Vote count Desc',},
    {id: 10, value: 'vote_count.asc', name: 'Vote count Asc',},
]);

console.log(props.data);
watch(selectSort, value => {
    if(props.data.$id === 'movie') {
        props.data.sortBy = value
        storeMovieApp.getMovieData();
    } else if (props.data.$id === 'TVShow') {
        props.data.sortBy = value
        storeTvShow.getTVShowData();
    } else {
        return true
    }
    
});
</script>

<template>
    <select v-model="selectSort">
        <option disabled value="">Select your option: </option>
        <option v-for="item in allOptionName" :key="item.id" :value="item.value">{{item.name}}</option>
    </select>
</template>