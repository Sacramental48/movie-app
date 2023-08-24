<script setup>
import { ref } from 'vue'
import {useRoute} from 'vue-router'
const route = useRoute();
const props = defineProps({
    item: {
        type: Object
    },
})

const notFoundImg = new URL('../assets/img/notFound.png', import.meta.url);
</script>

<template>
    <div class="flex flex-col">
        <router-link :to="`/movies/${props.item.id}`">
        <!-- <router-link :to="{name: 'movie', params: {id: props.item.id}}"> -->
            <img :src="props.item.poster_path ? `https://image.tmdb.org/t/p/original/${props.item.poster_path}`  : `${notFoundImg}`" alt="img" class="hover:bg-black hover:opacity-75 transition easy-in-out duration-150"/>
        </router-link>
        <p class="text-xl">
            {{props.item.original_title || props.item.original_name}}
        </p>
    </div>
</template>