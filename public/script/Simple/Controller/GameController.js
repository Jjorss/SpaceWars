class Enemy {
  constructor(){
    this.model = new EnemyModel(getRandomInt(0, canvas.width*0.9),-1*getRandomInt(0, 500));
    this.view = new EnemyView(this.model.width, this.model.height);
  }
}
class Sniper {
  constructor(playerM){
    this.model = new SniperModel(getRandomInt(0, canvas.width*0.9), 0, playerM);
    //console.log(this.playerM)
    this.view = new SniperView(this.model.width, this.model.height, this.model.missHeight);
  }
}
class FlagShip {
  constructor(playerM) {
    this.model = new FlagShipModel(getRandomInt(0, canvas.width * 0.7), 0, playerM);
    this.view = new FlagShipView(this.model.width, this.model.height);
  }
}
class Meteor {
  constructor() {
    this.model = new MeteorModel(getRandomInt(0, canvas.width*0.9), -1*getRandomInt(100, 500),
    this.randomDx());
    this.view = new MeteorView(this.model.width, this.model.height);
  }

  randomDx(){
    if(Math.random() > 0.5) {
      return getRandomInt(0, 10)*(canvas.height*0.001)
    } else {
      return -1*getRandomInt(0, 10)*(canvas.height*0.001)
    }
  }
}
class PowerUp {
  constructor(x, y) {
    this.model = new PowerUpModel(x, y);
    this.view = new PowerUpView(this.model.width, this.model.height);
  }
}
class Star {
  constructor(type, atVeryStart) {
    this.model = new StarModel(getRandomInt(0, canvas.width*0.9), this.randomY(atVeryStart), type);
    this.view = new StarView(this.model.width, this.model.height);
  }

  randomY(atVeryStart){
    if (atVeryStart) {
      return (getRandomInt(0, canvas.height));
    } else {
      return (-1*getRandomInt(0, 1000));
    }
  }
}
class Explosion {
  constructor(x, y, type) {
    this.model = new ExplosionModel(x, y, type);
    this.view = new ExplosionView(this.model.width, this.model.height);
  }
}

class GameController {
  constructor() {
    this.playerM = new PlayerModel(canvas.width/2, canvas.height/2);
    this.playerV = new PlayerView(this.playerM.width, this.playerM.height);
    this.hud = new Hud();
    this.levelController = new LevelController();
    this.enemies = [];
    this.meteors = [];
    this.powerUps = [];
    this.stars = [];
    // TODO un hard code this value
    while (this.stars.length < 50) {
      this.spawnStars(100, true);
    }
    this.explosions = [];
    document.addEventListener('keydown', function check(e) {
        let code = e.keyCode;
        switch (code) {
            case 37:
              //console.log("strafeLeft");
              this.playerM.strafeLeft = true;
              break; //strafeLeft key
            case 38:
              //console.log("forward");
              this.playerM.forward = true;
              break; //forward key
            case 39:
              //console.log("strafeRight");
              this.playerM.strafeRight = true;
              break; //strafeRight key
            case 40:
              //console.log("backward");
              this.playerM.backward = true;
              break; //backward key
            case 87:
              //console.log("W");
              this.playerM.forward = true;
              break; //W key
            case 65:
              //console.log("A");
              //this.playerM.strafeLeft = true;
              this.playerM.rotateLeft = true;
              break; //A key
            case 83:
              //console.log("S");
              this.playerM.backward = true;
              break; //S key
            case 68:
              //console.log("D");
              //this.playerM.strafeRight = true;
              this.playerM.rotateRight = true;
              break; //D key
            case 81:
              // console.log("Q");
              this.playerM.strafeLeft = true;
              break;
            case 69:
              // console.log("E");
              this.playerM.strafeRight = true;
              break;
            case 32:
              //console.log("space");
              this.playerM.fire = true;
              break;
            default: //console.log("other key");
        }
    }.bind(this), false);

    document.addEventListener('keyup', function check(e) {
        let code = e.keyCode;
        switch (code) {
            case 37:
              //console.log("strafeLeft");
              this.playerM.strafeLeft = false;
              break; //strafeLeft key
            case 38:
              //console.log("forward");
              this.playerM.forward = false;
              break; //forward key
            case 39:
              //console.log("strafeRight");
              this.playerM.strafeRight = false;
              break; //strafeRight key
            case 40:
              //console.log("backward");
              this.playerM.backward = false;
              break; //backward key
            case 87:
              //console.log("W");
              this.playerM.forward = false;
              break; //W key
            case 65:
              //console.log("A");
              //this.playerM.strafeLeft = false;
              this.playerM.rotateLeft = false;
              break; //A key
            case 83:
              //console.log("S");
              this.playerM.backward = false;
              break; //S key
            case 68:
              //console.log("D");
              //this.playerM.strafeRight = false;
              this.playerM.rotateRight = false;
              break; //D key
            case 81:
              // console.log("Q");
              this.playerM.strafeLeft = false;
              break;
            case 69:
              // console.log("E");
              this.playerM.strafeRight = false;
              break;
            case 32:
              //console.log("space");
              this.playerM.fire = false;
              this.playerM.canFire = true;
              break;
            default: //console.log("other key");
        }
    }.bind(this), false);

  }

  init() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas
    //console.log(this);
    // this.render();
    //this.interval = setInterval(this.update, 30);
  }

  spawnPowerUp(x, y) {
    if(Math.random() >= 0.8) {
      console.log("spawned");
      this.powerUps.push(new PowerUp(x, y));
    }
  }

  spawnEnemies() {
    if(this.enemies.length < this.levelController.numberOfEnenemies) {
      let diceRoll = Math.random();
      if(diceRoll > this.levelController.flagShipSpawnRate &&
        this.levelController.difficulty > 15) {
          this.enemies.push(new FlagShip(this.playerM));
      } else if(diceRoll > this.levelController.sniperSpawnRate &&
        this.levelController.difficulty > 5) {
        this.enemies.push(new Sniper(this.playerM));
      } else if(diceRoll > this.levelController.basicSpawnRate &&
        this.levelController.difficulty > 0) {
        this.enemies.push(new Enemy(this.playerM));
      }
      console.log('diceRoll: ', diceRoll, this.levelController.basicSpawnRate,
      this.levelController.sniperSpawnRate, this.levelController.flagShipSpawnRate);
    }
  }

  spawnStars(type, atVeryStart) {
    if(this.stars.length < 50) {
      //console.log("new star");
      this.stars.push(new Star(type, atVeryStart));
    }
  }

  spawnExplosion(x, y, type) {
    this.explosions.push(new Explosion(type));
  }

  spawnMeteors() {
    if(this.meteors.length < 4) {
      this.meteors.push(new Meteor());
    }
  }

  collectGarbage() {
    let newE = [];
    let newMet = [];
    let newPow = [];
    let newS = [];
    let newEx = [];
    this.enemies.forEach((e) =>{
      if(e.model.status) {
        newE.push(e);
      }
    });

    this.stars.forEach((s) => {
      if(s.model.status) {
        newS.push(s);
      } else {
        let ns = new Star(s.type);
        newS.push(ns);
      }
    });

    this.meteors.forEach((m) => {
      if(m.model.status) {
        newMet.push(m);
      }
    });
    this.powerUps.forEach((p) => {
      if(p.model.status) {
        newPow.push(p);
      }
    });
    this.explosions.forEach((ex) => {
      if(ex.model.status) {
        newEx.push(ex);
      }
    });
    this.powerups = newPow;
    this.meteors = newMet;
    this.enemies = newE;
    this.stars = newS;
    this.explosions = newEx;
  }

  calcScore() {
    SCORE = KILLS - MISTAKES;
    //console.log("mis: ", MISTAKES);
  }

  update() {

    if(this.playerM.health > 0) {
      this.playerM.update();
      this.levelController.update();
      this.spawnEnemies();
      this.spawnStars(0, false);
      this.spawnMeteors();
      this.enemies.forEach((e)=> {
        e.model.update();
      });
      this.stars.forEach((s)=> {
        s.model.update();
      });
      this.meteors.forEach((m) => {
        m.model.update();
      });
      this.powerUps.forEach((p) => {
        p.model.update();
      });
      this.explosions.forEach((ex) => {
        ex.model.update();
      });
      this.checkCollision();
      this.collectGarbage();
      this.calcScore();
    } else {
      console.log(UID);
      let endMenu = new EndMenuController(UID);
      endMenu.generateMenu();
      GameState = "End Menu";
      document.getElementById("endMenu").style.display = "block";
    }
  }

  render() {
    this.hud.render(this.playerM.shield, this.playerM.health, SCORE);
    ctx.globalCompositeOperation="destination-over";
    this.playerV.render(this.playerM.x, this.playerM.y, this.playerM.missiles, this.playerM.angle);
    this.enemies.forEach((e)=> {
      e.view.render(e.model.x, e.model.y, e.model.missiles);
    });
    this.meteors.forEach((m) => {
      m.view.render(m.model.x, m.model.y, m.model.health);
    });
    this.powerUps.forEach((p) => {
      p.view.render(p.model.x, p.model.y);
    });
    this.stars.forEach((s)=> {
      s.view.render(s.model.x, s.model.y);
    });
    this.explosions.forEach((ex) => {
      ex.view.render(ex.model.x, ex.model.y, ex.model.type, ex.model.opacity)
    })
    ctx.globalCompositeOperation="destination-over";
    //NOTE: globalCompositeOperation = "source-over"

  }

  checkCollision() {
    this.enemies.forEach((e) => {
      if(e.model.status && this.isCollided(e.model, this.playerM)) {
        e.model.status = 0;
        this.playerM.health--;
        this.explosions.push(new Explosion(this.playerM.x, this.playerM.y, 1));
      }
      e.model.missiles.forEach((m) =>{
        if(m.status && this.isCollided(m, this.playerM)){
          if(this.playerM.shield > 0) {
            this.playerM.shield-=10;
          } else {
            this.playerM.health--;
            this.explosions.push(new Explosion(this.playerM.x, this.playerM.y, 1));
          }
          m.status = 0;
        }
      });
      this.playerM.missiles.forEach((m) => {
        if(e.model.status && m.status && this.isCollided(e.model, m)) {
          e.model.updateHealth();
          m.status = 0;
          this.explosions.push(new Explosion(e.model.x, e.model.y, 2));
        }
      });
    });
    this.meteors.forEach((m) => {
      if(m.model.status && this.isCollided(m.model, this.playerM)){
        m.model.status = 0;
        this.playerM.health--;
        this.explosions.push(new Explosion(this.playerM.x, this.playerM.y, 1));
        this.explosions.push(new Explosion(m.model.x, m.model.y, 2));
      }
      this.playerM.missiles.forEach((miss)=>{
        if(miss.status && m.model.status && this.isCollided(miss, m.model)) {
          miss.status = 0;
          m.model.health--;
          if(m.model.health <= 0) {
            this.explosions.push(new Explosion(m.model.x, m.model.y, 2));
            this.spawnPowerUp(m.model.x, m.model.y);
          }
        }
      });
    });
    this.powerUps.forEach((p) => {
      if(p.model.status && this.isCollided(p.model, this.playerM)) {
        p.model.status = 0;
        this.playerM.shield+=10;
      }
    });
  }

  isCollided(obj1, obj2) {
    if ((obj1.x < obj2.x + obj2.width &&
     obj1.x + obj1.width > obj2.x &&
     obj1.y < obj2.y + obj2.height &&
     obj1.height + obj1.y > obj2.y)){
      return true;
    }
    return false;
  }


}
