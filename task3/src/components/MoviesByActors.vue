<template>
  <h1>Filmy wg obsady</h1>
  <div class="row">
    <span v-for="(movies, genre) in moviesByGenres" class="col-lg-3 col-md-4 col-sm-6 pb-5">
      <ListDisplay :title="genre" :items="movies" />
    </span>
  </div>
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