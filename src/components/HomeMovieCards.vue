<script setup>
import { ref } from 'vue'

const props = defineProps({
    item: {
        type: Object
    }
})
const notFoundImg = new URL('../assets/img/not-found.png', import.meta.url);
</script>

<template>
    <div class="flex flex-col h-full">
        <img :src="props.item.poster_path ? `https://image.tmdb.org/t/p/original/${props.item.poster_path}`  : `${notFoundImg}`" alt="img" class="h-full"/>
        <p class="text-xl">
            {{props.item.original_title}}
        </p>
    </div>
</template>