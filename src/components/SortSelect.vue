<script setup>
import { ref, watch, onMounted, computed } from 'vue'
import { useMovieApp } from '../store/getMovieApp'

const selectSortByMovies = ref(localStorage.getItem('selectedSort') || '');
const movieStore = useMovieApp();

const allOptionName = ref([
    {id: 1, value: 'popularity.asc', name: 'Popularity Asc',},
    {id: 2, value: 'popularity.desc', name: 'Popularity Desc',},
    {id: 3, value: 'revenue.asc', name: 'Revenue Asc',},
    {id: 4, value: 'revenue.desc', name: 'Revenue Desc',},
    {id: 5, value: 'primary_release_date.asc', name: 'Release Date Asc',},
    {id: 6, value: 'primary_release_date.desc', name: 'Release Date Desc',},
    {id: 7, value: 'vote_average.asc', name: 'Vote average Asc',},
    {id: 8, value: 'vote_average.desc', name: 'Vote average Desc',},
    {id: 9, value: 'vote_count.asc', name: 'Vote count Asc',},
    {id: 10, value: 'vote_count.desc', name: 'Vote count Desc',},
]);

watch(selectSortByMovies, value => {
    localStorage.setItem('selectedSort', value);
    movieStore.setSortMovie(value);
    location.reload();
});
</script>

<template>
    <div>
        <select v-model="selectSortByMovies">
            <option disabled value="">Select your option: </option>
            <option v-for="item in allOptionName" :key="item.id" :value="item.value">{{item.name}}</option>
        </select>
    </div>
</template>