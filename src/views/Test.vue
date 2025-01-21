<template>
    <h1>Testview</h1>

    <canvas class="canvas"></canvas>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';

onMounted(() => {
    console.log("Hello test");

    // Sélectionner l'élément canvas
    const canvas = document.querySelector('.canvas') as HTMLCanvasElement | null;

    if (canvas) {
        // Dimensions réelles du canvas
        canvas.width = 500;
        canvas.height = 400;

        // Styles CSS du canvas
        canvas.style.backgroundColor = "#E7E7E7";

        // Obtenir le contexte 2D
        const ctx = canvas.getContext("2d");
        if (ctx) {
            // Dessiner un rectangle vert
            ctx.fillStyle = "green";
            ctx.fillRect(10, 10, 100, 100);

            ctx.fillStyle = "red";
            ctx.fillRect(10, 140, 100, 100);

            ctx.beginPath(); // Commence un nouveau chemin
            ctx.arc(60, 310, 50, 0, Math.PI * 2); // x, y, radius, startAngle, endAngle
            ctx.fillStyle = "blue"; // Couleur de remplissage
            ctx.fill(); // Remplit le cercle

        } else {
            console.error("Impossible d'obtenir le contexte 2D");
        }
    } else {
        console.error("Canvas introuvable");
    }
});
</script>
