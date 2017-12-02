class StartMenuController {
  constructor() {
    document.addEventListener('click', function(event) {
      console.log("Clicked");
      console.log(event);
      this.handleClick(event);
    }.bind(this));
    this.meteors = [];
    this.stars = [];
  }

  spawnMeteors(max) {
    if(this.meteors.length < max) {
      this.meteors.push(new Meteor());
      console.log("spawned");
    }
  }

  spawnStars(max) {
    if(this.stars.length < max) {
      this.stars.push(new Star(0));
      console.log("spawned");
    }
  }

  update() {
    this.spawnMeteors(8);
    this.spawnStars(200);
    this.meteors.forEach((m) => {
      m.model.update();
    });
    this.stars.forEach((s) => {
      s.model.update();
    });

    this.collectGarbage();
  }

  render() {
    this.meteors.forEach((m) => {
      m.view.render(m.model.x, m.model.y);
    });
    ctx.globalCompositeOperation="destination-over";
    this.stars.forEach((s) => {
      s.view.render(s.model.x, s.model.y);
    });
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
