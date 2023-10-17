<script setup>
import { useIsOpenValue } from '@/store/getBooleanValue';

const storeIsOpenValue = useIsOpenValue();

const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
    maxHeight: {
        type: String
    },
    maxWidth: {
        type: String
    },
});

function hideDialog() {
    storeIsOpenValue.isOpen = !storeIsOpenValue.isOpen;
};
</script>

<template>
    <div v-if="show" @click="hideDialog" class="flex fixed z-10 inset-0 bg-black/[0.2]">
        <div class="m-auto h-full w-full flex items-center justify-center" :style="{maxHeight, maxWidth}" @click.stop>
            <slot />
        </div>
    </div>
</template>