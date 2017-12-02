class MeteorModel {
  constructor(x, y, dx) {
    this.x = x;
    this.y = y;
    this.dx = dx;//canvas.height * 0.01;
    this.dy = canvas.height * 0.01 * SCALE;
    this.width = canvas.height * 0.1 * SCALE;
    this.height = canvas.height*0.1 * SCALE;
    this.status = 1;
    this.health = 3;
  }

  update() {
    this.move();
    this.borderDetection();
    this.collectGarbage();
    //console.log("updating");
  }

  collectGarbage() {
    if(this.health <= 0) {
      this.status = 0;
    }
  }

  borderDetection() {
    if(this.y > canvas.height) {
      this.status = 0;
    }
    if(this.x > canvas.width) {
      this.status = 0;
    }
    if(this.x < 0) {
      this.status = 0;
    }
  }

  move() {
    //console.log(this.left, this.up, this.down, this.right);
    this.x+= this.dx;
    this.y+= this.dy;
  }

}
