class Entity {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dx = canvas.height * 0.001;
    this.dy = -1*canvas.height * 0.001;
    this.width = canvas.height * 0.1;
    this.height = canvas.height*0.1;
    this.status = 1;
  }
}
