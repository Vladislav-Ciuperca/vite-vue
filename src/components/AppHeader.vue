<script>
import { store } from '../data/store.js';

export default {
  name: 'AppHeader',
  data() {
    return {
      store,
      isSearchOpen: false
    };
  }
}
</script>

<template>
  <header>
    <div id="left">
      <h1 @click="$emit('changeCategory', 'all')" title="Netflix cousin from temu">Neflux</h1>
      <nav>
        <ul>
          <li @click="$emit('changeCategory', 'all')">Home</li>
          <li @click="$emit('changeCategory', 'tv')">Serie TV</li>
          <li @click="$emit('changeCategory', 'movie')">Film</li>
        </ul>
      </nav>
    </div>

    <div id="right">
      <div class="search-box" :class="{ 'open': isSearchOpen }">
        <button @click="isSearchOpen = !isSearchOpen" class="search-btn">🔍</button>
        <input type="text" placeholder="Titoli, persone..." v-model="store.searchText"
          @keyup.enter="$emit('performSearch')">
      </div>
      <div class="user-avatar">👤</div>
    </div>
  </header>
</template>

<style scoped>
header {
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 100%);
  background-color: #000;
  padding: 0 4%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
}

#left {
  display: flex;
  align-items: center;
  gap: 30px;
}

h1 {
  color: #e50914;
  cursor: pointer;
  font-size: 1.8rem;
  text-transform: uppercase;
}

nav ul {
  display: flex;
  list-style: none;
  gap: 20px;
}

nav li {
  cursor: pointer;
  color: #e5e5e5;
  font-size: 0.9rem;
  transition: 0.3s;
}

nav li:hover {
  color: #b3b3b3;
}

#right {
  display: flex;
  align-items: center;
  gap: 15px;
}

.search-box {
  display: flex;
  align-items: center;
  border: 1px solid transparent;
  padding: 5px;
  border-radius: 20px;
  transition: 0.4s;
}

.search-box.open {
  border: 1px solid white;
  background: rgba(0, 0, 0, 0.6);
}

.search-box input {
  width: 0;
  border: none;
  background: transparent;
  color: white;
  outline: none;
  transition: 0.4s;
}

.search-box.open input {
  width: 180px;
  padding: 0 10px;
}

.search-btn {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 1.2rem;
}

.user-avatar {
  cursor: pointer;
  font-size: 1.2rem;
}


/* mediaqueries */

@media (max-width: 768px) {
    header {
        height: 60px;
        padding: 0 15px;
    }
    h1 {
        font-size: 1.4rem; 
    }
    nav ul {
        gap: 10px; 
    }
    nav li {
        font-size: 0.75rem;
    }
    .search-box.open input {
        width: 120px; 
    }
}
</style>