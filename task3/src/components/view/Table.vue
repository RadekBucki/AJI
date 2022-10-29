<template>
  <table class="table table-striped table-hover">
    <thead>
      <tr>
        <th>Tytuł</th>
        <th>Rok produkcji</th>
        <th>Obsada</th>
        <th>Gatunki</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="movie in movies.slice(0, counter)">
        <td>{{ movie.title }}</td>
        <td>{{ movie.year }}</td>
        <td>
          <span v-for="actor in movie.cast">
            {{ actor }}<br />
          </span>
        </td>
        <td>
          <span v-for="genre in movie.genres">
            {{ genre }}<br />
          </span>
        </td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="4" class="text-center">
          <button class="btn btn-outline-info w-100" @click="showMore" v-show="movies.length > counter">
            Pokaż więcej<br/>Wyświetlane pierwsze {{counter}} z {{movies.length}}<br/>
            <i class="bi bi-chevron-down"></i>
          </button>
        </td>
      </tr>
    </tfoot>
  </table>
</template>

<script>
export default {
  name: "Table",
  props: {
    movies: Array
  },
  data() {
    return {
      counter: 10,
    }
  },
  methods: {
    showMore() {
      this.counter += 10;
    }
  },
  watch: {
    movies: function () {
      this.counter = 10;
    }
  }
};
</script>

<style scoped>
table {
  width: 100%;
}
</style>
