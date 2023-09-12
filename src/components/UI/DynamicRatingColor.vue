<script setup>
import { ref, computed } from 'vue'
import "vue3-circle-progress/dist/circle-progress.css";
import CircleProgress from "vue3-circle-progress";

const props = defineProps({
    rating: {
        type: Number,
        required: true,
    }
})

const changeRating = computed(() => {
    console.log(props.rating);
    return props.rating * 10
})

</script>

<template>
    <div class="flex justify-center items-center text-3xl border rounded-full">
        <!-- <span>{{ rating }}</span>  -->
        <circle-progress :percent="changeRating"
        :size="60"
        :border-width="4"
        :border-bg-width="6"
        :is-gradient="true"
        :gradient="{
            angle: 90,
            startColor: '#ff0000',
            stopColor: '#ffff00'
        }"
        />
        <p class="text-md font-bold absolute text-dim-white text-xl/3">{{props.rating}}</p>
    </div>
</template>