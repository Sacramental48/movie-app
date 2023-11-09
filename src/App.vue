<script setup>
import { ref, watch } from 'vue';
import TheHeader from './components/TheHeader.vue';
import TheFooter from './components/TheFooter.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const showFooter = ref(true);
const darkMode = ref(localStorage.getItem('darkMode') === 'false'  ? false : true);

const saveDarkModeToLocalStorage = () => {
    localStorage.setItem('darkMode', darkMode.value);
};

const toggleDarkMode = () => {
    darkMode.value = !darkMode.value;
    saveDarkModeToLocalStorage();
};

watch(route, (to) => {
     if (to.name === 'PageNotFound') {
        showFooter.value = false;
    } else {
        showFooter.value = true;
    }
})
</script>

<template>
    <div :class="{'dark': darkMode}">
        <div class="flex flex-col bg-dim-white dark:bg-dim-dark-gray min-h-screen">
            <TheHeader />
            <div class="flex-1 mb-14 pt-32">
                <router-view></router-view>
            </div>
            <div class="flex items-center justify-center fixed bg-dim-gray/60 bottom-4 right-4 cursor-pointer border border-dim-gray rounded-lg h-[42px] w-[42px] z-40" @click="toggleDarkMode">
                <font-awesome-icon v-if="darkMode" icon="fa-solid fa-sun" size="xl" style="color: #fff" />
                <font-awesome-icon v-if="!darkMode" icon="fa-solid fa-moon" size="xl" style="color: #fff" />
            </div>
            <TheFooter v-if="showFooter" />
        </div>
    </div>
</template>