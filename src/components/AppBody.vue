<script>
import { store } from '../data/store.js';

export default {
    name: 'AppBody',
    data() { return { store }; },
    methods: {
        scrollLeft() { this.$refs.container.scrollBy({ left: -800, behavior: 'smooth' }); },
        scrollRight() { this.$refs.container.scrollBy({ left: 800, behavior: 'smooth' }); }
    }
}
</script>

<template>
    <main class="app-body">
        <div class="row-container">
            <h2 class="row-title">{{ store.currentType }}</h2>

            <div class="slider-wrapper">
                <button class="nav-btn left" @click="scrollLeft">‹</button>

                <div class="cards-row" ref="container">
                    <div v-for="item in store.movies" :key="item.id" class="movie-card">
                        <img v-if="item.poster_path" :src="store.config.img_url + item.poster_path"
                            :alt="item.title || item.name">
                        <div v-else class="placeholder-poster">
                            {{ item.title || item.name }}
                        </div>

                        <div class="card-info">
                            <h3>{{ item.title || item.name }}</h3>
                            <div class="meta">
                                <span>⭐ {{ item.vote_average.toFixed(1) }}</span>
                                <span class="lang">{{ item.original_language.toUpperCase() }}</span>
                            </div>
                            <p class="overview">{{ item.overview.substring(0, 100) }}...</p>
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
    display: flex;
    justify-content: space-between;
    font-size: 0.8rem;
    margin-bottom: 8px;
    color: #46d369;
}

.lang {
    background: #333;
    padding: 2px 5px;
    border-radius: 3px;
    color: #fff;
}

.overview {
    font-size: 0.7rem;
    color: #ccc;
    line-height: 1.2;
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
    color: #666;
}
</style>