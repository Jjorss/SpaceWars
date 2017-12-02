class MissileModel {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dx = 0;
    this.dy = -1*canvas.height * 0.025 * SCALE;
    this.width = canvas.height * 0.05 * SCALE;
    this.height = canvas.height*0.05 * SCALE;
    this.status = 1;
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
    this.x+=this.dx;
    this.y+=this.dy;
  }

}
