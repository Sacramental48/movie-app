<script setup>

</script>

<template>
    <div class="flex border h-8">
        <img src="../assets/img/search.svg" alt="search" class="w-8 h-full cursor-pointer">
        <input type="text" placeholder="Input" class="md:w-72 xs:w-60 block h-full sm:text-md outline-none">
        <slot></slot>
    </div>
</template>