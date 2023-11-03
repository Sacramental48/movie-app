import { defineStore } from 'pinia'
import axios from 'axios';



export const useMovieVideo = defineStore('movie-video', {
    state: () => ({
        currentData: [],
        currentId: '',
    }),

    actions: {
        async getMovieVideo() {
            const config = {
                method: 'GET',
                url: `https://api.themoviedb.org/3/movie/${this.currentId}/videos`,
                params: {language: 'en-US'},
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${import.meta.env.VITE_APP_TOKEN_KEY}`
                }
            };
            try {
                const response = await axios.request(config);
                this.currentData = response.data.results;
            } catch(error) {
                console.log('MovieVideo: ', error);
            }
        }
    }
})

