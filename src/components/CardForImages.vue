<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Rating from '@/components/UI/RatingStar.vue';
const router = useRouter();
const props = defineProps({
    item: {
        type: Object
    },
    media: {
        type: String
    }
});

const notFound = new URL('@/assets/img/noPictureAvailable.jpg', import.meta.url);

const findSelectedCard = () => {
    router.push({path:`/${props.media || props.item.media_type}/card/${props.item.id}`});
}
</script>

<template>
    <div class="flex flex-col cursor-pointer" @click="findSelectedCard">
        <div class="relative">
            <img v-lazy="{ 
                src: `https://image.tmdb.org/t/p/original${props.item.poster_path || props.item.profile_path}`, delay: 300 }" 
                lazy="loading"
                class="w-full aspect-[1/1.5] object-cover object-center overflow-hidden rounded-lg hover:opacity-75 duration-150"
                v-if="props.item.poster_path || props.item.profile_path"
            />
            <img :src="notFound" alt="Not Found" v-else>
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