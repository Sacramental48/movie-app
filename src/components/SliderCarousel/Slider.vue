<script setup>
import { ref, onMounted, computed } from 'vue'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
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
})
</script>

<template>
    <div class="flex flex-col">
        <Carousel v-bind="settings" :breakpoints="breakpoints">
            <Slide v-for="item in props.getDataFromStores" :key="item.id">
                <div class="pr-4 overflow-hidden">
                    <HomeMovieCards :item="item" :media="props.media" />
                </div>
            </Slide>
        </Carousel>
    </div>
</template>