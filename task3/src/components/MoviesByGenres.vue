<template>
  <h1>Filmy wg gatunku</h1>
  <div class="row">
    <span v-for="(movies, genre) in Object.fromEntries(Object.entries(moviesByGenres).slice(0, counter))"
          class="col-lg-3 col-md-4 col-sm-6 pb-5">
        <ListDisplay :title="genre" :items="movies" />
    </span>
  </div>
  <button class="btn btn-outline-info w-100 mt-2" @click="showMore()"
          v-show="Object.entries(moviesByGenres).length > counter">
    Pokaż więcej<br />
    <i class="bi bi-chevron-down"></i>
  </button>
</template>

<script>
import {_} from 'vue-underscore';
import json from "@/assets/movies.json"
import ListDisplay from "@/components/view/List";

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

export default {
  name: "MoviesByGenres",
  components: {
    ListDisplay
  },
  data() {
    return {
      moviesByGenres: moviesByGenres,
      counter: 12
    }
  },
  methods: {
    showMore() {
      this.counter += 12;
    }
  }
}
</script>

<style scoped>

</style>