import { defineStore } from 'pinia'
import axios from 'axios';



export const useTVShowDetailsById = defineStore('details-TVShow', {
    state: () => ({
        currentData: [],
        currentId: '',
    }),

    actions: {
        async getDetailsTvById() {
            const config = {
                method: 'GET',
                url: `https://api.themoviedb.org/3/tv/${this.currentId}`,
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
                console.log(error);
            }
        }
    }
})

