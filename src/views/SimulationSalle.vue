<template>
  <h1>Page Simulation de salle</h1>

  changer la taille de image selectioné
  <button @click="expandImage">Image plus grand</button>
  <button @click="reduceImage">Image plus petit</button>
  <div class="flex">
    <div class="blocBtn">
      <button
        @click="
          createImage(
            0,
            5,
            'https://img.freepik.com/psd-gratuit/table-cafe-bois-ronde-moderne-jambes-coniques-meuble-decoration-interieur-design-minimaliste_632498-27809.jpg?t=st=1737498123~exp=1737501723~hmac=fbcd6c63bfcf5138310baccf7453cd48fecf0ed933baef2b113d6f7323b4add4&w=826'
          )
        "
      >
        <img src="/src/assets/icon/table.png" alt="Button Table" />
        Table
      </button>

      <button
        @click="
          createImage(
            100,
            5,
            'https://img.freepik.com/psd-gratuit/chaise-bascule-moderne-tissu-gris-cadre-bois_191095-91556.jpg?t=st=1737497866~exp=1737501466~hmac=c4a21514ea924fe5fca673ebe7188bfa5aa526397bcf7ac33447ee50d3fe5f3e&w=826'
          )
        "
      >
        <img src="/src/assets/icon/chaise-de-bureau.png" alt="Button Chaise" />
        Chaise
      </button>
      <button
        @click="
          createImage(
            200,
            5,
            'https://img.freepik.com/vecteurs-libre/illustration-icone-vecteur-dessin-anime-television-heureux-mignon-concept-icone-objet-technologique-isole-plat_138676-6868.jpg?uid=R122294565&ga=GA1.1.888465932.1737135737&semt=ais_incoming'
          )
        "
      >
        <img src="/src/assets/icon/moniteur.png" alt="Button tv" />
        TV
      </button>
      <button @click="clear">Clear</button>
      <button @click="saveToLocalStorage">
        <img src="/src/assets/icon/save-icon.png" alt="Save Button">
        Save
      </button>
    </div>

    <canvas
      ref="canvas"
      class="canvas"
      @mousedown="startDrag"
      @mousemove="drag"
      @mouseup="stopDrag"
    ></canvas>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";

const canvas = ref<HTMLCanvasElement | null>(null);
let ctx: CanvasRenderingContext2D | null = null;

const objets: NewObjet[] = []; // NewObjet = 1 image = un article ajouté au canva

interface NewObjet {
  x: number;
  y: number;
  url?: string;
  selected: boolean;
  img: HTMLImageElement;
  width: number;
  height: number;
}

let isDragging = false;
let currentObject: NewObjet | null = null;

//Initialisation dessine rectongle gray
onMounted(() => {
  loadSavedCanvas()
  initCanvas();
});

function loadSavedCanvas() {
  let saved = localStorage.getItem("savedCanvases")
  let savedCanvases = saved ? JSON.parse(saved) : []
  console.log(savedCanvases);
}

function initCanvas() {
  if (!canvas.value) {
    return;
  }

  canvas.value.width = 1000;
  canvas.value.height = 1000;

  ctx = canvas.value.getContext("2d");

  if (!ctx) return;

  ctx.fillStyle = "gray";
  ctx.fillRect(10, 10, 600, 600);

  update();
}

//function boucle refraiche page pour dessiner
function update() {
  drawCanvas();
  let animation = requestAnimationFrame(update);
}

// redessiner un carre et des objets
function drawCanvas() {
  //const canvas = document.querySelector('.canvas') as HTMLCanvasElement | null;
  if (!canvas.value) {
    return;
  }

  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
  ctx.fillStyle = "gray";
  ctx.fillRect(10, 10, 600, 600);

  objets.forEach((obj) => {
    if (!ctx) return;
    if (obj.url) {
      ctx.drawImage(obj.img, obj.x, obj.y, obj.width, obj.height);
    }
    else {
      ctx.fillStyle = "red";
      ctx.fillRect(obj.x, obj.y, obj.width, obj.height)
    }
  });
}
// function pour button afficher des images sur canvas
function createImage(x: number, y: number, url: string) {
  if (!canvas) {
    return;
  }

  let img = new Image();
  img.src = url;
  img.onload = () => {
    if (!ctx) return;
    ctx.drawImage(img, x, y, 100, 100); //taille d'image 100px 100px
    //console.log(x,y,url)
    objets.push({ x, y, url, selected: false, img, width: 100, height: 100 });

    console.log(objets); // verifier les tableau
  };
}

// pour button effacer des images
function clear() {
  if (!canvas.value) {
    return;
  }

  if (!ctx) return;
  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
  ctx.fillStyle = "#a8a6a6";
  ctx.fillRect(10, 10, 600, 600);

  objets.length = 0; // vider dans le tableau
}

/// startdrug -> detecter INDEX
function startDrag(event: MouseEvent) {
  console.log("start drag");

  if (!canvas.value) {
    return;
  }

  const canvasPosition = canvas.value.getBoundingClientRect(); // position de canvas sur window

  const mouseX = event.clientX - canvasPosition.left;
  const mouseY = event.clientY - canvasPosition.top;

  currentObject = getClickObjet(mouseX, mouseY); // image detecté = currentObjet

  if (currentObject) {
    isDragging = true;
    currentObject.selected = true;
  }
}

// detecter l'objet cliqué
function getClickObjet(x: number, y: number) {
  return (
    objets.find((selected) => {
      if (
        x >= selected.x && // Clic x et left de l'image
        x <= selected.x + 100 && // Clic x et right de l'image
        y >= selected.y && // Clic y et  de top l'image
        y <= selected.y + 100 // Clic y et bottom de l'image
      ) {
        console.log("Collision détectée à :", selected.x, selected.y);
        console.log("selected element : " + selected);
        return selected;
      } else {
        console.log("aucun image détecté");
      }
    }) || null
  );
}

// Drag et déplacer des element /
function drag(event: MouseEvent) {
  //console.log("mousedown")
  //console.log(isDragging) // true

  if (canvas.value && isDragging && currentObject) {
    const canvasPosition = canvas.value.getBoundingClientRect();
    const mouseX = event.clientX - canvasPosition.left;
    const mouseY = event.clientY - canvasPosition.top;

    currentObject.x = mouseX - 50;
    currentObject.y = mouseY - 50;

    drawCanvas(); // function redessiner un image
  }
}

function stopDrag() {
  isDragging = false;
  //console.log("stop drug")
  //console.log(isDragging) // false
}

// function grandir des image
function expandImage() {
  if (currentObject) {
    currentObject.width += 10;
    currentObject.height += 10;
    console.log(currentObject.width);
    drawCanvas();
  }
}

// function diminuer de taille de image
function reduceImage() {
  if (currentObject) {
    currentObject.width -= 10;
    currentObject.height -= 10;
    console.log(currentObject.width);
    drawCanvas();
  }
}

// function save to LocalStorage
function saveToLocalStorage() {

  if (objets.length === 0) {
    alert("Aucun objet à sauvegarder !")
    return;
  }

  const name = prompt("Nom de la configuration du canvas :")
  if (!name) return;

  // Récupérer les configurations existantes
  let saved = localStorage.getItem("savedCanvases")
  let savedCanvases = saved ? JSON.parse(saved) : []

  // Vérifier si un canvas avec ce nom existe déjà
  const nameExists = savedCanvases.some((config: any) => config.name === name)
  if (nameExists) {
    alert("Une configuration avec ce nom existe déjà. Veuillez choisir un autre nom.")
    return;
  }

  // Créer une configuration avec un ID unique
  const newConfig = {
    id: Date.now(),
    name,
    objects: [...objets], // Sauvegarde une copie des objets actuels
  };

  // Ajouter la nouvelle configuration et sauvegarder
  savedCanvases.push(newConfig)
  console.log(savedCanvases)

  localStorage.setItem("savedCanvases", JSON.stringify(savedCanvases)); // Enregistrement dans LocalStorage

  alert("Configuration sauvegardée !")
}
</script>

<style scoped>
.flex {
  width: 100vh;
  margin: 0 auto;
  display: flex;
}

.blocBtn {
  background-color: #fdf2e7;
  padding: 1.5rem;
  margin-right: 2rem;
  margin-top: 0.5rem;
  height: 35rem;
  border-radius: 5px;
}

button {
  width: 4rem;
  height: 4rem;
  margin: 2.5rem;
  background-color: #fcf7f1;
  border: #a8a6a6 solid 2px;
  border-radius: 5px;
}

button:hover {
  background-color: #c0b9b2;
}

img {
  width: 2rem;
}
</style>
