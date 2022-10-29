<template>
  <h1>{{ header }}</h1>
  <div class="row">
    <span v-for="[key, value] of Array.from(moviesBySomething).slice(0, counter)"
          class="col-lg-3 col-md-4 col-sm-6 pb-5">
      <ListDisplay :title="key" :items="value"/>
    </span>
  </div>
  <button class="btn btn-outline-info w-100 mt-2" @click="showMore()"
          v-show="moviesBySomething.size > counter">
    Pokaż więcej<br/>
    <i class="bi bi-chevron-down"></i>
  </button>
</template>

<script>
import {_} from 'vue-underscore';
import ListDisplay from "@/components/view/List";

export default {
  name: "MoviesBySomething",
  props: {
    header: String,
    something: String,
    jsonData: Array
  },
  data() {
    return {
      counter: 12
    }
  },
  setup(props) {
    let moviesBySomething = new Map();
    _.forEach(props.jsonData, (record) => {
      _.forEach(record[props.something], (item) => {
        if (!(moviesBySomething.has(item))) {
          moviesBySomething.set(item,[]);
        }
        moviesBySomething.get(item).push(record.title);
      });
    });
    return {
      moviesBySomething
    }
  },
  components: {
    ListDisplay
  },
  methods: {
    showMore() {
      this.counter += 12;
    }
  }
}
</script>
