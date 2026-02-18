<script>
import { store } from '../data/store.js';

export default {
    name: 'DetailsModal',
    data() { return { store }; },
    methods: {
        close() { this.store.selectedItem = null; }
    }
}
</script>

<template>
    <div v-if="store.selectedItem" class="modal-overlay" @click.self="close">
        <div class="modal-content">
            <button class="close-btn" @click="close">&times;</button>

            <div class="hero-image"
                :style="{ backgroundImage: `url(${store.config.backdrop_url + store.selectedItem.backdrop_path})` }">
                <div class="hero-overlay">
                    <h1>{{ store.selectedItem.title || store.selectedItem.name }}</h1>
                </div>
            </div>

            <div class="details-body">
                <div class="info-row">
                    <span class="score">Voto: {{ store.selectedItem.vote_average.toFixed(1) }}</span>
                    <span class="date">Data: {{ store.selectedItem.release_date || store.selectedItem.first_air_date
                    }}</span>
                    <span class="lang">Lingua: {{ store.selectedItem.original_language.toUpperCase() }}</span>
                </div>

                <p class="overview">{{ store.selectedItem.overview }}</p>

                <div class="extra-info">
                    <p><strong>Titolo Originale:</strong> {{ store.selectedItem.original_title ||
                        store.selectedItem.original_name }}</p>
                    <p><strong>Popolarità:</strong> {{ store.selectedItem.popularity }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    z-index: 2000;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
}

.modal-content {
    background: #181818;
    width: 100%;
    max-width: 800px;
    max-height: 90vh;
    border-radius: 10px;
    overflow-y: auto;
    position: relative;
}

.close-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    background: #181818;
    color: white;
    border: none;
    font-size: 2rem;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    cursor: pointer;
    z-index: 10;
}

.hero-image {
    height: 400px;
    background-size: cover;
    background-position: center;
    position: relative;
}

.hero-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    background: linear-gradient(to top, #181818, transparent);
    display: flex;
    align-items: flex-end;
    padding: 40px;
}

.details-body {
    padding: 0 40px 40px;
}

.info-row {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
    color: #46d369;
    font-weight: bold;
}

.overview {
    line-height: 1.6;
    font-size: 1.1rem;
    margin-bottom: 20px;
}

.extra-info {
    color: #808080;
    font-size: 0.9rem;
}





@media (max-width: 768px) {
    .modal-content {
        width: 100%;
        height: 100%;
        max-height: 100vh;
        border-radius: 0;
      
    }

    .hero-image {
        height: 250px;
    }

    .details-body {
        padding: 20px;
    }

    .hero-overlay h1 {
        font-size: 1.5rem;
    }

    .close-btn {
        top: 10px;
        right: 10px;
        width: 35px;
        height: 35px;
        font-size: 1.5rem;
    }
}
</style>