import { defineStore } from 'pinia'
import axios from 'axios'

export const useTVShow = defineStore('TVShow', {
    state: () => ({
        data: [],
        totalPages: 500,
        sortBy: localStorage.getItem('selectedSort') || 'popularity.desc',
        currentPage: localStorage.getItem('currentPage') || 1,
    }),
    getters: {
        getTotalPage: state => state.totalPages,
    },
    actions: {
        async getTVShowData() {

            const config = {
                method: 'GET',
                url: 'https://api.themoviedb.org/3/discover/tv',
                params: {
                    include_adult: 'false',
                    include_null_first_air_dates: 'false',
                    language: 'en-US',
                    page: this.currentPage,
                    sort_by: this.sortBy
                },
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
        }
    }
})