
export default class Ball {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.x = this.width / 2;
    this.y = this.height / 2;
    this.r = 15;
    this.angle = 0;
    if (Math.random() > 0.5) {
      this.velX = 3;
      this.velY = 3;
    } else {
      this.velX = -3;
      this.velY = -3;
    }
    this.spin;
    this.image = document.getElementById("ballImage");
  }
  draw(context) {
    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.angle * this.spin);
    context.fillStyle = "white";
    context.arc(0, 0, this.r, 0, Math.PI * 2);
    context.fill();
    context.drawImage(
      this.image,
      0 - this.r * 2,
      0 - this.r * 3.5,
      this.r * 6,
      this.r * 6
    );
    context.restore();
  }
  update() {
    this.x += this.velX;
    this.y += this.velY;
    this.angle += 0.05;
  }
  isCollision(other) {
    let dx = this.x - other.x;
    let dy = this.y - other.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < this.r + other.r) {
      return true;
    } else {
      return false;
    }
  }
  isPaddleContact(other) {
    if (
      this.y > other.y - this.r &&
      this.x >= other.x &&
      this.x + this.r <= other.x + other.w
    ) {
      this.spin = Math.random() > 0.5 ? -1 : 1;
      return true;
    } else {
      return false;
    }
  }
  edges() {
    if (this.x < 0 + this.r || this.x + this.r > this.width) {
      this.velX = this.velX * -1;
    }
    if (this.y < 0 + this.r) {
      this.velY = this.velY * -1;
    }
    // if (this.y + this.r > this.height) {
    //   this.x = this.width / 2;
    //   this.y = this.height / 2;
    // }
  }
}
