<template>
  <div class="card">
    <Form @submit.prevent="connexion">
      <h1>Page de connexion</h1>

      <ul>
        <li>Name</li>
        <input v-model="name" type="text" />

        <li>Password</li>
        <input v-model="password" type="text" />
      </ul>

      <div class="flex">
        <button @click="connexion" type="submit">submit</button>
      </div>
    </Form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const name = ref("");
const password = ref("");
const router = useRouter();

function connexion() {
  if (password.value === "1234") {
    console.log("password ok");
    router.push({ path: "SimulationSalle" });
  } else {
    console.log("password incorrect");
  }
}
</script>

<style>
form {
  background-color: rgb(253, 253, 253);
  border-radius: 10px;
  margin: 5rem;
  padding-inline: 8rem;
  padding-block: 4rem;
  border: 3px solid #ee7fb5;
}

.card {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

h1 {
  margin-bottom: 5rem;
}

input {
  border: none;
  padding: 8px;
  margin: 8px;
  border: 3px solid #ee7fb5;
  border-radius: 5px;
}

ul {
  list-style-type: none;
  font-size: large;
  text-align: start;
}

button {
  color: #fff7fb;
  font-size: large;
  border: none;
  border-radius: 5px;
  padding: 0.8rem;
  background-color: #ee7fb5;
}

.flex {
  display: flex;
  justify-content: end;
}
</style>
