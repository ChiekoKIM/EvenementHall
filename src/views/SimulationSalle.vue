<template>
  <div class="flex">
    <div class="blocBtn">
      <p class="title">Elements</p>
      <div class="flex">
        <button @click="addFurniture('/src/assets/elements/Round-Table-1.png')">
          <img
            src="/src/assets/elements/Round-Table-1.png"
            alt="Button Table"
          />
          <p>Table Rond</p>
        </button>

        <button @click="addFurniture('/src/assets/elements/Table-1.png')">
          <img src="/src/assets/elements/Table-1.png" />
          <p>Table Carré</p>
        </button>
      </div>

      <div class="flex">
        <button @click="addFurniture('/src/assets/elements/Seat-1.png')">
          <img src="/src/assets/elements/Seat-1.png" />
          <p>Chaise</p>
        </button>

        <button @click="addFurniture('/src/assets/elements/Sofa-1.png')">
          <img src="/src/assets/elements/Sofa-1.png" />
          <p>Canapé</p>
        </button>
      </div>

      <div class="flex">
        <button @click="addFurniture('/src/assets/elements/Lamp-1.png')">
          <img src="/src/assets/elements/Lamp-1.png" />
          <p>Lamp</p>
        </button>

        <button @click="addFurniture('/src/assets/elements/Plant-1.png')">
          <img src="/src/assets/elements/Plant-1.png/" id="plantImg" />
          <p>Plant</p>
        </button>
      </div>

      <div class="flex">
        <button @click="addFurniture('/src/assets/elements/Tv-1.png')">
          <img src="/src/assets/elements/Tv-1.png" alt="Button tv" />
          <p>TV</p>
        </button>
      </div>

      <div class="flex">
        <button @click="clearCanvas">
          <img
            src="/src/assets/icon/supprimer.png"
            alt="Save Button"
            class="icon"
          />
          <p>Tous effacer</p>
        </button>
        <button @click="saveConfig(canvasManager?.objects)">
          <img
            src="/src/assets/icon/save-icon.png"
            alt="Save Button"
            class="icon"
          />
          <p>Save</p>
        </button>
      </div>
    </div>

    <canvas ref="canvas" class="canvas"></canvas>

    <div class="blocBtn">
      <p class="title">Taille image</p>
      <div class="flex">
        <button @click="resizeObject(-10)">
          <img src="/src/assets/icon/moins.png" class="icon" />
        </button>
        <button @click="resizeObject(10)">
          <img src="/src/assets/icon/plus.png" class="icon" />
        </button>
      </div>

      <p class="title">Taille image</p>
      <div class="flex">
        <button @click="rotateObject(-10)">
          <img src="/src/assets/icon/fleche-left.png" class="icon" />
        </button>
        <button @click="rotateObject(10)">
          <img src="/src/assets/icon/fleche-right.png" class="icon" />
        </button>
      </div>

      <p class="title">Taille image</p>
      <div class="flex">
        <button @click="flipVertical">
          <img src="/src/assets/icon/verticale.png" class="icon" />
          <p>Flip Vertical</p>
        </button>
        <button @click="flipHorizontal">
          <img src="/src/assets/icon/horizontal.png" class="icon" />
          <p>Flip Horizontal</p>
        </button>
      </div>
      <div class="flex">
        <button @click="">
          <p>Flip Back</p>
          Flip Back
        </button>
        <button @click="deleteSelectedObject">
          <p>Effacer Element Selectioné</p>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
//import type { NewObject } from "../types/NewObject.type";
import { saveConfig } from "../services/save";
import { CanvasManager } from "../model/CanvasManager";

const canvas = ref<HTMLCanvasElement | null>(null);
let canvasManager: CanvasManager | null = null;

//Initialisation dessine rectongle gray
onMounted(() => {
  if (canvas.value) {
    canvasManager = new CanvasManager(canvas.value);
    loadSavedCanvas();
  }
});

function loadSavedCanvas() {
  let saved = localStorage.getItem("savedCanvases");
  let savedCanvases = saved ? JSON.parse(saved) : [];
  console.log(savedCanvases);
}

function addFurniture(url: string) {
  if (canvasManager) {
    canvasManager.addObject(50, 50, url);
  }
}

// Clear canvas
function clearCanvas() {
  if (canvasManager) {
    canvasManager.clearCanvas();
  }
}

// Resize selected object
function resizeObject(amount: number) {
  if (canvasManager) {
    canvasManager.expandSelectedObject(amount);
  }
}

// Rotate selected object
function rotateObject(angle: number) {
  if (canvasManager) {
    canvasManager.rotateSelectedObject(angle);
  }
}

// Flip selected object
function flipVertical() {
  if (canvasManager) {
    canvasManager.flipVerticalSelectedObject();
  }
}

function flipHorizontal() {
  if (canvasManager) {
    canvasManager.flipHorizontalSelectedObject();
  }
}

// Delete selected object
function deleteSelectedObject() {
  if (canvasManager) {
    canvasManager.deleteSelectedObject();
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
