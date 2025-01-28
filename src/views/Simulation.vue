<template>
    <h1>Page Simulation</h1>

    <div class="flex">
        <div>
            <button  @click="createImage(0,5,'https://img.freepik.com/psd-gratuit/table-cafe-bois-ronde-moderne-jambes-coniques-meuble-decoration-interieur-design-minimaliste_632498-27809.jpg?t=st=1737498123~exp=1737501723~hmac=fbcd6c63bfcf5138310baccf7453cd48fecf0ed933baef2b113d6f7323b4add4&w=826')">
                table
            </button>
            <button  @click="createImage(100,5,'https://img.freepik.com/psd-gratuit/chaise-bascule-moderne-tissu-gris-cadre-bois_191095-91556.jpg?t=st=1737497866~exp=1737501466~hmac=c4a21514ea924fe5fca673ebe7188bfa5aa526397bcf7ac33447ee50d3fe5f3e&w=826')">
                chaise
            </button>
            <button  @click="createImage(200,5,'https://img.freepik.com/vecteurs-libre/illustration-icone-vecteur-dessin-anime-television-heureux-mignon-concept-icone-objet-technologique-isole-plat_138676-6868.jpg?uid=R122294565&ga=GA1.1.888465932.1737135737&semt=ais_incoming')">
                tv
            </button>
            <button @click="clear"> clear</button>
        </div>
    
        <div class="objet"></div>
    </div>


    <canvas 
        class="canvas" 
        @mousedown="startDrag"
        @mousemove="drag"
        @mouseup="stopDrag"
        ></canvas>
        @click="e=>clickCanvas(e)"
</template>

<script lang="ts" setup>
import { createElementBlock , onMounted, reactive, ref } from 'vue';

const canvas = document.querySelector('.canvas') as HTMLCanvasElement | null;
const objets: NewObjet[] = [] // table for newObjet

interface NewObjet {
    x:number,
    y:number,
    url:string,
    selected:boolean
}

let isDragging = false;
let currentObject: NewObjet | null = null;

onMounted(() => {
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

    //update()
});

// function pour button afficher des images sur canvas
function createImage(x:number, y:number,url : string ){
    const canvas = document.querySelector('.canvas') as HTMLCanvasElement | null;

    if(canvas) {
        const ctx = canvas.getContext("2d");

        if(ctx) {
            let img = new Image();
            img.src = url
            img.onload = () => {
            ctx.drawImage(img,x,y,100,100) // taille image 100px 100px 
            //console.log(x,y,url)
            objets.push({x,y,url,selected:false })

            console.log(objets)
            };
        }
    }
}

// pour button effacer des images
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



/// détecter les élémént image au mement de click sur canvas -> detecter INDEX
function startDrag(event:MouseEvent) {
    /// position click sur window
    //console.log( "event" + event.x +" "+ event.y)

    const canvas = document.querySelector('.canvas') as HTMLCanvasElement | null;
    if(canvas ){
        /// position canvas sur window
        const canvasPosition = canvas.getBoundingClientRect();
        //console.log("relatif canvas : "+canvasPosition.top +" " + canvasPosition.left)

        /// position click sur canvas element (salle carré) 
        const canvasPointX = event.clientX - canvasPosition.left
        const canvasPointY = event.clientY - canvasPosition.top
        //console.log("position click sur canvas  : " + canvasPointX + " " + canvasPointY) 
        
        /// Vérifier si le clic est sur une image, si il y a un image isDruggin=true
        objets.forEach((selected) => {
            //console.log("selectedX :", selected.x, "selectedY :", selected.y);
            if (
                canvasPointX >= selected.x && // Clic x et left de l'image
                canvasPointX <= selected.x + 100 && // Clic x et right de l'image
                canvasPointY >= selected.y && // Clic y et  de top l'image
                canvasPointY <= selected.y + 100 // Clic y et bottom de l'image
            ) {
                console.log("Collision détectée sur l'image à :", selected.x, selected.y);
               // selected.selected = true; // Changer la variable `selected` à true

            } else {
                console.log('aucun image détecté')
               // selected.selected = false; // Réinitialiser si pas cliqué
            }

            isDragging=true
            console.log(objets) // pour verifier le valeur selected
        });

    }
}

// DRUG , déplacer des element 
function drag(event : MouseEvent) {

    console.log("mousedown")
    console.log(isDragging)

    const canvas = document.querySelector('.canvas') as HTMLCanvasElement | null;
    if(canvas && isDragging) {
        console.log("drug objet")

        
        /*const canvasPosition = canvas.getBoundingClientRect();
        const mouseX = event.clientX - canvasPosition.left;
        const mouseY = event.clientY - canvasPosition.top;
        console.log(`Mouse down at canvas position: X=${mouseX}, Y=${mouseY}`);

        addEventListener("mousedown", (event) => {
            console.log(event)
        })*/
    }
}

function stopDrag() {
    isDragging=false
    console.log("stop drug")
    console.log(isDragging)
}








/*interface EventClick extends Event {
    x:number
    y:number
}*/

/*class meuble{
    x:number;
    y:number;
    url:string
    image : HtmlImageElement
    constructor(x: number, y: number, url:string){
        this.x = x;
        this.y = y;
        this.url = url 
        img.src = url
        img.onload = () => {
        let newObjet =  ctx.drawImage(img,x,y,100,100)
            };
    }

    draw(){
   
    }
}*/


</script>

<style scoped>
    .flex {
        display: flex;
    }
</style>