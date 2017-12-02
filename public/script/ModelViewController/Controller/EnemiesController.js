class EnemiesController {
  constructor() {
    this.enemies = [];
    this.maxEnemies = 8;
    this.width = canvas.height*0.04;
    this.height = canvas.height*0.04;
    this.maxYSpawnPoint = 300;
    this.dx = 0;
    this.dy = 2//-1*canvas.height*0.001;
    this.imgShip1 = new Image();
    this.imgShip2 = new Image();
    this.imgShip1.src = '../PNG/Enemies/enemyRed1.png';
    this.imgShip2.src = '../PNG/Enemies/enemyRed3.png';
  }

  update() {
    this.enemies.forEach((e) => {
      e.update();
    });
    this.spawner();
    this.collectGarbage();
  }

  render() {
    this.enemies.forEach((e) => {
      //console.log("Rendering");
      e.render();
    });
  }

  spawner() {
    let img;
    if(Math.random() > 0.5) {
      img = this.imgShip1;
    } else {
      img = this.imgShip2;
    }

    if(this.enemies.length < this.maxEnemies) {
      //console.log("spawning");
      let e = new EnemyController(
        getRandomInt(this.width, canvas.width-this.width),
         -1*getRandomInt(0, this.maxYSpawnPoint),
         this.dx,
         this.dy,
         this.width,
         this.height,
         1,
         img
      );
      this.enemies.push(e);
      //console.log(this.enemies.length);
    }
  }

  // broken
  collectGarbage() {
    let newE = [];
    this.enemies.forEach((e) => {
      if(e.getStatus()) {
        newE.push(e);
      }
    });
    this.enemies = newE;
  }

// GETTERS and SETTERS -------------------------------------
getEnemies() {
  return this.enemies;
}
setEnemies(e) {
  this.enemies = e;
}

}
