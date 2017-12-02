let provider = new firebase.auth.GoogleAuthProvider();

document.getElementById('loginBtn').addEventListener('click', function() {
  console.log("clicked");
  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;

  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    console.log(errorMessage);
  });
});

firebase.auth().getRedirectResult().then(function(result) {
  if (result.credential) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;

  }
  // The signed-in user info.

}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});

let listener = firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.


    console.log("signed-in");
    let user = firebase.auth().currentUser;
    let name, email, photoUrl, uid, emailVerified;

    if (user != null) {
      name = user.displayName;
      email = user.email;
      photoUrl = user.photoURL;
      emailVerified = user.emailVerified;
      uid = user.uid;
      document.getElementById('startBtn').style.display = "inline";
      document.getElementById('welcome').innerHTML = "Welcome " + name + "!";
      console.log("working");
      //setUID(uid);
      //startGame();
    }
  }
});

// window.onbeforeunload = closingCode;
// function closingCode(){
//   firebase.auth().signOut().then(function() {
//    // Sign-out successful.
//   }).catch(function(error) {
//    // An error happened.
//   });
// }
