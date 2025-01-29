<!-- <template>
  <h1>Page Simulation de salle</h1>

  changer la taille de image selectioné
  <button @click="expandImage">Image plus grand</button>
  <button @click="reduceImage">Image plus petit</button>
  Inverser l'image
  <button @click="flipHorizontal">Symétrie horizontale</button>
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

const objets: NewObjet[] = []; // table for newObjet

interface NewObjet {
  x: number;
  y: number;
  url: any;
  selected: boolean;
  img: HTMLImageElement;
  width: number;
  height: number;
}

let isDragging = false;
let currentObject: NewObjet | null = null;

//Initialisation dessine rectongle gray
onMounted(() => {
  initCanvas();
});

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
    if (obj.url) {
      if (!ctx) return;
      ctx.drawImage(obj.img, obj.x, obj.y, obj.width, obj.height);
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

function flipHorizontal() {
  if (!ctx || !canvas.value) {
    console.error("Canvas ou contexte non initialisé.");
    return;
  }

  const targetObject = objets.find((obj) => obj.selected);

  console.log("TARGET", targetObject);

  if (!targetObject) {
    console.error("Aucun objet sélectionné pour appliquer la symétrie horizontale.");
    return;
  }

  const { x, y, img, width, height } = targetObject;

  ctx.clearRect(x, y, width, height);
  ctx.save();
  ctx.translate(x + width, y);
  ctx.scale(-1, 1);
  ctx.drawImage(img, 0, 0, width, height);
  ctx.restore();

  drawCanvas();
}
</script>

<style scoped>
.flex {
  width: 100vh;
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

img {
  width: 2rem;
}
</style> -->

<template>
    <h1>Page Simulation de salle</h1>
  
    <!-- Actions sur l'objet sélectionné -->
    <button @click="expandImage">Image plus grande</button>
    <button @click="reduceImage">Image plus petite</button>
    <button @click="flipHorizontal">Symétrie horizontale</button>
  
    <div class="flex">
      <div class="blocBtn">
        <!-- Boutons pour ajouter des images -->
        <button
          @click="createImage(0, 5, 'https://img.freepik.com/psd-gratuit/table-cafe-bois-ronde-moderne-jambes-coniques-meuble-decoration-interieur-design-minimaliste_632498-27809.jpg')"
        >
          <img src="/src/assets/icon/table.png" alt="Button Table" />
          Table
        </button>
  
        <button
          @click="createImage(100, 5, 'https://img.freepik.com/psd-gratuit/chaise-bascule-moderne-tissu-gris-cadre-bois_191095-91556.jpg')"
        >
          <img src="/src/assets/icon/chaise-de-bureau.png" alt="Button Chaise" />
          Chaise
        </button>
  
        <button
          @click="createImage(200, 5, 'https://img.freepik.com/vecteurs-libre/illustration-icone-vecteur-dessin-anime-television-heureux-mignon-concept-icone-objet-technologique-isole-plat_138676-6868.jpg')"
        >
          <img src="/src/assets/icon/moniteur.png" alt="Button TV" />
          TV
        </button>
  
        <button @click="clear">Clear</button>
      </div>
  
      <!-- Canvas pour afficher les objets -->
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
  
  // Références au canvas et au contexte
  const canvas = ref<HTMLCanvasElement | null>(null);
  let ctx: CanvasRenderingContext2D | null = null;
  
  // Tableau des objets affichés sur le canvas
  const objets: NewObjet[] = [];
  
  // Interface pour définir un objet sur le canvas
  interface NewObjet {
    x: number;
    y: number;
    url: string;
    selected: boolean;
    img: HTMLImageElement;
    width: number;
    height: number;
  }
  
  let isDragging = false; // Indique si un objet est en cours de déplacement
  let currentObject: NewObjet | null | undefined = null; // Objet actuellement sélectionné
  
  // Initialisation du canvas
  onMounted(() => {
    initCanvas();
  });
  
  // Fonction pour initialiser le canvas
  function initCanvas() {
    if (!canvas.value) return;
  
    canvas.value.width = 1000;
    canvas.value.height = 1000;
  
    ctx = canvas.value.getContext("2d");
    if (!ctx) return;
  
    // Dessiner un arrière-plan gris
    ctx.fillStyle = "gray";
    ctx.fillRect(10, 10, 600, 600);
  
    // Démarrer la boucle d'animation
    update();
  }
  
  // Fonction pour mettre à jour le canvas
  function update() {
    drawCanvas();
    requestAnimationFrame(update);
  }
  
  // Dessiner tous les objets sur le canvas
  // function drawCanvas() {
  //   if (!ctx || !canvas.value) return;
  
  //   // Effacer le canvas
  //   ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
  //   ctx.fillStyle = "gray";
  //   ctx.fillRect(10, 10, 600, 600);
  
  //   // Dessiner chaque objet
  //   objets.forEach((obj) => {
  //     if (obj.img) {
  //       if (!ctx) return;

  //       ctx.save();
  //       ctx.translate(obj.x, obj.y);

  //       if (obj.width < 0) {
  //         ctx.scale(-1, 1); // Appliquer une inversion horizontale
  //       //ctx.drawImage(obj.img, -Math.abs(obj.width), 0, Math.abs(obj.width), obj.height);
  //       ctx.drawImage(obj.img, obj.width, 0, -obj.width, obj.height);
  //       } else {
  //         ctx.drawImage(obj.img, 0, 0, obj.width, obj.height);
  //       }

  //       ctx.restore();

  //       //ctx.drawImage(obj.img, obj.x, obj.y, obj.width, obj.height);
  
  //       // Ajouter une bordure rouge si l'objet est sélectionné
  //       if (obj.selected) {
  //         ctx.strokeStyle = "red";
  //         ctx.lineWidth = 2;
  //         //ctx.strokeRect(obj.x, obj.y, obj.width, obj.height);
  //         ctx.strokeRect(obj.x, obj.y, Math.abs(obj.width), obj.height);
  //       }
  //     }
  //   });
  // }


  function drawCanvas() {
  if (!ctx || !canvas.value) return;

  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
  ctx.fillStyle = "gray";
  ctx.fillRect(10, 10, 600, 600);

  objets.forEach((obj) => {
    if (!ctx) return;
    if (obj.img) {

      ctx.save();
      ctx.translate(obj.x, obj.y);

      if (obj.width < 0) {
        ctx.scale(-1, 1);
        ctx.drawImage(obj.img, obj.width, 0, -obj.width, obj.height);
      } else {
        ctx.drawImage(obj.img, 0, 0, obj.width, obj.height);
      }

      ctx.restore();

      // 🔴 Ajout d'une bordure rouge pour voir les objets sélectionnés
      if (obj.selected) {
        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        ctx.strokeRect(obj.x, obj.y, Math.abs(obj.width), obj.height);
      }
    }
  });
}

  
  // Ajouter une image au canvas
  function createImage(x: number, y: number, url: string) {
  if (!ctx || !canvas.value) return;

  const img = new Image();
  img.src = url;
  img.onload = () => {
    if(!ctx) return;
    ctx.drawImage(img, x, y, 100, 100);
    const newObject = {
      x,
      y,
      url,
      selected: false, // Par défaut, aucun objet n'est sélectionné
      img,
      width: 100,
      height: 100,
    };
    objets.push(newObject);

    console.log("Objet ajouté :", newObject);
    console.log("Tableau des objets :", objets);
  };
}

  

  // Effacer le canvas et réinitialiser les objets
  function clear() {
    if (!ctx || !canvas.value) return;
  
    ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
    ctx.fillStyle = "gray";
    ctx.fillRect(10, 10, 600, 600);
  
    objets.length = 0; // Vider le tableau des objets
  }
  
  // Détecter un clic sur un objet
  // function getClickObjet(x: number, y: number): NewObjet | null {
  //   return (
  //     objets.find(
  //       (obj) =>
  //         x >= obj.x &&
  //         x <= obj.x + obj.width &&
  //         y >= obj.y &&
  //         y <= obj.y + obj.height
  //     ) || null
  //   );
  // }

//   function getClickObjet(x: number, y: number): NewObjet | undefined {
//   return objets.find((obj) => {
//     const xStart = obj.width < 0 ? obj.x + obj.width : obj.x;
//     const xEnd = xStart + Math.abs(obj.width);
//     return x >= xStart && x <= xEnd && y >= obj.y && y <= obj.y + obj.height;
//   });
// }

// function getClickObjet(x: number, y: number): NewObjet | null {
//   return (
//     objets.find((obj) => {
//       // Gérer les objets inversés
//       const xStart = obj.width < 0 ? obj.x + obj.width : obj.x;
//       const xEnd = xStart + Math.abs(obj.width);

//       const isClicked =
//         x >= xStart && x <= xEnd && y >= obj.y && y <= obj.y + obj.height;

//       console.log(
//         `Test collision pour (${obj.x}, ${obj.y}, ${obj.width}, ${obj.height}): ${isClicked}`
//       );

//       return isClicked;
//     }) || null
//   );
// }

function getClickObjet(x: number, y: number): NewObjet | null {
  return (
    objets.find((obj) => {
      // Vérification spéciale pour gérer l'inversion horizontale
      const xStart = obj.width < 0 ? obj.x + obj.width : obj.x;
      const xEnd = xStart + Math.abs(obj.width);

      const isClicked =
        x >= xStart && x <= xEnd && y >= obj.y && y <= obj.y + obj.height;

      console.log(
        `Test collision pour (${obj.x}, ${obj.y}, ${obj.width}, ${obj.height}): ${isClicked}`
      );

      return isClicked;
    }) || null
  );
}


function startDrag(event: MouseEvent) {
  if (!canvas.value) return;

  const canvasPosition = canvas.value.getBoundingClientRect();
  const mouseX = event.clientX - canvasPosition.left;
  const mouseY = event.clientY - canvasPosition.top;

  console.log(`MouseX: ${mouseX}, MouseY: ${mouseY}`);

  let detectedObject = getClickObjet(mouseX, mouseY);

  if (!detectedObject) {
    console.log("Aucun objet détecté sous le clic.");
    currentObject = null;
    return;
  }

  console.log("Objet sélectionné :", detectedObject);
  currentObject = detectedObject;
  objets.forEach((obj) => (obj.selected = false));
  currentObject.selected = true;
  isDragging = true;
}


  
  // Déplacer un objet en cours de drag


function drag(event: MouseEvent) {
  if (!isDragging || !currentObject || !canvas.value) return;

  const canvasPosition = canvas.value.getBoundingClientRect();
  const mouseX = event.clientX - canvasPosition.left;
  const mouseY = event.clientY - canvasPosition.top;

  // Ajustement pour les objets inversés
  if (currentObject.width < 0) {
    currentObject.x = mouseX + currentObject.width / 2;
  } else {
    currentObject.x = mouseX - currentObject.width / 2;
  }

  currentObject.y = mouseY - currentObject.height / 2;

  drawCanvas();
}


  
  // Arrêter de déplacer un objet
  function stopDrag() {
    isDragging = false;
  }
  
  // Agrandir l'objet sélectionné
  function expandImage() {
    if (currentObject) {
      currentObject.width += 10;
      currentObject.height += 10;
      drawCanvas();
    }
  }
  
  // Réduire la taille de l'objet sélectionné
  function reduceImage() {
    if (currentObject) {
      currentObject.width -= 10;
      currentObject.height -= 10;
      drawCanvas();
    }
  }

 

  function flipHorizontal() {
  if (!ctx || !canvas.value) {
    console.error("Canvas ou contexte non initialisé.");
    return;
  }

  let targetObject = objets.find((obj) => obj.selected);

  if (!targetObject) {
    console.error("Aucun objet sélectionné pour appliquer la symétrie horizontale.");
    return;
  }

  console.log("Avant transformation :", { ...targetObject });

  // Calculer la nouvelle position correcte
  targetObject.x = targetObject.x + targetObject.width;
  targetObject.width = -targetObject.width; // Inverser la largeur

  console.log("Après transformation :", { ...targetObject });

  // **Redétecter et resélectionner l'objet après le flip**
  objets.forEach((obj) => (obj.selected = false));
  targetObject.selected = true;
  currentObject = targetObject; // Mise à jour de l'objet sélectionné

  drawCanvas();
}



  </script>
  
  <style scoped>
  .flex {
    display: flex;
  }
  
  .blocBtn {
    background-color: #fdf2e7;
    padding: 1.5rem;
    margin-right: 2rem;
    height: 35rem;
    border-radius: 5px;
  }
  
  button {
    width: 4rem;
    height: 4rem;
    margin: 2.5rem;
    background-color: #fcf7f1;
    border: 2px solid #a8a6a6;
    border-radius: 5px;
  }
  
  img {
    width: 2rem;
  }
  </style>
  