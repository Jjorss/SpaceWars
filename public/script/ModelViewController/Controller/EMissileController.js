class EMissileController {

  constructor(x, y, dx, dy, width, height, status, img) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.width = width;
    this.height = height;
    this.status = status;
    this.img = new Image();
    this.img = img;
    this.MissileView = new MissileView(img, width, height);
    this.MissileModel = new MissileModel(x, y, dx, dy, width,
      height, status);
  }

  update() {
    this.MissileModel.update();
  }

  render() {
    //console.log(this.x, this.MissileModel.y);
    this.MissileView.render(this.MissileModel.getX(), this.MissileModel.getY());
  }

  // GETTERS and SETTERS -------------------------
  getX() {
    return this.MissileModel.getX();
  }
  setx(x){
    this.MissileModel.setX(x);
  }
  getY() {
    return this.MissileModel.getY();
  }
  setY(y) {
    this.MissileModel.setY(y);
  }
  getDx() {
    return this.MissileModel.getDx();
  }
  setDx(dx) {
    this.MissileModel.setDx(dx);
  }
  getDy() {
    return this.MissileModel.getDy();
  }
  setDy(dy) {
    this.MissileModel.setDy(dy);
  }
  getWidth(){
    return this.MissileModel.getWidth();
  }
  setWidth(width) {
    this.MissileModel.setWidth(width);
  }
  getHeight() {
    return this.MissileModel.getHeight();
  }
  setHeight(height) {
    this.MissileModel.setHeight(height);
  }
  getStatus() {
    return this.MissileModel.getStatus();
  }
  setStatus(status) {
    this.MissileModel.setStatus(status);
  }

}
