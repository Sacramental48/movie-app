import {defineStore} from 'pinia'
import axios from 'axios'

export const useTopRatedMovie = defineStore('topRatedMovie', {
    state: () => ({
        data: [],
    }),
    
    actions: {
        async getTopRated() {
            const config = {
                method: 'GET',
                url: 'https://api.themoviedb.org/3/movie/top_rated',
                params: {language: 'en-US', page: '1'},
                headers: {
                    accept: 'application/json',
                    'Authorization': `Bearer ${import.meta.env.VITE_APP_TOKEN_KEY}`
                }
            };
            try {
                const response = await axios.request(config)
                this.data = response.data.results;
            }catch(error) {
                console.error(error);
            }
        },
    }
})