<script setup>
import { ref } from 'vue'
import MainLayout from './layouts/MainLayout.vue'

const darkMode = ref(false)
</script>

<template>
    <div :class="{'dark': darkMode}">
        <MainLayout />
    </div>
</template>