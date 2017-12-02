class EnemyShipModel extends Entity {

  constructor(x, y, dx, dy, width, height, status) {
    super(x, y, dx, dy, width, height, status);
  }

  update() {
    super.update();
    this.moveShip();
    this.borderDetection();
  }

  moveShip() {
    this.x+=this.dx;
    this.y+=this.dy;
  }

  borderDetection() {
    if(this.y >= canvas.height) {
      //console.log("happened");
      this.status = 0;
      //this.dy = this.dy*-1;
      //console.log(this.status);
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

}
