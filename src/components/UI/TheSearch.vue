<script setup>
const props = defineProps({
    modelValue: {
        type: String,
        required: true,
    },
    someFunction: {
        type: Function,
    },
    isVisibleInput: {
        type: Boolean
    }
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
    <div class="flex border xs:flex absolute top-11 left-0 w-full h-10 z-10 animate-header-down">
        <input type="text" placeholder="Search" :value="props.modelValue" @input="$emit('update:modelValue', $event.target.value)" class="block w-full h-[50px] sm:text-md outline-none text-xl pl-4 bg-transparent dark:bg-dim-bright z-10">
        <slot></slot>
    </div>
</template>