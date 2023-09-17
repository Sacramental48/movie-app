<script setup>
import { ref, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import Rating from '@/components/UI/RatingStar.vue'
const route = useRoute();
const router = useRouter();
const props = defineProps({
    item: {
        type: Object
    },
    media: {
        type: String
    }
});

const notFound = new URL('../assets/img/noPictureAvailable.jpg', import.meta.url);

const scrollTop = ref(0);

const findSelectedCard = () => {
    router.push({path:`/${props.media || props.item.media_type}/card/${props.item.id}`});
}
console.log(props.item.profile_path);
console.log(props.item.profile_path);
</script>

<template>
    <div class="flex flex-col cursor-pointer" @click="findSelectedCard">
        <div 
        class="relative w-full aspect-[1/1.5]">
        <!-- <img :src="`https://image.tmdb.org/t/p/original/${props.item.profile_path}`" alt=""> -->
            <img
                :src="props.item.poster_path !== null ? `https://image.tmdb.org/t/p/original/${props.item.poster_path}` : `${notFound}`"
                alt="img"
                class="w-full h-full rounded-xl hover:opacity-80 hover:duration-100"
                v-if="props.item.poster_path !== undefined"
            />
            <img
                :src="props.item.profile_path !== null ? `https://image.tmdb.org/t/p/original/${props.item.profile_path}` : `${notFound}`"
                alt="img"
                class="w-full h-full rounded-xl hover:opacity-80 hover:duration-100"
                v-if="props.item.profile_path !== undefined"
            />
            <div class="flex justify-between items-end bottom-0 right-0 absolute pb-2 px-2 rounded-xl">
                <Rating v-if="props.item.vote_average" :rating="props.item.vote_average" :release="props.item.release_date"></Rating>
            </div>
        </div>
        <p 
        class="text-start text-xl line-clamp-1 text-dim-white" 
        :title="props.item.original_title || props.item.original_name">
            {{props.item.original_title || props.item.original_name}}
        </p>
        <span class="text-start text-basic line-clamp-1 dark:text-dim-white/50" :title="props.item.character" v-if="props.item.character">{{props.item.character}}</span>
    </div>
</template>