class SniperModel {
  constructor(x, y, playerM) {
    this.x = x;
    this.y = y;
    this.dx = 2 * SCALE;//canvas.height * 0.01;
    this.dy = canvas.height * 0.003 * SCALE;
    this.width = canvas.height * 0.07 * SCALE;
    this.height = canvas.height*0.07 * SCALE;
    this.status = 1;
    // states = Moving => tracking => locked => fire
    this.state = "Moving";
    this.playerM = playerM;
    this.count = 3;
    this.canFire = false;
    this.interval;
    this.missiles = [];
    this.missHeight = canvas.height*2 * SCALE;
  }

  update() {
    this.move();
    this.missiles.forEach((m) => {
      m.update();
    });
    this.borderDetection();
    this.collectGarbage();
    //console.log("updating");
  }

  borderDetection() {
    if(this.x >= canvas.width - this.width) {
      this.x -= this.dx;
    } else if (this.x <= 0) {
      this.x +=this.dx;
    }

    if(this.y > canvas.height) {
      this.status = 0;
      MISTAKES++;
    }
  }


  move() {
    //console.log(this.left, this.up, this.down, this.right);
    // states = Moving => tracking => locked => fire
    switch(this.state) {
      case "Moving":
        console.log("moving");
        this.moveIntoPlace();
        break;
      case "Track":
        //console.log("tracking");
        this.track();
        break;
      case "Locked":
        //console.log("tracking");
        this.countDown();
        this.state = "Fire";
        break;
      case "Fire":
        //console.log("tracking");
        //console.log("Fire");
        this.fire();
        break;
      default:
        console.log("Broken state");
    }
  }

  moveIntoPlace() {
    if(this.y <= 0) {
      this.x+= this.dx;
      this.y+= this.dy;
    } else {
      this.state = "Track";
    }
  }

  track() {
    if(Math.abs(this.x - this.playerM.x) > canvas.width*0.01) {
      if(this.x > this.playerM.x) {
        this.x -=this.dx;
        //console.log("left", this.x, this.playerM.x);
      } else {
        this.x += this.dx;
        //console.log("right", this.x, this.playerM.x);
      }
    } else {
      this.state = "Locked";
    }
  }

  countDown() {
    this.interval = setInterval(function(){
      this.handleCountDown()
    }.bind(this), 1000);
  }

  handleCountDown() {
    //console.log("Called");
    this.count--;
    if (this.count <= 0) {
      this.canFire = true;
    }
  }

  fire() {
    if(this.canFire) {
      console.log("Fire");
      clearInterval(this.interval);
      this.count = 3;
      this.canFire = false;
      this.missiles.push(new EMissileModel(this.x, this.y, 2, this.missHeight));
      this.state = "Track";
    }
  }

  collectGarbage() {

  }


}
