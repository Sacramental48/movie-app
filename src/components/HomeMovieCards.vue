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
})

const notFound = new URL('../assets/img/noPictureAvailable.jpg', import.meta.url);

const scrollTop = ref(0);

const findSelectedCard = () => {
    router.push({path:`/${props.media || props.item.media_type}/card/${props.item.id}`});
}
// const rememberScrollPosition = () => {
    // scrollTop.value = window.scrollY;
// };

// onBeforeUnmount(() => {
    // window.scrollTo(0, scrollTop.value);
// });

</script>

<template>
    <div class="cursor-pointer" @click="findSelectedCard">
        <div 
        class="relative w-full aspect-[1/1.5]">
                <img
                :src="props.item.poster_path ? `https://image.tmdb.org/t/p/original/${props.item.poster_path}` : `${notFound}`"
                alt="img"
                class="w-full h-full rounded-xl hover:opacity-80 hover:duration-100"
                />
            <div class="flex justify-between items-end bottom-0 right-0 absolute pb-2 px-2 rounded-xl">
                <Rating :rating="props.item.vote_average" :release="props.item.release_date"></Rating>
            </div>
        </div>
        <p 
        class="text-start text-xl line-clamp-1 text-dim-white" 
        :title="props.item.original_title || props.item.original_name">
            {{props.item.original_title || props.item.original_name}}
        </p>
    </div>
</template>