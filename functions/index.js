var functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//     var functions = require('firebase-functions');

//     functions.database.ref('/');
//     response.send("Hello from Firebase!");


// });



// exports.testing = functions.https.onRequest((request, response) => {


//     return admin.database().ref("test/aaa").once('value', (snapshot) => {
//         var value = snapshot.val();
//         response.send("test: " + value);
//     });

// });

// exports.copyTEst = functions.database.ref("test/{key}")
//     .onCreate((changedField, context) => {
//         // Grab the current value of what was written to the Realtime Database.
//         //const original = changedField.val();
//         console.log('Uppercasing', context.params.key, changedField.val());
//         // const uppercase = original.toUpperCase();
//         // You must return a Promise when performing asynchronous tasks inside a Functions such as
//         // writing to the Firebase Realtime Database.
//         // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
//         // return snapshot.ref.parent.child('uppercase').set(uppercase);
//         return functions.database.ref("testa/" + context.params.key).set(changedField.val());
//     });
    
// exports.copyTEst = functions.database.ref("test/{key}")
//     .onCreate((changedField, context) => {
//         // Grab the current value of what was written to the Realtime Database.
//         //const original = changedField.val();
//         console.log('Uppercasing', context.params.key, changedField.val());
//         // const uppercase = original.toUpperCase();
//         // You must return a Promise when performing asynchronous tasks inside a Functions such as
//         // writing to the Firebase Realtime Database.
//         // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
//         // return snapshot.ref.parent.child('uppercase').set(uppercase);
//         return admin.database().ref("testa/" + context.params.key).set(changedField.val());
//         // .database().ref("/users/"+id+"/info/status").set("ok")
//     });
    
exports.copyOrder = functions.database.ref("userOrders/{key}")
    .onCreate((changedField, context) => {
        return admin.database().ref("orders/" + context.params.key).set(changedField.val());
    });
    
    
