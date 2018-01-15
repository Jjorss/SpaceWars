class MissileModel {
  constructor(x, y, dx, dy, simple) {
    this.x = x;
    this.y = y;
    this.speed = canvas.height * 0.05 * SCALE;
    this.dx = dx;
    this.dy = dy;
    this.width = canvas.height * 0.05 * SCALE;
    this.height = canvas.height*0.05 * SCALE;
    this.status = 1;
    this.simple = simple;
  }

  update() {
    this.move();
    this.borderDetection();
  }

  borderDetection() {
    if(this.y <= 0) {
      this.status = 0;
    }
  }

  move() {
    if(this.simple) {
      this.y -= this.speed;
    } else {
      this.x+= this.speed * this.dx;
      this.y+= this.speed * this.dy;
    }
  }

}
