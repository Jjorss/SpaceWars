class PlayerController {

  constructor(x, y, dx, dy, width, height, status, img, missilesController) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.width = width;
    this.height = height;
    this.status = status;
    this.img = img;
    this.missilesController = new MissilesController();
    this.playerView = new PlayerView(img, width, height);
    this.playerModel = new PlayerModel(x, y, dx, dy, width,
      height, status);
  }

  update() {
    this.playerModel.update();
    this.missilesController.update();
    this.fireMissile();
  }

  render() {
    this.playerView.render(this.playerModel.x, this.playerModel.y);
    this.missilesController.render();
  }

  fireMissile() {
    if(this.playerModel.getFire() && this.playerModel.canFire){
      this.missilesController.spawn(
        this.playerModel.x +
        (this.playerModel.width/2) - this.missilesController.getWidth(),
        this.playerModel.y);
      this.playerModel.setCanFire(false);
    }
  }

  // GETTERS and SETTERS -------------------------
  getX() {
    return this.playerModel.getX();
  }
  setx(x){
    this.playerModel.setX(x);
  }
  getY() {
    return this.playerModel.getY();
  }
  setY(y) {
    this.playerModel.setY(y);
  }
  getDx() {
    return this.playerModel.getDx();
  }
  setDx(dx) {
    this.playerModel.setDx(dx);
  }
  getDy() {
    return this.playerModel.getDy();
  }
  setDy(dy) {
    this.playerModel.setDy(dy);
  }
  getWidth(){
    return this.playerModel.getWidth();
  }
  setWidth(width) {
    this.playerModel.setWidth(width);
  }
  getHeight() {
    return this.playerModel.getHeight();
  }
  setHeight(height) {
    this.playerModel.setHeight(height);
  }
  getStatus() {
    return this.playerModel.getStatus();
  }
  setStatus(status) {
    this.playerModel.setStatus(status);
  }
  getMissilesController() {
    return this.missilesController;
  }
}
