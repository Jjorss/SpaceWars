let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight*1;
let animationTick = 0;
let maxStep = 10;
// Player start
let playerX = canvas.width/2;
let playerY = canvas.height/2;
let playerDX = canvas.width*0.0125;
let playerDY = -1 * canvas.height*0.02;
let life = 3;
let left = false;
let right = false;
let up = false;
let down = false;
let fire = false;
let canFire = true;
let missiles = [];
let shield = 100;
let shieldIter = 1;
let shieldActivated = false;
let incShield = false;
let shieldDown = false;
let fps = 0;
let playerScore = 0;
let shipsKilled = 1;
let meteorsDodged = 1;
let spawnShips = false;
let meteorShower = true;
let highScore = 0;
const pWidth = canvas.width*0.069;
const pHeight = canvas.width*0.06;
const mWidth = 10;
const mHeight = 10;
// player end
let enemies = [];
let enemiesMissiles = [];
const eWidth = canvas.width*0.04;
const eHeight = canvas.width*0.04;

let explosionsToRender = [];
let damageToRender = [];
let powerUps = [];
let meteors = [];


let spaceship = new Image();
let fire1 = new Image();
let fire2 = new Image();
let fire3 = new Image();
let pLaser1 = new Image();
let pLaser2 = new Image();
let pLaser3 = new Image();
let enemy1 = new Image();
let enemy2 = new Image();
let enemyFire1 = new Image();
let enemyFire2 = new Image();
let enemyFire3 = new Image();
let explosion1 = new Image();
let explosion2 = new Image();
let explosion3 = new Image();
let damage1 = new Image();
let damage2 = new Image();
let damage3 = new Image();
let number3 = new Image();
let number2 = new Image();
let number1 = new Image();
let number0 = new Image();
let eLaser1 = new Image();
let eLaser2 = new Image();
let eLaser3 = new Image();
let shield1 = new Image();
let shield2 = new Image();
let shield3 = new Image();
let powerUpShield1 = new Image();
let powerUpShield2 = new Image();
let meteor1 = new Image();
let meteor2 = new Image()


function init() {
  spaceship.src = '../PNG/playerShip1_blue.png';
  fire1.src = '../PNG/Effects/fire04.png';
  fire2.src = '../PNG/Effects/fire05.png';
  fire3.src = '../PNG/Effects/fire06.png';
  pLaser1.src = '../PNG/Lasers/laserBlue01.png';
  pLaser2.src = '../PNG/Lasers/laserBlue07.png';
  pLaser3.src = '../PNG/Lasers/laserBlue16.png';
  enemy1.src = '../PNG/Enemies/enemyRed1.png';
  enemy2.src = '../PNG/Enemies/enemyRed3.png';
  enemyFire1.src = '../PNG/Effects/fire13.png';
  enemyFire2.src = '../PNG/Effects/fire14.png';
  enemyFire3.src = '../PNG/Effects/fire15.png';
  explosion1.src = '../PNG/bang.png';
  explosion2.src = '../PNG/pow.png';
  explosion3.src = '../PNG/ouch.png';
  damage1.src = '../PNG/Damage/playerShip1_damage1.png';
  damage2.src = '../PNG/Damage/playerShip1_damage2.png';
  damage3.src = '../PNG/Damage/playerShip1_damage3.png';
  number3.src = '../PNG/UI/numeral3.png';
  number2.src = '../PNG/UI/numeral2.png';
  number1.src = '../PNG/UI/numeral1.png';
  number0.src = '../PNG/UI/numeral0.png';
  eLaser1.src = '../PNG/Lasers/laserRed02.png';
  eLaser2.src = '../PNG/Lasers/laserRed03.png';
  eLaser3.src = '../PNG/Lasers/laserRed13.png';
  shield1.src = '../PNG/Effects/shield1.png';
  shield2.src = '../PNG/Effects/shield2.png';
  shield3.src = '../PNG/Effects/shield3.png';
  powerUpShield1.src = '../PNG/Power-ups/shield_blue.png';
  powerUpShield2.src = '../PNG/Power-ups/shield_silver.png';
  meteor1.src = '../PNG/Meteors/meteorBrown_big1.png';
  meteor2.src = '../PNG/Meteors/meteorGrey_big1.png';

  window.requestAnimationFrame(draw);
}

let animationStep = function() {
  if(animationTick >= 10) {
    animationTick = 0;
  } else {
    animationTick++;
  }
}

let spawnMissile = function(x, y) {
  let m = {
    x: x + (100/2) - (mWidth/2),
    y: y,
    width: mWidth,
    height: mHeight,
    dx: canvas.width*0.03,
    dy: -1 * canvas.height*0.03,
    status: 1
  }
  missiles.push(m);
}

let spawnEnemyMissile = function(x, y) {
  let m = {
    x: x, //+ (50/2) - (Width/2),
    y: y,
    width: 10,
    height: 50,
    dx: canvas.width*0.03,
    dy: canvas.height*0.01,
    status: 1
  }
  enemiesMissiles.push(m);
}

let spawnEneimes = function(x, y) {
  let t = 1;
  if(Math.random()>0.5){
    t = 1;
  } else {
    t = 2;
  }
  let e = {
    x: x,
    y: y,
    width: eWidth,
    height: eHeight,
    dx: canvas.width*0.001,
    dy: canvas.height*0.002,
    type: t,
    status: 1
  }
  enemies.push(e);
}

let spawnMeteor = function(x, y, type) {
  let size = pWidth * (getRandomInt(5, 10)*0.1);
  let dx = 0;
  let diceRoll = Math.random();
  if (diceRoll < 0.3){
    dx = -2;
  } else if(diceRoll < 0.6) {
    dx = 2;
  } else {
    dx = 0;
  }
  let m = {
    x: x,
    y: y,
    dx: dx,
    dy: 3,
    width: size,
    height: size,
    status: 1,
    health: 3,
    type: type
  }
  meteors.push(m);
}

let spawnPowerUp = function(x, y, type) {
  let p = {
    x: x,
    y: y,
    dx: 2,
    dy: 2,
    width: pWidth * 0.25,
    height: pHeight * 0.25,
    type: type,
    status: 1
  }
  powerUps.push(p);
}

let spawnDamage = function(x, y, life) {
  if(Math.random() > 0.5) {
    dx = 2;
  } else {
    dx = -2;
  }
  if(Math.random() > 0.5) {
    dy = -2;
  } else {
    dy = 2;
  }
  let d = {
    x: x,
    y: y,
    dx: dx,
    dy: dy,
    rotation: 0,
    type: life,
    rendered: false,
    opacity: 1
  }
  damageToRender.push(d);
}

let powerUpsSpawner = function () {
  if(Math.random() > 0.9) {
    if(Math.random() > 0.9) {
      if(Math.random() > 0.9) {
        spawnPowerUp(getRandomInt(0 + pWidth, canvas.width - pWidth),
         -1 * getRandomInt(0, 10),
         getRandomInt(1, 3));
      }
    }
  }
}
let meteorSpawner = function() {
  if(meteors.length < 9){
    spawnMeteor(getRandomInt(0 + pWidth, canvas.width - pWidth),
                -1 * getRandomInt(0, 100),
                getRandomInt(1, 2));
  }
  // if(Math.random() > 0.9) {
  //   if(Math.random() > 0.9) {
  //     if(Math.random() > 0.3) {
  //
  //     }
  //   }
  // }
}

let enemySpawner = function() {
  if(enemies.length < 8) {
    spawnEneimes(getRandomInt(pWidth, canvas.width-pWidth), -1*getRandomInt(0, 200));
  }
}

let enimiesMissilesSpawner = function() {
  if(Math.random() > 0.9) {
    if(Math.random() > 0.5 && enemies.length != 0) {
      let e = enemies[getRandomInt(0, enemies.length-1)];
      spawnEnemyMissile(e.x, e.y);
    }
  }
}

let explosionSpawner = function(x, y, player) {
  let exWidth = 50;
  let exHeight = 50;
  let t = 1;
  if(Math.random() > 0.5){
    t =1;
  } else {
    t = 2;
  }
  if (player){
    t=3;
  }
  let ex = {
    x: x,
    y: y,
    width: exWidth,
    height: exHeight,
    rendered: false,
    type: t,
    opacity: 1
  }
  explosionsToRender.push(ex);
}

let drawMeteors = function() {
  for(let i = 0; i < meteors.length; i++) {
    let m = meteors[i];
    if(m.status){
      if(m.type == 1) {
        ctx.drawImage(meteor1, m.x, m.y, m.width, m.height);
      } else {
        ctx.drawImage(meteor2, m.x, m.y, m.width, m.height);
      }
    }
  }
}

let drawPowerUps = function() {
  for(let i = 0; i < powerUps.length; i++) {
    let p = powerUps[i];
    if(p.status) {
      if(animationTick % 10 >5) {
        ctx.drawImage(powerUpShield1, p.x, p.y, p.width, p.height);
      } else {
        ctx.drawImage(powerUpShield2, p.x, p.y, p.width, p.height);
      }
    }
  }
}

let drawSheild = function() {
  let font = canvas.height*0.03;
  let tX = 0;
  let tY = canvas.height*0.18;
  let numWidth = canvas.width*0.09;
  let numHeight = canvas.height*0.03;
  let numX = tX + (font*3.5);
  let numY = tY - numHeight;
  //ctx.textAlign = "center";
  ctx.font =  font + "px Comic Sans MS";
  if(!shieldDown) {
    ctx.fillStyle = 'rgba(128, 179, 255, 0.9)';
    ctx. fillRect(numX, numY, numWidth * (shield*0.01), numHeight);
    ctx.fillStyle = "White";
  } else {
    ctx.fillStyle = "Red";
  }
  ctx.fillText("Shield: ", tX, tY);
}

let drawHealth = function() {
  let font = canvas.height*0.03;
  let tX = 0;
  let tY = canvas.height*0.08;
  let numWidth = canvas.width*0.025;
  let numHeight = canvas.height*0.04;
  let numX = tX + (font*3);
  let numY = tY - (numWidth/2);

  ctx.font =  font + "px Comic Sans MS";
  ctx.fillStyle = "White";
  //ctx.textAlign = "center";

  let imgNum;
  if(life == 3) {
    imgNum = number3
  } else if (life == 2) {
    imgNum = number2;
  } else if(life == 1) {
    imgNum = number1;
    ctx.fillStyle = "Red";
  } else {
    ctx.fillStyle = "Red";
    imgNum = number0;
  }
  ctx.fillText("Lives: ", tX, tY);
  ctx.drawImage(imgNum, numX, numY,
  numWidth, numHeight);
}

let drawKills = function() {
  let font = canvas.height*0.03;
  let tX = 0;
  let tY = canvas.height*0.28;
  let numWidth = canvas.width*0.025;
  let numHeight = canvas.height*0.04;
  let numX = tX + (font*3);
  let numY = tY - (numWidth/2);

  ctx.font =  font + "px Comic Sans MS";
  ctx.fillStyle = "White";
  ctx.fillText("Player Score: " + playerScore, tX, tY);
}

let drawDamage = function() {
  for(let i = 0; i < damageToRender.length; i++) {
    let d = damageToRender[i];
    if(!d.rendered) {
      ctx.globalAlpha = d.opacity;
      if(d.type == 1) {
        ctx.drawImage(damage1, d.x+=d.dx, d.y+=d.dy, 100, 100);
      } else {
        ctx.drawImage(damage2, d.x+=d.dx, d.y+=d.dy, 100, 100);
      }
      if(animationTick%1 == 0) {
        d.opacity-=0.04;
      }
      //console.log(ctx.globalAlpha);
      if(d.opacity <= 0) {
        d.rendered = true;
      }
    }
    ctx.globalAlpha = 1;
  }
}

let drawExplosions = function() {
  for(let i = 0; i < explosionsToRender.length; i++) {
    let ex = explosionsToRender[i];
    if(!ex.rendered) {
      ctx.globalAlpha = ex.opacity;
      if(ex.type == 1) {
        ctx.drawImage(explosion1, ex.x++, ex.y--, 100, 100);
      } else if (ex.type == 2) {
        ctx.drawImage(explosion2, ex.x++, ex.y--, 100, 100);
      } else {
        ctx.drawImage(explosion3, ex.x--, ex.y++, 100, 100);
      }
      if(animationTick%1 == 0) {
        ex.opacity-=0.04;
      }
      //console.log(ctx.globalAlpha);
      if(ex.opacity <= 0) {
        ex.rendered = true;
      }
    }
    ctx.globalAlpha = 1;
    //console.log(ex.x, " ", ex.y);
    //ctx.drawImage(explosions, ex.x, ex.y, 100, 100);
  }
}

let drawEnemy = function() {
  let shipW = eWidth;
  let shipH = eHeight;
  let fireW = 20;
  let fireH = 20;
  for(let i = 0; i < enemies.length; i++) {
    let e = enemies[i];
    if (e.status) {
      if(e.type == 1) {
        ctx.drawImage(enemy1, e.x, e.y, shipW, shipH);
      } else {
        ctx.drawImage(enemy2, e.x, e.y, shipW, shipH);
      }
      if(animationTick%3 == 0) {
        ctx.drawImage(enemyFire1, e.x + (shipW/2) - (fireW/2), e.y - fireH/2, fireW, fireH);
      } else if(animationTick%3 == 2) {
        ctx.drawImage(enemyFire2, e.x + (shipW/2) - (fireW/2), e.y - fireH/2, fireW, fireH);
      } else {
        ctx.drawImage(enemyFire3, e.x + (shipW/2) - (fireW/2), e.y - fireH/2, fireW, fireH);
      }
    }
  }
}

let drawEnemyMissiles = function() {
  for(let i = 0; i < enemiesMissiles.length; i++) {
    let m = enemiesMissiles[i];
    if (m.status) {
      // ctx.strokeStyle="red";
      // ctx.rect(m.x,
      //   m.y,
      //   m.width,
      //   m.height);
      // ctx.stroke();
      if(animationTick%3 == 0) {
        ctx.drawImage(eLaser1, m.x, m.y, 10, 20);
      } else if(animationTick%3 == 1) {
        ctx.drawImage(eLaser2, m.x, m.y, 10, 20);
      } else {
        ctx.drawImage(eLaser3, m.x, m.y, 10, 20);
      }
    }
  }
}

let drawMissiles = function() {
  for(let i = 0; i < missiles.length; i++) {
    let m = missiles[i];
    if (m.status) {
      if(animationTick%3 == 0) {
        ctx.drawImage(pLaser1, m.x, m.y, 10, 20);
      } else if(animationTick%3 == 1) {
        ctx.drawImage(pLaser2, m.x, m.y, 10, 20);
      } else {
        ctx.drawImage(pLaser3, m.x, m.y, 10, 20);
      }

    }
  }
}

function drawPlayer() {
  let fireWidth = pWidth * 0.3;
  let fireHeight = pHeight * 0.3;
  let shieldWidth = pWidth * 1.4;
  let shieldHeight = pHeight * 1.8;
  if(shieldActivated) {
    let sImg;
    if(shieldIter == 1) {
      sImg = shield1;
    } else if(shieldIter == 2) {
      sImg = shield2;
    } else {
      sImg = shield3
    }
    if(fps%10 == 0 && !incShield) {
      incShield = true;
      shieldIter ++ ;
      if(shieldIter >= 4) {
        shieldIter = 1;
        shieldActivated = false;
      }
    } else {
      incShield = false;
    }
    if(!shieldDown) {
      ctx.drawImage(sImg, playerX - (shieldWidth/2-pWidth/2), playerY -(shieldHeight/2-pHeight/2), shieldWidth, shieldHeight);
    }
  }
  ctx.drawImage(spaceship, playerX, playerY, pWidth, pHeight);
  // ctx.strokeStyle="red";
  // ctx.rect(playerX + pWidth*0.05,
  //   playerY + pHeight*0.1,
  //   pWidth - pWidth*0.05,
  //   pHeight - pHeight*0.1);
  // ctx.stroke();
  if(animationTick%3 == 0) {
    ctx.drawImage(fire1, playerX+(pWidth/2) - (fireWidth/2), playerY + (pHeight-(pHeight*0.03)), fireWidth, fireHeight);
  } else if(animationTick%3 == 1)  {
    ctx.drawImage(fire2, playerX+(pWidth/2) - (fireWidth/2), playerY + (pHeight-(pHeight*0.03)), fireWidth, fireHeight);
  } else {
    ctx.drawImage(fire3, playerX+(pWidth/2) - (fireWidth/2), playerY + (pHeight-(pHeight*0.03)), fireWidth, fireHeight);
  }
}

let draw = function() {

  //ctx.globalCompositeOperation = 'destination-over';
  ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas
  drawPlayer();
  drawMissiles();
  drawEnemyMissiles();
  drawEnemy();
  drawExplosions();
  drawDamage();
  drawHealth();
  drawSheild();
  drawKills();
  drawPowerUps();
  drawMeteors();
  fps++;
  if(fps >= 60) {
    fps = 0;
  }
  window.requestAnimationFrame(draw);
}

function loop() {
  if(life > 0) {
    //console.log("shipsKilled: " ,shipsKilled);
    //console.log("meteorDestroyed: ", meteorsDodged);
    // if(shipsKilled%30 == 0) {
    //   spawnShips = true;
    //   meteorShower = true;
    //   //console.log("Fired", spawnShips, meteorShower);
    // }
    if(meteorsDodged%20 == 0) {
      spawnShips = true;
      meteorShower = false;
    }
    // if(spawnShips) {
    //   enemySpawner();
    //   console.log("ships");
    // }
    enemySpawner();
    // if(meteorShower) {
    //   meteorSpawner();
    // }
    meteorSpawner();
    enimiesMissilesSpawner();
    moveShip();
    moveMissiles();
    moveEnemyMissiles();
    moveEnemies();
    movePowerUps();
    borderDetection();
    shoot();
    powerUpsSpawner();
    moveMeteors();
    collision();
    collectGarbage();
  } else {
    console.log("Over!");
    clearInterval(interval);
    let leaderName= "No Name";
    let leaderHighScore = 0;
    firebase.database().ref('leader/').once('value', function(snap) {
      let leader = snap.val();
      leaderName = leader.name;
      leaderHighScore = leader.highScore;
    }).then(function() {
      document.getElementById('end').style.display = "block";
      document.getElementById('end').style.width = canvas.width*0.25 + "px";
      document.getElementById('end').style.height = canvas.height*0.25 + "px";
      let html = ``;
      html+= `<p>Great Job! You Died.</p>`;
      html+= `<p>Your Score Was: ${playerScore}</p>`;
      if(playerScore > highScore) {
        console.log("New High Score");
        firebase.database().ref('Users/').child(uid).child("/highScore/").set(playerScore);
        html+=`<p>New High Score!</p>`;
      }
      html+=`<p>Current Leader: ${leaderName}</p>`;
      html+=`<p>Current High Score: ${leaderHighScore}</p>`;
      html+=`<p>Refresh To Play Again!</p>`;

      document.getElementById('end').innerHTML = html;
    });

  }
}

let moveMeteors = function() {
  for(let i = 0; i < meteors.length; i++) {
    let m = meteors[i];
    m.y+=m.dy;
    m.x+=m.dx;
  }
}

let movePowerUps = function() {
  for(let i = 0; i < powerUps.length; i++) {
    let p = powerUps[i];
    p.y+=p.dy;
  }
}

let moveEnemyMissiles = function() {
  for(let i = 0; i < enemiesMissiles.length; i++) {
    let m = enemiesMissiles[i];
    m.y+=m.dy;
  }
}

let shoot = function() {
  if(fire && canFire) {
    canFire = false;
    spawnMissile(playerX, playerY);
  }
}

let borderDetection = function() {
  if(playerX >= canvas.width) {
    playerX -= playerDX;
  } else if (playerX <= 0) {
    playerX +=playerDX;
  } else if (playerY >= canvas.height) {
    playerY += playerDY;
  } else if (playerY <= 0) {
    playerY -= playerDY;
  }
  missileBorder();
  enemyBorder();
  meteorsBorder();
}

let meteorsBorder = function() {
  for(let i = 0; i < meteors.length;i++){
    if (meteors[i].y >= canvas.height) {
      meteors[i].status = 0;
      meteorsDodged++;

    }
  }
}

let missileBorder = function(m) {
  let newM = [];
  for(let i = 0; i < missiles.length; i++) {
    let m = missiles[i];
    if(m.y > 0) {
      newM.push(m);
    }
  }
  missiles = newM;
}

let enemyBorder = function() {
  let newE = [];
  for(let i = 0; i < enemies.length; i++) {
    let e = enemies[i];
    if(e.y < canvas.height) {
      newE.push(e);
    } else {
      playerScore--;
    }
  }
  enemies = newE;
}

let collision = function() {
  //   playerX + pWidth*0.05,
  //   playerY + pHeight*0.1,
  //   pWidth - pWidth*0.05,
  //   pHeight - pHeight*0.1
  let xOffset = pWidth*0.05;
  let yOffset = pHeight*0.1;
  let p = {
    x: playerX + xOffset,
    y: playerY + yOffset,
    width: pWidth - xOffset,
    height: pHeight - yOffset
  }
  for(let i = 0; i < meteors.length; i++) {
    let m = meteors[i];
    if (m.status && isCollided(m, p)) {
      m.status = 0;
      shield-=50;
      if(shield < 0){
        shield = 0;
        life--;
      }
    }
    for (let i = 0; i < missiles.length; i++) {
      let miss = missiles[i];
      if(m.status && miss.status && isCollided(m, miss)) {
        miss.status = 0;
        m.health--;
        if (m.health <= 0){
          m.status = 0;
          meteorsDodged++;
        }
      }
    }
  }
  for(let i = 0; i < powerUps.length; i++) {
    let pu = powerUps[i];
    if(pu.status && isCollided(p, pu)) {
      pu.status = 0;
      if(pu.type == 1) {
        shield+=10;
        if(shield > 100){
          shield = 100;
        }
        if(shieldDown) {
          shieldDown = false;
          shield = 20;
        }
      }
    }
  }
  for(let i = 0; i < enemies.length; i++) {
    let e = enemies[i];
    for(let j = 0; j < missiles.length; j++) {
      let m = missiles[j];
      if(isCollided(e, m) && m.status && e.status) {
        e.status = 0;
        m.status = 0;
        playerScore++;
        shipsKilled++;
        explosionSpawner(e.x, e.y, false);
        //console.log(explosionsToRender.length);
      }
    }
    if(isCollided(e, p) && e.status) {
      e.status = 0;
      explosionSpawner(e.x, e.y, true);
      spawnDamage(e.x, e.y, life);
      life--;
    }
  }
  for(let i = 0; i <enemiesMissiles.length; i++) {
    let m = enemiesMissiles[i];
    if(isCollided(p, m) && m.status) {
      m.status = 0;
      shieldIter = 1;
      shieldActivated = true;
      shield-=10;
      if(shieldDown) {
        life--;
        explosionSpawner(m.x, m.y, true);
        spawnDamage(p.x, p.y, life);
      }
      if(shield <= 0) {
        shieldDown = true;
      }
    }
  }

}

let isCollided = function(obj1, obj2) {
  let collided = false;
  if ((obj1.x < obj2.x + obj2.width &&
   obj1.x + obj1.width > obj2.x &&
   obj1.y < obj2.y + obj2.height &&
   obj1.height + obj1.y > obj2.y)){
    collided = true;
  }
  return collided;
}

let collectGarbage = function() {
  let newE = [];
  let newEM = [];
  let newPu = [];
  let newMe = [];
  for(let i = 0; i < meteors.length; i++) {
    let m = meteors[i];
    if(m.status == 1) {
      newMe.push(m);
    }
  }
  for(let i = 0; i < enemies.length; i++) {
    let e = enemies[i];
    if(e.status == 1) {
      newE.push(e);
    }
  }
  for(let i = 0; i < enemiesMissiles.length; i++) {
    let m = enemiesMissiles[i];
    if(m.status) {
      newEM.push(m);
    }
  }
  for(let i = 0; i < powerUps.length; i++) {
    let p = powerUps[i];
    if(p.status) {
      newPu.push(p);
    }
  }
  enemiesMissiles = newEM;
  enemies = newE;
  powerUps = newPu;
  meteors = newMe;
}

let moveMissiles = function() {
  for(let i = 0; i < missiles.length; i++) {
    let m = missiles[i];
    m.y+=m.dy;
  }
}

let moveEnemies = function() {
  for(let i = 0; i < enemies.length; i++) {
    let e = enemies[i];
    e.y+=e.dy;
  }
}

let moveShip = function() {
  if (left) {
    playerX -= playerDX;
  }
  if (up) {
    playerY += playerDY;
  }
  if (down) {
    playerY -= playerDY;
  }
  if (right) {
    playerX += playerDX;
  }
}


document.addEventListener('keydown', function check(e) {
    let code = e.keyCode;
    switch (code) {
        case 37:
          //console.log("left");
          left = true;
          break; //Left key
        case 38:
          //console.log("up");
          up = true;
          break; //Up key
        case 39:
          //console.log("Right");
          right = true;
          break; //Right key
        case 40:
          //console.log("Down");
          down = true;
          break; //Down key
        case 87:
          //console.log("W");
          up = true;
          break; //W key
        case 65:
          //console.log("A");
          left = true;
          break; //A key
        case 83:
          //console.log("S");
          down = true;
          break; //S key
        case 68:
          //console.log("D");
          right = true;
          break; //D key
        case 32:
          //console.log("space");
          fire = true;
          break;
        default: //console.log("other key");
    }
}, false);

document.addEventListener('keyup', function check(e) {
    let code = e.keyCode;
    switch (code) {
        case 37:
          //console.log("left");
          left = false;
          break; //Left key
        case 38:
          //console.log("up");
          up = false;
          break; //Up key
        case 39:
          //console.log("Right");
          right = false;
          break; //Right key
        case 40:
          //console.log("Down");
          down = false;
          break; //Down key
        case 87:
          //console.log("W");
          up = false;
          break; //W key
        case 65:
          //console.log("A");
          left = false;
          break; //A key
        case 83:
          //console.log("S");
          down = false;
          break; //S key
        case 68:
          //console.log("D");
          right = false;
          break; //D key
        case 32:
          //console.log("space");
          fire = false;
          canFire = true;
          break;
        default: //console.log("other key");
    }
}, false);

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

init();

let interval;
let uid;
let startGame = function() {
  console.log("called");
  firebase.database().ref('Users/').child(uid).child("highScore").once('value', function(snap){
    let score = snap.val();
    highScore = score;
  }).then(function() {
    interval = setInterval(loop, 30);
  });
}
let setUID = function(playerUid) {
  uid = playerUid;
  console.log(uid);
}

let animationInt = setInterval(animationStep, 100);
//let interval = setInterval(loop, 30);
