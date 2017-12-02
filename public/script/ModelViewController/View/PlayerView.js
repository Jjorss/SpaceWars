class PlayerView {
  constructor(img, width, height) {
    this.img = new Image();
    this.img = img;
    this.width = width;
    this.height = height;
  }

  render(x, y){
    //console.log("Rendering");
    ctx.drawImage(this.img, x, y, this.width, this.height);
  }

}
