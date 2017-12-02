class PowerUpView {

  constructor(width, height) {
    this.img = new Image();
    this.img.src="../PNG/Power-ups/shield_blue.png";
    this.width = width;
    this.height = height;
  }

  render(x, y){
    //console.log(this.img, x,y, this.width, this.height);
    ctx.drawImage(this.img, x, y, this.width, this.height);
  }
}
