<script setup>
const props = defineProps({
    title: {
        type: String,
        required: true,
    }
})

</script>

<template>
    <div class="flex flex-col container px-0">
        <h2 class="text-2xl dark:text-dim-white mb-4">{{props.title}}</h2>
        <slot />
    </div>
</template>