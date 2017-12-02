const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.createUser = functions.auth.user().onCreate(event=>{
  const user = event.data;
  const email = user.email;
  const name = user.displayName;
  const uid = user.uid;
  return admin.database().ref("/Users/").child(uid).set({
    "email": email,
    "name": name,
    "uid": uid,
    "highScore": 0
  });
});

exports.handleHighScore = functions.database.ref('Users/{uid}/').onWrite(event => {
  let uid = event.params.uid;
  let data = event.data.val();
  let highScore = data.highScore;
  let name = data.name;
  return admin.database().ref('leader/').once('value', function(snap){
    let leader = snap.val();
    if(!leader){
      return admin.database().ref('leader/').set({"name": name, "highScore": highScore});
    } else{
      if(leader.highScore < highScore) {
        return admin.database().ref('leader/').set({"name": name, "highScore": highScore});
      } else {
        return null;
      }
    }
  });
});
