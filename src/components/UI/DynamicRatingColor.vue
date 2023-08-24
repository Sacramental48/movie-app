<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
    rating: {
        type: Number,
        required: true,
    }
})

const borderStyle = computed(() => {
  const value = props.rating;
  const normalizedValue = Math.min(1, Math.max(0, (value - 0) / (10 - 0)));
  const borderPercentage = normalizedValue * 100;
  return `${borderPercentage}% solid black`;
});

const backgroundColor = computed(() => {
  const value = props.rating;
  const normalizedValue = Math.min(1, Math.max(0, (value - 0) / (10 - 0))); // Normalize value between 0 and 1
  const redness = (1 - normalizedValue) * 255; // Redder for values closer to 0
  const greenness = normalizedValue * 255; // Greener for values closer to 10
  return `rgb(${redness}, ${greenness}, 0)`;
});

</script>

<template>
    <div class="flex justify-center items-center text-3xl w-[80px] h-[80px] border rounded-full" :style="{border: backgroundColor}">
        <span>{{ rating }}</span>
    </div>
</template>