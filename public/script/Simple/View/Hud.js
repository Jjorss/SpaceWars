class Hud {
  constructor() {
    this.width = canvas.width;
    this.height = canvas.height*0.1;
    this.x = 0;
    this.y = 0;

  }

  render(shield, lives, score) {
    this.drawSheild(shield);
    this.drawHealth(lives);
    this.drawKills(score);

  }

  drawSheild(shield) {
    let shieldDown = false;

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

  drawHealth(life) {
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

    // let imgNum;
    // if(life == 3) {
    //   imgNum = number3
    // } else if (life == 2) {
    //   imgNum = number2;
    // } else if(life == 1) {
    //   imgNum = number1;
    //   ctx.fillStyle = "Red";
    // } else {
    //   ctx.fillStyle = "Red";
    //   imgNum = number0;
    // }
    ctx.fillText("Lives: " + life, tX, tY);
    // ctx.drawImage(imgNum, numX, numY,
    // numWidth, numHeight);
  }

  drawKills(playerScore) {
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

}
