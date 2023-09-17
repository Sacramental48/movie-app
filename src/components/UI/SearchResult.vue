<script setup>
import { onMounted, onUnmounted} from 'vue';
const props = defineProps({
    data: {
        type: Object,
        required: true,
    }
})
const findMatches = (item) => {
    return item.original_title !== item.title || item.original_name !== item.name
};
const notFound = new URL('@/assets/img/noPictureAvailable.jpg', import.meta.url);

</script>

<template>
    <div class="flex flex-col gap-2 w-full border dark:bg-dim-dark-gray/90 dark:border-dim-gray rounded-xl py-1 px-2 absolute top-12 left-0 z-10">
        <div class="flex flex-col gap-4 overflow-y-auto max-h-[600px]">
            <div class="flex gap-4" v-for="item in props.data" :key="item.id">
                <img class="w-full h-full max-w-[60px] rounded-lg" :src="item.poster_path !== null && item.profile_path !== null ? `https://image.tmdb.org/t/p/original/${item.poster_path || item.profile_path}` : `${notFound}`" alt="">
                <div class="flex flex-col py-2">
                    <p class="dark:text-dim-white">{{item.title || item.name}}</p>
                    <p class="dark:text-dim-gray" v-if="findMatches(item)">{{item.original_title || item.original_name}}</p>
                </div>
            </div>
        </div>
    </div>
</template>