class StartMenuController {
  constructor() {
    document.addEventListener('click', function(event) {
      //console.log("Clicked");
      //console.log(event);
      this.handleClick(event);
    }.bind(this));
    this.meteors = [];
    this.stars = [];
    while (this.stars.length < 100) {
      this.spawnStars(100, true);
    }
    this.fontSize = 25;
    this.fsd = 1;
  }

  spawnMeteors(max) {
    if(this.meteors.length < max) {
      this.meteors.push(new Meteor());
      //console.log("spawned");
    }
  }

  spawnStars(max, atVeryStart) {
    if(this.stars.length < max) {
      this.stars.push(new Star(0, atVeryStart));
      //console.log("spawned");
    }
  }

  update() {
    this.spawnMeteors(8);
    this.spawnStars(200, false);
    this.meteors.forEach((m) => {
      m.model.update();
    });
    this.stars.forEach((s) => {
      s.model.update();
    });
    if(this.fontSize >= 72) {
      this.fsd*=-1;
    }
    if(this.fontSize<=24) {
      this.fsd*=-1;
    }
    this.fontSize+=this.fsd;
    console.log(this.fontSize);
    this.collectGarbage();
  }

  render() {
    this.meteors.forEach((m) => {
      m.view.render(m.model.x, m.model.y, m.model.health);
    });
    ctx.globalCompositeOperation="destination-over";
    this.stars.forEach((s) => {
      s.view.render(s.model.x, s.model.y);
    });
    ctx.font = `${this.fontSize}px sans-serif`;
    ctx.fillStyle = 'white';
    ctx.textAlign = "center";
    ctx.fillText("Space Wars!", (canvas.width/2), canvas.height*0.1);
  }

  handleClick(event) {
    if(event.target.id == "startBtn") {
      GameState = "Game";
      document.getElementById("startMenu").style.display = "none";
    }
  }

  collectGarbage() {
    let newM = [];
    let newS = [];
    this.meteors.forEach((m) => {
      if(m.model.status) {
        newM.push(m);
      }
    });
    this.stars.forEach((s) => {
      if(s.model.status) {
        newS.push(s);
      }
    });
    this.meteors = newM;
    this.stars = newS;
  }

}
