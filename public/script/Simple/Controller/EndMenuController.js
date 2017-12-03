class EndMenuController {
  constructor(uid) {
    this.uid = uid;
    console.log(this.uid);
  }

  getPlayerData() {
    console.log(this.uid);
    return firebase.database().ref("Users/").child(this.uid).once('value').then(function(snap) {
      let user = snap.val();
      let highScore = user.highScore;
      return highScore;
    });
  }

  getLeaderData() {
    return firebase.database().ref("leader/").once('value').then(function(snap){
      return snap.val();
    });
  }

  generateMenu() {
    // <div class="menuWrapper" id="endMenu">
    //   <div class="menu">
    //     <p>Your score is...</p>
    //     <p>Personal Best...</p>
    //     <p>The High Score is: ...</p>
    //   </div>
    // </div>
    let highScore = 0;
    let leader = {};
    this.getPlayerData().then(function(highScore){
      highScore = highScore;
      //${SCORE > highScore ? `<p>You beat your previous high score!</p> : <p><p>`}
      return this.getLeaderData().then(function(leader){
        leader = leader;
        console.log(leader.highScore);
        let html = `
          <div class="menu">
            <p>Your score is ${SCORE}</p>
            <p>Personal Best is ${highScore}</p>
            ${(SCORE > highScore) ? "<p>You beat your previous high score!</p>" : "<p></p>"}
            ${(SCORE > leader.highScore) ? "<p>You have the new high score!</p>" : "<p></p>"}
          </div>`;
          document.getElementById('endMenu').innerHTML = html;
      }).then(function() {
        if(SCORE > highScore){
          firebase.database().ref("Users/").child(this.uid).child("highScore").set(SCORE);
        }
      }.bind(this));
    }.bind(this));
  }
}
