<script setup>
import SideBarMain from './LeftMain.vue'
import SideBarGenres from './GenresComponent.vue'
import LogoutIcon from "@/assets/img/sidebarIcons/logout.vue";
</script>

<template>
    <div class="flex h-screen flex-col border-r items-start top-0 sticky sm:px-6 px-2">
        <div class="flex items-center h-20 py-2 gap-6">
            <div>
                <p>Gasim</p>
                <p><span class="text-lime-500">0</span>Online</p>
            </div>
            <div class="ml-auto hidden lg:block">
                <component :is="LogoutIcon" />
            </div>
        </div>
        <div class="sm:w-40 w-full">
            <SideBarMain />
        </div>
    </div>
</template>