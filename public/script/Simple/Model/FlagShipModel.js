class FlagShipModel {
  constructor(x, y, playerM) {
    this.x = x;
    this.y = y;
    this.dx = 2 * SCALE;//canvas.height * 0.01;
    this.dy = canvas.height * 0.003 * SCALE;
    this.width = canvas.height * 0.4 * SCALE;
    this.height = canvas.height*0.07 * SCALE;
    this.status = 1;
    this.direction = 1;
    this.playerM = playerM;
    this.missiles = [];
    this.missHeight = canvas.height*2 * SCALE;
    this.health = 5;
    this.shield = 10;
    this.sheildRecharge = this.increaseShield();
  }

  update() {
    this.move();
    this.missiles.forEach((m) => {
      m.update();
    });
    this.fire();
  }

  increaseShield() {
     return setInterval(function(){
      if (this.shield < 10) {
        this.shield++;
      }
    }.bind(this), 3000);
  }

  updateHealth() {
    if(this.shield > 0){
      this.shield--;
    } else {
      this.health--;
    }
    if(this.health <= 0) {
      this.status = 0;
      KILLS++;
    }
  }

  move() {
    this.changeDirection();
    this.x+=(this.dx*this.direction);
  }

  changeDirection() {
    if(Math.random() > 0.999 || this.x <= 0 || (this.x + this.width) >= canvas.width) {
      this.direction*=-1;
    }
  }

  fire() {
    // cannon one
    if(Math.random() >= 0.95) {
      this.missiles.push(new EMissileModel(this.x, this.y, 1));
    }
    // cannon two
    if(Math.random() >= 0.95) {
      this.missiles.push(new EMissileModel(this.x + this.width, this.y, 1));
    }
  }
}
