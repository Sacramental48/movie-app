<script setup>
const props = defineProps({
    stroke: {
        type: String
    }
});
</script>

<template>
    <button class="flex items-center">
        <svg width="24px" height="24px" viewBox="0 0 24 24" fill="#ffffff" class="w-8 h-full fill-none stroke-none pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <g>
                <rect width="24" height="24" fill="dark:#434343"/>
                <circle cx="10.5" cy="10.5" r="6.5" stroke="#fff" stroke-linejoin="round" :class="stroke"/>
                <path d="M19.6464 20.3536C19.8417 20.5488 20.1583 20.5488 20.3536 20.3536C20.5488 20.1583 20.5488 19.8417 20.3536 19.6464L19.6464 20.3536ZM20.3536 19.6464L15.3536 14.6464L14.6464 15.3536L19.6464 20.3536L20.3536 19.6464Z" :class="stroke" fill="#fff"/>
            </g>
            <defs>
                <clipPath id="clip0_15_152">
                    <rect width="24" height="24" fill="white" />
                </clipPath>
            </defs>
        </svg>
    </button>
</template>