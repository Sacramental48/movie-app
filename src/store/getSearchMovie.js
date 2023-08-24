import { defineStore } from 'pinia'
import axios from 'axios'

export const useSearchMovie = defineStore('search', {
    state: () => ({
        foundMovie: localStorage.getItem('foundMovie'),
        sortBy: localStorage.getItem('selectedSort'),
        currentPage: localStorage.getItem('currentPage'),
    }),

    actions: {
        async getSearchMovieApp() {
            const config = {
                method: 'GET',
                url: 'https://api.themoviedb.org/3/search/movie',
                params: {
                    query: 'shark',
                    include_adult: 'false',
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
                console.log(response);
                // this.data = response.data.results;
            }catch(error) {
                console.error(error);
            }
        },
        setSearchMovie(value) {
            localStorage.setItem('foundMovie', value);
        }
    }

});


