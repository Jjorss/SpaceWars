class StartMenuController {
  constructor() {
    document.addEventListener('click', function(event) {
      console.log("Clicked");
      console.log(event);
      this.handleClick(event);
    }.bind(this));
    this.meteors = [];
  }

  spawnMeteors(max) {
    if(this.meteors.length < max) {
      this.meteors.push(new Meteor());
      console.log("spawned");
    }
  }

  update() {
    this.spawnMeteors(8);
    this.meteors.forEach((m) => {
      m.model.update();
    });

    this.collectGarbage();
  }

  render() {
    this.meteors.forEach((m) => {
      m.view.render(m.model.x, m.model.y);
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
    this.meteors.forEach((m) => {
      if(m.model.status) {
        newM.push(m);
      }
    });
    this.meteors = newM;
  }


}
