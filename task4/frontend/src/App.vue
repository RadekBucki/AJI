<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary px-2">
    <a class="navbar-brand" href="#">Vue&Express Shop</a>
    <ul class="navbar-nav">
      <li class="nav-item">
        <router-link class="nav-link" to="/">Home</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/about">About</router-link>
      </li>
    </ul>
  </nav>

  <div class="container mt-4">
    <router-view />
  </div>
</template>

<style>
.router-link-active {
  color: white !important;
}
</style>
