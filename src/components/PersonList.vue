<script setup>
import Slider from '@/components/SliderCarousel/Slider.vue'
const props = defineProps({
    cast: {
        type: Object,
        required: true,
    },
})

</script>

<template>
    <div class="flex flex-col z-10 container px-0 mt-20">
        <h2 class="text-2xl dark:text-dim-white mb-4">Cast</h2>
        <Slider :getDataFromStores="props.cast" />
    </div>
</template>