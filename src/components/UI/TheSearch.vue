<script setup>
const props = defineProps({
    modelValue: {
        type: String,
        required: true,
    },
    someFunction: {
        type: Function,
    }
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
    <div class="flex border xs:flex absolute top-12 w-full h-10">
        <!-- <img src="../../assets/img/search.svg" alt="search" class="w-8 h-full cursor-pointer" @click="someFunction"> -->
        <input type="text" placeholder="Input" :value="props.modelValue" @input="$emit('update:modelValue', $event.target.value)" class="w-full block h-full sm:text-md outline-none text-xl pl-4 bg-transparent">
        <slot></slot>
    </div>
</template>