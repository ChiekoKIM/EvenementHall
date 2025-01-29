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
        <button @click="connexion" type="submit" class="submitBtn">
          Valider
        </button>
      </div>
    </Form>

    <p>name : {{ name }}</p>
    <p>input : {{ password }}</p>
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
  background-color: antiquewhite;
  padding: 2rem;
  border-radius: 5px;
}

h1 {
  margin-bottom: 2rem;
}

.card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
}

.submitBtn {
  font-size: 1rem;
  background-color: #ee7fb5;
  padding: 0.7rem;
  border: none;
  border-radius: 5px;
}

.flex {
  display: flex;
  justify-content: end;
  margin-right: 3rem;
}

input {
  border: none;
  padding: 8px;
  margin: 8px;
}

ul {
  list-style-type: none;
}
</style>
