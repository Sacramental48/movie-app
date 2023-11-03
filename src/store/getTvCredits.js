import { defineStore } from 'pinia';
import axios from 'axios';

export const useTvCredits = defineStore('tvCredits', {
    state: () => ({
        dataCast: [],
        dataCrew: [],
        currentId: '',
    }),
    actions: {
        async getTvCredits() {
            const config = {
                method: 'GET',
                url: `https://api.themoviedb.org/3/tv/${this.currentId}/credits`,
                params: {language: 'en-US'},
                headers: {
                    accept: 'application/json',
                    'Authorization': `Bearer ${import.meta.env.VITE_APP_TOKEN_KEY}`
                }
            };
            try {
                const response = await axios.request(config);
                this.dataCast = response.data.cast;
                this.dataCrew = response.data.crew;
            }catch(error) {
                console.error(error);
            }
        },
    }
});