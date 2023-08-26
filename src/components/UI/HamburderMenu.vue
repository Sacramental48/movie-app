<script setup>
import { ref } from 'vue';

const isActive = ref(false);

const props = defineProps({
    links: {
        type: Object,
        required: true,
    }
})

const toggleTham = () => {
    isActive.value = !isActive.value;
};

const goToPathAndCloseMenu = () => {
    isActive.value = !isActive.value;
}
</script>

<template>
    <div>
        <div class="tham tham-e-squeeze tham-w-6 sm:hidden relative" :class="{ 'tham-active': isActive }" @click="toggleTham">
            <div class="tham-box">
                <div class="tham-inner" />
            </div>
        </div>
        <div class="mt-5 ml-6 absolute top-0 left-4 w-2/6" v-if="isActive">
            <div v-for="item in props.links" :key="item" class="w-20 p-1 hover:bg-gray-300">
                <router-link :to="item.path" @click="toggleTham">
                    {{item.name}}
                </router-link>
            </div>
        </div>
    </div>
</template>