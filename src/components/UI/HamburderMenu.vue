<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

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
    emit('isActive-handle', isActiveTheme.value);
};

const routerPushToContentType = (path) => {
    router.push({ name: 'contentDetails', params: { contentType: path, contentId: '1' }});
    isActiveTheme.value = props.isActiveToggle;
};
</script>

<template>
    <div>
        <div class="tham tham-e-squeeze tham-w-6 sm:hidden relative" :class="{ 'tham-active': props.isActiveToggle }" @click="toggleHamburger">
            <button class="tham-box text-dim-bright">
                <span class="tham-inner dark:bg-dim-white" />
            </button>
        </div>
        <ul class="absolute left-0 right-0 top-11 w-full py-4 dark:text-dim-white text-dim-dark-gray bg-gray-300 dark:bg-dim-dark-gray border-t dark:border-dim-semi-dark-gray border-dim-dark-gray cursor-pointer" v-if="props.isActiveToggle">
            <li v-for="item in props.links" :key="item" class="px-6 py-2 text-lg text-dim=dark-gray dark:text-dim-white hover:bg-gray-400 dark:hover:bg-neutral-400/10 hover:text-dim-bright w-full" @click="routerPushToContentType(item.path)">
                {{item.name}}
            </li>
        </ul>
    </div>
</template>