<template>
  <h1>Filmy wg obsady</h1>
  <div class="row">
    <span v-for="(movies, genre) in Object.fromEntries(Object.entries(moviesByActors).slice(0, counter))"
          class="col-lg-3 col-md-4 col-sm-6 pb-5">
      <ListDisplay :title="genre" :items="movies" />
    </span>
  </div>
  <button class="btn btn-outline-info w-100 mt-2" @click="showMore()"
          v-show="Object.entries(moviesByActors).length > counter">
    Pokaż więcej<br />
    <i class="bi bi-chevron-down"></i>
  </button>
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
      moviesByActors: moviesByActors,
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