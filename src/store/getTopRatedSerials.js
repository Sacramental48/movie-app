import {defineStore} from 'pinia';
import axios from 'axios';

export const useTopRatedSerials = defineStore('topRatedTv', {
    state: () => ({
        data: [],
    }),
    
    actions: {
        async getTopRated() {
            const config = {
                method: 'GET',
                url: 'https://api.themoviedb.org/3/tv/top_rated',
                params: {language: 'en-US', page: '1'},
                headers: {
                    accept: 'application/json',
                    'Authorization': `Bearer ${import.meta.env.VITE_APP_TOKEN_KEY}`
                }
            };
            try {
                const response = await axios.request(config);
                this.data = response.data.results;
            }catch(error) {
                console.error(error);
            }
        },
    }
});