<template>
  <div class="container">
    <MoviesSearch/>
    <MoviesBySomething header="Filmy wg gatunku" something="genres" />
    <MoviesBySomething header="Filmy wg obsady" something="cast" />
  </div>
</template>

<script>
import MoviesSearch from '@/components/MoviesSearch';
import MoviesBySomething from "@/components/MoviesBySomething";

export default {
  name: 'App',
  components: {
    MoviesSearch,
    MoviesBySomething
  }
}
</script>
