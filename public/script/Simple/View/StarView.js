class StarView  {
  constructor(width, height) {
    this.img = new Image();
    this.img.src="../PNG/4-Point-Star.png";
    this.width = width;
    this.height = height;
  }

  render(x, y){
    //console.log(this.img, x,y, this.width, this.height);
    ctx.drawImage(this.img, x, y, this.width, this.height);
    //ctx.fillStyle = "red";
    //ctx.fillRect(x, y, this.width, this.height);
  }

}
