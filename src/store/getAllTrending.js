import {defineStore} from 'pinia'
import axios from 'axios'

export const useAllTrending = defineStore('allTrending', {
    state: () => ({
        data: [],
        timeFrame: 'week',
    }),
    
    actions: {
        async getAllTrendingList() {
            const config = {
                method: 'GET',
                url: `https://api.themoviedb.org/3/trending/all/${this.timeFrame}`,
                params: {language: 'en-US'},
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