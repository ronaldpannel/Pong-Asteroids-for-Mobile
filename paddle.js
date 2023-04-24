export default class Paddle {
  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.w = 120;
    this.h = 20;
    this.x = width;
    this.y = height - 24;
    this.vel = 0;
    this.mousePos;
  }
  draw(context) {
    context.fillStyle = "blue";
    context.fillRect(this.x, this.y, this.w, this.h);
  }
  update() {
    this.x += this.vel;
  }
  paddleMove() {
    this.x = this.mousePos + this.w / 2;
  }
  edges() {
    if (this.x < 0) {
      this.x = 0;
    } else if (this.x + this.w > this.width) {
      this.x = this.width - this.w;
    }
  }
}
