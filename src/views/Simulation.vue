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


    <canvas class="canvas" @click="e=>clickCanvas(e)"></canvas>
</template>

<script lang="ts" setup>
import { createElementBlock, onMounted, reactive, ref } from 'vue';

//const objets = ref<HTMLImageElement[]>([])
interface NewObjet {
    x:number,
    y:number,
    url:string,
    selected:boolean
}
const objets: NewObjet[] = [] // table for newObjet

interface EventClick extends Event {
    x:number
    y:number
}

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

    //update()
});

/*function createObjet(){
    console.log("click")
    const newObjet = document.createElement("img")
    newObjet.setAttribute('src', "https://static.vecteezy.com/ti/vecteur-libre/p1/21142435-chaise-haut-vue-ligne-icone-vecteur-illustration-vectoriel.jpg")
    objets.value.push(newObjet)
}*/

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
            console.log(x,y,url)
            objets.push({x,y,url,selected:false })

            console.log(objets)
            };
        }
    }
}

// détecter les élémént image au mement de click sur canvas
function clickCanvas(event:MouseEvent) {
    // position click sur window
    //console.log( "event" + event.x +" "+ event.y)

    const canvas = document.querySelector('.canvas') as HTMLCanvasElement | null;
    if(canvas ){
        // position canvas sur window
        const canvasPosition = canvas.getBoundingClientRect();
        console.log("relatif canvas : "+canvasPosition.top +" " + canvasPosition.left)
        // position click sur canvas element
        const canvasPointX = event.clientX - canvasPosition.left
        const canvasPointY = event.clientY - canvasPosition.top
        console.log("position click sur canvas  : " + canvasPointX + " " + canvasPointY) 
        
        // Vérifier si le clic est sur une image
        objets.forEach((selected) => {
            console.log("selectedX :", selected.x, "selectedY :", selected.y);

            if (
                canvasPointX >= selected.x && // Clic x et gleft de l'image
                canvasPointX <= selected.x + 100 && // Clic x et right de l'image
                canvasPointY >= selected.y && // Clic y et  de top l'image
                canvasPointY <= selected.y + 100 // Clic y et bottom de l'image
            ) {
                console.log("Collision détectée sur l'image à :", selected.x, selected.y);
                selected.selected = true; // Changer la variable `selected` à true
            } else {
                selected.selected = false; // Réinitialiser si pas cliqué
                console.log('aucun image détecté')
            }

            console.log(objets) // pour verifier le valeur selected

            // deplacer 7
            const mouseX = event.clientX - canvasPosition.left;
            const mouseY = event.clientY - canvasPosition.top;
            console.log(`Mouse down at canvas position: X=${mouseX}, Y=${mouseY}`);

            addEventListener("mousedown", (event) => {

                console.log(event)
            })
        });

    }
}





function update(event:MouseEvent){
        //let animation = requestAnimationFrame(update)
        objets.forEach(obj=>{

            if(obj.selected) {
                //mousedown point x y  = objet x y

            }
            //obj.draw();
        })

}




// button effacer des images
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

<style scoped>
    .flex {
        display: flex;
    }
</style>