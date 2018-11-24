// Initialize Firebase
var config = {
    apiKey: "AIzaSyDb1nRDnf0SkQAm-AF_lI9hov8FHbsf5m4",
    authDomain: "jordy-shop.firebaseapp.com",
    databaseURL: "https://jordy-shop.firebaseio.com",
    projectId: "jordy-shop",
    storageBucket: "jordy-shop.appspot.com",
    messagingSenderId: "275722148119"
};
firebase.initializeApp(config);
const database = firebase.database();

firebase.auth().signInAnonymously().catch(function(error) {
    console.error(error);
});

firebase.auth().onAuthStateChanged(function(user) {
    console.log("change")
    if (user) {
        // User is signed in.
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        console.log(user.uid);
        // ...
    }
    else {
        // User is signed out.
        console.log("test");
        // ...
    }
});
firebase.auth().signInAnonymously().catch(function(error) {
    console.error(error);
});

firebase.auth().onAuthStateChanged(function(user) {
    console.log("change")
    if (user) {
        // User is signed in.
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        console.log(user);
        // ...
    }
    else {
        // User is signed out.
        console.log("test");
        // ...
    }
});

function submitPassword() {
    let pass = document.getElementById("password").value;
    let mail = "jordan@mcmaster.id.au";

    document.getElementById("aroundPass").classList.add("hide");
    document.getElementById("aroundList").classList.remove("hide");

    // firebase.auth().signInWithEmailAndPassword(mail, pass).catch(function(error) {
    //     // Handle Errors here.
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //     console.error("auth", errorCode, errorMessage);
    //     // ...
    //     document.getElementById("aroundPass").classList.remove("hide");
    //     document.getElementById("aroundList").classList.add("hide");
    //     document.getElementById("password").value = "";
    // });





}


function databaseRead() {
    console.log("databaseRead called")
    database.ref("orders").on('value', function(snapshot) {
        console.log(snapshot.val());
    }, function(error) {
        console.error("error:", error);
    });
}
