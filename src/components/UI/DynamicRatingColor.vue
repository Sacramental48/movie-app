<script setup>
import { ref, computed } from 'vue';
import "vue3-circle-progress/dist/circle-progress.css";
import CircleProgress from "vue3-circle-progress";

const props = defineProps({
    rating: {
        type: [Number, String],
        required: true,
    }
});

const changeRating = computed(() => {
    return props.rating * 10
});

const changeColor = computed(() => {
    if(props.rating >= 7 && props.rating <= 10) {
        return '#00AB00';
    };

    if(props.rating >= 5 && props.rating <= 6.9) {
        return '#ffff00';
    };

    if(props.rating >= 0 && props.rating <= 4.9) {
        return '#EE0303';
    };
});
</script>

<template>
    <div class="flex justify-center items-center text-3xl border rounded-full">
        <circle-progress :percent="changeRating"
            :size="60"
            :border-width="7"
            :border-bg-width="7"
            :is-gradient="true"
            :fill-color="changeColor"
            :gradient="{
                angle: 90,
                startColor: changeColor,
                stopColor: changeColor
            }"
        />
        <p class="text-md font-bold absolute text-dim-white text-xl/3">{{ props.rating }}</p>
    </div>
</template>