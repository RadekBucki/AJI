<template>
  <div class="container mt-3">
    <MoviesSearch :jsonData="json"/>
    <MoviesBySomething header="Filmy wg gatunku" something="genres" :jsonData="json.slice(300,400)"/>
    <MoviesBySomething header="Filmy wg obsady" something="cast" :jsonData="json.slice(500,600)"/>
  </div>
</template>

<script>
import MoviesSearch from '@/components/MoviesSearch';
import MoviesBySomething from "@/components/MoviesBySomething";

import json from "@/assets/movies.json"

export default {
  name: 'App',
  data() {
    return {
      json
    }
  },
  components: {
    MoviesSearch,
    MoviesBySomething
  }
}
</script>
