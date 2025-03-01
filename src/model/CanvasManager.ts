import type { NewObject } from "../types/NewObject.type";
import { Furniture } from "./Furniture";

export class CanvasManager {
  canvas: HTMLCanvasElement | null;
  ctx: CanvasRenderingContext2D | null;
  objects: Furniture[];
  currentObject: Furniture | null;
  isDragging: boolean;
  dragOffsetX: number = 0;
 dragOffsetY: number = 0;
  backgroundImage: HTMLImageElement;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    this.objects = [];
    this.currentObject = null;
    this.isDragging = false;
    this.dragOffsetX = 0;
    this.dragOffsetY = 0;

    // Initialize canvas size
    this.canvas.width = 600;
    this.canvas.height = 600;

    // Setup background image
    this.backgroundImage = new Image();
    this.backgroundImage.src =
      "https://img.freepik.com/photos-gratuite/fond-plancher-bois-clair_53876-88843.jpg?t=st=1740407576~exp=1740411176~hmac=8e24ae97895aba3bcddd0197852f418554c386db60df424f6acd9b34a9fc3199&w=1060";
  }

  drawcanvas() {
    if (!this.canvas || !this.ctx) return;

    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    //draw backgroundIage , Salle
    if(!this.backgroundImage) {
      this.ctx.drawImage(this.backgroundImage, 0, 0,this.canvas.width, this.canvas.height));
    } else {
      this.ctx.fillStyle = "gray";
      this.ctx.fillRect(10, 10, this.canvas.width, this.canvas.height);
    }

    if (!this.canvas) return;
    const canvasPosition = this.canvas.getBoundingClientRect(); // position de canvas sur window

    //draw furnitures image 
    this.objects.forEach((obj)=>{
      
      if (!this.ctx) return;

      obj.draw(this.ctx)
    })    

    //roop pour continuer d'afficher des furnitures images sur canvas
    requestAnimationFrame(() => this.drawcanvas());
  }

  getMousePosition(event: MouseEvent){
    if (!this.canvas) return;

    const canvasPosition = this.canvas.getBoundingClientRect(); // position de canvas sur window

    const mouseX = event.clientX - canvasPosition.left;
    const mouseY = event.clientY - canvasPosition.top;

    return {
      x : mouseX, 
      y : mouseY
    }
  }
  handleMouseDown(event: MouseEvent) {
    const {x, y} = this.getMousePosition(event);
    
    //initialiser valeur selected
    this.objects.forEach((objet) => {
      objet.selected = false;
    });

    this.objects.forEach((obj) => {
      if(obj.isInsideClickObjet(x,y)) {
        obj.selected = true
        this.currentObject = obj
        this.isDragging = true

         // Calculate drag offset
         this.dragOffsetX = x - obj.x;
         this.dragOffsetY = y - obj.y;
      }
    })

    this.currentObject = null;
  }

  handleMouseMove(event: MouseEvent): void {
    if (!this.isDragging || !this.currentObject) return;
    
    const { x, y } = this.getMousePosition(event);
    
    // Update object position with offset
    this.currentObject.x = x - this.dragOffsetX;
    this.currentObject.y = y - this.dragOffsetY;
  }

  handleMouseUp(): void {
    this.isDragging = false;
  }

}

