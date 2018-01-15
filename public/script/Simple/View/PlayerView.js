class PlayerView {
  constructor(width, height) {
    this.img = new Image();
    this.img.src="../PNG/playerShip1_blue.png";
    this.width = width;
    this.height = height;
    this.missileV = new MissileView(this.width*0.5, this.height*0.5);
  }

  render(x, y, missiles, angle){
    //ctx.save();
    ctx.translate(x+this.width/2, y+this.height/2);
    //console.log(angle);
    ctx.rotate(angle*Math.PI/180.0);
    ctx.translate(-x-this.width/2, -y-this.height/2);
    ctx.drawImage(this.img, x, y, this.width, this.height);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    //ctx.setTransform(-x-this.width/2, -y-this.height/2);
    //ctx.restore();
    missiles.forEach((m) => {
      if(m.status) {
        this.missileV.render(m.x, m.y)
      }
    });

  }


}
