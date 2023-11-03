import { defineStore } from 'pinia'
import axios from 'axios'

export const useMovieApp = defineStore('movie', {
    state: () => ({
        data: [],
        totalPages: 500,
        sortBy: 'popularity.desc',
        currentPageMovie: sessionStorage.getItem('currentPageMovie') || 1,
    }),
    getters: {
        getTotalPage: state => state.totalPages,
    },
    actions: {
        async getMovieData() {
            const config = {
                method: 'GET',
                url: 'https://api.themoviedb.org/3/discover/movie',
                params: {
                    include_adult: 'false',
                    include_video: 'false',
                    language: 'en-US',
                    page: this.currentPageMovie,
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
        },
        setCurrentPage(page) {
            sessionStorage.setItem('currentPageMovie', page);
        },
    }
});