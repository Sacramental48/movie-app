<script setup>
import { ref, onMounted, computed } from 'vue'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import HomeMovieCards from '../HomeMovieCards.vue'
import 'vue3-carousel/dist/carousel.css'

const props = defineProps({
    getDataFromStores: {
        type: Object,
        required: true
    },
    media: {
        type: String,
        required: false,
    }
})

const settings = ref ({
    itemsToScroll: 1,
    snapAlign: 'start',
})

const breakpoints = ref({
    400: {
        itemsToShow: 2,
        itemsToScroll: 2,
        snapAlign: 'start',
    },
    575: {
        itemsToShow: 3,
        itemsToScroll: 3,
        snapAlign: 'start',
    },
    785: {
        itemsToShow: 4,
        itemsToScroll: 4,
        snapAlign: 'start',
    },
    990: {
        itemsToShow: 5,
        itemsToScroll: 5,
        snapAlign: 'start',
    },
    1200: {
        itemsToShow: 6,
        itemsToScroll: 6,
        snapAlign: 'start',
    },
})
</script>

<template>
    <div class="flex flex-col">
        <Carousel v-bind="settings" :breakpoints="breakpoints">
                <Slide v-for="item in props.getDataFromStores" :key="item.id">
                        <HomeMovieCards :item="item" :media="props.media"/>
                </Slide>
        </Carousel>
    </div>
</template>