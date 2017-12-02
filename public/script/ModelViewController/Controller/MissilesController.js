class MissilesController {
  constructor() {
    this.width = canvas.height*0.007;
    this.height = canvas.height*0.02;
    this.dx = 0;
    this.dy = -1*canvas.height*0.02;
    this.imgLaser1 = new Image();
    this.imgLaser2 = new Image();
    this.imgLaser3 = new Image();
    this.imgLaser1.src = '../PNG/Lasers/laserBlue01.png';
    this.imgLaser2.src = '../PNG/Lasers/laserBlue07.png';
    this.imgLaser3.src = '../PNG/Lasers/laserBlue16.png';
    this.missiles = [];
  }

  update() {
    this.missiles.forEach((m) => {
      m.update();
    });
    this.collectGarbage();
  }

  render() {
    this.missiles.forEach((m) => {
      //console.log(this.imgLaser1);
      m.render();
    });
  }

  spawn(x, y) {
    let img;
    if(Math.random() > 0.5) {
      img = this.imgLaser1;
    } else {
      img = this.imgLaser2;
    }

    let m = new MissileController(
       x,
       y,
       this.dx,
       this.dy,
       this.width,
       this.height,
       1,
       img
    );
    this.missiles.push(m);
  }

  collectGarbage() {
    let newM = [];
    this.missiles.forEach((m) => {
      if(m.getStatus()) {
        newM.push(m);
      }
    });
    this.missiles = newM;
  }

// GETTERS and SETTERS -------------------------------------

  getWidth() {
    return this.width;
  }
  getMissiles() {
    return this.missiles;
  }

}
