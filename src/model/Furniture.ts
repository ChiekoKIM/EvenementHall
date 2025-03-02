/**
 * Class Furniture : class pour furniture items
 */

export class Furniture {
  /*canvasElement: HTMLCanvasElement | null;
  ctx: CanvasRenderingContext2D | null;
  config: NewObject[];
  isDragging: boolean;
  this: NewObject | null;*/

  x: number;
  y: number;
  width: number;
  height: number;
  url: string;
  selected: boolean;
  img: HTMLImageElement;
  angle: number;
  flippedV: boolean;
  flippedH: boolean;

  constructor(x: number, y: number, url: string) {
    /*this.canvasElement = null;
    ctx = null;
    this.config = [];
    this.isDragging = false;
    this.this = null;*/

    this.x = x;
    this.y = y;
    this.url = url;
    this.selected = false;
    this.width = 100;
    this.height = 100;
    this.angle = 0;
    this.flippedV = false;
    this.flippedH = false;
    this.img = new Image();
    this.img.src = url;
  }

  // base pour draw furnitures
  draw(ctx: CanvasRenderingContext2D) {
    //setPosition original X, Y
    ctx.save();
    ctx.translate(this.x + this.width / 2, this.y + this.height / 2);

    // rotation
    ctx.rotate((this.angle * Math.PI) / 180);

    //flip
    if (this.flippedV) {
      ctx.scale(1, -1);
    }
    if (this.flippedH) {
      ctx.scale(-1, 1);
    }

    ctx.drawImage(
      this.img,
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    );

    // Ajout du contour (stroke) si l'objet est sélectionné
    if (this.selected) {
      ctx.lineWidth = 5;
      ctx.strokeStyle = "orange";
      ctx.strokeRect(
        -this.width / 2,
        -this.height / 2,
        this.width,
        this.height
      );
    }

    ctx.restore(); // revenit X et Y  position original
  }

  //=> A FAIRE  : AADD -> SAT
  isInsideClickObjet(x: number, y: number): boolean {
    // Account for rotation and flipping by converting point to local coordinates
    const centerX = this.x + this.width / 2;
    const centerY = this.y + this.height / 2;

    // Translate point relative to object center
    const dx = x - centerX;
    const dy = y - centerY;

    // Rotate point in the opposite direction of the object
    const angle = (-this.angle * Math.PI) / 180;
    const rotatedX = dx * Math.cos(angle) - dy * Math.sin(angle);
    const rotatedY = dx * Math.sin(angle) + dy * Math.cos(angle);

    // Check if point is within bounds
    const halfWidth = this.width / 2;
    const halfHeight = this.height / 2;

    return (
      rotatedX >= -halfWidth &&
      rotatedX <= halfWidth &&
      rotatedY >= -halfHeight &&
      rotatedY <= halfHeight
    );
  }

  rotate(angle: number): void {
    this.angle += angle;
  }

  //  grandir des image
  expand(amount: number) {
    this.width += amount;
    this.height += amount;
  }

  //  diminuer de taille de image
  reduce() {
    this.width -= 10;
    this.height -= 10;
  }

  rotateRight() {
    this.angle += 10;
  }

  rotateLeft() {
    this.angle -= 10;
  }

  flipVertical() {
    this.flippedV = !this.flippedV;
  }

  flipHorizontal() {
    this.flippedH = !this.flippedH;
  }
}
