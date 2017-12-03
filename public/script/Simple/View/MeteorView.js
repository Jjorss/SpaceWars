class MeteorView  {
  constructor(width, height) {
    this.img1 = new Image();
    this.img1.src="../PNG/Meteors/meteorBrown_big1.png";
    this.img2 = new Image();
    this.img2.src="../PNG/Meteors/meteorBrown_big1_dmg1.png"
    this.img3 = new Image();
    this.img3.src="../PNG/Meteors/meteorBrown_big1_dmg2.png"
    this.width = width;
    this.height = height;
  }

  render(x, y, health){
    if  (health == 3) {
      ctx.drawImage(this.img1, x, y, this.width, this.height);
    } else if (health == 2) {
      ctx.drawImage(this.img2, x, y, this.width, this.height);
    } else if (health == 1) {
      ctx.drawImage(this.img3, x, y, this.width, this.height);
    }
  }

}
