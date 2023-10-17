<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const isActive = ref(false);

const emit = defineEmits(['isActiv-handle']);

const props = defineProps({
    links: {
        type: Object,
        required: true,
    }
});

const toggleTham = () => {
    isActive.value = !isActive.value;
    emit('isActiv-handle', isActive.value)
};

const routerPush = (item) => {
    router.push({path: `${item}`});
    isActive.value = !isActive.value;
};
</script>

<template>
    <div>
        <div class="tham tham-e-squeeze tham-w-6 sm:hidden relative" :class="{ 'tham-active': isActive }" @click="toggleTham">
            <div class="tham-box text-dim-bright">
                <div class="tham-inner bg-dim-white" />
            </div>
        </div>
        <ul class="absolute left-0 right-0 top-11 w-full py-4 dark:text-dim-white text-dim-dark-gray bg-dim-dark-gray border-t dark:border-dim-semi-dark-gray border-dim-dark-gray cursor-pointer" v-if="isActive">
            <li v-for="item in props.links" :key="item" class="px-6 py-2 text-lg text-dim-white hover:bg-neutral-400/10 hover:text-dim-bright w-full" @click="routerPush(item.path)">
                {{item.name}}
            </li>
        </ul>
    </div>
</template>