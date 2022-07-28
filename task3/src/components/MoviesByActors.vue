<template>
  <h1>Filmy wg obsady</h1>
  <span v-for="(movies, genre) in moviesByGenres">
    <ListDisplay :title="genre" :items="movies" />
  </span>
</template>

<script>
import {_} from 'vue-underscore';
import json from "@/assets/movies.json"
import ListDisplay from "@/components/view/List";

let moviesByActors = {};
_.forEach(json, (record) => {
  _.forEach(record.cast, (actor) => {
    if (actor in moviesByActors) {
      moviesByActors[actor].push(record.title);
    } else {
      moviesByActors[actor] = [record.title];
    }
  });
});

let counter = {}
_.forEach(moviesByActors, (movies, genre) => {
  counter[genre] = 10;
});
export default {
  name: "MoviesByActors",
  components: {
    ListDisplay
  },
  data() {
    return {
      moviesByGenres: moviesByActors
    }
  }
}
</script>

<style scoped>

</style>