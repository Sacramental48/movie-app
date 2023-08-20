<script setup>
import {ref, onMounted, watch} from 'vue'
import { useMovieApp } from '../../store/getMovieApp'
import Paginate from "vuejs-paginate-next";
import { useRoute, useRouter } from 'vue-router'

const {currentPage, setCurrentPage, totalPages, func} = useMovieApp();

const route = useRoute()
const router = useRouter()

const changePage = async (pageNum) => {
    try {
        console.log(pageNum);
        setCurrentPage(pageNum);
        func();
        // await router.push({ name: 'genre-page', params: { genre: route.params, page: currentPageCount.value } })
    } catch(e) {
        console.log(e);
    } finally {
        location.reload();
    }
}

const currentPageCount = ref(parseInt(currentPage))

onMounted(() => {
    console.log(currentPage);
})
</script>

<template>
    <Paginate
        v-model="currentPageCount"
        :page-count="totalPages"
        :click-handler="changePage"
        :container-class="'flex gap-2 flex-wrap justify-center mt-10 mb-10'"
        :page-class="'flex justify-center items-center border rounded-2xl h-10 w-10 text-sm cursor-pointer select-none'"
        :margin-pages="1"
        :page-range="5"
        page-link-class="w-full h-full flex justify-center items-center"
        active-class="bg-gray-300"
        prev-class="hidden"
        next-class="hidden"
    >
    </Paginate>
</template>