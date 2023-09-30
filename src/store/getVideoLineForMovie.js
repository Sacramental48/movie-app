import { defineStore } from 'pinia'
import axios from 'axios';



export const useMusicVideo = defineStore('music-video', {
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
                console.log(response.data);
            } catch(error) {
                console.log('MovieVideo: ', error);
            }
        }
    }
})

