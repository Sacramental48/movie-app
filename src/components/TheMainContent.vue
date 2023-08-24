<script setup>
import {ref} from 'vue'
import TheHeader from './TheHeader.vue'
</script>

<template>
    <div>
        <TheHeader />
        <router-view></router-view>
    </div>
</template>