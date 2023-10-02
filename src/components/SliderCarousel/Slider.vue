<script setup>
import { ref, onMounted, computed } from 'vue'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import HomeMovieCards from '../HomeMovieCards.vue'
import CardWithVideos from '../CardWithVideos.vue'

import 'vue3-carousel/dist/carousel.css'

const props = defineProps({
    getDataFromStores: {
        type: Object,
        required: false
    },
    media: {
        type: String,
        required: false,
    },
    video: {
        type: Object,
        required: false,
    },
    title: {
        type: String,
        required: true,
    }
});

const settings = ref ({
    itemsToScroll: 1,
    snapAlign: 'start',
});

const imageBreakpoints = ref({
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
});

const videoBreakpoints = ref({
    400: {
        itemsToShow: 1,
        itemsToScroll: 1,
        snapAlign: 'start',
    },
    785: {
        itemsToShow: 2,
        itemsToScroll: 2,
        snapAlign: 'start',
    },
    990: {
        itemsToShow: 3,
        itemsToScroll: 3,
        snapAlign: 'start',
    },
});
</script>

<template>
    <div class="flex flex-col container px-0">
        <h2 class="text-2xl dark:text-dim-white mb-4">{{props.title}}</h2>
        <Carousel v-bind="settings" :breakpoints="imageBreakpoints" v-if="props.getDataFromStores">
            <Slide v-for="item in props.getDataFromStores" :key="item.id">
                <div class="pr-4 overflow-hidden">
                    <HomeMovieCards :item="item" :media="props.media" />
                </div>
            </Slide>
        </Carousel>
        <Carousel v-bind="settings" :breakpoints="videoBreakpoints" v-if="props.video">
            <Slide v-for="item in props.video" :key="item.id">
                <CardWithVideos :video="item" />
            </Slide>
        </Carousel>
    </div>
</template>