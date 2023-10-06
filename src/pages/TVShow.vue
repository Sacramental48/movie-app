<script setup>
import { useTVShow } from '@/store/getTVShow'
import { ref, onMounted, onUnmounted} from 'vue'
import { useRoute } from 'vue-router'

import CardForImages from '@/components/CardForImages.vue'
import Spinner from '@/components/UI/Spinner.vue'
import PaginationPage from '@/components/UI/PaginationPage.vue'
import SortSelect from '@/components/UI/SortSelect.vue';

const route = useRoute();

const storeTvShow = useTVShow();
const totalPages = ref(0);

onMounted(async() => {
    await storeTvShow.getTVShowData();
});

onUnmounted(() => {
    storeTvShow.$reset();
});
</script>

<template>
    <div class="flex flex-col justify-center container pt-32">
        <Spinner v-if="storeTvShow.data.length === 0"></Spinner>
        <div v-else>
            
            <div class="flex justify-between items-center py-4">
                <p class="text-2xl dark:text-dim-white text-dim-dark-gray">TvShow</p>
                <SortSelect :data="storeTvShow"></SortSelect>
            </div>
            <div class="flex flex-col justify-center w-full items-center">
                <div class="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    <CardForImages v-for="item in storeTvShow.data" :key="item.id" :item="item" :media="route.name"/>
                </div>
                <PaginationPage :media="route.name" :data="storeTvShow"/>
            </div>
        </div>
    </div>
</template>