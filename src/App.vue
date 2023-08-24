<script setup>
import { ref } from 'vue'

import SideBarLeft from './components/SideBar/Left.vue'
import Main from './components/TheMainContent.vue'

const darkMode = ref(false);
</script>

<template>
    <div :class="{'dark': darkMode}">
        <div class="bg:white dark:bg-slate-600">
            <div class="flex">
                <!-- <SideBarLeft></SideBarLeft> -->
                <div class="flex flex-col w-full px-3 mx-auto lg:px-10 sm:px-6 lg:max-w-7xl">
                    <Main></Main>
                </div>
            </div>
        </div>
    </div>
</template>