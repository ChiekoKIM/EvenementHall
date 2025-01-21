<script setup lang="ts">

</script>

<template>

  <!--<nav>
    <RouterLink to="/">Evenment-Hall</RouterLink>
    <RouterLink to="/test">Go to Test</RouterLink>
  </nav>-->

  <Navbar />


  <main>
    <RouterView />
  </main>
</template>


<script setup>
import Navbar from './components/Navbar.vue';
</script>

<style>
/* Styles globaux ici */
</style>
