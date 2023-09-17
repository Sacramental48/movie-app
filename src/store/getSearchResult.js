import { defineStore } from 'pinia'
import axios from 'axios'

export const useSearchResult = defineStore('searchResult', {
    state: () => ({
        dataSearchResult: [],
        currentPage: 1,
        currentRequest: '',
    }),

    actions: {
        async getSearchResult() {
            const config = {
                method: 'GET',
                url: 'https://api.themoviedb.org/3/search/multi',
                params: {
                    query: this.currentRequest,
                    include_adult: 'false',
                    language: 'en-US',
                    page: this.currentPage,
                },
                headers: {
                    accept: 'application/json',
                    'Authorization': `Bearer ${import.meta.env.VITE_APP_TOKEN_KEY}`
                }
            };
            try {
                const response = await axios.request(config);
                this.dataSearchResult = response.data.results;
            }catch(error) {
                console.error(error);
            }
        },
    }

});


