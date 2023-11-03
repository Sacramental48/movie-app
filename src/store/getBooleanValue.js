import { defineStore } from 'pinia';

export const useIsOpenValue = defineStore('is-open', {
    state: () => ({
        isOpenWindow: false,
        videoKey: '',
    }),
});