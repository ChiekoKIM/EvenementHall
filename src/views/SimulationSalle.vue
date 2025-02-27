<template>
  <div class="flex">
    <div class="blocBtn">
      <p class="title">Elements</p>
      <div class="flex">
        <button
          @click="createImage(0, 5, '/src/assets/elements/Round-Table-1.png')"
        >
          <img
            src="/src/assets/elements/Round-Table-1.png"
            alt="Button Table"
          />
          <p>Table Rond</p>
        </button>

        <button @click="createImage(0, 5, '/src/assets/elements/Table-1.png')">
          <img src="/src/assets/elements/Table-1.png" />
          <p>Table Carré</p>
        </button>
      </div>

      <div class="flex">
        <button @click="createImage(100, 5, '/src/assets/elements/Seat-1.png')">
          <img src="/src/assets/elements/Seat-1.png" />
          <p>Chaise</p>
        </button>

        <button @click="createImage(100, 5, '/src/assets/elements/Sofa-1.png')">
          <img src="/src/assets/elements/Sofa-1.png" />
          <p>Canapé</p>
        </button>
      </div>

      <div class="flex">
        <button @click="createImage(0, 5, '/src/assets/elements/Lamp-1.png')">
          <img src="/src/assets/elements/Lamp-1.png" />
          <p>Lamp</p>
        </button>

        <button @click="createImage(0, 5, '/src/assets/elements/Plant-1.png')">
          <img src="/src/assets/elements/Plant-1.png/" id="plantImg" />
          <p>Plant</p>
        </button>
      </div>

      <div class="flex">
        <button @click="createImage(200, 5, '/src/assets/elements/Tv-1.png')">
          <img src="/src/assets/elements/Tv-1.png" alt="Button tv" />
          <p>TV</p>
        </button>
      </div>

      <div class="flex">
        <button @click="clear">
          <img
            src="/src/assets/icon/supprimer.png"
            alt="Save Button"
            class="icon"
          />
          <p>Tous effacer</p>
        </button>
        <button @click="saveConfig(config)">
          <img
            src="/src/assets/icon/save-icon.png"
            alt="Save Button"
            class="icon"
          />
          <p>Save</p>
        </button>
      </div>
    </div>

    <canvas
      ref="canvas"
      class="canvas"
      @mousedown="startDrag"
      @mousemove="drag"
      @mouseup="stopDrag"
    ></canvas>

    <div class="blocBtn">
      <p class="title">Taille image</p>
      <div class="flex">
        <button @click="reduceImage">
          <img src="/src/assets/icon/moins.png" class="icon" />
        </button>
        <button @click="expandImage">
          <img src="/src/assets/icon/plus.png" class="icon" />
        </button>
      </div>

      <p class="title">Taille image</p>
      <div class="flex">
        <button @click="rotateImageLeft">
          <img src="/src/assets/icon/fleche-left.png" class="icon" />
        </button>
        <button @click="rotateImageRight">
          <img src="/src/assets/icon/fleche-right.png" class="icon" />
        </button>
      </div>

      <p class="title">Taille image</p>
      <div class="flex">
        <button @click="flipImageVertical">
          <img src="/src/assets/icon/verticale.png" class="icon" />
          <p>Flip Vertical</p>
        </button>
        <button @click="flipImageHorizontal">
          <img src="/src/assets/icon/horizontal.png" class="icon" />
          <p>Flip Horizontal</p>
        </button>
      </div>
      <div class="flex">
        <button @click="FlipImageBack">
          <p>Flip Back</p>
          Flip Back
        </button>
        <button @click="deleteUnElement">
          <p>Effacer Element Selectioné</p>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import type { NewObject } from "../types/NewObject.type";
import { saveConfig } from "../services/save";

const canvas = ref<HTMLCanvasElement | null>(null);
let ctx: CanvasRenderingContext2D | null = null;

const config: NewObject[] = []; // NewObjet = 1 image = un article ajouté au canva

let isDragging = false;
let currentObject: NewObject | null = null;

//Initialisation dessine rectongle gray
onMounted(() => {
  loadSavedCanvas();
  initCanvas();
});

function loadSavedCanvas() {
  let saved = localStorage.getItem("savedCanvases");
  let savedCanvases = saved ? JSON.parse(saved) : [];
  console.log(savedCanvases);
}

function initCanvas() {
  if (!canvas.value) {
    return;
  }

  canvas.value.width = 600;
  canvas.value.height = 600;

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

// redessiner un carre et des config
function drawCanvas() {
  if (!canvas.value) {
    return;
  }

  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
  /*ctx.fillStyle = "gray";
  ctx.fillRect(10, 10, 600, 600);*/

  //Diaplay room rectongle
  let img = new Image();
  img.src =
    "https://img.freepik.com/photos-gratuite/fond-plancher-bois-clair_53876-88843.jpg?t=st=1740407576~exp=1740411176~hmac=8e24ae97895aba3bcddd0197852f418554c386db60df424f6acd9b34a9fc3199&w=1060";
  ctx.drawImage(img, 0, 0, 600, 600);

  config.forEach((obj) => {
    if (!ctx) return;

    ctx.save();
    ctx.translate(obj.x + obj.width / 2, obj.y + obj.height / 2);
    ctx.rotate((obj.angle * Math.PI) / 180); // rotation de objet

    //flip
    if (obj?.flippedV) {
      ctx.scale(1, -1);
    }

    if (obj?.flippedH) {
      ctx.scale(-1, 1);
    }

    ctx.drawImage(
      obj.img,
      -obj.width / 2,
      -obj.height / 2,
      obj.width,
      obj.height
    );

    // Ajout du contour (stroke) si l'objet est sélectionné
    if (obj.selected) {
      ctx.lineWidth = 5;
      ctx.strokeStyle = "orange";
      ctx.strokeRect(-obj.width / 2, -obj.height / 2, obj.width, obj.height);
    }

    ctx.restore();
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

    config.push({
      x,
      y,
      url,
      selected: false,
      img,
      width: 100,
      height: 100,
      angle: 0,
      flippedV: false,
      flippedH: false,
    });

    console.log(config); // verifier les tableau
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

  config.length = 0; // vider dans le tableau
}

/// startdrug -> detecter INDEX
function startDrag(event: MouseEvent) {
  if (!canvas.value) {
    return;
  }

  const canvasPosition = canvas.value.getBoundingClientRect(); // position de canvas sur window

  const mouseX = event.clientX - canvasPosition.left;
  const mouseY = event.clientY - canvasPosition.top;

  //initialiser valeur selected
  config.forEach((objet) => {
    objet.selected = false;
  });

  currentObject = getClickObjet(mouseX, mouseY); // image detecté = currentObjet

  if (currentObject) {
    isDragging = true;
    currentObject.selected = true;
  }
}

// detecter l'objet cliqué
function getClickObjet(x: number, y: number) {
  return (
    config.find((selected) => {
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
}

// function grandir des image
function expandImage() {
  if (currentObject) {
    currentObject.width += 10;
    currentObject.height += 10;
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

function rotateImageRight() {
  console.log("rotate");
  if (currentObject) {
    currentObject.angle += 10;
  }
}

function rotateImageLeft() {
  if (currentObject) {
    currentObject.angle -= 10;
  }
}

function flipImageVertical() {
  if (!ctx || !canvas.value || !currentObject) return;

  currentObject.flippedV = !currentObject.flippedV;
}

function flipImageHorizontal() {
  if (!ctx || !canvas.value || !currentObject) return;
  console.log(currentObject);

  currentObject.flippedH = !currentObject.flippedH;
}

// ERROR
function FlipImageBack() {
  if (!ctx || !canvas.value || !currentObject) return;

  console.log(currentObject);
  console.log(currentObject.url);
  currentObject.url = "/src/assets/elements/Sofa-1.png";
  console.log(currentObject.url);
}

function deleteUnElement() {
  if (!currentObject) return;

  const index = config.findIndex((obj) => obj === currentObject);

  // Si il trouve objet dans un listDeObjets => Delete
  if (index !== -1) {
    config.splice(index, 1);
    currentObject = null; //initialiser la valeur de currentObjet
  }
}
</script>

<style scoped>
.flex {
  margin: 0 auto;
  display: flex;
}

.blocBtn {
  /*background-color: #fdf2e7;*/
  padding: 1 rem;
  margin: 2.5rem;
  background-color: #ffffff;
  border: 3px solid #ee7fb5;
  border-radius: 5px;
}

button {
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;

  width: 4rem;
  height: 4rem;
  margin: 1.5rem;
  background-color: #ffffff;
  border: none;
  /*border: #a8a6a6 solid 2px;*/
  border-radius: 5px;
}

button:hover {
  background-color: #c0b9b2;
}

img {
  width: 3.3rem;
  display: flex;
  justify-content: center;
}

.icon {
  width: 2.3rem;
  color: #ee7fb5;
}

p {
  font-size: 0.8rem;
  color: #ee7fb5;
  margin-bottom: 0rem;
  font-family: "Rhodium Libre", serif;
  font-weight: 400;
  font-style: normal;
}

.title {
  font-size: 1rem;
  font-weight: bold;
  margin-top: 2rem;
}
canvas {
  margin-top: 2.5rem;
}

#plantImg {
  width: 4rem;
}
</style>
