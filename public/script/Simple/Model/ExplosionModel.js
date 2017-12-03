class ExplosionModel {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
    if (type != 1) this.getPowBang();
    this.dx = 0;
    this.dy = 0;
    this.width = canvas.height * 0.1 * SCALE;
    this.height = canvas.height * 0.1 * SCALE;
    this.status = 1;
    this.opacity = 1;
  }

  getPowBang() {
    this.type = getRandomInt(2,3);
  }

  update(){
    this.opacity = this.opacity - 0.04;
    if (this.opacity <= 0) {
      this.status = 0;
    }
  }

}
