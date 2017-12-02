class EnemyView  {
  constructor(width, height) {
    this.img = new Image();
    this.img.src="../PNG/Enemies/enemyRed1.png";
    this.width = width;
    this.height = height;
    this.missileV = new EMissileView(this.width*0.5, this.height*0.5);
  }

  render(x, y, missiles){
    //console.log(this.img, x,y, this.width, this.height);
    ctx.drawImage(this.img, x, y, this.width, this.height);
    missiles.forEach((m) => {
      if(m.status) {
        this.missileV.render(m.x, m.y)
      }
    });
  }

}
