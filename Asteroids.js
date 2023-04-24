export default class Asteroid {
  constructor(width, height) {
    this.width = width
    this.height = height
    this.x = Math.random() * this.width
    this.y = Math.random() * (this.height/2 - 40) + 40
    this.r = Math.random() * 10 + 30
    this.vel =  Math.random( )* 0.5 + 0.5
    this.image = document.getElementById("asteroidImage");
    this.angle = 0
    this.spin = Math.random() > 0.5 ? -1 : 1


  }
  update(){
    if(this.x > this.width + 150 ){
      this.y = Math.random() * (this.height / 2 - 40) + 40;
    }
    this.x += this.vel
  }
  edges(){
    if(this.x > this.width + 150)
    this.x = 0 - 150
    this.angle+= 0.01
  }
  draw(context) {

    context.save()
    context.translate(this.x, this.y)
    context.rotate(this.angle * this.spin);
    context.drawImage(this.image, 0 - this.r,0 - this.r,this.r*2, this.r*2)
    context.beginPath();
    // context.strokeStyle = "white";
    context.arc(0, 0, this.r, 0, Math.PI * 2);
    context.stroke();
    context.closePath();
    context.restore()
  }
}
