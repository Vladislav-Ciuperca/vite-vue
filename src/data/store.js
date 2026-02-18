import { reactive } from 'vue';

export const store = reactive({
  movies: [],
  searchText: '',
  currentType: 'In Evidenza',
  config: {
    base_url: "https://api.themoviedb.org/3",
    api_key: "93f18c0c4226c3329ddbcd202ee73f45",
    img_url: "https://image.tmdb.org/t/p/w342"
  }
});