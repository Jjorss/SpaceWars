class MeteorView  {
  constructor(width, height) {
    this.img = new Image();
    this.img.src="../PNG/Meteors/meteorBrown_big1.png";
    this.width = width;
    this.height = height;
  }

  render(x, y){
    ctx.drawImage(this.img, x, y, this.width, this.height);
  }

}
