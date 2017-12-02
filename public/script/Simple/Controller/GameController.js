class Enemy {
  constructor(){
    this.model = new EnemyModel(getRandomInt(0, canvas.width*0.9), 0);
    this.view = new EnemyView(this.model.width, this.model.height);
  }
}
class Meteor {
  constructor() {
    this.model = new MeteorModel(getRandomInt(0, canvas.width*0.9),
    -1*getRandomInt(100, 500),
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
class GameController {
  constructor() {
    this.SCORE = 0;
    this.KILLS = 0;
    this.MISTAKES = 0;
    this.playerM = new PlayerModel(canvas.width/2, canvas.height/2);
    this.playerV = new PlayerView(this.playerM.width, this.playerM.height);
    this.hud = new Hud();
    this.enemies = [];
    this.meteors = [];
    this.powerUps = [];
    document.addEventListener('keydown', function check(e) {
        let code = e.keyCode;
        switch (code) {
            case 37:
              //console.log("left");
              this.playerM.left = true;
              break; //Left key
            case 38:
              //console.log("up");
              this.playerM.up = true;
              break; //Up key
            case 39:
              //console.log("Right");
              this.playerM.right = true;
              break; //Right key
            case 40:
              //console.log("Down");
              this.playerM.down = true;
              break; //Down key
            case 87:
              //console.log("W");
              this.playerM.up = true;
              break; //W key
            case 65:
              //console.log("A");
              this.playerM.left = true;
              break; //A key
            case 83:
              //console.log("S");
              this.playerM.down = true;
              break; //S key
            case 68:
              //console.log("D");
              this.playerM.right = true;
              break; //D key
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
              //console.log("left");
              this.playerM.left = false;
              break; //Left key
            case 38:
              //console.log("up");
              this.playerM.up = false;
              break; //Up key
            case 39:
              //console.log("Right");
              this.playerM.right = false;
              break; //Right key
            case 40:
              //console.log("Down");
              this.playerM.down = false;
              break; //Down key
            case 87:
              //console.log("W");
              this.playerM.up = false;
              break; //W key
            case 65:
              //console.log("A");
              this.playerM.left = false;
              break; //A key
            case 83:
              //console.log("S");
              this.playerM.down = false;
              break; //S key
            case 68:
              //console.log("D");
              this.playerM.right = false;
              break; //D key
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
    if(Math.random() >= 0.9) {
      console.log("spawned");
      powerUps.push(new PowerUp(x, y));
    }
  }

  spawnEnemies() {
    if(this.enemies.length < 8) {
      //console.log("new enemy");
      this.enemies.push(new Enemy());
    }
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
    this.enemies.forEach((e) =>{
      if(e.model.status) {
        newE.push(e);
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
    this.powerUps = newPow;
    this.meteors = newMet;
    this.enemies = newE;
  }

  calcScore() {
    this.SCORE = this.KILLS - this.MISTAKES;
  }

  update() {

    if(this.playerM.health > 0) {
      this.playerM.update();
      this.spawnEnemies();
      this.spawnMeteors();
      this.enemies.forEach((e)=> {
        e.model.update();
      });
      this.meteors.forEach((m) => {
        m.model.update();
      });
      this.powerUps.forEach((p) => {
        p.model.update();
      });
      this.checkCollision();
      this.collectGarbage();
      this.calcScore();
    }
  }

  render() {
    //console.log(this);

    this.playerV.render(this.playerM.x, this.playerM.y, this.playerM.missiles);
    this.enemies.forEach((e)=> {
      e.view.render(e.model.x, e.model.y, e.model.missiles);
    });
    this.meteors.forEach((m) => {
      m.view.render(m.model.x, m.model.y);
    });
    this.powerUps.forEach((p) => {
      p.view.render(p.model.x, p.model.y);
    });

    this.hud.render(this.playerM.shield, this.playerM.health, this.SCORE);

  }

  checkCollision() {
    this.enemies.forEach((e) => {
      if(e.model.status && this.isCollided(e.model, this.playerM)) {
        e.model.status = 0;
        this.playerM.health--;
      }
      e.model.missiles.forEach((m) =>{
        if(m.status && this.isCollided(m, this.playerM)){
          if(this.playerM.shield > 0) {
            this.playerM.shield-=10;
          } else {
            this.playerM.health--;
          }
          m.status = 0;
        }
      });
      this.playerM.missiles.forEach((m) => {
        if(e.model.status && m.status && this.isCollided(e.model, m)) {
          e.model.status = 0;
          m.status = 0;
          this.KILLS++;
        }
      });
    });
    this.meteors.forEach((m) => {
      if(m.model.status && this.isCollided(m.model, this.playerM)){
        m.model.status = 0;
        this.playerM.health--;
      }
      this.playerM.missiles.forEach((miss)=>{
        if(miss.status && m.model.status && this.isCollided(miss, m.model)) {
          miss.status = 0;
          m.model.health--;
          if(m.model.health <= 0) {
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