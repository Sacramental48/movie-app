import { defineStore } from 'pinia';
import axios from 'axios';

export const useSearchResult = defineStore('searchResult', {
    state: () => ({
        data: [],
        currentResultPage: sessionStorage.getItem('currentSearchResultPage') || 1,
        totalPages: 0,
    }),

    actions: {
        async getSearchResult() {
            const config = {
                method: 'GET',
                url: 'https://api.themoviedb.org/3/search/multi',
                params: {
                    query: sessionStorage.getItem('currentRequest') || '',
                    include_adult: 'false',
                    language: 'en-US',
                    page: this.currentResultPage,
                },
                headers: {
                    accept: 'application/json',
                    'Authorization': `Bearer ${import.meta.env.VITE_APP_TOKEN_KEY}`
                }
            };
            try {
                const response = await axios.request(config);
                this.data = response.data.results;
                this.totalPages = response.data.total_pages;
            }catch(error) {
                console.error(error);
            }
        },
        setCurrentPage(page) {
            sessionStorage.setItem('currentSearchResultPage', page);
        },
        setCurrentRequest(value) {
            sessionStorage.setItem('currentRequest', value);
        },
    }
});


