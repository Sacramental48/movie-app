<script setup>


const props = defineProps({
    video: {
        type: Object,
        required: true,
    },
    movieId: {
        type: String,
        required: true,
    }
});

function handleError(videos) {
    console.error('error');
}
</script>

<template>
    <div class="flex gap-10 flex-wrap">
        <div v-for="video in props.video" :key="video.id">
            <p class="dark:text-dim-white text-start text-lg line-clamp-1">{{video.name}}</p>
            <vue-plyr>
                <div class="plyr__video-embed">
                    <iframe
                        loading="lazy"
                        :src="`https://www.youtube.com/embed/${video.key}?amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1&origin=http://http://localhost:5173`"
                        allowfullscreen
                        allowtransparency
                        allow="autoplay"
                    ></iframe>
                </div>
            </vue-plyr>
        </div>
    </div>
</template>