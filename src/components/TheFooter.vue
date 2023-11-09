<script setup>
import ImageInstagramVue from "./Images/ImageInstagram.vue";
import ImageTelegramVue from "./Images/ImageTelegram.vue";
import ImageFacebookVue from "./Images/ImageFacebook.vue";
import ImageTwitchVue from "./Images/ImageTwitch.vue";

const list = ['About', 'Contact', 'Support', 'Privacy Policy'];
const listComponents = [ImageInstagramVue, ImageTelegramVue, ImageFacebookVue, ImageTwitchVue];
</script>

<template>
    <div class="flex flex-col items-center justify-center dark:bg-black/30 h-[200px] bg-dim-bright">
        <div class="flex gap-4 mb-4">
            <span class="cursor-pointer fill-dim-semi-dark-gray dark:hover:fill-fuchsia-700/80 hover:fill-fuchsia-700 duration-300" v-for="item in listComponents" :key="item.id">
                <component :is="item" />
            </span>
        </div>
        <div class="flex gap-4">
            <ul v-for="item in list" :key="item.id">
                <li class="dark:text-white/80 dark:hover:text-fuchsia-700 duration-300 text-dim-dark-gray hover:text-fuchsia-700 cursor-pointer">{{item}}</li>
            </ul>
        </div>
        <span class="dark:text-white/60 text-dim-gray">&#169; 2023</span>
    </div>
</template>