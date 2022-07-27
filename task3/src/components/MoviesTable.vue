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
      <tr v-for="movie in movies">
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
  </table>
</template>

<script>
export default {
  name: "MoviesTable",
  props: {
    movies: Array
  }
};
</script>

<style scoped>
  table {
    width: 100%;
  }
</style>