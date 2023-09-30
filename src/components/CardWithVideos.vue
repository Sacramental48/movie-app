<script setup>
const props = defineProps({
    video: {
        type: Object,
        required: true,
    },
});

function handleError(videos) {
    console.error('error');
}
</script>

<template>
    <div class="flex flex-col gap-4 w-full mr-4">
        <p class="dark:text-dim-white text-start text-lg line-clamp-1">{{video.name}}</p>
        <vue-plyr>
            <div class="plyr__video-embed">
                <iframe
                    loading="lazy"
                    :src="`https://www.youtube.com/embed/${video.key}?amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1&origin=http://http://localhost:5173`"
                    allowfullscreen
                    allowtransparency
                    :volume="0.2"
                    allow="autoplay"
                ></iframe>
            </div>
        </vue-plyr>
    </div>
</template>