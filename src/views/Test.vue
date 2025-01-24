<template>
    <h1>Testview</h1>

    <button  @click="createImage('https://img.freepik.com/psd-gratuit/table-cafe-bois-ronde-moderne-jambes-coniques-meuble-decoration-interieur-design-minimaliste_632498-27809.jpg?t=st=1737498123~exp=1737501723~hmac=fbcd6c63bfcf5138310baccf7453cd48fecf0ed933baef2b113d6f7323b4add4&w=826',0,0)">
        table
    </button>
    <button  @click="createImage('https://img.freepik.com/psd-gratuit/chaise-bascule-moderne-tissu-gris-cadre-bois_191095-91556.jpg?t=st=1737497866~exp=1737501466~hmac=c4a21514ea924fe5fca673ebe7188bfa5aa526397bcf7ac33447ee50d3fe5f3e&w=826',100,0)">
        chaise
    </button>
    <button  @click="createImage('https://img.freepik.com/vecteurs-libre/illustration-icone-vecteur-dessin-anime-television-heureux-mignon-concept-icone-objet-technologique-isole-plat_138676-6868.jpg?uid=R122294565&ga=GA1.1.888465932.1737135737&semt=ais_incoming',200,0)">
        tv
    </button>
    <button @click="clear"> clear</button>
    <div class="objet"></div>
    <canvas class="canvas"></canvas>
</template>

<script lang="ts" setup>
import { createElementBlock, onMounted, ref } from 'vue';

//const objets = ref<HTMLImageElement[]>([])
const objets = ref<HTMLImageElement[]>([])
//const canvas = document.querySelector('.canvas') as HTMLCanvasElement | null;
//const ctx = canvas?.getContext("2d");
const selectImage = ref({
    img : "",
    x: 0,
    y:0
})
const isDragging = ref(false);

class meuble{
    x:number;
    y:number;
    url:string
    constructor(x: number, y: number, url:string){
        this.x = x;
        this.y = y;
        this.url = url 
    }

    draw(){

    }
}



onMounted(() => {
    console.log("Hello test");

    const canvas = document.querySelector('.canvas') as HTMLCanvasElement | null;

    if (canvas) {
        canvas.width = 1000;
        canvas.height = 1000;

        const ctx = canvas.getContext("2d");
        if (ctx) {
            // Dessiner un rectangle vert
            ctx.fillStyle = "gray";
            ctx.fillRect(10, 10, 600, 600);

            
        } else {
            console.error("Impossible d'obtenir le contexte 2D");
        }
    } else {
        console.error("Canvas introuvable");
    }
});

function createObjet(){
    console.log("click")
    const newObjet = document.createElement("img")
    newObjet.setAttribute('src', "https://static.vecteezy.com/ti/vecteur-libre/p1/21142435-chaise-haut-vue-ligne-icone-vecteur-illustration-vectoriel.jpg")
    objets.value.push(newObjet)
}


function createImage(url : string, x:number, y:number){
    const canvas = document.querySelector('.canvas') as HTMLCanvasElement | null;

    if(canvas) {
        const ctx = canvas.getContext("2d");

        if(ctx) {
            let img = new Image();
            img.src = url
            img.onload = () => {
            ctx.drawImage(img,x,y,100,100)
            };
        }


    }
}




function clear(){
    const canvas = document.querySelector('.canvas') as HTMLCanvasElement | null;

    if(canvas) {
        const ctx = canvas.getContext("2d");

        if(ctx) {
            ctx.clearRect(0,0,canvas.width, canvas.height)
            ctx.fillStyle = "gray";
            ctx.fillRect(10, 10, 600, 600);
        }
    }
}




</script>
