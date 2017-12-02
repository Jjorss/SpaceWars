let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
canvas.width = window.innerWidth*.99;
canvas.height = window.innerHeight*.99;
const SCALE = 0.75;
let SCORE = 0;
let KILLS = 0;
let MISTAKES = 0;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let GameState = "Start Menu";

let game = new GameController();
let startMenu = new StartMenuController();
game.init();

let render = function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas
    switch(GameState) {
      case "Start Menu":
        startMenu.render();
        break;
      case "Game":
        game.render();
        break;
      case "End Menu":
        break;
      default:
        console.log("Broken State");
    }
    window.requestAnimationFrame(render);
}

let update = function() {
    switch(GameState) {
      case "Start Menu":
        startMenu.update();
        break;
      case "Game":
        game.update();
        break;
      case "End Menu":
        break;
      default:
        console.log("Broken State");
    }
}
render();
let interval = setInterval(update, 30);
