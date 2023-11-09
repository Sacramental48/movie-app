<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useTVShow } from '@/store/getTVShow';
import { useMovieApp } from '@/store/getMovieApp';
import { useSearchResult } from '@/store/getSearchResult';

const storeTvShow = useTVShow();
const storeMovieApp = useMovieApp();
const storeSearchResult = useSearchResult();

const router = useRouter();
const emit = defineEmits(['isActive-handle']);
const props = defineProps({
    links: {
        type: Object,
        required: true,
    },
    isActiveToggle: {
        type: Boolean,
        required: false,
    }
});

const isActiveTheme = ref(false);

const toggleHamburger = () => {
    isActiveTheme.value = !isActiveTheme.value;
    emit('isActive-handle', !props.isActiveToggle);
};

const routerPushToContentType = (path) => {
    sessionStorage.setItem('sortingTVShow', 'popularity.desc');
    sessionStorage.setItem('sortingMovie', 'popularity.desc');
    storeSearchResult.$reset();
    if(path === 'movie') {
        router.push({ name: 'contentDetails', params: { contentType: path }});
        isActiveTheme.value = props.isActiveToggle;
        storeTvShow.$reset();
    }

    if(path === 'tv') {
        router.push({ name: 'contentDetails', params: { contentType: path }});
        isActiveTheme.value = props.isActiveToggle;
        storeMovieApp.$reset();
    }
};
</script>

<template>
    <div>
        <div class="tham tham-e-squeeze tham-w-6 sm:hidden relative" :class="{ 'tham-active': props.isActiveToggle }" @click="toggleHamburger">
            <button class="tham-box text-dim-bright">
                <span class="tham-inner dark:bg-dim-white" />
            </button>
        </div>
        <ul class="absolute left-0 right-0 top-11 w-full py-2 dark:text-dim-white border-b text-dim-dark-gray bg-gray-300 dark:bg-dim-dark-gray dark:border-dim-semi-dark-gray border-dim-gray cursor-pointer" v-if="props.isActiveToggle">
            <li v-for="item in props.links" :key="item" class="px-6 py-2 text-lg text-dim=dark-gray dark:text-dim-white hover:bg-gray-400 dark:hover:bg-neutral-400/10 hover:text-dim-bright w-full" @click="routerPushToContentType(item.path)">
                {{item.name}}
            </li>
        </ul>
    </div>
</template>