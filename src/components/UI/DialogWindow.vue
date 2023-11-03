<script setup>
import { useIsOpenValue } from '@/store/getBooleanValue'

const storeIsOpenValue = useIsOpenValue();

    const props = defineProps({
        show: {
            type: Boolean,
            default: false,
        }
    })

    function hideDialog() {
        storeIsOpenValue.isOpen = !storeIsOpenValue.isOpen;
    }
</script>

<template>
    <div v-if="show" @click="hideDialog" class="flex fixed z-10 inset-0 bg-black/[0.2]">
        <div class="m-auto h-full sm:max-h-[700px] max-h-[320px] w-full max-w-[1200px] flex items-center justify-center px-4" @click.stop>
            <slot />
        </div>
    </div>
</template>