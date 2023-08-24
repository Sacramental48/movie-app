<script setup>
import { useRouter, useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import { useMovieGenres } from '@/store/getMovieGeners'
import { useMovieApp } from '../../store/getMovieApp';

const route = useRoute();
const router = useRouter();

const movieGenres = useMovieGenres();
const {data: movieData } = useMovieApp();

onMounted(async() => {
    await movieGenres.getMovieGenres();
    console.log(movieData);
})



</script>

<template>
    <div class="flex flex-col w-full">
        <p class="xs:px-5 xs:pt-4 px-1 pt-1 text-sm text-gray-400">Categories</p>
        <div v-for="item in movieGenres.genres" :key="item.id" >
            <router-link :to="{ name: 'genre-page', params: { genre: item.name, page: parseInt(movieData) } }">
                <div class="flex items-center gap-2 li-style">
                    <component class="hidden lg:block h-6 w-6" :is="Folder" />
                    <p class="xs:text-lg text-sm">{{ item.name }}</p>
                </div>
            </router-link>
        </div>
    </div>
</template>