<template>
  <div>
    <h1>Filmy wg gatunku</h1>
    <span v-for="(movies, genre) in moviesByGenres">
    <ListDisplay :title="genre" :items="movies" />
  </span>
  </div>
</template>

<script>
import {_} from 'vue-underscore';
import json from "@/assets/movies.json"
import ListDisplay from "@/components/ListDisplay";

let moviesByGenres = {};
_.forEach(json, (record) => {
  _.forEach(record.genres, (genre) => {
    if (genre in moviesByGenres) {
      moviesByGenres[genre].push(record.title);
    } else {
      moviesByGenres[genre] = [record.title];
    }
  });
});

let counter = {}
_.forEach(moviesByGenres, (movies, genre) => {
  counter[genre] = 10;
});
export default {
  name: "MoviesByGenres",
  components: {
    ListDisplay
  },
  data() {
    return {
      moviesByGenres: moviesByGenres
    }
  }
}
</script>

<style scoped>

</style>