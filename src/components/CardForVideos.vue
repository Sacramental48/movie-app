<script setup>
import { ref } from 'vue';

import { useIsOpenValue } from '@/store/getBooleanValue';
import ImagePlay from "@/components/Images/ImagePlay.vue";
import Window from "@/components/UI/DialogWindow.vue";

const storeIsOpenValue = useIsOpenValue();

const toggleDialog = (key) => {
    storeIsOpenValue.isOpen = !storeIsOpenValue.isOpen;
    storeIsOpenValue.videoKey = key;
};

const props = defineProps({
    video: {
        type: Object,
        required: true,
    },
});
</script>

<template>
    <div class="flex flex-col gap-2 w-full mr-4">
        <p class="dark:text-dim-white text-start text-lg line-clamp-1">{{video.name}}</p>
        <div class="relative cursor-pointer flex items-center justify-center" @click="toggleDialog(video.key)">
            <img class="rounded-lg w-full" :src="`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`">
            <ImagePlay position="absolute" />
        </div>
    </div>
</template>