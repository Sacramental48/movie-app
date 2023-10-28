<script setup>
import { useRouter } from 'vue-router'

const router = useRouter();
</script>

<template>
    <div class="flex justify-center items-center relative h-screen">
        <h1 class="md:text-[28rem] sm:text-[18rem] text-[10rem] dark:text-dim-gray/10 text-dim-dark-gray/10 font-bold">404</h1>
        <div class="flex flex-col items-center gap-1 absolute text-justify px-10">
            <h2 class="dark:text-dim-white text-dim-dark-gray md:text-5xl text-[28px]">Page not found</h2>
            <p class="dark:text-dim-gray text-dim-dark-gray/80 text-center md:text-base text-xs">Your page was not found, return to the page by pressing the "return to Home" button.</p>
            <button class="px-8 py-2 md:text-base border dark:border-dim-gray border-dim-dark-gray dark:bg-dim-dark-gray/70 dark:text-dim-white rounded-lg" @click="router.push('/')">Return to Home</button>
        </div>
    </div>
</template>