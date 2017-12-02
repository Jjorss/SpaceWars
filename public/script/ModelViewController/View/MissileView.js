class MissileView {
  constructor(img, width, height) {
    this.img = new Image();
    this.img = img;
    this.width = width;
    this.height = height;
  }

  render(x, y){
    //console.log(x, y);
    ctx.drawImage(this.img, x, y, this.width, this.height);
  }
}
