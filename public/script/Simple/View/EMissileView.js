class EMissileView {
  constructor(width, height) {
    this.img = new Image();
    this.img.src="../PNG/Lasers/laserRed01.png";
    this.width = width;
    this.height = height;
  }

  render(x, y, height){
    //console.log(this.width, this.height);
    ctx.drawImage(this.img, x, y, this.width, height);
  }

}
