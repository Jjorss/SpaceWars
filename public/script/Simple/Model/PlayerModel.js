class PlayerModel {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dx = canvas.height * 0.03 * SCALE;
    this.dy = -1*canvas.height * 0.02 * SCALE;
    this.width = canvas.height * 0.07 * SCALE;
    this.height = canvas.height*0.07 * SCALE;
    this.status = 1;
    this.left = false;
    this.right = false;
    this.up = false;
    this.down = false;
    this.fire = false;
    this.canFire = true;
    this.missiles = [];
    this.health = 3;
    this.shield = 100;
  }


  spawnMissile() {
    if(this.fire && this.canFire) {
      this.canFire = false;
      this.missiles.push(new MissileModel(this.x, this.y));
    }
  }

  update() {
    this.moveShip();
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
    } else if (this.y >= canvas.height - (this.height*0.25)) {
      this.y += this.dy;
    } else if (this.y <= 0) {
      this.y -= this.dy;
    }
  }


  moveShip() {
    //console.log(this.left, this.up, this.down, this.right);
    if (this.left) {
      this.x -= this.dx;
    }
    if (this.up) {
      this.y += this.dy;
    }
    if (this.down) {
      this.y -= this.dy;
    }
    if (this.right) {
      this.x += this.dx;
    }
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

  // GETTERS and SETTERS -------------------------
    getX() {
      return this.x;
    }
    setx(x){
      this.x = x;
    }
    getY() {
      return this.y;
    }
    setY(y) {
      this.y = y;
    }
    getDx() {
      return this.dx;
    }
    setDx(dx) {
      this.dx = dx;
    }
    getDy() {
      return this.dy;
    }
    setDy(dy) {
      this.dy = dy;
    }
    getWidth(){
      return this.width;
    }
    setWidth(width) {
      this.width = width;
    }
    getHeight() {
      return this.height;
    }
    setHeight(height) {
      this.height = height;
    }
    getStatus() {
      return this.status;
    }
    setStatus(status) {
      this.status = status;
    }
    getFire() {
      return this.fire;
    }
    getCanFire() {
      return this.canFire;
    }
    setCanFire(canFire) {
      this.canFire = canFire;
    }
}
