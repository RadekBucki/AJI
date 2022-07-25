<template>
  <div class="container">
    <MoviesSearch/>
    <MoviesByGenres/>
    <MoviesByActors/>
  </div>
</template>

<script>
import MoviesSearch from '@/components/MoviesSearch';
import MoviesByGenres from "@/components/MoviesByGenres";
import MoviesByActors from "@/components/MoviesByActors";

export default {
  name: 'App',
  components: {
    MoviesSearch,
    MoviesByGenres,
    MoviesByActors
  }
}
</script>

<style>
.task {
  color:red;
}

.task-done {
  color:lightgreen;
}
</style>
