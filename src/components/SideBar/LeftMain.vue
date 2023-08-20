<script setup>
import { shallowRef } from 'vue'
import {useRouter} from 'vue-router'
import HomeIcon from "@/assets/img/sidebarIcons/home.vue";
import StarIcon from "@/assets/img/sidebarIcons/favorites.vue";
import LogoutIcon from "@/assets/img/sidebarIcons/logout.vue";

const router = useRouter();

const getIconFromHeroIcons = shallowRef([
    {icon: HomeIcon , name: 'Movies', path: '/movies'}, 
    {icon: StarIcon , name: 'Favorites', path: '/movies'}, 
    {icon: LogoutIcon, name: 'Logout', path: '/movies'}, 
]);
</script>

<template>
    <div class="flex flex-col w-full">
        <p class="text-sm text-gray-400">Main</p>
        <div v-for="item in getIconFromHeroIcons" :key="item" >
            <router-link :to="item.path">
                <div class="flex items-center gap-2 li-style">
                    <component class="flex items-center justify-center h-6 w-6" :is="item.icon" />
                    <p class="xs:text-xl text-sm">{{item.name}}</p>
                </div>
            </router-link>
        </div>
    </div>
</template>