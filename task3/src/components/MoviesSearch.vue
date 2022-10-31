<template>
  <h1>Baza filmów</h1>
  <form>
    <div class="form-group">
      <label for=inputTitle>Tytuł</label>
      <input type="text" id=inputTitle v-model="filters.title" v-on:keyup.enter="search" v-on:keyup.esc="clear('title')"
             class="form-control" placeholder="Podaj tytuł lub fragment tytułu filmu" />
    </div>
    <div class="form-group row">
      <label class="col-sm-4 col-form-label" for="inputProductionFrom">Rok produkcji od:</label>
      <div class="col-sm-8">
        <input type="number" min="1900" max="2019" id=inputProductionFrom v-model="filters.yearFrom"
               v-on:keyup.enter="search" v-on:keyup.esc="clear('yearFrom')" class="form-control"
               placeholder="Liczba naturalna z przedziału 1900-2019" />
      </div>
    </div>
    <div class="form-group row">
      <label class="col-sm-4 col-form-label" for="inputProductionTo">Rok produkcji do:</label>
      <div class="col-sm-8">
        <input type="number" min="1900" max="2019" id=inputProductionTo v-model="filters.yearTo"
               v-on:keyup.enter="search" v-on:keyup.esc="clear('yearTo')" class="form-control"
               placeholder="Liczba naturalna z przedziału 1900-2019" />
      </div>
    </div>
    <div class="form-group">
      <label for="inputCast">Obsada</label>
      <input type="text" id="inputCast" v-model="filters.cast" v-on:keyup.enter="search" v-on:keyup.esc="clear(filters.cast)"
             class="form-control" placeholder="Imię i nazwisko" />
    </div>
    <div class="form-group row">
      <input type="button" class="btn btn-info col-sm-12" value="Szukaj" @click="search" />
    </div>
  </form>
  <MoviesTable :movies="json" />
</template>

<script>
import {_} from 'vue-underscore';
import MoviesTable from "@/components/view/Table";

export default {
  name: "MoviesSearch",
  props: {
    jsonData: Array,
  },
  data() {
    return {
      json: _.clone(this.$props.jsonData),
      filters: {
        title: '',
        yearFrom: '',
        yearTo: '',
        cast: ''
      }
    }
  },
  components: {
    MoviesTable
  },
  methods: {
    search() {
      let fullJson = this.$props.jsonData;
      let filters = this.filters;
      this.json = _.filter(fullJson, (record) => {
        return record.title.toLowerCase().includes(filters.title.toLowerCase()) &&
            record.cast.join().includes(filters.cast) &&
            (
                filters.yearFrom === '' || record.year >= filters.yearFrom
            ) &&
            (
                filters.yearTo === '' || record.year <= filters.yearTo
            );
      });
    },
    clear(stringToClear) {
      this.filters[stringToClear] = '';
      this.search();
    }
  }
}
</script>
