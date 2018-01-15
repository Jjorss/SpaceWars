class PlayerModel {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dx = canvas.height * 0.03 * SCALE;
    this.dy = -1*canvas.height * 0.02 * SCALE;
    this.width = canvas.height * 0.07 * SCALE;
    this.height = canvas.height*0.07 * SCALE;
    this.status = 1;
    this.strafeLeft = false;
    this.strafeRight = false;
    this.rotateLeft = false;
    this.rotateRight = false;
    this.forward = false;
    this.backward = false;
    this.fire = false;
    this.canFire = true;
    this.angle = 0;
    this.missiles = [];
    this.health = 3;
    this.shield = 100;
    this.speed = canvas.height * 0.02 * SCALE;
    this.currentDx = 0;
    this.currentDy = 0
  }


  spawnMissile() {
    if(this.fire && this.canFire) {
      this.canFire = false;
      this.missiles.push(new MissileModel(this.x, this.y, this.currentDx, this.currentDy, true));
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
    //console.log("forwarddating");
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
    //console.log(this.strafeLeft, this.forward, this.backward, this.strafeRight);
    this.simpleMove();
  }

  simpleMove() {
    if (this.rotateLeft) {
      this.x -= this.dx;
    }
    if (this.forward) {
      this.y += this.dy;
    }
    if (this.backward) {
      this.y -= this.dy;
    }
    if (this.rotateRight) {
      this.x += this.dx;
    }
  }

  advancedMove() {
    this.currentDx = Math.cos((this.angle-90) * Math.PI / 180);
    this.currentDy = Math.sin((this.angle-90) * Math.PI / 180);
    if (this.rotateRight) {
      this.angle+=20;
    }
    if (this.rotateLeft) {
      this.angle-=20;
    }
    if (this.strafeLeft) {
      this.x -= this.dx;
    }
    if (this.forward) {
      this.x += this.speed * this.currentDx;
      this.y += this.speed * this.currentDy;
    }
    if (this.backward) {
      this.x -= this.speed * this.currentDx;
      this.y -= this.speed * this.currentDy;
    }
    if (this.strafeRight) {
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
