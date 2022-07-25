<template>
  <div class="container">
    <MoviesSearch/>
    <MoviesTable/>
    <MoviesByGenres/>
    <MoviesByActors/>
  </div>
</template>

<script>
import MoviesSearch from '@/components/MoviesSearch';
import MoviesTable from "@/components/MoviesTable";
import MoviesByGenres from "@/components/MoviesByGenres";
import MoviesByActors from "@/components/MoviesByActors";

export default {
  name: 'App',
  components: {
    MoviesSearch,
    MoviesTable,
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
