<script setup>
    const props = defineProps({
        show: {
            type: Boolean,
            default: false,
        }
    })
    const emit = defineEmits(['update:show'])

    function hideDialog() {
        emit('update:show', false);
    }
</script>

<template>
    <div v-if="show" @click="hideDialog" class="flex fixed inset-0 bg-black/[0.6]">
        <div class="m-auto bg-white xs:w-3/5 w-4/5" @click.stop>
            <slot />
        </div>
    </div>
</template>