class EMissileModel {
  constructor(x, y, type, maxHeight) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.dx = 0;
    this.dy = canvas.height * 0.022 * SCALE;
    this.width = canvas.height * 0.05 * SCALE;
    this.height = canvas.height*0.05 * SCALE;
    this.maxHeight = maxHeight;
    if(this.type == 2) {
      this.dy = this.dy*8;
    }
    this.status = 1;
  }

  update() {
    this.move();
    this.borderDetection();
  }

  borderDetection() {
    if(this.y >= canvas.height) {
      this.status = 0;
    }
  }

  move() {
    switch(this.type) {
      case 1:
        this.x+=this.dx;
        this.y+=this.dy;
        break;
      case 2:
        this.sniperMove();
        break;
      default:
        console.log("broken state: ", this.type);
    }
  }

  sniperMove() {
    if(this.height < this.maxHeight) {
      console.log(this.height);
      this.height+=this.dy;
    } else {
      this.x+=this.dx;
      this.y+=this.dy;
    }
  }

}
