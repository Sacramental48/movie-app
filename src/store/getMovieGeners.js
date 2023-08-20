import { defineStore } from 'pinia'
import axios from 'axios';

export const useMovieGenres = defineStore('genres', {
    state: () => ({
        genres: [],
    }),

    actions: {
        async getMovieGenres() {
            const config = {
                method: 'GET',
                url: 'https://api.themoviedb.org/3/genre/movie/list',
                params: {language: 'en'},
                headers: {
                    accept: 'application/json',
                    'Authorization': `Bearer ${import.meta.env.VITE_APP_TOKEN_KEY}`
                }
            };
            try {
                await axios.request(config)
                    .then(res => {
                        this.genres =  res.data.genres;
                    });
                } catch(e) {
                    console.log(e);
                }
        }
    }
});