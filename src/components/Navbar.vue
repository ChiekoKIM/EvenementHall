<template>
  <nav class="navbar">
    <div class="logo">
      <router-link to="/">Evenment-Hall</router-link>
    </div>

    <p class="title">Concevez votre espace</p>


    <div class="link">
      <router-link to="/Test">Go to Test</router-link>
    </div>
    <div class="link">
      <router-link to="/Simulation">Go to Simulation</router-link>
    </div>
  </nav>
</template>


<script setup>
</script>



<style scoped>
.navbar {
  text-align: center;
  padding: 10px 20px;
  color: #f2a65d;
}

.logo a {
  font-size: 4rem;
  font-weight: 800;   
  color: #f2a65d;
  text-decoration: none;
}

.title {
  font-size: 2rem;
  font-weight: 700;
  color: #b8d597;
  line-height: 0;
}

.link a {
  text-decoration: none;
  color: #f2a65d;
}

.nav-links {
  list-style: none;
}

.nav-links li a {
  text-decoration: none;
  color: #f2a65d;
  font-size: 1rem;
  transition: color 0.3s;
}

.nav-links li a:hover {
  color: #ee7fb5;
}
</style>
