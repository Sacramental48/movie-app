<script setup>
import HomeMovieCards from '../components/HomeMovieCards.vue'
import PaginationPage from '../components/UI/PaginationPage.vue'
import { ref, onMounted, computed } from 'vue'
import { useMovieApp } from '../store/getMovieApp'
import { useMovieGenres } from '@/store/getMovieGeners'
import { useRoute } from 'vue-router'

const movieApp = useMovieApp();
const genresApp = useMovieGenres();

const currentPageCount = ref(0);
const route = useRoute();
console.log('params.genre at Genres.vue', route.params.genre);
console.log('params.genre at Genres.vue', route.params);
console.log('params.genre at Genres.vue', route);
onMounted(async() => {
    await movieApp.getMovieData();
    await genresApp.getMovieGenres();
    console.log(filteredMovies.value);
});


const currentGenreId = computed(() => {
    const pathGenre = route.path.split('/');
    const genreName = pathGenre[1];
    const selectedGenre = genresApp.genres.find(genre => genre.name.toLowerCase() === genreName.toLowerCase());
    return selectedGenre ? selectedGenre.id : null;
});


const filteredMovies = computed(() => {
    if (currentGenreId.value === null) {
        return movieApp.data;
    }
    return movieApp.data.filter(movie => movie.genre_ids.includes(currentGenreId.value));
});

</script>

<template>
    <div class="flex justify-center">
        <div v-if="filteredMovies" class="flex flex-col items-center xs:w-full w-[200px] mt-2"> 
            <div class="grid grid-cols-12 gap-4 justify-items-center">
                <div v-for="item in filteredMovies" :key="item.id" class="h-full gap-2 xl:col-span-2 md:col-span-4 xs:col-span-6 es:col-span-12 ">
                    <div>
                        <HomeMovieCards :item="item" />
                    </div>
                </div>
            </div>
            <PaginationPage />
        </div>
        <div v-else>Нет результата!</div>
    </div>
</template>