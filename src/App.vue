<script>
import axios from 'axios';
import { store } from './data/store.js';
import AppHeader from './components/AppHeader.vue';
import AppBody from './components/AppBody.vue';
import DetailsModal from './components/DetailsModal.vue'; 

export default {
  name: 'App',
  components: { AppHeader, AppBody, DetailsModal },
  data() { return { store }; },
  methods: {
    handleSearch() {
      if (this.store.searchText === '') {
        this.store.activeView = 'all';
        return;
      }
      const movieUrl = `${this.store.config.base_url}/search/movie?api_key=${this.store.config.api_key}&query=${this.store.searchText}`;
      const tvUrl = `${this.store.config.base_url}/search/tv?api_key=${this.store.config.api_key}&query=${this.store.searchText}`;

      Promise.all([axios.get(movieUrl), axios.get(tvUrl)]).then(([resMovie, resTv]) => {
        this.store.searchResults = [...resMovie.data.results, ...resTv.data.results];
        this.store.activeView = 'search';
      });
    },
    setCategory(category) {
      this.store.searchText = '';
      this.store.activeView = category;
    },
    fetchAllData() {
      const trendingUrl = `${this.store.config.base_url}/trending/all/week?api_key=${this.store.config.api_key}`;
      const movieUrl = `${this.store.config.base_url}/movie/popular?api_key=${this.store.config.api_key}`;
      const tvUrl = `${this.store.config.base_url}/tv/popular?api_key=${this.store.config.api_key}`;

      axios.get(trendingUrl).then(res => { this.store.trending = res.data.results; });
      axios.get(movieUrl).then(res => { this.store.movies = res.data.results; });
      axios.get(tvUrl).then(res => { this.store.tvShows = res.data.results; });
    }
  },
  mounted() {
    this.fetchAllData();
  }
}
</script>

<template>
  <div class="app-container">
    <AppHeader @performSearch="handleSearch" @changeCategory="setCategory" />
    <AppBody />
    <DetailsModal />
  </div>
</template>