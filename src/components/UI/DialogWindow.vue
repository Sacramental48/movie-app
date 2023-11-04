<script setup>
import { useIsOpenValue } from '@/store/getBooleanValue';

const storeIsOpenValue = useIsOpenValue();

const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
});

function hideDialogWindow() {
    storeIsOpenValue.isOpenWindow = !storeIsOpenValue.isOpenWindow;
};
</script>

<template>
    <div v-if="show" @click.stop="hideDialogWindow" class="flex fixed items-center justify-center z-40 inset-0 bg-black/[0.2] backdrop-blur-sm">
        <slot />
    </div>
</template>