<script setup>
import { ref } from 'vue'
import TheHeader from './components/TheHeader.vue'
const darkMode = ref(true);
</script>

<template>
    <div :class="{'dark': darkMode}">
        <div class="flex flex-col dark:bg-dim-dark-gray min-h-screen">
            <TheHeader />
            <div class="pb-20">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>