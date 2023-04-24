export default class Explosion {
  constructor(width, height, x, y, vel) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.vel = vel;
    this.image = document.getElementById("explosionImage");
    this.spriteWidth = 300;
    this.spriteHeight = 300;
    this.frameX = 0;
    this.frameY = Math.floor(Math.random() * 3);
    this.maxFrames = 22;
    this.frameRate = 0;
  }
  draw(context) {
    // context.save();
    // context.strokeStyle = "white";
    // context.lineWidth = 15;
    // context.rect(this.x-50/2, this.y - 50/2, 50, 50);
    // context.stroke();
    // context.restore()

    context.drawImage(
      this.image,
      this.spriteWidth * this.frameX,
      this.spriteHeight * this.frameY,
      this.spriteWidth,
      this.spriteHeight,
      this.x - this.spriteWidth / 2,
      this.y - this.spriteHeight / 2,
      this.spriteWidth,
      this.spriteHeight
    );
    context.restore();
  }
  update() {
    this.frameRate++;

    this.x += this.vel;
    if (this.frameX <= this.maxFrames) {
      if (this.frameRate % 5 === 0) {
        this.frameX++;
      }
    } else {
      this.frameX = 0;
    }
  }
}
