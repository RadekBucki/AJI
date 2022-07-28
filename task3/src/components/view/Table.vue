<template>
  <table class="table-condensed table-hover">
    <thead>
      <tr>
        <th>Title</th>
        <th>Production Year</th>
        <th>Cast</th>
        <th>Genres</th>
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
          <button class="btn btn-outline-info" @click="showMore">
            Pokaż więcej<br />
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
  }
};
</script>

<style scoped>
table {
  width: 100%;
}
</style>