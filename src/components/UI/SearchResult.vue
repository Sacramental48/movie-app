<script setup>
import { watch, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';

const showNotFoundMessage = ref(false);
const router = useRouter();
const route = useRoute();
const props = defineProps({
    data: {
        type: Object,
        required: true,
    },
    searchContent: {
        type: String,
        required: true,
    }
});

const openSelected = (id, media) => {
    router.push({path: `/${media}/card/${id}`})
};

const findMatches = (item) => {
    return item.original_title !== item.title || item.original_name !== item.name
};
const notFound = new URL('@/assets/img/noPictureAvailable.jpg', import.meta.url);
</script>

<template>
    <div class="flex flex-col gap-2 w-full border bg-dim-semi-dark-gray/70 dark:bg-dim-dark-gray/90 dark:border-dim-gray rounded-xl py-2 px-2 absolute top-12 left-0 z-10">
        <div class="flex flex-col gap-2 overflow-y-auto max-h-[600px] backdrop-blur-sm">
            <p class="dark:text-dim-bright text-xl p-2" v-if="props.data.length === 0 && props.searchContent">Results not found!</p>
            <div class="flex gap-4 cursor-pointer hover:bg-dim-black-blur/20" v-for="item in props.data" :key="item.id" @click="openSelected(item.id, item.media_type)">
                <img v-lazy="{ 
                    src: `https://image.tmdb.org/t/p/original${item.poster_path || item.profile_path}`, delay: 300 }" 
                    lazy="loading"
                    class="w-full h-full max-w-[80px] min-h-[60px] rounded-lg"
                    v-if="item.poster_path !== null && item.profile_path !== null"
                />
                <img class="w-full h-full max-w-[80px] min-h-[60px] rounded-lg" :src="notFound" alt="Not Found" v-else>
                <div class="flex flex-col py-2">
                    <p class="text-dim-bright dark:text-dim-white">{{item.title || item.name}}</p>
                    <p class="text-dim-bright dark:text-dim-gray" v-if="findMatches(item)">{{item.original_title || item.original_name}}</p>
                </div>
            </div>
        </div>
    </div>
</template>