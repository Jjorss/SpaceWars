class EMissileModel extends Entity {

  constructor(x, y, dx, dy, width, height, status) {
    super(x, y, dx, dy, width, height, status);
  }

  update() {
    super.update();
    this.moveMissile();
    this.borderDetection();
    //console.log("updating");
  }

  borderDetection() {
    if(this.y > canvas.height) {
      this.status = 0;
    }
  }


  moveMissile() {
    this.y+=this.dy;
    this.x+=this.dx;
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
}
