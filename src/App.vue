<script>
import axios from 'axios';
import { store } from './data/store.js';
import AppHeader from './components/AppHeader.vue';
import AppBody from './components/AppBody.vue';

export default {
  name: 'App',
  components: { AppHeader, AppBody },
  data() { return { store }; },
  methods: {
    // Gestisce la ricerca globale
    handleSearch() {
      if (this.store.searchText === '') {
        this.fetchData('all');
        return;
      }
      this.store.currentType = `Risultati per: ${this.store.searchText}`;
      
      const movieUrl = `${this.store.config.base_url}/search/movie?api_key=${this.store.config.api_key}&query=${this.store.searchText}`;
      const tvUrl = `${this.store.config.base_url}/search/tv?api_key=${this.store.config.api_key}&query=${this.store.searchText}`;

      Promise.all([axios.get(movieUrl), axios.get(tvUrl)]).then(([resMovie, resTv]) => {
        this.store.movies = [...resMovie.data.results, ...resTv.data.results];
      });
    },

    // Gestisce i click sui link (Home, Film, Serie)
    fetchData(category) {
      this.store.searchText = ''; 
      let endpoint = '';

      switch(category) {
        case 'movie':
          this.store.currentType = 'Film Popolari';
          endpoint = '/movie/popular';
          break;
        case 'tv':
          this.store.currentType = 'Serie TV Popolari';
          endpoint = '/tv/popular';
          break;
        default:
          this.store.currentType = 'In Evidenza (Home)';
          endpoint = '/trending/all/week';
      }

      const url = `${this.store.config.base_url}${endpoint}?api_key=${this.store.config.api_key}`;
      axios.get(url).then(res => {
        this.store.movies = res.data.results;
      });
    }
  },
  mounted() {
    this.fetchData('all');
  }
}
</script>

<template>
  <div class="app-container">
    <AppHeader @performSearch="handleSearch" @changeCategory="fetchData" />
    <AppBody />
  </div>
</template>

<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  background-color: #141414;
  color: white;
}
</style>