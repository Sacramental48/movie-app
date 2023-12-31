import { defineStore } from 'pinia';
import axios from 'axios';
import { useRouter } from 'vue-router';

export const useMovieDetailsById = defineStore('details-movie', {
    state: () => ({
        currentData: [],
        currentId: '',
    }),

    actions: {
        async getDetailsMovieById() {
            const router = useRouter();
            const config = {
                method: 'GET',
                url: `https://api.themoviedb.org/3/movie/${this.currentId}`,
                params: {language: 'en-US'},
                headers: {
                    accept: 'application/json',
                    'Authorization': `Bearer ${import.meta.env.VITE_APP_TOKEN_KEY}`
                }
            };
            try {
                const response = await axios.request(config);
                this.currentData = response.data;
            } catch(error) {
                router.push({ name: 'PageNotFound' });
            }
        }
    }
});

