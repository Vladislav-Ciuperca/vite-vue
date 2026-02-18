<script>
import { store } from '../data/store.js';

export default {
    name: 'AppBody',
    data() { return { store }; },
    methods: {
        scrollLeft(e) {
            e.target.closest('.slider-wrapper').querySelector('.cards-row').scrollBy({ left: -800, behavior: 'smooth' });
        },
        scrollRight(e) {
            e.target.closest('.slider-wrapper').querySelector('.cards-row').scrollBy({ left: 800, behavior: 'smooth' });
        },
        openDetails(item) {
            this.store.selectedItem = item;
        }
    }
}
</script>

<template>
    <main class="app-body">

        <div v-if="store.activeView === 'search'" class="row-container">
            <h2 class="row-title">Risultati per: {{ store.searchText }}</h2>
            <div class="slider-wrapper">
                <button class="nav-btn left" @click="scrollLeft">‹</button>
                <div class="cards-row">
                    <div v-for="item in store.searchResults" :key="item.id" class="movie-card"
                        @click="openDetails(item)">
                        <img v-if="item.poster_path" :src="store.config.img_url + item.poster_path"
                            :alt="item.title || item.name">
                        <div v-else class="placeholder-poster">{{ item.title || item.name }}</div>
                        <div class="card-info">
                            <h3>{{ item.title || item.name }}</h3>
                            <div class="meta"><span>⭐ {{ item.vote_average.toFixed(1) }}</span></div>
                        </div>
                    </div>
                </div>
                <button class="nav-btn right" @click="scrollRight">›</button>
            </div>
        </div>

        <div v-if="store.activeView === 'all'" class="row-container">
            <h2 class="row-title">In Evidenza questa settimana</h2>
            <div class="slider-wrapper">
                <button class="nav-btn left" @click="scrollLeft">‹</button>
                <div class="cards-row">
                    <div v-for="item in store.trending" :key="item.id" class="movie-card" @click="openDetails(item)">
                        <img :src="store.config.img_url + item.poster_path" :alt="item.title || item.name">
                        <div class="card-info">
                            <h3>{{ item.title || item.name }}</h3>
                            <div class="meta"><span>⭐ {{ item.vote_average.toFixed(1) }}</span></div>
                        </div>
                    </div>
                </div>
                <button class="nav-btn right" @click="scrollRight">›</button>
            </div>
        </div>

        <div v-if="store.activeView === 'movie' || store.activeView === 'all'" class="row-container">
            <h2 class="row-title">Film Popolari</h2>
            <div class="slider-wrapper">
                <button class="nav-btn left" @click="scrollLeft">‹</button>
                <div class="cards-row">
                    <div v-for="item in store.movies" :key="item.id" class="movie-card" @click="openDetails(item)">
                        <img :src="store.config.img_url + item.poster_path" :alt="item.title">
                        <div class="card-info">
                            <h3>{{ item.title }}</h3>
                            <div class="meta"><span>⭐ {{ item.vote_average.toFixed(1) }}</span></div>
                        </div>
                    </div>
                </div>
                <button class="nav-btn right" @click="scrollRight">›</button>
            </div>
        </div>

        <div v-if="store.activeView === 'tv' || store.activeView === 'all'" class="row-container">
            <h2 class="row-title">Serie TV Popolari</h2>
            <div class="slider-wrapper">
                <button class="nav-btn left" @click="scrollLeft">‹</button>
                <div class="cards-row">
                    <div v-for="item in store.tvShows" :key="item.id" class="movie-card" @click="openDetails(item)">
                        <img :src="store.config.img_url + item.poster_path" :alt="item.name">
                        <div class="card-info">
                            <h3>{{ item.name }}</h3>
                            <div class="meta"><span>⭐ {{ item.vote_average.toFixed(1) }}</span></div>
                        </div>
                    </div>
                </div>
                <button class="nav-btn right" @click="scrollRight">›</button>
            </div>
        </div>

    </main>
</template>

<style scoped>
.app-body {
    padding-top: 100px;
    min-height: 100vh;
    background-color: #141414;
    padding-bottom: 50px;
}

.row-container {
    margin-bottom: 30px;
}

.row-title {
    margin-left: 4%;
    margin-bottom: 10px;
    font-size: 1.4rem;
    color: #e5e5e5;
}

.slider-wrapper {
    position: relative;
}

.cards-row {
    display: flex;
    gap: 8px;
    overflow-x: hidden;
    padding: 20px 4%;
    scroll-behavior: smooth;
}

.movie-card {
    min-width: 200px;
    aspect-ratio: 2/3;
    background-color: #2f2f2f;
    border-radius: 4px;
    position: relative;
    transition: transform 0.3s ease;
    cursor: pointer;
    flex-shrink: 0;
}

.movie-card:hover {
    transform: scale(1.1);
    z-index: 10;
}

.movie-card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px;
}

.card-info {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.85);
    padding: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    opacity: 0;
    transition: opacity 0.3s;
    border-radius: 4px;
}

.movie-card:hover .card-info {
    opacity: 1;
}

.card-info h3 {
    font-size: 0.9rem;
    margin-bottom: 8px;
}

.meta {
    font-size: 0.8rem;
    color: #46d369;
    font-weight: bold;
}

.nav-btn {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 4%;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    font-size: 2.5rem;
    cursor: pointer;
    z-index: 5;
    opacity: 0;
    transition: 0.3s;
}

.slider-wrapper:hover .nav-btn {
    opacity: 1;
}

.left {
    left: 0;
}

.right {
    right: 0;
}

.placeholder-poster {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 0.8rem;
    padding: 10px;
    color: #ccc;
}



/* medfiaqueries */


.movie-card {
    min-width: 200px; 
    aspect-ratio: 2/3;
}

@media (max-width: 1024px) {
    .movie-card {
        min-width: 160px; 
    }
    .row-title {
        font-size: 1.2rem;
    }
}

@media (max-width: 600px) {
    .app-body {
        padding-top: 80px; 
    }
    .movie-card {
        min-width: 130px; 
    }
    .nav-btn {
        display: none; 
    }
    .cards-row {
        overflow-x: auto;
        padding: 10px 4%;
    }
    .card-info h3 {
        font-size: 0.7rem; 
    }
}
</style>