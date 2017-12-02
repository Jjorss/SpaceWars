class EnemyController {

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
    this.EnemyView = new EnemyShipView(img, width, height);
    this.EnemyModel = new EnemyShipModel(x, y, dx, dy, width,
      height, status);
  }

  update() {
    this.EnemyModel.update();
  }

  render() {
    //console.log("Rendering");
    this.EnemyView.render(this.EnemyModel.x, this.EnemyModel.y);
  }

  // GETTERS and SETTERS -------------------------
  getX() {
    return this.EnemyModel.getX();
  }
  setx(x){
    this.EnemyModel.setX(x);
  }
  getY() {
    return this.EnemyModel.getY();
  }
  setY(y) {
    this.EnemyModel.setY(y);
  }
  getDx() {
    return this.EnemyModel.getDx();
  }
  setDx(dx) {
    this.EnemyModel.setDx(dx);
  }
  getDy() {
    return this.EnemyModel.getDy();
  }
  setDy(dy) {
    this.EnemyModel.setDy(dy);
  }
  getWidth(){
    return this.EnemyModel.getWidth();
  }
  setWidth(width) {
    this.EnemyModel.setWidth(width);
  }
  getHeight() {
    return this.EnemyModel.getHeight();
  }
  setHeight(height) {
    this.EnemyModel.setHeight(height);
  }
  getStatus() {
    return this.EnemyModel.getStatus();
  }
  setStatus(status) {
    this.EnemyModel.setStatus(status);
  }

}
