<script setup>
import { ref } from 'vue'
import TheHeader from './components/TheHeader.vue'
const darkMode = ref(true);
</script>

<template>
    <div :class="{'dark': darkMode}">
        <div class="flex flex-col bg:white dark:bg-gradient-to-t from-dim-semi-dark-gray to-dim-dark-gray min-h-screen">
            <TheHeader />
            <div class="pt-32 pb-20">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>