class EnemyModel {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dx = 0 * SCALE;//canvas.height * 0.01;
    this.dy = canvas.height * 0.003 * SCALE;
    this.width = canvas.height * 0.07 * SCALE;
    this.height = canvas.height*0.07 * SCALE;
    this.status = 1;
    this.missiles = [];
  }


  spawnMissile() {
    if(Math.random() >= 0.99) {
      if(Math.random() >= 0.3) {
        this.missiles.push(new EMissileModel(this.x, this.y, 1));
      }
    }
  }

  update() {
    this.move();
    this.borderDetection();
    this.spawnMissile();
    this.missiles.forEach((m) => {
      m.update();
    });
    this.collectGarbage();
    //console.log("updating");
  }

  borderDetection() {
    if(this.x >= canvas.width - this.width) {
      this.x -= this.dx;
    } else if (this.x <= 0) {
      this.x +=this.dx;
    }

    if(this.y > canvas.height) {
      this.status = 0;
      MISTAKES++;
    }
  }


  move() {
    //console.log(this.left, this.up, this.down, this.right);
    this.x+= this.dx;
    this.y+= this.dy;
  }

  collectGarbage() {
    let newM = [];
    this.missiles.forEach((m) => {
      if(m.status) {
        newM.push(m);
      }
    });
    this.missiles = newM;
  }


}
