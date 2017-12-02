class PlayerModel extends Entity {

  constructor(x, y, dx, dy, width, height, status) {
    super(x, y, dx, dy, width, height, status);
    this.left = false;
    this.right = false;
    this.up = false;
    this.down = false;
    this.fire = false;
    this.canFire = true;
    document.addEventListener('keydown', function check(e) {
        let code = e.keyCode;
        switch (code) {
            case 37:
              //console.log("left");
              this.left = true;
              break; //Left key
            case 38:
              //console.log("up");
              this.up = true;
              break; //Up key
            case 39:
              //console.log("Right");
              this.right = true;
              break; //Right key
            case 40:
              //console.log("Down");
              this.down = true;
              break; //Down key
            case 87:
              //console.log("W");
              this.up = true;
              break; //W key
            case 65:
              //console.log("A");
              this.left = true;
              break; //A key
            case 83:
              //console.log("S");
              this.down = true;
              break; //S key
            case 68:
              //console.log("D");
              this.right = true;
              break; //D key
            case 32:
              //console.log("space");
              this.fire = true;
              break;
            default: //console.log("other key");
        }
    }.bind(this), false);

    document.addEventListener('keyup', function check(e) {
        let code = e.keyCode;
        switch (code) {
            case 37:
              //console.log("left");
              this.left = false;
              break; //Left key
            case 38:
              //console.log("up");
              this.up = false;
              break; //Up key
            case 39:
              //console.log("Right");
              this.right = false;
              break; //Right key
            case 40:
              //console.log("Down");
              this.down = false;
              break; //Down key
            case 87:
              //console.log("W");
              this.up = false;
              break; //W key
            case 65:
              //console.log("A");
              this.left = false;
              break; //A key
            case 83:
              //console.log("S");
              this.down = false;
              break; //S key
            case 68:
              //console.log("D");
              this.right = false;
              break; //D key
            case 32:
              //console.log("space");
              this.fire = false;
              this.canFire = true;
              break;
            default: //console.log("other key");
        }
    }.bind(this), false);
  }

  update() {
    super.update();
    this.moveShip();
    this.borderDetection();
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
