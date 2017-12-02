let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight*1;
let interval;
let uid;
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
let spaceship1 = new Image();
let EC = new EnemiesController();
let MC = new MissilesController();

let player = new PlayerController(canvas.width/2, canvas.height/2, canvas.width*0.0125,
 -1 * canvas.height*0.02, canvas.height*0.069, canvas.height*0.06, 1, spaceship1, MC);

let entityController = new EntityController(player, EC, MC);

let init = function() {
  spaceship1.src = '../../PNG/playerShip1_blue.png';

  render();
}


// where all the update methods will be called
let update = function() {
  entityController.update();
}
// where all the draw methods will be called
let render = function() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  entityController.render();
  window.requestAnimationFrame(render);
}


let startGame = function() {
  console.log("called");
  firebase.database().ref('Users/').child(uid).child("highScore").once('value', function(snap){
    let score = snap.val();
    highScore = score;
  }).then(function() {
    interval = setInterval(update, 30);
  });
}
let setUID = function(playerUid) {
  uid = playerUid;
  console.log(uid);
}
init();
interval = setInterval(update, 30);
