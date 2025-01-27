
<template>

    <h1 draggable="true">EvenementHall</h1>

    <div class="card">
        
        <Form @submit.prevent="connexion">
            <h1>Page de connexion</h1>

            <ul>
                <li>Name</li>
                <input v-model="name" type="text">
                
                <li>Password</li>
                <input v-model="password" type="text">
            </ul>
            <button @click="connexion" type="submit" >submit</button>
            <button @click="test" type="submit" >test</button>
        </Form>
    
        <p>{{ name }}</p>
        <p>{{ password }}</p>
    </div>


</template>

<script lang=ts setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const name = ref("");
const password = ref("");
const router  = useRouter()

function connexion(){
    if(password.value==="1234"){
        console.log("password ok")
        router.push({path: 'Simulation'})
    } else {
        console.log("password incorrect")
    }
}

function test(){
    router.push("/Simulation2")

}

</script>

<style>

form {
    background-color: antiquewhite;
    padding:100px;
}

.card {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
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
