class ExplosionView  {
  constructor(width, height, type) {
    this.bang = new Image();
    this.bang.src = "../PNG/bang.png";
    this.pow = new Image();
    this.pow.src = "../PNG/pow.png";
    this.ouch = new Image();
    this.ouch.src = "../PNG/ouch.png";
    this.type = type;
    this.width = width;
    this.height = height;
  }

  render(x, y, type, opacity){
    ctx.globalAlpha = opacity;
    if (type == 1) {
      ctx.drawImage(this.ouch, x, y, this.width, this.height);
    } else if (type == 2) {
      ctx.drawImage(this.pow, x, y, this.width, this.height);
    } else {
      ctx.drawImage(this.bang, x, y, this.width, this.height);
    }
    ctx.globalAlpha = 1;
  }

}
