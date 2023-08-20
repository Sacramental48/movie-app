<script setup>
import { ref } from 'vue'

import SideBarLeft from './components/SideBar/Left.vue'
import Main from './components/TheMain.vue'

const darkMode = ref(false);
</script>

<template>
    <div :class="{'dark': darkMode}">
        <div class="bg:white dark:bg-slate-600">
            <div class="flex">
                <SideBarLeft></SideBarLeft>
                <div class="flex flex-col w-full px-3 mx-auto">
                    <Main></Main>
                </div>
            </div>
        </div>
    </div>
</template>