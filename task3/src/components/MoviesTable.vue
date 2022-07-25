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
        <td>{{ movie.cast.join('\n') }}</td>
        <td>{{ movie.genres.join('\n') }}</td>
      </tr>
    </tbody>
  </table>
  <em class="task">W tabeli należy poprawić wyświetlanie pól z obsadą i gatunkiem. Należy opuścić nawiasy
                   kwadratowe</em>
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

</style>