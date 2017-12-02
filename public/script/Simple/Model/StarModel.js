class StarModel {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.dx = 0 * SCALE;//canvas.height * 0.01;
    this.type = 0;
    if (type == 0) this.randomStarScale = this.randomizeStarScale();
    else this.randomStarScale = this.replicateStarScale(type);
    this.dy = canvas.height * 0.003 * SCALE * this.randomStarScale;
    this.width = canvas.height * 0.07 * SCALE * this.randomStarScale;
    this.height = canvas.height*0.07 * SCALE * this.randomStarScale;
    this.status = 1;
  }

  randomizeStarScale(){
    let size = getRandomInt(1,100);
    let starScale;
    if (size > 98) {
      starScale = getRandomInt(66, 100);
      this.type = 1;
    } else if (size > 85){
      starScale = getRandomInt(41, 65);
      this.type = 2;
    } else {
      starScale = getRandomInt(20, 40);
      this.type = 3;
    }
    starScale = starScale / 100;
    return starScale;
  }

  replicateStarScale(type){
    let starScale;
    if (type == 1) {
      starScale = getRandomInt(66, 100);
      this.type = 1;
    } else if (type == 2){
      starScale = getRandomInt(41, 65);
      this.type = 2;
    } else {
      starScale = getRandomInt(20, 40);
      this.type = 3;
    }
    starScale = starScale / 100;
    return starScale;
  }

  update() {
    this.move();
    this.borderDetection();
    //console.log("updating");
  }

  borderDetection() {
    if(this.x >= canvas.width - this.width) {
      this.x -= this.dx;
    } else if (this.x <= 0) {
      this.x +=this.dx;
    }

    if(this.y > canvas.height) {
      this.status = 0;
    }
  }


  move() {
    //console.log(this.left, this.up, this.down, this.right);
    this.x+= this.dx;
    this.y+= this.dy;
  }


}
