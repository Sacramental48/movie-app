<script setup>
import { ref, onBeforeUnmount } from 'vue'
import {useRoute} from 'vue-router'
const route = useRoute();
const props = defineProps({
    item: {
        type: Object
    },
    media: {
        type: String
    }
})

const scrollTop = ref(0);

const rememberScrollPosition = () => {
    scrollTop.value = window.scrollY;
};

onBeforeUnmount(() => {
    window.scrollTo(0, scrollTop.value);
});

const notFound = new URL('../assets/img/notFound.jpg', import.meta.url);
</script>

<template>
        <!-- <router-link :to="`/${media}/card/${props.item.id}`" @click="rememberScrollPosition"> -->
        <div class="flex flex-col">
            <img :src="props.item.poster_path ? `https://image.tmdb.org/t/p/original/${props.item.poster_path}`  : `${notFound}`" alt="img" class="hover:bg-black hover:opacity-75 transition easy-in-out duration-150"/>
            <p class="text-xl">
                {{props.item.original_title || props.item.original_name}}
            </p>
         </div>
        <!-- </router-link> -->
</template>