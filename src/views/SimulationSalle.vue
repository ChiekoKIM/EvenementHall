<template>
    <h1>Page Simulation de salle</h1>

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

</template>

<script lang="ts" setup>
import { onMounted } from 'vue';

const canvas = document.querySelector('.canvas') as HTMLCanvasElement | null;
//const ctx = canvas.getContext("2d") || null;

const objets: NewObjet[] = [] // table for newObjet

interface NewObjet {
    x:number,
    y:number,
    url:any,
    selected:boolean,
    img:HTMLImageElement
}

let isDragging = false;
let currentObject: NewObjet | null = null;

//Initialisation dessine rectongle gray
onMounted(() => {
    const canvas = document.querySelector('.canvas') as HTMLCanvasElement | null;

    if (canvas) {
        canvas.width = 1000;
        canvas.height = 1000;

        const ctx = canvas.getContext("2d");
        if (ctx) {
            ctx.fillStyle = "gray";
            ctx.fillRect(10, 10, 600, 600);
        } else {
            console.error("Impossible d'obtenir le contexte 2D");
        }
    } else {
        console.error("Canvas introuvable");
    }

    update()
});

//function boucle pour dessiner 
function update(){
        drawCanvas()
        let animation = requestAnimationFrame(update)
}
// redessiner un carre et des objets
function drawCanvas() {

    const canvas = document.querySelector('.canvas') as HTMLCanvasElement | null;

    if(canvas) {
        const ctx = canvas.getContext("2d");

        if(ctx) {
            ctx.clearRect(0,0,canvas.width, canvas.height)
            ctx.fillStyle = "gray";
            ctx.fillRect(10, 10, 600, 600);

            objets.forEach((obj) => {
            if (obj.url) {
                ctx.drawImage(obj.img, obj.x, obj.y, 100,100)
            }
            });
        }
    }
}
// function pour button afficher des images sur canvas
function createImage(x:number, y:number,url : string ){
    const canvas = document.querySelector('.canvas') as HTMLCanvasElement | null;

    if(canvas) {
        const ctx = canvas.getContext("2d");

        if(ctx) {
            let img = new Image();
            img.src = url
            img.onload = () => {
            ctx.drawImage(img,x,y,100,100) //taille d'image 100px 100px 
            //console.log(x,y,url)
            objets.push({x,y,url,selected:false,img })

            console.log(objets) // verifier les tableau 
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
            
            objets.length=0; // vider dans le tableau
        }
    }
}


/// startdrug -> detecter INDEX
function startDrag(event:MouseEvent) {
    console.log("start drag")

    const canvas = document.querySelector('.canvas') as HTMLCanvasElement | null;
    if(canvas ){
        const canvasPosition = canvas.getBoundingClientRect(); // position de canvas sur window 

        const mouseX = event.clientX - canvasPosition.left 
        const mouseY = event.clientY - canvasPosition.top

        currentObject = getClickObjet(mouseX,mouseY) // image detecté = currentObjet

        
        if(currentObject) {
            isDragging=true
            currentObject.selected=true
        }

    }
}

// detecter l'objet cliqué
function getClickObjet(x: number, y:number){
   return objets.find((selected) => {
         if (
                x >= selected.x && // Clic x et left de l'image
                x <= selected.x + 100 && // Clic x et right de l'image
                y >= selected.y && // Clic y et  de top l'image
                y <= selected.y + 100 // Clic y et bottom de l'image
            ) {
                console.log("Collision détectée à :", selected.x, selected.y);
                console.log("selected element : " + selected )
                return selected
            } else {
                console.log('aucun image détecté')
            }
        }) || null;
}

// Drag et déplacer des element / 
function drag(event : MouseEvent) {

    //console.log("mousedown")
    //console.log(isDragging) // true

    const canvas = document.querySelector('.canvas') as HTMLCanvasElement | null;
    if(canvas && isDragging && currentObject) {
        //console.log("drug objet")

        const canvasPosition = canvas.getBoundingClientRect();
        const mouseX = event.clientX - canvasPosition.left;
        const mouseY = event.clientY - canvasPosition.top;

        currentObject.x = mouseX -50 ;
        currentObject.y = mouseY-50;

        drawCanvas() // function redessiner un image
    }
}

function stopDrag() {
    isDragging=false
    //console.log("stop drug")
    //console.log(isDragging) // false
}





</script>

<style scoped>

</style>