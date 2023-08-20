import { defineStore } from 'pinia'
import axios from 'axios'

export const useMovieApp = defineStore('movie', {
    state: () => ({
        data: [],
        totalPages: 500,
        sortBy: localStorage.getItem('selectedSort'),
        currentPage: localStorage.getItem('currentPage'),
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
                    language: 'ru-RU',
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
        },
        setCurrentPage(page) {
            this.currentPage = page;
            localStorage.setItem('currentPage', JSON.stringify(this.currentPage));
        },
        setSortMovie(value) {
            this.sortBy = value;
            localStorage.setItem('selectedSort', value);
            console.log('this.sortBy 1', this.sortBy);
            // console.log('value 2', value);
        }
    }
});